import React, { useState } from 'react'

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import CloseButton from '../../../component/Buttons/CloseButton';
import SaveButton from '../../../component/Buttons/SaveButton';

import { APIServices } from '../../../contants/apiConfig';

import { handleTimeFormat } from '../../../contants/contans';

const ViewCompensation = ({ openModal, handleClose, rowData }) => {

    console.log(rowData)

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>View Job Preference Content</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2'>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Compensation Name:</h1>
                        <h1 className='text-sm text-[#556fa8] font-bold'>{rowData?.compensation_plan}</h1>
                    </div>

                    <div className='w-full flex flex-row gap-2 items-center justify-start'>

                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Basic Pay:</h1>
                            <h1 className='text-sm text-[#556fa8] font-bold'>{rowData?.basic_rate}</h1>
                        </div>

                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Attendance Bonus:</h1>
                            <h1 className='text-sm text-[#556fa8] font-bold'>{rowData?.attendance_bonus}</h1>
                        </div>

                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Night Differential:</h1>
                            <h1 className='text-sm text-[#556fa8] font-bold'>{rowData?.night_diff}</h1>
                        </div>

                    </div>

                    <div className='w-full flex flex-row gap-2 items-center justify-start'>
                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Rice Allowance:</h1>
                            <h1 className='text-sm text-[#556fa8] font-bold'>{rowData?.rice_allowance}</h1>
                        </div>

                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Meal Allowance:</h1>
                            <h1 className='text-sm text-[#556fa8] font-bold'>{rowData?.meal_allowance}</h1>
                        </div>

                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Uniform Allowance:</h1>
                            <h1 className='text-sm text-[#556fa8] font-bold'>{rowData?.uniform_allowance}</h1>
                        </div>

                    </div>

                    <div className='w-full flex flex-row gap-2 items-center justify-start'>

                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Working Days:</h1>
                            <h1 className='text-sm text-[#556fa8] font-bold'>{rowData?.working_days}</h1>
                        </div>

                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Gross:</h1>
                            <h1 className='text-sm text-[#556fa8] font-bold'>{rowData?.gross_salary}</h1>
                        </div>

                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Total Salary:</h1>
                            <h1 className='text-sm text-[#556fa8] font-bold'>{rowData?.total}</h1>
                        </div>

                    </div>



                    <div className='w-full flex flex-row justify-end gap-3 mt-2'>
                        <CloseButton handleClick={handleClose} title={"Cancel"} />
                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default ViewCompensation;