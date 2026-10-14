import React, { lazy, Suspense, useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

import SaveButton from '../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../component/Buttons/CloseButton';

import { APIServices } from '../../../../contants/apiConfig';

const labels = {
    1: 'Very Poor',
    2: 'Poor',
    3: 'Average',
    4: 'Good',
    5: 'Excellent',
};

const AddVideoRating = ({ selectedData, openModal, handleClose, handleExamType, user_id }) => {

    const [remarks, setRemarks] = useState("");
    const [value, setValue] = React.useState(0);
    const [hover, setHover] = React.useState(0);

    const handleAddFeedback = async (data) => {

        const response = await APIServices.post({
            url: '/video-assessment/score-answer',
            payload: {
                "answer_id": selectedData?.answer?.answer_id,
                "rating": value,
                "feedback": remarks,
            }
        });

        if (response.status === 200) {
            handleExamType();
            handleClose();
        }

    }

    const getUserFolderPath = (userId, filePath) => {

        // remove answers/ from filepath
        const cleanFilePath =
            filePath?.replace('answers/', '');

        const groupStart =
            Math.floor((user_id - 1) / 1000) * 1000 + 1;

        const groupEnd = groupStart + 999;

        return `answers/${groupStart}-${groupEnd}/${user_id}/${cleanFilePath}`;
    };

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >
            <div className="max-w-[500px] w-full bg-white rounded-lg flex flex-col gap-2">
                <div className="w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2 pt-4 px-4">
                    <h1 className="text-sm text-[#556fa8] font-medium">Feedback Rating Content</h1>
                    <div onClick={handleClose} className="flex flex-col items-center">
                        <span className="text-gray-500 cursor-pointer">
                            <CancelOutlinedIcon size="s" />
                        </span>
                    </div>
                </div>

                <div className='w-full flex flex-col gap-2 max-h-[800px] overscroll-y-auto overflow-y-auto'>

                    <div className="w-full flex flex-col gap-2 px-4">

                        <div className='flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-light'>Question Name:</h1>
                            <h1 className='text-sm text-black font-medium'>{selectedData?.question_text}</h1>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-light'>Video Content</h1>
                            {/* <video
                                width="500"
                                controls
                                src={`${process.env.REACT_APP_API_STORAGE}${selectedData?.answer?.file_path}`}
                            /> */}

                            <video
                                width="500"
                                controls
                                src={`${process.env.REACT_APP_API_STORAGE}${getUserFolderPath(
                                    selectedData?.userInfo?.id,
                                    selectedData?.answer?.file_path
                                )}`}
                                onError={(e) => {

                                    // fallback to old structure
                                    e.target.src =
                                        `${process.env.REACT_APP_API_STORAGE}${selectedData?.answer?.file_path}`;
                                }}
                            />
                        </div>

                    </div>

                    <div className='w-full flex flex-col px-4 py-2 gap-2'>

                        <h1 className="text-[#556fa8] text-sm font-semibold">
                            Add Ratings
                        </h1>

                        <div className='flex flex-row gap-2 items-center'>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                            />

                            {value !== null && (
                                <h1 className="text-[#839f55] text-sm font-semibold mt-1">{labels[hover !== -1 ? hover : value]}</h1>
                            )}
                        </div>

                        <h1 className="text-[#556fa8] text-sm font-semibold">
                            Add Remark
                        </h1>

                        <TextField
                            label="Remarks"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            value={remarks} // controlled value
                            onChange={(e) => setRemarks(e.target.value)} // update state
                        />

                    </div>

                    <div className="w-full flex flex-row justify-end gap-3 p-2">
                        {remarks && value ?
                            <SaveButton title={"Add Feedback"} handleClick={handleAddFeedback} />
                            : null
                        }
                        <CloseButton title={"Cancel"} handleClick={handleClose} />

                    </div>
                </div>
            </div>
        </Backdrop>
    )
}

export default AddVideoRating;