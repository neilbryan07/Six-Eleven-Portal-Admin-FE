import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { format } from 'date-fns';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import VideoCallIcon from '@mui/icons-material/VideoCall';

import { APIServices } from '../../../../contants/apiConfig';

import { handleTimeFormat } from '../../../../contants/contans';

import SaveButton from '../../../../component/Buttons/SaveButton';


import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';

const AddVideoRating = lazy(() => import('./AddVideoRating'));
const ViewSelectedVideoResult = lazy(() => import('./ViewSelectedVideoResult'));


const labels = {
    1: 'Very Poor',
    2: 'Poor',
    3: 'Average',
    4: 'Good',
    5: 'Excellent',
};

const RemarkSection = ({ remarks, setRemarks, hidden }) => {

    if (hidden) return null;

    return (
        <React.Fragment>
            <h1 className="text-[#556fa8] text-sm font-semibold">
                Add Overall One Way Interview Remarks
            </h1>

            <TextField
                label="Remarks"
                multiline
                rows={4}
                ariant="outlined"
                fullWidth
                value={remarks ? remarks : ''}
                onChange={(e) => setRemarks(e.target.value)}
            />
        </React.Fragment>

    )
}

const ExamContent = ({ title, examData, number, openContent, isClickable, handleExamType, hidden, user_id }) => {

    const [openFeedback, setOpenFeedback] = useState(false);

    const handleCloseFeedback = () => {
        setOpenFeedback(false);
    };

    return (
        <div className="w-full flex flex-col gap-3 mb-2">


            <Suspense>
                {openFeedback && <AddVideoRating selectedData={examData} user_id={user_id} openModal={openFeedback} handleClose={handleCloseFeedback} handleExamType={handleExamType} />}
            </Suspense>

            {/* Row 1 */}
            <h1 className="text-[#556fa8] text-xs font-semibold">
                {parseInt(number + 1)}.) {title}
            </h1>

            {/* Row 2 */}
            <div className="w-full flex flex-row gap-2 items-center">

                <div onClick={openContent} className='px-2 py-[4px] flex flex-row gap-2 items-center justify-center border-[1px] border-[#839f55] rounded cursor-pointer'>
                    <PlayCircleFilledWhiteOutlinedIcon sx={{ color: '#839f55' }} />
                    <h1 className='text-[#839f55] text-sm font-semibold'>View Video Result</h1>
                </div>

                {examData?.answer?.score ?

                    <div className='flex flex-row gap-2 items-center'>
                        <Rating
                            name="simple-controlled"
                            value={parseInt(examData?.answer?.score?.rating)}
                            readOnly
                        />

                        <h1 className="text-[#839f55] text-sm font-semibold mt-1">{labels[examData?.answer?.score?.rating]}</h1>

                    </div>
                    :

                    <React.Fragment>
                        {!hidden &&
                            <div onClick={() => setOpenFeedback(true)} className='px-2 py-[4px] flex flex-row gap-2 items-center justify-center bg-[#839f55] rounded cursor-pointer'>
                                <StarIcon />
                                <h1 className='text-white text-sm font-semibold'>Add Feedback</h1>
                            </div>
                        }
                    </React.Fragment>
                }
            </div>

            {examData?.answer?.score &&
                <div className='w-full felx flex-col gap-2'>
                    <h1 className="text-[#839f55] text-xs font-semibold">Remarks : ( {examData?.answer?.score?.scored_by?.name} ) </h1>
                    <h1 className='text-[#556fa8] text-sm font-semibold'>{examData?.answer?.score?.feedback}</h1>
                </div>
            }

        </div>
    )
}

