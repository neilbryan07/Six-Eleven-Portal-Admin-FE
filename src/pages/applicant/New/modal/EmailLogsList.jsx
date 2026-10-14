import React, { lazy, Suspense, useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { APIServices } from '../../../../contants/apiConfig';
import { handleTimeFormat } from '../../../../contants/contans';

const EmailLogsList = ({ selectedData, openEmailList, HandleClosedEmailList }) => {

    const [emailLogs, setEmailLogs] = useState([]);

    useEffect(() => {
        handleEmailLogs();
    }, []);

    const handleEmailLogs = async () => {

        const response = await APIServices.get({
            url: `fetch-email-logs?to_email=${selectedData?.email}`
        });

        if (response.status === 200) {
            setEmailLogs(response?.data?.data)
        }
    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openEmailList}
        >
            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-3'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>List of Email Sent Logs</h1>

                    <div onClick={HandleClosedEmailList} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="small" />
                        </span>

                    </div>

                </div>


                <div className='w-full flex flex-col gap-3 p-2 max-h-[500px] overscroll-y-auto overflow-y-auto'>

                    {emailLogs?.map((row, index) => (
                        <div className='flex flex-col gap-2' key={index}>

                            <div className='flex flex-row items-center gap-2'>
                                <h1 className='text-sm text-[#556fa8] font-bold'>{index + 1}. {row?.category?.name}</h1>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <h1 className='text-xs text-[#839f55] font-light'>Email Created:</h1>
                                <h1 className='text-sm text-[#556fa8] font-bold'>{handleTimeFormat(row?.created_at)}</h1>
                            </div>                            <div className='flex flex-row items-center gap-2'>
                                <h1 className='text-xs text-[#839f55] font-light'>Email From:</h1>
                                <h1 className='text-sm text-[#556fa8] font-bold'>{row?.replyto_email}</h1>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <h1 className='text-xs text-[#839f55] font-light'>Email From Name:</h1>
                                <h1 className='text-sm text-[#556fa8] font-bold'>{row?.replyto_name}</h1>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <h1 className='text-xs text-[#839f55] font-light'>Email To:</h1>
                                <h1 className='text-sm text-[#556fa8] font-bold'>{row?.to_email}</h1>
                            </div>

                            {Object.entries(row?.payload).map(([key, value]) => (
                                <div className='flex flex-row items-center gap-2' key={key}>
                                    <h1 className='text-xs text-[#839f55] font-light'>{key.replace(/_/g, " ").toUpperCase()}:</h1>
                                    <h1 className='text-sm text-[#556fa8] font-bold'>{value}</h1>
                                </div>
                            ))}

                        </div>
                    ))}

                </div>

            </div>

        </Backdrop>
    )
}

export default EmailLogsList;