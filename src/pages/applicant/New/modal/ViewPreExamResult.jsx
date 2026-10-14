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

const PersonalityExamItems = lazy(() => import('./contents/PersonalityExamItems'));


const ExamContent = ({ title, examData, number, openContent, isClickable }) => (
    <div className='flex flex-row items-center justify-between'>

        <h1 onClick={isClickable ? openContent : null} className={`text-[#556fa8] text-xs font-semibold ${isClickable ? 'cursor-pointer underline' : ''} underline-offset-4`}>
            {parseInt(number + 1)}.) {title}
        </h1>

        <div className='flex flex-row items-center gap-2'>

            <div className='flex flex-row items-center gap-2'>
                <h1 className='text-[#556fa8] text-xs font-semibold'>Total Items | Status </h1>
            </div>

            <div className='flex flex-row items-center gap-2'>

                <Chip color={examData?.completed ? "success" : "primary"} variant='outlined' label={`${examData?.answered_count} | ${examData?.completed ? "Completed" : "Pending"}`} />
            </div>

        </div>

    </div>
)

const ViewPreExamResult = ({ openModal, handleClose, userData, isClickable = true }) => {

    const [openView, setOpenView] = useState(false);
    const [openAudio, setOpenAudio] = useState(false);
    const [openMock, setOpenMock] = useState(false);
    const [openType, setOpenType] = useState(false);

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
            url: `informal/user-answers/${userData?.id}`
        });

        if (response.status === 200) {
            setUserScore(response?.data)
        }
    }

    const handleResetAttempt = async () => {

        const response = await APIServices.post({
            url: `mcq-admin/reset-attempts`, payload: {
                "user_id": userData?.id
            }
        });

        if (response.status === 200) {
            handleExamType();
        }

    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <Suspense>
                {openView && <PersonalityExamItems rowData={selectedData} openModal={openView} handleClose={handleCloseModal} />}
            </Suspense>

            <div className='max-w-[650px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>View Pre Exam Result</h1>

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
                            <h1 className='text-[#556fa8] font-semibold'>{userData?.last_name} , {userData?.first_name} {userData?.middle_name} </h1>
                        </div>

                    </div>

                    <div className='w-full flex flex-row items-center justify-between gap-3 mb-2'>

                        <div className='w-full flex flex-row items-center gap-3'>

                            <span className='text-[#839f55]'><AccessTimeOutlinedIcon /></span>
                            <h1 className='text-[#556fa8] font-semibold'>Started: {handleTimeFormat(userData?.created_at)}</h1>

                        </div>

                        {/* <Tooltip title="Export Applicant CSV">
                            <div onClick={exportToCSV} className='p-[6px] rounded-lg border border-blue-500 cursor-pointer hover:bg-gray-200'>
                                <span className='text-blue-500 text-2xl'><FaFileCsv /></span>
                            </div>
                        </Tooltip> */}

                    </div>

                    <div className='max-h-[550px] h-full w-full bg-white rounded-lg flex flex-col gap-2 overscroll-y-auto overflow-y-auto'>

                        <div className='flex flex-col gap-2 my-2'>
                            <h1 className='text-md text-black font-light'>Multiple Choices Exam</h1>
                            {userScore?.choice_answers?.map((row, index) => (
                                <div className='flex flex-col gap-2' key={index}>
                                    <h1 className='text-sm text-black font-medium'>{index + 1}. {row?.question?.question}</h1>

                                    <div className='flex flex-row items-center gap-2'>
                                        <h1 className='text-xs text-[#839f55] font-light'>User Answered:</h1>
                                        {row?.choice?.choice?.toLowerCase() === "no" ? (
                                            <h1 className={`text-black text-sm font-semibold border border-red-500 p-[3px] text-center border-dashed rounded bg-red-200`}>{row?.choice?.choice}</h1>
                                        ) : (
                                            <h1 className="text-sm text-[#556fa8] font-bold">
                                                {row?.choice?.choice}
                                            </h1>
                                        )}
                                    </div>

                                    <div className='flex flex-row items-center gap-2'>
                                        <h1 className='text-xs text-[#839f55] font-light'>User Additional Answer:</h1>
                                        <h1 className='text-sm text-[#556fa8] font-bold'>{row?.specify_answer}</h1>
                                    </div>
                                </div>

                            ))}
                        </div>

                        <div className='w-full p-[1px] bg-gray-200' />

                        <div className='flex flex-col gap-2 my-2'>
                            <h1 className='text-md text-black font-light'>Provided Answer Exam</h1>
                            {userScore?.fill_answers?.map((row, index) => (
                                <div className='flex flex-col gap-2' key={index}>
                                    <h1 className='text-sm text-black font-medium'>{index + 1}. {row?.question?.question}</h1>

                                    <div className='flex flex-row items-center gap-2'>
                                        <h1 className='text-xs text-[#839f55] font-light'>User Answered:</h1>
                                        <h1 className='text-sm text-[#556fa8] font-bold'>{row?.fill_answer}</h1>
                                    </div>
                                </div>

                            ))}
                        </div>

                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default ViewPreExamResult;