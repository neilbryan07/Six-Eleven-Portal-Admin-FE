import React, { lazy, Suspense, useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { handleTimeFormat } from '../../../../contants/contans';

import { APIServices } from '../../../../contants/apiConfig';

const ViewApplicantActivity = ({ selectedData, openAppInfo, handleCloseForgot }) => {

    const [switchData, setSwitchData] = useState(false);

    useEffect(() => {
        handleApplicant();
    }, []);


    const handleApplicant = async (isTrue = true) => {

        let apiURL = `switch-tabs/${selectedData?.id}`

        const response = await APIServices.get({ url: apiURL });

        if (response.status === 200) {
            setSwitchData(response?.data)
        }
    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openAppInfo}
        >

            <div className='max-w-[550px] w-full p-4 bg-white rounded-lg flex flex-col gap-3 '>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Applicant Activity List</h1>

                    <div onClick={handleCloseForgot} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="small" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-3 p-2 border-2  border-gray-200 border-dashed rounded-lg'>

                    <h1 className='text-xs text-[#839f55] font-medium'>Summary Report</h1>

                    <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>

                        <div className='w-full flex flex-row gap-2'>
                            <h1 className='text-sm text-gray-400 font-medium'>Total Tabs / ALT Tabs Switches : </h1>
                            <h1 className='text-sm text-[#556fa8] font-medium'>{switchData?.summary?.total_switches}</h1>
                        </div>

                    </div>

                </div>

                <div className="max-h-[500px] overscroll-y-auto overflow-y-auto">
                    {switchData?.sections
                        ?.map((row, index) => (
                            <div className='w-full flex flex-col gap-3 p-2 border-2  border-gray-200 border-dashed rounded-lg mt-2'>

                                <h1 className='text-xs text-[#839f55] font-medium'>{row?.section} Report</h1>

                                <div className='w-full flex flex-col gap-2 items-center justify-between py-[2px]'>

                                    <div className='w-full flex flex-row gap-2'>
                                        <h1 className='text-sm text-gray-400 font-medium'>Total Tabs / ALT Tabs Switches : </h1>
                                        <h1 className='text-sm text-[#556fa8] font-medium'>{row?.switch_count}</h1>
                                    </div>

                                    <div className='w-full flex flex-col gap-2'>
                                        <h1 className='text-sm text-gray-400 font-medium'>List of timestamp switches activity: </h1>
                                        {row?.entries
                                            ?.map((rowData, index) => (
                                                <h1 key={index} className='ml-3 text-sm text-[#556fa8] font-medium'> - {handleTimeFormat(rowData?.created_at)}</h1>
                                            ))
                                        }

                                    </div>

                                </div>

                            </div>
                        ))
                    }
                </div>


            </div>

        </Backdrop>
    )
}

export default ViewApplicantActivity;