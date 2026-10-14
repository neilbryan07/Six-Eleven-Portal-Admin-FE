import React , { useState , useCallback , useRef  } from 'react'

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

import Switch from '@mui/material/Switch';

import Alert from '@mui/material/Alert';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';


import SaveButton from '../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../component/Buttons/CloseButton';

import { APIServices } from '../../../../contants/apiConfig';
import { nil } from 'ajv';

const EditQuestion = React.memo(({ openModal, handleClose , reFreshTable , rowData , ReadingPassageData , ListeningCompre }) => {

  const [ questionType , setQuestionType ] = useState(rowData?.exam);
  const [ questionPassage , setQuestionPassage ] = useState(null);
  const [ questionListening , setQuestionListening ] = useState(null);
  const [ questionStatus , setQuestionStatus ] = useState(rowData?.is_active);

  const [ viewPassage , setViewPassage ] = useState(false);
  const [ viewListening , setViewListening ] = useState(false);

  const [ viewSelectedData , setViewSelectedData ] = useState([]);

  const questionNameRef = useRef(null);

  const answerOneRef = useRef(null);
  const answerTwoRef = useRef(null);
  const answerThreeRef = useRef(null);

  const [ isError , setIsError ] = useState(false)
  const [loading , setLoading] = useState(false)

  const radioGroupRef = useRef(null);
  
  const [ questionContent , setQuestionContent ] = useState(rowData?.answers);

  const handleQualityLevelChange = (event, index) => {
    const newQuestionContent = [...questionContent];
    newQuestionContent[index].quality_level = parseInt(event.target.value, 10); // Convert value to number
    setQuestionContent(newQuestionContent);
  };

  const handleAddMCQs = async () => {

      setIsError(false);
      setLoading(true)

      const qualityLevels = questionContent.map(choice => choice.quality_level).filter(level => level !== null);
      const hasDuplicates = qualityLevels.some((level, index) => qualityLevels.indexOf(level) !== index);

      if (hasDuplicates) {
        setIsError(true);
        return;
      }

      let questionData = {
          "id" : rowData?.id,
          "is_active" : questionStatus,
          "question_text": questionNameRef.current.value,
          "exam_type": questionType,
          "passage_id" : questionPassage ? questionPassage : null,
          "audio_id" : questionListening ? questionListening : null,
          "choices": [
              { "id" : rowData?.answers?.[0]?.id , "choice_text": answerOneRef.current.value, "quality_level": questionContent?.[0]?.quality_level },
              { "id" : rowData?.answers?.[1]?.id ,"choice_text": answerTwoRef.current.value, "quality_level": questionContent?.[1]?.quality_level },
              { "id" : rowData?.answers?.[2]?.id ,"choice_text": answerThreeRef.current.value, "quality_level": questionContent?.[2]?.quality_level }
          ] 
      }

      const response = await APIServices.post({
        url: '/mcq-admin/question', payload: questionData
      });
  
      if (response.status === 200) {
        reFreshTable()
        handleClose();
      } else {
        setLoading(false)
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

  const handleSwitchChange = (event) => {
    setQuestionStatus(event.target.checked ? 1 : 0);
  };

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

            <div onClick={ () => setViewPassage(false)} className='flex flex-col items-center'>
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

            <div onClick={ () => setViewListening(false)} className='flex flex-col items-center'>
              <span className='text-gray-500 cursor-pointer'>
                <CancelOutlinedIcon size="s" />
              </span>

            </div>

          </div>

          <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2 items-center'>
            <audio controls src={`${process.env.REACT_APP_API_URL }${viewSelectedData?.audio_file_url}`}></audio>
          </div>

        </div>

      </Backdrop>

      <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

        <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

          <h1 className='text-sm text-[#556fa8] font-medium'>Edit Question</h1>

          <div onClick={handleClose} className='flex flex-col items-center'>
            <span className='text-gray-500 cursor-pointer'>
              <CancelOutlinedIcon size="s" />
            </span>

          </div>

        </div>

        <div className='w-full flex flex-col gap-2'>

          <div className='flex flex-col'>
            <h1 className='text-xs text-[#839f55] font-bold'>Question Type:</h1>
            <h1 className='text-sm text-black font-medium'>{rowData?.exam_type?.name}</h1>
          </div>

          { parseInt(rowData?.exam_type?.id) === 3 &&
            <div className='flex flex-col'>
              <h1 className='text-xs text-[#839f55] font-bold'>Exam Content:</h1>
              <h1 className='text-sm text-black font-medium'>{rowData?.audio_exam?.[0]?.audio_content}</h1>
            </div>  
          }

          { parseInt(rowData?.exam_type?.id) === 6 &&
            <div className='flex flex-col'>
              <h1 className='text-xs text-[#839f55] font-bold'>Exam Content:</h1>
              <h1 className='text-sm text-black font-medium'>{rowData?.passages?.[0]?.reading_passage_name}</h1>
            </div>  
          }
          
            <div className='flex flex-col gap-2'>
              <h1 className='text-xs text-[#839f55] font-bold'>Question Name:</h1>
              <TextField id="outlined-basic" variant="outlined" size='small' inputRef={questionNameRef} defaultValue={rowData?.question_text} />
            </div> 
         
            <div className='flex flex-col gap-2'>

              <h1 className='text-xs text-[#839f55] font-bold'>Add 3 Answers Items:</h1>

              <div className='flex flex-col gap-2 w-full'>
                <div className='flex flex-row gap-2 items-center w-full'>
                  <h1 className='text-sm text-black font-normal'>A)</h1>
                  <TextField id="outlined-basic" fullWidth variant="outlined" size='small' inputRef={answerOneRef} defaultValue={rowData?.answers?.[0]?.choice_text} />
                </div>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  row
                  value={rowData?.answers?.[0]?.quality_level} 
                  onChange={(event) => handleQualityLevelChange(event, 0)}
                >
                  <FormControlLabel
                    value={1} control={<Radio size='small' color='success' />}
                    label={<h1 className='text-sm text-black font-normal'>(Low)</h1>}
                  />
                  <FormControlLabel
                    value={3} control={<Radio size='small' color='success' />}
                    label={<h1 className='text-sm text-black font-normal'>(Neutral)</h1>}
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
                  <TextField id="outlined-basic" fullWidth variant="outlined" size='small' inputRef={answerTwoRef} defaultValue={rowData?.answers?.[1]?.choice_text} />
                </div>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  row
                  value={rowData?.answers?.[1]?.quality_level} 
                  onChange={(event) => handleQualityLevelChange(event, 1)}
                >
                  <FormControlLabel
                    value={1} control={<Radio size='small' color='success' />}
                    label={<h1 className='text-sm text-black font-normal'>(Low)</h1>}
                  />
                  <FormControlLabel
                    value={3} control={<Radio size='small' color='success' />}
                    label={<h1 className='text-sm text-black font-normal'>(Neutral)</h1>}
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
                  <TextField id="outlined-basic" fullWidth variant="outlined" size='small' inputRef={answerThreeRef} defaultValue={rowData?.answers?.[2]?.choice_text} />
                </div>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  row
                  value={rowData?.answers?.[2]?.quality_level} 
                  onChange={(event) => handleQualityLevelChange(event, 2)}
                >
                  <FormControlLabel
                    value={1} control={<Radio size='small' color='success' />}
                    label={<h1 className='text-sm text-black font-normal'>(Low)</h1>}
                  />
                  <FormControlLabel
                    value={3} control={<Radio size='small' color='success' />}
                    label={<h1 className='text-sm text-black font-normal'>(Neutral)</h1>}
                  />
                  <FormControlLabel
                    value={5} control={<Radio size='small' color='success' />}
                    label={<h1 className='text-sm text-black font-normal'>(Ideal)</h1>}
                  />

                </RadioGroup>

              </div>

            </div>

            <div className='flex flex-row gap-2 items-center'>
              <h1 className='text-xs text-red-500 font-bold'>Inactive</h1>
              <Switch color="success" checked={questionStatus === 1} onChange={handleSwitchChange}/>
              <h1 className='text-xs text-[#839f55] font-bold'>Active</h1>
            </div>

          { isError && <Alert severity="error">Error: Answers levels cannot be repeated.</Alert> }

          <div className='w-full flex flex-row justify-end gap-3'>

            <SaveButton is_loading={loading} handleClick={handleAddMCQs} title={"Update Question"} />

            <CloseButton handleClick={handleClose} title={"Cancel"} />

          </div>


        </div>

      </div>

    </Backdrop>
  )
});

export default EditQuestion;