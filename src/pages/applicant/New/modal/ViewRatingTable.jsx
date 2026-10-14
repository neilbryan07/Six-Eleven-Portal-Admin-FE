import React, { lazy, Suspense, useState, useEffect } from 'react';

import { format } from 'date-fns';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import Rating from '@mui/material/Rating';


import { APIServices } from '../../../../contants/apiConfig';

import { handleTimeFormat } from '../../../../contants/contans';

const ViewRatingTable = ({ openModal, handleClose, userData }) => {

    const [userRate, setUserRate] = useState([]);

    useEffect(() => {
        handleSnapShot();
    }, []);

    const handleSnapShot = async () => {

        const response = await APIServices.get({
            url: `user-branch-rates`, payload: {
                "user_id": userData?.id
            }
        });

        if (response.status === 200) {
            setUserRate(response?.data?.data)
        }
    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>View Ratings List</h1>

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


                <div className='w-full flex flex-col gap-3 p-2 max-h-[500px] overscroll-y-auto overflow-y-auto'>

                    {userRate?.map((row, index) => (
                        <div className='flex flex-col gap-2' key={index}>
                            <div className='flex flex-row items-center gap-2'>
                                <h1 className='text-xs text-[#839f55] font-light'>- Ratings : </h1>
                                <Rating
                                    name="simple-controlled"
                                    value={parseInt(row?.rate)}
                                    readOnly
                                />
                            </div>

                            <div className='flex flex-row items-center gap-2'>
                                <h1 className='text-xs text-[#839f55] font-light'>- Branch : </h1>
                                <h1 className='text-sm text-[#556fa8] font-bold'>{row?.branch_name}</h1>
                            </div>

                            <div className='flex flex-row items-center gap-2'>
                                <h1 className='text-xs text-[#839f55] font-light'>- Remarks : </h1>
                                <h1 className='text-sm text-[#556fa8] font-bold'>{row?.remarks}</h1>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <h1 className='text-xs text-[#839f55] font-light'>- Date : </h1>
                                <h1 className='text-xs text-[#556fa8] font-bold'>{handleTimeFormat(row?.created_at)}</h1>
                            </div>

                        </div>

                    ))}


                </div>

            </div>

        </Backdrop>
    )
}

export default ViewRatingTable;