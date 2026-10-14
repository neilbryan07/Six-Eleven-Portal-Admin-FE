import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ViewVideoOneWay = ({ openModal, handleClose, reFreshTable, questionData }) => {

    const revertToWatchUrl = (embedUrl) => {
        try {
            const videoId = embedUrl.split("/embed/")[1]?.split("?")[0];
            return `https://www.youtube.com/watch?v=${videoId}`;
        } catch {
            return "";
        }
    };

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >
            <div className="max-w-[500px] max-h-[800px] w-full bg-white rounded-lg flex flex-col gap-2">
                <div className="w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2 pt-4 px-4">
                    <h1 className="text-sm text-[#556fa8] font-medium">View Video Content</h1>
                    <div onClick={handleClose} className="flex flex-col items-center">
                        <span className="text-gray-500 cursor-pointer">
                            <CancelOutlinedIcon size="s" />
                        </span>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-2 overscroll-y-auto overflow-y-auto px-4">

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-light'>Question Name:</h1>
                        <h1 className='text-sm text-black font-medium'>{questionData?.question}</h1>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-light'>Video Content</h1>
                        <video
                            width="500"
                            controls
                            src={`${process.env.REACT_APP_API_STORAGE}${questionData?.videos?.[parseInt(questionData?.videos?.length) - 1]?.file_path}`}
                        />
                    </div>

                    {questionData?.youtube_videos[0]?.youtube_url?.length > 0 ?
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-light'>Youtube URL:</h1>
                            <a
                                href={revertToWatchUrl(questionData?.youtube_videos[0].youtube_url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 font-medium underline"
                            >
                                {revertToWatchUrl(questionData?.youtube_videos[0]?.youtube_url)}
                            </a>
                        </div> : null}

                </div>

                <div className="w-full flex flex-row justify-end gap-3 p-4">

                    {/* <CloseButton title={"Cancel"} handleClick={handleClose} /> */}

                </div>
            </div>
        </Backdrop>
    );
};

export default ViewVideoOneWay;