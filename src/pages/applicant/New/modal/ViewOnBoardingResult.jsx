import React, { lazy, Suspense, useState, useEffect } from 'react';

import { format } from 'date-fns';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Chip from '@mui/material/Chip';

import Tooltip from '@mui/material/Tooltip';

import { APIServices } from '../../../../contants/apiConfig';

import { handleTimeFormat } from '../../../../contants/contans';
import SaveButton from '../../../../component/Buttons/SaveButton';

import { FaFileCsv } from "react-icons/fa";


const OnBoardingResultUser = lazy(() => import('./OnBoardingResultUser'));

const ExamContent = ({ title, examData, number, openContent, isClickable }) => (
    <div className='flex flex-row items-center justify-between'>

        <h1 onClick={isClickable ? openContent : null} className={`text-[#556fa8] text-xs font-semibold ${isClickable ? 'cursor-pointer underline' : ''} underline-offset-4`}>
            {parseInt(number + 1)}.) {title}
        </h1>

        <div className='flex flex-row items-center gap-2'>

            <div className='flex flex-row items-center gap-2'>
                <h1 className='text-[#556fa8] text-xs font-semibold'>Total Score | Max Score</h1>
            </div>

            <div className='flex flex-row items-center gap-2'>

                <Chip color={examData?.completed ? "success" : "primary"} variant='outlined' label={`${examData?.score} | ${examData?.total_score}`} />
            </div>

        </div>

    </div>
)

const ViewOnBoardingResult = ({ openModal, handleClose, userData, isClickable = true }) => {

    const [openView, setOpenView] = useState(false);

    const [userScore, setUserScore] = useState([]);

    const [selectedData, setSelectedData] = useState([]);

    const handleCloseModal = () => {
        setOpenView(false);
    };

    const handleOpenModal = (row) => {

        setOpenView(true);
        let rowData = row;
        rowData['userInfo'] = userData
        setSelectedData(rowData)

    };

    useEffect(() => {
        handleExamType();
    }, []);

    const handleExamType = async () => {

        const response = await APIServices.get({
            url: `onboarding/current-module/${userData?.id}`
        });

        if (response.status === 200) {
            setUserScore(response?.data)
        }
    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <Suspense>
                {openView && <OnBoardingResultUser rowData={selectedData} openModal={openView} handleClose={handleCloseModal} />}
            </Suspense>

            <div className='max-w-[650px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>View OnBoarding Exam Result</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="small" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2'>


                    <div className='w-full flex flex-row items-center justify-between gap-3'>

                        <div className='flex flex-row items-center gap-3'>
                            <span className='text-[#839f55]'><AccountCircleOutlinedIcon /></span>
                            <h1 className='text-[#556fa8] font-semibold'>{userData?.name}</h1>
                        </div>

                    </div>

                    <div className='w-full flex flex-row items-center justify-between gap-3'>

                        <div className='w-full flex flex-row items-center gap-3'>

                            <span className='text-[#839f55]'><AccessTimeOutlinedIcon /></span>
                            <h1 className='text-[#556fa8] font-semibold'>Started: {handleTimeFormat(userData?.created_at)}</h1>

                        </div>

                    </div>

                    <div className='w-full flex flex-col gap-2 border-2 border-dashed p-2'>

                        {userScore?.modules?.map((row, index) => (

                            <React.Fragment key={index}>

                                <ExamContent
                                    title={`${row?.title}`}
                                    examData={row}
                                    number={index}
                                    isClickable={isClickable}
                                    openContent={() => handleOpenModal(row)}
                                />

                            </React.Fragment>

                        ))}

                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default ViewOnBoardingResult;