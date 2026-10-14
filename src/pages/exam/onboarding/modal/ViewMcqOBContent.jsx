import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ViewMcqOBContent = ({ openModal, handleClose, OnBoardingData }) => {

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >
            <div className="max-w-[500px] max-h-[800px] w-full bg-white rounded-lg flex flex-col gap-2">
                <div className="w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2 pt-4 px-4">
                    <h1 className="text-sm text-[#556fa8] font-medium">View MCQ Content</h1>
                    <div onClick={handleClose} className="flex flex-col items-center">
                        <span className="text-gray-500 cursor-pointer">
                            <CancelOutlinedIcon size="s" />
                        </span>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-2 overscroll-y-auto overflow-y-auto px-4">

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-light'>Question:</h1>
                        <h1 className='text-sm text-black font-medium'>{OnBoardingData?.question}</h1>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-light'>Answers Items:</h1>
                        <h1 className={`text-sm ${OnBoardingData?.choices[0]?.is_correct ? "text-[#556fa8] font-bold" : "text-black"}`}>A.) {OnBoardingData?.choices[0]?.choice}</h1>
                        <h1 className={`text-sm ${OnBoardingData?.choices[1]?.is_correct ? "text-[#556fa8] font-bold" : "text-black"}`}>B.) {OnBoardingData?.choices[1]?.choice}</h1>
                        <h1 className={`text-sm ${OnBoardingData?.choices[2]?.is_correct ? "text-[#556fa8] font-bold" : "text-black"}`}>C.) {OnBoardingData?.choices[2]?.choice}</h1>
                    </div>


                </div>

                <div className="w-full flex flex-row justify-end gap-3 p-4">

                    {/* <CloseButton title={"Cancel"} handleClick={handleClose} /> */}

                </div>
            </div>
        </Backdrop>
    );
};

export default ViewMcqOBContent;