const ViewVideoResult = ({ openModal, handleClose, userData, isClickable = true }) => {
    const [openSelected, setOpenSelected] = useState(false);

    const [videoContent, setvideoContent] = useState([]);

    const [selectedData, setSelectedData] = useState([]);

    const [remarks, setRemarks] = useState("");

    const location = useLocation();
    const lastSegment = location.pathname.split("/").pop();
    const isListApplicantPage = lastSegment === "list-applicant";

    const handleCloseModal = () => {
        setOpenSelected(false);
    };

    const handleOpenModal = (row) => {

        setOpenSelected(true);
        let rowData = row;
        rowData['userInfo'] = userData
        setSelectedData(rowData)

    };

    useEffect(() => {
        handleExamType();
    }, []);

    const handleExamType = async () => {

        const response = await APIServices.get({
            url: `video-assessment/user-answers?user_id=${userData?.id}`
        });

        if (response.status === 200) {
            setvideoContent(response?.data)
            setRemarks(null)
        }
    }

    const handleStatusChecker = (data) => {

        if (data == 0) return <h1 className='text-[#556fa8] font-semibold'>Not yet started</h1>;

        if (data >= 10) return <h1 className='text-[#556fa8] font-semibold'>Applicant Completed the One Way Interview</h1>;

        if (data <= 9 && data >= 1) return <h1 className='text-[#556fa8] font-semibold'>Ongoing One Way Interview</h1>;

    }

    const handleOverAllRemarks = async () => {

        const response = await APIServices.post({
            url: '/video-assessment/submit-remarks',
            payload: {
                "user_id": userData?.id,
                "remarks": remarks,
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
                {openSelected && <ViewSelectedVideoResult questionData={selectedData} openModal={openSelected} handleClose={handleCloseModal} />}
            </Suspense>


            <div className='max-w-[650px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>View One Way Interview Result</h1>

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


                    <div className='w-full flex flex-row items-center justify-between gap-3'>

                        <div className='flex flex-row items-center gap-3'>
                            <span className='text-[#839f55]'><VideoCallIcon /></span>
                            <h1 className='text-[#556fa8] font-semibold'>Set type : {videoContent?.set_name}</h1>
                        </div>

                    </div>

                    <div className='w-full flex flex-row items-center justify-between gap-3'>

                        <div className='w-full flex flex-row items-center gap-3'>

                            <span className='text-[#839f55]'><AccessTimeOutlinedIcon /></span>
                            <h1 className='text-[#556fa8] font-semibold'>Started: {handleTimeFormat(userData?.created_at)}</h1>

                        </div>

                    </div>

                    <div className='w-full flex flex-row items-center justify-between gap-3'>

                        <div className='flex flex-row items-center gap-3'>
                            <span className='text-[#839f55]'><StarBorderOutlinedIcon /></span>
                            <span className='text-[#556fa8]'>General Feedback Rating : </span>
                            <h1 className='text-[#556fa8] font-semibold'>{videoContent?.general_rating}</h1>
                        </div>

                    </div>

                    <div className='w-full flex flex-row items-center justify-between gap-3'>

                        <div className='flex flex-row items-center gap-3'>
                            <span className='text-[#839f55]'>One Way Interview Status: </span>
                            {handleStatusChecker(parseInt(videoContent?.answered_count))}
                        </div>

                    </div>

                    {parseInt(videoContent?.answered_count) > 0 &&

                        <div className='w-full flex flex-col gap-2 border-2 border-dashed p-2 max-h-[550px] h-full overscroll-y-auto overflow-y-auto'>



                            {videoContent?.questions?.map((row, index) => (

                                <React.Fragment key={index}>

                                    {row?.answer !== null ?

                                        <ExamContent

                                            title={`${row?.question_text}`}
                                            examData={row}
                                            number={index}
                                            isClickable={null}
                                            openContent={() => handleOpenModal(row)}
                                            handleExamType={handleExamType}
                                            hidden={isListApplicantPage}
                                            user_id={userData?.id}
                                        /> :
                                        <div className='flex flex-col gap-2'>
                                            <h1 className="text-[#556fa8] text-xs font-semibold">
                                                {parseInt(index + 1)}.) {row?.question_text}
                                            </h1>

                                            <h1 className="text-red-500 text-xs font-bold">
                                                No video file available.
                                            </h1>
                                        </div>

                                    }

                                </React.Fragment>

                            ))}

                            <div className='w-full flex flex-col gap-2 my-2'>

                                {parseInt(videoContent?.overall_remarks.length) > 0 &&
                                    <div className='w-full flex flex-col gap-2 py-2 border-y-2 border-gray-200 border-dashed'>

                                        <h1 className="text-[#556fa8] text-sm font-semibold">
                                            List of One Way Interview Remarks
                                        </h1>

                                        {videoContent?.overall_remarks?.map((row, index) => (

                                            <div className='flex flex-col gap-2'>
                                                <h1 className="text-[#839f55] text-xs font-semibold">{index + 1}) Remarks : ( {row?.created_by_name} ) </h1>
                                                <h1 className='text-[#556fa8] font-semibold'>- {row?.remarks}</h1>
                                            </div>

                                        ))}
                                    </div>
                                }

                                <RemarkSection remarks={remarks} setRemarks={setRemarks} hidden={isListApplicantPage} />

                                {remarks &&
                                    <SaveButton title={"Add Feedback"} handleClick={handleOverAllRemarks} />
                                }

                            </div>

                        </div>
                    }

                </div>

            </div>

        </Backdrop>
    )
}

export default ViewVideoResult;