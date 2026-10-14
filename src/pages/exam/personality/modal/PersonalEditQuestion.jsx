import React, { useState, useCallback, useRef, useEffect } from 'react'

import TextField from '@mui/material/TextField';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';


import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Alert from '@mui/material/Alert';

import SaveButton from '../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../component/Buttons/CloseButton';

import { APIServices } from '../../../../contants/apiConfig';
import { nil } from 'ajv';

const PersonalEditQuestion = React.memo(({ questionExam, openModal, handleClose, reFreshTable, }) => {

    const [questionType, setQuestionType] = useState(parseInt(questionExam?.scoring_type?.id));
    const [questionStatus, setQuestionStatus] = useState(questionExam?.is_active);
    const questionNameRef = useRef(null);
    const [loading , setLoading] = useState(false);
    const [isError, setIsError] = useState(false)

    const handleAddMCQs = async () => {

        setIsError(false);
        setLoading(true);

        let questionData = {
            "question_name": questionNameRef.current.value,
            "id": questionExam?.id,
            "scoring_type": questionType,
            "is_active": questionStatus

        }

        const response = await APIServices.put({
            url: '/person-exam/update-person-exam-content', payload: questionData
        });

        if (response.status === 200) {
            reFreshTable()
            handleClose();
        } else {
            setLoading(false);
        }
    }

    const handleSwitchChange = (event) => {
        setQuestionStatus(event.target.checked ? 1 : 0);
    };

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[600px] w-full p-4 bg-white rounded-lg flex flex-col gap-2 max-h-[900px] overscroll-y-auto overflow-y-auto' >

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Edit Question</h1>

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
                        <TextField id="outlined-basic" variant="outlined" size='small' inputRef={questionNameRef} defaultValue={questionExam?.question_name} />
                    </div>


                    <div className='flex flex-row gap-2 items-center'>
                        <h1 className='text-xs text-red-500 font-bold'>Inactive</h1>
                        <Switch color="success" checked={questionStatus === 1} onChange={handleSwitchChange} />
                        <h1 className='text-xs text-[#839f55] font-bold'>Active</h1>
                    </div>

                    {isError && <Alert severity="error">Error: Answers levels cannot be repeated.</Alert>}

                    <div className='w-full flex flex-row justify-end gap-3'>

                        <SaveButton is_loading={loading} handleClick={handleAddMCQs} title={"Edit Question"} />

                        <CloseButton handleClick={handleClose} title={"Cancel"} />

                    </div>


                </div>

            </div>

        </Backdrop>
    )
});

export default PersonalEditQuestion;