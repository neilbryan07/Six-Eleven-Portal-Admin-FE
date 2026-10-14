import React, { lazy, Suspense, useState, useEffect } from 'react';

import { format } from 'date-fns';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import Rating from '@mui/material/Rating';

import ErrorButton from '../../../../component/Buttons/ErrorButton';
import SaveButton from '../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../component/Buttons/CloseButton';


import { APIServices } from '../../../../contants/apiConfig';

import { handleTimeFormat } from '../../../../contants/contans';

const DeleteApplicant = ({ openModal, handleClose, userData, handleApplicant }) => {

    const handleDeleteApplicant = async () => {

        const response = await APIServices.post({
            url: `delete-user`, payload: {
                "user_id": userData?.id
            }
        });

        if (response.status === 200) {
            handleClose();
            handleApplicant();
        }
    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Delete this applicant ?</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="small" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2 max-h-[500px] overscroll-y-auto overflow-y-auto'>


                    <div className='w-full flex flex-row items-center justify-between gap-3'>

                        <div className='flex flex-row items-center gap-3'>
                            <span className='text-[#839f55]'><AccountCircleOutlinedIcon /></span>
                            <h1 className='text-[#556fa8] font-semibold'>{userData?.last_name} , {userData?.first_name} {userData?.middle_name} </h1>
                        </div>

                    </div>

                </div>

                <div className='w-full flex flex-row justify-end gap-3 mt-5'>

                    <ErrorButton title={"Delete Applicant"} handleClick={handleDeleteApplicant} />
                    <CloseButton handleClick={handleClose} title={"Cancel"} />

                </div>



            </div>

        </Backdrop>
    )
}

export default DeleteApplicant;