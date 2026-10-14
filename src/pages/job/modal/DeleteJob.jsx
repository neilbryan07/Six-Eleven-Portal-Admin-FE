import React, { useState } from 'react'

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import CloseButton from '../../../component/Buttons/CloseButton';
import ErrorButton from '../../../component/Buttons/ErrorButton';
import SaveButton from '../../../component/Buttons/SaveButton';

import { APIServices } from '../../../contants/apiConfig';

import { handleTimeFormat } from '../../../contants/contans';

const DeleteJob = ({ openModal, handleClose, refreshData, rowData }) => {

    const handleDeleteJob = async () => {

        const response = await APIServices.deletes({
            url: `/job-preferences/delete/${rowData?.id}`
        });

        if (response.status === 200) {
            refreshData();
            handleClose();
        }

    }


    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Delete Job Preference Content</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2'>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Job name:</h1>
                        <h1 className='text-sm text-[#556fa8] font-bold'>{rowData?.job_position}</h1>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Job Compensation Plan:</h1>
                        <h1 className='text-sm text-[#556fa8] font-bold'>{rowData?.compensation?.compensation_plan}</h1>


                        <div className='w-full flex flex-col gap-2 border border-gray-500 p-2 rounded-lg '>

                            <div className='w-full flex flex-row gap-2 items-center justify-start'>

                                <div className='w-full flex flex-col gap-2'>
                                    <h1 className='text-xs text-[#839f55]'>Basic Pay:</h1>
                                    <h1 className='text-xs text-[#556fa8]'>{rowData?.compensation?.basic_rate}</h1>
                                </div>

                                <div className='w-full flex flex-col gap-2'>
                                    <h1 className='text-xs text-[#839f55]'>Attendance Bonus:</h1>
                                    <h1 className='text-xs text-[#556fa8]'>{rowData?.compensation?.attendance_bonus}</h1>
                                </div>

                                <div className='w-full flex flex-col gap-2'>
                                    <h1 className='text-xs text-[#839f55]'>Night Differential:</h1>
                                    <h1 className='text-xs text-[#556fa8]'>{rowData?.compensation?.night_diff}</h1>
                                </div>

                            </div>

                            <div className='w-full flex flex-row gap-2 items-center justify-start'>
                                <div className='w-full flex flex-col gap-2'>
                                    <h1 className='text-xs text-[#839f55]'>Rice Allowance:</h1>
                                    <h1 className='text-xs text-[#556fa8]'>{rowData?.compensation?.rice_allowance}</h1>
                                </div>

                                <div className='w-full flex flex-col gap-2'>
                                    <h1 className='text-xs text-[#839f55]'>Meal Allowance:</h1>
                                    <h1 className='text-xs text-[#556fa8]'>{rowData?.compensation?.meal_allowance}</h1>
                                </div>

                                <div className='w-full flex flex-col gap-2'>
                                    <h1 className='text-xs text-[#839f55]'>Uniform Allowance:</h1>
                                    <h1 className='text-xs text-[#556fa8]'>{rowData?.compensation?.uniform_allowance}</h1>
                                </div>

                            </div>

                            <div className='w-full flex flex-row gap-2 items-center justify-start'>

                                <div className='w-full flex flex-col gap-2'>
                                    <h1 className='text-xs text-[#839f55]'>Working Days:</h1>
                                    <h1 className='text-xs text-[#556fa8]'>{rowData?.compensation?.working_days}</h1>
                                </div>

                                <div className='w-full flex flex-col gap-2'>
                                    <h1 className='text-xs text-[#839f55]'>Gross:</h1>
                                    <h1 className='text-xs text-[#556fa8]'>{rowData?.compensation?.gross_salary}</h1>
                                </div>

                                <div className='w-full flex flex-col gap-2'>
                                    <h1 className='text-xs text-[#839f55]'>Total Salary:</h1>
                                    <h1 className='text-xs text-[#556fa8]'>{rowData?.compensation?.total}</h1>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Time of Work:</h1>
                        <h1 className='text-sm text-[#556fa8] font-bold'>{rowData?.time_of_work}</h1>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Job Description:</h1>
                        <h1 className='text-sm text-[#556fa8] font-bold'>{rowData?.job_description}</h1>
                    </div>

                    <div className='w-full flex flex-row justify-end gap-3 mt-2'>
                        <ErrorButton handleClick={handleDeleteJob} title={"Delete Content"} />
                        <CloseButton handleClick={handleClose} title={"Cancel"} />
                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default DeleteJob;