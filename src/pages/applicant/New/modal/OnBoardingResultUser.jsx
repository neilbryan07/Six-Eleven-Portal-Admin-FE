import React, { lazy, Suspense, useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { APIServices } from '../../../../contants/apiConfig';

const OnBoardingResultUser = ({ openModal, handleClose, rowData }) => {

    const [userExamItems, setUserExamItems] = useState([]);

    useEffect(() => {
        handleExamType();
    }, []);

    const handleExamType = async () => {

        const response = await APIServices.get({
            url: `onboarding/user-module-answers?user_id=${rowData?.userInfo?.id}&module_id=${rowData?.module_id}`
        });

        if (response.status === 200) {
            setUserExamItems(response?.data)
        }
    }

    const handleScoringType = (data) => {

        let direct = ['', 'Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
        let reverse = ['', 'Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'];

        if (parseInt(data?.question?.scoring_type) === 1) {
            return <h1 className='text-sm text-[#556fa8] font-bold'>{data?.user_score_awarded} ( {direct[data?.user_score_awarded]} )</h1>
        }
        else {
            return <h1 className='text-sm text-[#556fa8] font-bold'>{data?.user_score_awarded} ( {reverse[data?.user_score_awarded]} )</h1>
        }

    }
    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >
            <div className='max-w-[600px] w-full p-4 bg-white rounded-lg flex flex-col gap-2 overscroll-y-auto overflow-y-auto'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2 sticky top-0 bg-white'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>{rowData?.title} Result</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon />
                        </span>

                    </div>

                </div>

                <div className='max-h-[550px] h-full w-full bg-white rounded-lg flex flex-col gap-2 overscroll-y-auto overflow-y-auto'>
                    <h1 className='text-lg text-[#839f55] font-light'>MCQ OnBoarding Content:</h1>
                    {userExamItems?.quiz?.questions?.map((row, index) => (
                        <div className='flex flex-col gap-2' key={index}>
                            <h1 className='text-sm text-black font-medium'>{index + 1}. {row?.question}</h1>

                            <div className='flex flex-col gap-4'>

                                {row?.choices?.map((rowItem, indexItem) => (

                                    <div className='flex flex-row gap-2 items-center' key={indexItem}>
                                        <h1 className={`text-sm ${rowItem?.is_selected ? "text-[#556fa8] font-bold" : "text-black"}`}>{String.fromCharCode(65 + indexItem)}.) {rowItem?.choice}</h1>
                                    </div>

                                ))}

                            </div>
                        </div>

                    ))}

                    <h1 className='text-lg text-[#839f55] font-light'>Reflection Prompts Content:</h1>
                    {userExamItems?.reflections?.map((row, index) => (
                        <div className='flex flex-col gap-2' key={index}>
                            <h1 className='text-sm text-black font-medium'>{index + 1}. {row?.question}</h1>
                            <div className='flex flex-row gap-2 items-center'>
                                <h1 className='text-xs text-[#839f55] font-light'>Answer:</h1>
                                <h1 className='text-sm text-black font-medium'>{row?.answer}</h1>
                            </div>

                        </div>

                    ))}

                </div>
            </div>
        </Backdrop>
    )
}

export default OnBoardingResultUser