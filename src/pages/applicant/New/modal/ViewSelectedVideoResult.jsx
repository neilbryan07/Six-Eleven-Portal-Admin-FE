import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ViewSelectedVideoResult = ({ openModal, handleClose, questionData }) => {

    const getUserFolderPath = (userId, filePath) => {

        // remove answers/ from filepath
        const cleanFilePath =
            filePath?.replace('answers/', '');

        const groupStart =
            Math.floor((userId - 1) / 1000) * 1000 + 1;

        const groupEnd = groupStart + 999;

        return `answers/${groupStart}-${groupEnd}/${userId}/${cleanFilePath}`;
    };
    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >
            <div className="max-w-[500px] max-h-[800px] w-full bg-white rounded-lg flex flex-col gap-2">
                <div className="w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2 pt-4 px-4">
                    <h1 className="text-sm text-[#556fa8] font-medium">Applicant Video Content</h1>
                    <div onClick={handleClose} className="flex flex-col items-center">
                        <span className="text-gray-500 cursor-pointer">
                            <CancelOutlinedIcon size="s" />
                        </span>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-2 overscroll-y-auto overflow-y-auto px-4">

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-light'>Question Name:</h1>
                        <h1 className='text-sm text-black font-medium'>{questionData?.question_text}</h1>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-light'>Video Content</h1>
                        {/* <video
                            width="500"
                            controls
                            src={`${process.env.REACT_APP_API_STORAGE}${questionData?.answer?.file_path}`}
                        /> */}

                        <video
                            width="500"
                            controls
                            src={`${process.env.REACT_APP_API_STORAGE}${getUserFolderPath(
                                questionData?.userInfo?.id,
                                questionData?.answer?.file_path
                            )}`}
                            onError={(e) => {

                                // fallback to old structure
                                e.target.src =
                                    `${process.env.REACT_APP_API_STORAGE}${questionData?.answer?.file_path}`;
                            }}
                        />
                    </div>

                </div>

                <div className="w-full flex flex-row justify-end gap-3 p-4">

                    {/* <CloseButton title={"Cancel"} handleClick={handleClose} /> */}

                </div>
            </div>
        </Backdrop>
    );
};

export default ViewSelectedVideoResult;