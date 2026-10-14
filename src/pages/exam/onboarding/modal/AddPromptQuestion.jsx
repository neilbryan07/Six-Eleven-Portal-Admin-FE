import React, { useState } from 'react'

import { useParams, useNavigate } from "react-router-dom";

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';

import CloseButton from '../../../../component/Buttons/CloseButton';
import SaveButton from '../../../../component/Buttons/SaveButton';

import { APIServices } from '../../../../contants/apiConfig';

const AddPromptQuestion = ({ openModal, handleClose, refreshData }) => {


    const { id } = useParams();

    const [loading, setLoading] = useState(false)

    const [promptformData, setPromptFormData] = useState({
        question: null,
    });

    const [videoFile, setvideoFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setvideoFile(file); // <-- use a state for video
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPromptFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddImage = async () => {

        setLoading(true)

        let questionData = {
            "module_id": id,
            "question": promptformData?.question,
            "is_active": true,
        }

        try {

            const response = await APIServices.post({
                url: '/onboarding/reflections/create', payload: questionData
            });

            if (response.status === 200) {
                refreshData();
                handleClose();
                setLoading(false);
            }
        } catch (error) {
            handleClose();
        }

    }




    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Add Reflection Prompts Exam</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2'>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Question:</h1>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size='small'
                            name="question"
                            multiline={4}
                            value={promptformData?.question}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='w-full flex flex-row justify-end gap-3 mt-2'>


                        <SaveButton is_loading={loading} handleClick={handleAddImage} title={"Add Content"} />
                        <CloseButton handleClick={handleClose} title={"Cancel"} />

                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default AddPromptQuestion;