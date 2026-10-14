import React, { lazy, Suspense, useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { APIServices } from '../../../../../contants/apiConfig';

const ExamItemAnswer = ({ title, level, letter, userSelect }) => {

    return (
        <h1 className={`text-sm ${userSelect ? 'text-[#556fa8] font-extrabold' : 'text-black font-normal'} flex flex-row items-center gap-2`}>
            {letter}) {title} ({level})
        </h1>
    )
}

const MCQsUserExamItems = ({ openModal, handleClose, rowData }) => {

    const [userExamItems, setUserExamItems] = useState([]);

    useEffect(() => {
        handleExamType();
    }, []);

    const handleExamType = async () => {

        const response = await APIServices.get({
            url: `mcq-admin/user-answers/${rowData?.userInfo?.id}/${rowData?.exam_type_id}`
        });

        if (response.status === 200) {
            setUserExamItems(response?.data?.data?.[0])
        }
    }
    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >
            <div className='max-w-[600px] w-full p-4 bg-white rounded-lg flex flex-col gap-2 overscroll-y-auto overflow-y-auto'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2 sticky top-0 bg-white'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>{userExamItems?.exam_type_name} Result</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon />
                        </span>

                    </div>

                </div>

                <div className='max-h-[550px] h-full w-full bg-white rounded-lg flex flex-col gap-2 overscroll-y-auto overflow-y-auto'>

                    <div className='w-full flex flex-row gap-2 items-center justify-center'>

                        <span className='text-red-500 font-medium text-sm'>Guide Label and Icon : </span>

                        <div className='flex flex-row gap-2'>
                            <span className='text-black text-sm'>User Answer Background Color :</span>
                            <div className='p-3 bg-[#556fa8] rounded-full'></div>
                        </div>

                    </div>

                    {userExamItems?.questions?.map((row, index) => (
                        <div className='flex flex-col gap-2' key={index}>
                            <h1 className='text-sm text-black font-medium'>{index + 1}. {row?.question_text}</h1>

                            <div className='flex flex-col gap-2'>
                                <h1 className='text-xs text-[#839f55] font-light'>Items:</h1>

                                {row?.choices?.map((row, index) => (

                                    <ExamItemAnswer key={index} userSelect={row?.is_answered} title={row?.choice_text} level={row?.quality_level_name} letter={String.fromCharCode(65 + index)} />
                                ))}

                            </div>
                        </div>

                    ))}

                </div>
            </div>
        </Backdrop>
    )
}

export default MCQsUserExamItems