import React, { useState, useCallback, useRef, useEffect } from 'react'

import TextField from '@mui/material/TextField';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';

import Alert from '@mui/material/Alert';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';


import SaveButton from '../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../component/Buttons/CloseButton';

import { APIServices } from '../../../../contants/apiConfig';
import { nil } from 'ajv';

const AddQuestion = React.memo(({ questionExam, openModal, handleClose, reFreshTable, ReadingPassageData, ListeningCompre, listenId = null, readID = null }) => {

  const [questionType, setQuestionType] = useState(parseInt(questionExam));
  const [questionPassage, setQuestionPassage] = useState(readID);
  const [questionListening, setQuestionListening] = useState(listenId);

  const [viewPassage, setViewPassage] = useState(false);
  const [viewListening, setViewListening] = useState(false);

  const [viewSelectedData, setViewSelectedData] = useState([]);

  const questionNameRef = useRef(null);

  const answerOneRef = useRef(null);
  const answerTwoRef = useRef(null);
  const answerThreeRef = useRef(null);
  const answerFourRef = useRef(null);
  const answerFiveRef = useRef(null);

  const [isError, setIsError] = useState(false)
  const [loading , setLoading] = useState(false)

  const radioGroupRef = useRef(null);

  const [questionContent, setQuestionContent] = useState([
    { "choice_text": "", "quality_level": null },
    { "choice_text": "", "quality_level": null },
    { "choice_text": "", "quality_level": null },
    { "choice_text": "", "quality_level": null },
    { "choice_text": "", "quality_level": null },
  ]);

  const handleQualityLevelChange = (event, index) => {
    const newQuestionContent = [...questionContent];
    newQuestionContent[index].quality_level = parseInt(event.target.value, 10); // Convert value to number
    setQuestionContent(newQuestionContent);
  };

  const handleAddMCQs = async () => {

    setIsError(false);
    setLoading(true);

    const qualityLevels = questionContent.map(choice => choice.quality_level).filter(level => level !== null);
    const hasDuplicates = qualityLevels.some((level, index) => qualityLevels.indexOf(level) !== index);

    if (hasDuplicates) {
      setIsError(true);
      return;
    }

    let questionData = {
      "question_text": questionNameRef.current.value,
      "exam_type": questionType,
      "passage_id": questionPassage ? questionPassage : null,
      "audio_id": questionListening ? questionListening : null,
      "choices": [
        { "choice_text": answerOneRef.current.value, "quality_level": questionContent?.[0]?.quality_level },
        { "choice_text": answerTwoRef.current.value, "quality_level": questionContent?.[1]?.quality_level },
        { "choice_text": answerThreeRef.current.value, "quality_level": questionContent?.[2]?.quality_level },
        { "choice_text": answerFourRef.current.value, "quality_level": questionContent?.[3]?.quality_level },
        { "choice_text": answerFiveRef.current.value, "quality_level": questionContent?.[4]?.quality_level }
      ]
    }

    const response = await APIServices.post({
      url: '/mcq-admin/question', payload: questionData
    });

    if (response.status === 200) {
      reFreshTable()
      handleClose();
    } else {
          setLoading(false);
    }
  }

  const handlePassageView = () => {
    setViewSelectedData([])

    let passage = ReadingPassageData.current?.find(item => item?.id === questionPassage);
    setViewSelectedData(passage)

    setViewPassage(true)
  }

  const handleListeningView = () => {
    setViewSelectedData([])

    let passage = ListeningCompre.current?.find(item => item?.id === questionListening);
    setViewSelectedData(passage)

    setViewListening(true)
  }

  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={openModal}
    >

      {/* Passage Modal */}
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={viewPassage}
      >

        <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

          <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

            <h1 className='text-sm text-[#556fa8] font-medium'>{viewSelectedData?.reading_passage_name}</h1>

            <div onClick={() => setViewPassage(false)} className='flex flex-col items-center'>
              <span className='text-gray-500 cursor-pointer'>
                <CancelOutlinedIcon size="s" />
              </span>

            </div>

          </div>

          <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>
            <h1 className='text-sm text-black font-normal text-justify'>{viewSelectedData?.text}</h1>
          </div>

        </div>

      </Backdrop>
      {/* Listening Modal */}

      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={viewListening}
      >

        <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

          <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

            <h1 className='text-sm text-[#556fa8] font-medium'>{viewSelectedData?.audio_content}</h1>

            <div onClick={() => setViewListening(false)} className='flex flex-col items-center'>
              <span className='text-gray-500 cursor-pointer'>
                <CancelOutlinedIcon size="s" />
              </span>

            </div>

          </div>

          <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2 items-center'>
            <audio controls src={`${process.env.REACT_APP_API_URL}${viewSelectedData?.audio_file_url}`}></audio>
          </div>

        </div>

      </Backdrop>

      <div className='max-w-[600px] w-full p-4 bg-white rounded-lg flex flex-col gap-2 max-h-[900px] overscroll-y-auto overflow-y-auto' >

        <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

          <h1 className='text-sm text-[#556fa8] font-medium'>Add Question</h1>

          <div onClick={handleClose} className='flex flex-col items-center'>
            <span className='text-gray-500 cursor-pointer'>
              <CancelOutlinedIcon size="s" />
            </span>

          </div>

        </div>

        <div className='w-full flex flex-col gap-2 '>

          <FormControl fullWidth>
            <h1 className='text-xs text-[#839f55] font-bold mb-2'>Question Type:</h1>
            <Select
              size='small'
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={questionType}
              readOnly
              onChange={(e) => setQuestionType(e.target.value)}
            // inputRef={questionTypeRef}
            >
              <MenuItem value={1}>Grammar & Sentence Construction</MenuItem>
              <MenuItem value={2}>Sentence Completion Test</MenuItem>
              <MenuItem value={3}>Listening Comprehension</MenuItem>
              <MenuItem value={6}>Reading Comprehension</MenuItem>
              <MenuItem value={8}>Basic Computer Literacy</MenuItem>
            </Select>
          </FormControl>

          {/* {questionType === 6 &&

            <div className='flex flex-row gap-2 items-center w-full'>

              <FormControl fullWidth>
                <h1 className='text-xs text-[#839f55] font-bold mb-2'>Select the reading comprehension content:</h1>
                <Select
                  size='small'
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={questionPassage}
                  onChange={(e) => setQuestionPassage(e.target.value)}
                >
                  {ReadingPassageData.current?.map((row) => (
                    <MenuItem value={row?.id}>{row?.reading_passage_name}</MenuItem>
                  ))}

                </Select>
              </FormControl>

              {questionPassage ?

                <Tooltip title="View Reading Passage Content">
                  <span onClick={handlePassageView} className='text-[#839f55] flex flex-col items-center cursor-pointer mt-6'><RemoveRedEyeOutlinedIcon /></span>
                </Tooltip>

                : null}

            </div>
          } */}

          {/* {questionType === 3 &&

            <div className='flex flex-row gap-2 items-center w-full'>

              <FormControl fullWidth>
                <h1 className='text-xs text-[#839f55] font-bold mb-2'>Select the listening comprehension content:</h1>
                <Select
                  size='small'
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={questionListening}
                  onChange={(e) => setQuestionListening(e.target.value)}
                >
                  {ListeningCompre.current?.map((row) => (
                    <MenuItem value={row?.id}>{row?.audio_content}</MenuItem>
                  ))}

                </Select>
              </FormControl>

              {questionListening ?

                <Tooltip title="View Listening comprehension Content">
                  <span onClick={handleListeningView} className='text-[#839f55] flex flex-col items-center cursor-pointer mt-6'><RemoveRedEyeOutlinedIcon /></span>
                </Tooltip>

                : null}

            </div>
          } */}

          {questionType ?
            <React.Fragment>

              <div className='flex flex-col gap-2'>
                <h1 className='text-xs text-[#839f55] font-bold'>Question Name:</h1>
                <TextField id="outlined-basic" variant="outlined" size='small' inputRef={questionNameRef} />
              </div>


              <div className='flex flex-col gap-2'>

                <h1 className='text-xs text-[#839f55] font-bold'>Add 3 Answers Items:</h1>

                <div className='flex flex-col gap-2 w-full'>
                  <div className='flex flex-row gap-2 items-center w-full'>
                    <h1 className='text-sm text-black font-normal'>A)</h1>
                    <TextField id="outlined-basic" fullWidth variant="outlined" size='small' inputRef={answerOneRef} />
                  </div>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    row
                    onChange={(event) => handleQualityLevelChange(event, 0)}
                  >
                    <FormControlLabel
                      value={1} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Low)</h1>}
                    />
                    <FormControlLabel
                      value={2} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Low - Neutral)</h1>}
                    />
                    <FormControlLabel
                      value={3} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Neutral)</h1>}
                    />
                    <FormControlLabel
                      value={4} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Ideal - Neutral)</h1>}
                    />
                    <FormControlLabel
                      value={5} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Ideal)</h1>}
                    />

                  </RadioGroup>

                </div>

                <div className='flex flex-col gap-2 w-full'>
                  <div className='flex flex-row gap-2 items-center w-full'>
                    <h1 className='text-sm text-black font-normal'>B)</h1>
                    <TextField id="outlined-basic" fullWidth variant="outlined" size='small' inputRef={answerTwoRef} />
                  </div>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    row
                    onChange={(event) => handleQualityLevelChange(event, 1)}
                  >
                    <FormControlLabel
                      value={1} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Low)</h1>}
                    />
                    <FormControlLabel
                      value={2} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Low - Neutral)</h1>}
                    />
                    <FormControlLabel
                      value={3} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Neutral)</h1>}
                    />
                    <FormControlLabel
                      value={4} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Ideal - Neutral)</h1>}
                    />
                    <FormControlLabel
                      value={5} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Ideal)</h1>}
                    />

                  </RadioGroup>

                </div>

                <div className='flex flex-col gap-2 w-full'>
                  <div className='flex flex-row gap-2 items-center w-full'>
                    <h1 className='text-sm text-black font-normal'>C)</h1>
                    <TextField id="outlined-basic" fullWidth variant="outlined" size='small' inputRef={answerThreeRef} />
                  </div>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    row
                    onChange={(event) => handleQualityLevelChange(event, 2)}
                  >
                    <FormControlLabel
                      value={1} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Low)</h1>}
                    />
                    <FormControlLabel
                      value={2} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Low - Neutral)</h1>}
                    />
                    <FormControlLabel
                      value={3} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Neutral)</h1>}
                    />
                    <FormControlLabel
                      value={4} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Ideal - Neutral)</h1>}
                    />
                    <FormControlLabel
                      value={5} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Ideal)</h1>}
                    />

                  </RadioGroup>

                </div>

                <div className='flex flex-col gap-2 w-full'>
                  <div className='flex flex-row gap-2 items-center w-full'>
                    <h1 className='text-sm text-black font-normal'>D)</h1>
                    <TextField id="outlined-basic" fullWidth variant="outlined" size='small' inputRef={answerFourRef} />
                  </div>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    row
                    onChange={(event) => handleQualityLevelChange(event, 3)}
                  >
                    <FormControlLabel
                      value={1} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Low)</h1>}
                    />
                    <FormControlLabel
                      value={2} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Low - Neutral)</h1>}
                    />
                    <FormControlLabel
                      value={3} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Neutral)</h1>}
                    />
                    <FormControlLabel
                      value={4} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Ideal - Neutral)</h1>}
                    />
                    <FormControlLabel
                      value={5} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Ideal)</h1>}
                    />

                  </RadioGroup>

                </div>

                <div className='flex flex-col gap-2 w-full'>
                  <div className='flex flex-row gap-2 items-center w-full'>
                    <h1 className='text-sm text-black font-normal'>E)</h1>
                    <TextField id="outlined-basic" fullWidth variant="outlined" size='small' inputRef={answerFiveRef} />
                  </div>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    row
                    onChange={(event) => handleQualityLevelChange(event, 4)}
                  >
                    <FormControlLabel
                      value={1} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Low)</h1>}
                    />
                    <FormControlLabel
                      value={2} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Low - Neutral)</h1>}
                    />
                    <FormControlLabel
                      value={3} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Neutral)</h1>}
                    />
                    <FormControlLabel
                      value={4} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Ideal - Neutral)</h1>}
                    />
                    <FormControlLabel
                      value={5} control={<Radio size='small' color='success' />}
                      label={<h1 className='text-sm text-black font-normal'>(Ideal)</h1>}
                    />

                  </RadioGroup>

                </div>

              </div>

              {isError && <Alert severity="error">Error: Answers levels cannot be repeated.</Alert>}

            </React.Fragment>
            : null}


          <div className='w-full flex flex-row justify-end gap-3'>

            <SaveButton is_loading={loading} handleClick={handleAddMCQs} title={"Create Question"} />

            <CloseButton handleClick={handleClose} title={"Cancel"} />

          </div>


        </div>

      </div>

    </Backdrop>
  )
});

export default AddQuestion;