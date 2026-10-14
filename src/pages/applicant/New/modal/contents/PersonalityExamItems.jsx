import React, { lazy, Suspense, useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { APIServices } from '../../../../../contants/apiConfig';

const PersonalityExamItems = ({ openModal, handleClose, rowData }) => {

    const [userExamItems, setUserExamItems] = useState([]);

    useEffect(() => {
        handleExamType();
    }, []);

    const handleExamType = async () => {

        const response = await APIServices.get({
            url: `person-exam/fetch-person-result`, payload: {
                "exam_type_id": rowData?.exam_type_id,
                "user_id": rowData?.userInfo?.id,
            }
        });

        if (response.status === 200) {
            setUserExamItems(response?.data?.data)
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

                    <h1 className='text-sm text-[#556fa8] font-medium'>{rowData?.exam_title} Result ({userExamItems?.total_percentatge?.toFixed(1)}%)</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon />
                        </span>

                    </div>

                </div>

                <div className='max-h-[550px] h-full w-full bg-white rounded-lg flex flex-col gap-2 overscroll-y-auto overflow-y-auto'>

                    {userExamItems?.responses?.map((row, index) => (
                        <div className='flex flex-col gap-2' key={index}>
                            <h1 className='text-sm text-black font-medium'>{index + 1}. {row?.question?.question_name}</h1>

                            <div className='flex flex-row gap-4'>
                                {/* <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-xs text-black font-light'>Response Selected:</h1>
                                    <h1 className='text-sm text-[#556fa8] font-bold'>{row?.user_response_answer}</h1>
                                </div> */}

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-xs text-black font-light'>Score Awarded:</h1>
                                    {/* <h1 className='text-sm text-[#556fa8] font-bold'>{row?.user_score_awarded} {handleScoringType(row)}</h1> */}
                                    {handleScoringType(row)}
                                </div>
                            </div>

                            <div className='flex flex-row gap-4'>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-xs text-black font-light'>Score Type:</h1>
                                    <h1 className='text-sm text-[#556fa8] font-bold'>{parseInt(row?.question?.scoring_type) === 1 ? "Direct" : "Reverse"}</h1>
                                </div>
                            </div>


                        </div>

                    ))}

                </div>
            </div>
        </Backdrop>
    )
}

export default PersonalityExamItems