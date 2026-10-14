import React, { lazy, Suspense, useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { useLocation } from "react-router-dom";

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import SaveButton from '../../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../../component/Buttons/CloseButton';

import { APIServices } from '../../../../../contants/apiConfig';

const ExamItemAnswer = ({ title, level, letter, userSelect }) => {

    return (
        <h1 className={`text-sm ${userSelect ? 'text-[#556fa8] font-extrabold' : 'text-black font-normal'} flex flex-row items-center gap-2`}>
            {letter}) {title} ({level}) {level === 'Ideal' ? <CheckCircleIcon color='success' fontSize="small" /> : null}
        </h1>
    )
}

const MockRecord = ({ openModal, handleClose, rowData, reFreshData }) => {

    const location = useLocation();
    const lastSegment = location.pathname.split("/").pop();
    const isListApplicantPage = lastSegment === "list-applicant";

    const [userExamItems, setUserExamItems] = useState([]);
    const [userResult, setUserResult] = useState(null);
    const [fetchResult, setFetchResult] = useState([]);

    useEffect(() => {
        handleExamType();
    }, []);

    const handleExamType = async () => {

        const response = await APIServices.get({
            url: `mock/fetch-mock-user-result`, payload: {
                "user_id": rowData?.userInfo?.id
            }
        });

        if (response.status === 200) {

            const uniqueData = response?.data?.userLogs?.filter(
                (item, index, self) =>
                    index === self.findLastIndex(
                        (t) => t.mock_content_id === item.mock_content_id
                    )
            );

            // setUserExamItems(response?.data?.userLogs)
            setUserExamItems(uniqueData)
            setFetchResult(response?.data?.userResult)
        }
    }

    const handleCreateResult = async () => {
        const response = await APIServices.post({
            url: `mock/create-mock-user-result`, payload: {
                "user_id": rowData?.userInfo?.id,
                "mock_simulation_type": 5,
                "mock_simulation_result": userResult
            }
        });


        if (response.status === 201) {
            reFreshData();
            handleClose();
        }
    }

    const handleResetVerbal = async () => {

        const response = await APIServices.post({
            url: `mcq-admin/reset-mock-verbal`, payload: {
                "user_id": rowData?.userInfo?.id,
                "exam_id": 7
            }
        });

        if (response.status === 200) {
            handleExamType()
            reFreshData()
        }

    }

    // const getUserFolderPath = (userId, filePath) => {

    //     // only use new folder structure for IDs <= 2000
    //     if (userId <= 9000) {

    //         const groupStart =
    //             Math.floor((userId - 1) / 1000) * 1000 + 1;

    //         const groupEnd = groupStart + 999;

    //         return `mockcall/${groupStart}-${groupEnd}/${filePath}`;
    //     }

    //     // fallback to old structure
    //     return filePath;
    // };

    const getUserFolderPath = (userId, filePath) => {

        const groupStart =
            Math.floor((userId - 1) / 1000) * 1000 + 1;

        const groupEnd = groupStart + 999;

        return `mockcall/${groupStart}-${groupEnd}/${filePath}`;
    };

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >
            <div className='max-w-[600px] w-full p-4 bg-white rounded-lg flex flex-col gap-2 overscroll-y-auto overflow-y-auto'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2 sticky top-0 bg-white'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>{rowData?.exam_name} Result</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon />
                        </span>

                    </div>

                </div>

                <div className='max-h-[550px] h-full w-full bg-white rounded-lg flex flex-col gap-2 overscroll-y-auto overflow-y-auto gap-4'>


                    {userExamItems?.length > 0 && fetchResult?.length <= 0 ?
                        <div className='w-full flex flex-row justify-end p-4'>
                            <SaveButton handleClick={handleResetVerbal} title={"Delete Mock Result"} />
                        </div>
                        : null}

                    {userExamItems?.map((row, index) => (
                        <div className='flex flex-col gap-2' key={index}>

                            <h1 className='text-sm text-black font-medium'>{index + 1}. Customer:</h1>
                            <h1 className='text-sm text-black font-normal'>{row?.mock_simulation_contents?.customer_response_txt}</h1>

                            <div className='flex flex-col gap-2'>
                                <h1 className='text-xs text-[#839f55] font-light'>Applicant Response:</h1>
                                {/* <audio
                                    controls
                                    controlsList="nodownload"
                                    src={`${process.env.REACT_APP_API_STORAGE}${getUserFolderPath(
                                        row?.user_id,
                                        row?.user_response_audio
                                    )}`}
                                /> */}

                                <audio
                                    controls
                                    controlsList="nodownload"
                                    src={`${process.env.REACT_APP_API_STORAGE}${getUserFolderPath(
                                        row?.user_id,
                                        row?.user_response_audio
                                    )}`}
                                    onError={(e) => {

                                        // fallback to old/custom structure
                                        e.target.src =
                                            `${process.env.REACT_APP_API_STORAGE}${row?.user_response_audio}`;
                                    }}
                                />
                            </div>

                        </div>
                    ))}

                    {/* {userExamItems?.length > 0 && fetchResult?.length <= 0 && !isListApplicantPage ? */}
                    <div className='flex flex-col w-full gap-2'>

                        <h1 className='text-sm text-black font-medium'>Rate User Audio Clip</h1>

                        <FormControl fullWidth>
                            <h1 className="text-xs text-[#839f55] font-bold mb-2">•	Low: 1-2 (Hard to understand, monotone, frequent mispronunciations)</h1>
                            <h1 className="text-xs text-[#839f55] font-bold mb-2">•	Neutral: 3 (Some errors, but mostly understandable)</h1>
                            <h1 className="text-xs text-[#839f55] font-bold mb-2">•	Ideal: 4-5 (Clear, professional tone, natural delivery)</h1>
                            <Select size="small" labelId="demo-simple-select-label" id="demo-simple-select"
                                value={userResult}
                                onChange={(e) => [setUserResult(e.target.value)]}
                            >
                                <MenuItem value={1}>Very Low ( 1 )</MenuItem>
                                <MenuItem value={2}>Low ( 2 )</MenuItem>
                                <MenuItem value={3}>Neutral ( 3 )</MenuItem>
                                <MenuItem value={4}>Ideal ( 4 )</MenuItem>
                                <MenuItem value={5}>Excellent ( 5 )</MenuItem>
                            </Select>
                        </FormControl>

                    </div>
                    {/* : null} */}
                    <div className="w-full flex flex-row justify-end gap-3 my-2">
                        {userResult &&
                            <SaveButton handleClick={handleCreateResult} title={"Save User Score"} />
                        }
                        <CloseButton title={"Cancel"} />
                    </div>



                </div>
            </div>
        </Backdrop>
    )
}

export default MockRecord
