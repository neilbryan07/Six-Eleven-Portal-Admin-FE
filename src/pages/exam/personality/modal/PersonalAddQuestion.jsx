import React, { useState, useCallback, useRef, useEffect, use } from 'react'

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

const PersonalAddQuestion = React.memo(({ questionExam, openModal, handleClose, reFreshTable, }) => {

    const [questionType, setQuestionType] = useState(parseInt(questionExam));
    const questionNameRef = useRef(null);
    const [loading , setLoading] = useState(false);
    const [isError, setIsError] = useState(false)

    const handleAddMCQs = async () => {

        setIsError(false);
        setLoading(true);

        let questionData = {
            "question_name": questionNameRef.current.value,
            "personality_exam_type": questionExam?.id,
            "scoring_type": questionType,

        }

        const response = await APIServices.post({
            url: '/person-exam/create-person-exam-content', payload: questionData
        });

        if (response.status === 201) {
            reFreshTable()
            handleClose();
        } else {
            setLoading(false);
        }
    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[600px] w-full p-4 bg-white rounded-lg flex flex-col gap-2 max-h-[900px] overscroll-y-auto overflow-y-auto' >

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Add Question ( {questionExam?.name} )</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2 '>

                    <FormControl fullWidth>
                        <h1 className='text-xs text-[#839f55] font-bold mb-2'>Score Type:</h1>
                        <Select
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={questionType}
                            onChange={(e) => setQuestionType(e.target.value)}
                        // inputRef={questionTypeRef}
                        >
                            <MenuItem value={1}>Direct</MenuItem>
                            <MenuItem value={2}>Reverse-worded</MenuItem>
                        </Select>
                    </FormControl>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Question Name:</h1>
                        <TextField id="outlined-basic" variant="outlined" size='small' inputRef={questionNameRef} />
                    </div>

                    {isError && <Alert severity="error">Error: Answers levels cannot be repeated.</Alert>}

                    <div className='w-full flex flex-row justify-end gap-3'>

                        <SaveButton is_loading={loading} handleClick={handleAddMCQs} title={"Create Question"} />

                        <CloseButton handleClick={handleClose} title={"Cancel"} />

                    </div>


                </div>

            </div>

        </Backdrop>
    )
});

export default PersonalAddQuestion;