import React, { lazy, Suspense, useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Chip from '@mui/material/Chip';

import { APIServices } from '../../../../contants/apiConfig';

import { handleTimeFormat } from '../../../../contants/contans';

const ViewQualificationLog = ({ selectedData, openAppInfo, handleCloseForgot }) => {

    const [openQualification, setOpenQualification] = useState(false);

    useEffect(() => {
        handleQualificationlogs();
    }, []);
    
    const handleQualificationlogs = async () => {
    
        const response = await APIServices.get({
            url: `get-qualification-status` , payload: {
                "user_id" : selectedData?.id
            }
        });
    
        if (response.status === 200) {
            setOpenQualification(response?.data)
        }
    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openAppInfo}
        >

            <div className='max-w-[550px] w-full p-4 bg-white rounded-lg flex flex-col gap-3'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Qualification Logs</h1>

                    <div onClick={handleCloseForgot} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="small" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-3 p-2 max-h-[500px] overscroll-y-auto overflow-y-auto'>

                    {openQualification?.data?.map((row, index) => (
                        index == 0 ?
                            <div className='flex flex-col gap-2 border-2 border-black border-dashed p-2 rounded' key={index}>

                                <div className='flex flex-row items-center gap-2'>
                                    <h1 className='text-sm text-[#556fa8] font-bold'>{row?.qualification?.description} - </h1>
                                    <Chip label={`Current Active Status`} color={"success"} variant="outlined" />
                                </div>
                                <div className='flex flex-col gap-2 w-full'>
                                    <h1 className='text-xs text-[#839f55] font-light'>Remarks : </h1>
                                    <h1 className='text-sm text-[#556fa8] font-bold w-full'>- {row?.remarks}</h1>
                                </div>
                                <div className='flex flex-row items-center gap-2'>
                                    <h1 className='text-xs text-[#839f55] font-light'>- Date : </h1>
                                    <h1 className='text-xs text-[#556fa8] font-bold'>{handleTimeFormat(row?.qualification?.created_at)}</h1>
                                </div>
                                <div className='flex flex-row items-center gap-2'>
                                    <h1 className='text-xs text-[#839f55] font-light'>- Remarks by : </h1>
                                    <h1 className='text-xs text-[#556fa8] font-bold'>{row?.creator?.first_name} {row?.creator?.last_name}</h1>
                                </div>
                            </div> :

                            <div className='flex flex-col gap-2' key={index}>
                                <div className='flex flex-row items-center gap-2'>
                                    <h1 className='text-sm text-[#556fa8] font-bold'>{row?.qualification?.description}</h1>
                                </div>
                                <div className='flex flex-col gap-2 w-full'>
                                    <h1 className='text-xs text-[#839f55] font-light'>Remarks : </h1>
                                    <h1 className='text-sm text-[#556fa8] font-bold w-full'>- {row?.remarks}</h1>
                                </div>
                                <div className='flex flex-row items-center gap-2'>
                                    <h1 className='text-xs text-[#839f55] font-light'>- Date : </h1>
                                    <h1 className='text-xs text-[#556fa8] font-bold'>{handleTimeFormat(row?.qualification?.created_at)}</h1>
                                </div>
                                <div className='flex flex-row items-center gap-2'>
                                    <h1 className='text-xs text-[#839f55] font-light'>- Remarks by : </h1>
                                    <h1 className='text-xs text-[#556fa8] font-bold'>{row?.creator?.first_name} {row?.creator?.last_name}</h1>
                                </div>
                            </div>

                    ))}


                </div>

            </div>

        </Backdrop>
    )
}

export default ViewQualificationLog;