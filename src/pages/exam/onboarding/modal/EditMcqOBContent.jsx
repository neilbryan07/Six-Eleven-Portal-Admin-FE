import React, { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Checkbox from '@mui/material/Checkbox';

import CloseButton from '../../../../component/Buttons/CloseButton';
import SaveButton from '../../../../component/Buttons/SaveButton';

import { APIServices } from '../../../../contants/apiConfig';

const EditMcqOBContent = ({ openModal, handleClose, refreshData, OnBoardingData }) => {

    const { id } = useParams();

    const [imgDescription, setImgDescription] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [loading, setLoading] = useState(false)


    const [videoformData, setVideoFormData] = useState(OnBoardingData);


    const handleAddMcq = async () => {

        setLoading(true)

        try {

            const response = await APIServices.post({
                url: `/onboarding/questions/update/${OnBoardingData?.id}`, payload: videoformData
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


    const handleQuestionChange = (e) => {
        setVideoFormData((prev) => ({
            ...prev,
            question: e.target.value,
        }));
    };

    const handleChoiceChange = (index, value) => {
        setVideoFormData((prev) => {
            const updatedChoices = [...prev.choices];
            updatedChoices[index].choice = value;

            return {
                ...prev,
                choices: updatedChoices,
            };
        });
    };

    const handleCorrectChange = (index) => {
        setVideoFormData((prev) => ({
            ...prev,
            choices: prev.choices.map((choice, i) => ({
                ...choice,
                is_correct: i === index,
            })),
        }));
    };

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Edit MCQ Content</h1>

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
                            variant="outlined"
                            size="small"
                            multiline
                            rows={2}
                            value={videoformData.question}
                            onChange={handleQuestionChange}
                        />
                    </div>

                    <div className='w-full flex flex-row items-center justify-between'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Add 3 Answers Items:</h1>
                        <h1 className='text-xs text-[#839f55] font-bold'>Check the right answer:</h1>
                    </div>

                    <div className='flex flex-row gap-2 items-center w-full'>
                        <h1 className='text-sm text-black font-normal'>A)</h1>
                        <TextField
                            size="small"
                            fullWidth
                            multiline
                            rows={2}
                            value={videoformData.choices[0].choice}
                            onChange={(e) => handleChoiceChange(0, e.target.value)}
                        />
                        <Checkbox
                            checked={videoformData.choices[0].is_correct}
                            onChange={() => handleCorrectChange(0)}
                        />
                    </div>


                    <div className='flex flex-row gap-2 items-center w-full'>
                        <h1 className='text-sm text-black font-normal'>B)</h1>
                        <TextField
                            size="small"
                            fullWidth
                            multiline
                            rows={2}
                            value={videoformData.choices[1].choice}
                            onChange={(e) => handleChoiceChange(1, e.target.value)}
                        />
                        <Checkbox
                            checked={videoformData.choices[1].is_correct}
                            onChange={() => handleCorrectChange(1)}
                        />
                    </div>


                    <div className='flex flex-row gap-2 items-center w-full'>
                        <h1 className='text-sm text-black font-normal'>C)</h1>
                        <TextField
                            size="small"
                            fullWidth
                            multiline
                            rows={2}
                            value={videoformData.choices[2].choice}
                            onChange={(e) => handleChoiceChange(2, e.target.value)}
                        />
                        <Checkbox
                            checked={videoformData.choices[2].is_correct}
                            onChange={() => handleCorrectChange(2)}
                        />
                    </div>


                    <div className='w-full flex flex-row justify-end gap-3 mt-2'>

                        <SaveButton is_loading={loading} handleClick={handleAddMcq} title={"Edit MQC Content"} />
                        <CloseButton handleClick={handleClose} title={"Cancel"} />

                    </div>

                </div>


            </div>

        </Backdrop>
    )
}

export default EditMcqOBContent;