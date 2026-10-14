import React, { useState } from 'react'

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import CloseButton from '../../../component/Buttons/CloseButton';
import SaveButton from '../../../component/Buttons/SaveButton';

import { APIServices } from '../../../contants/apiConfig';

import { handleTimeFormat } from '../../../contants/contans';

const ViewAds = ({ openModal, handleClose, rowData }) => {

    const [imgFile, setImgFile] = useState(null);

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>View Advertisements Content</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2'>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Content Description:</h1>
                        <h1 className='text-sm text-[#556fa8] font-bold'>{rowData?.description}</h1>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Content Created By:</h1>
                        <h1 className='text-sm text-[#556fa8] font-bold'>{rowData?.user?.first_name}  {rowData?.user?.last_name}</h1>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Content Date Created:</h1>
                        <h1 className='text-sm text-[#556fa8] font-bold'>{handleTimeFormat(rowData?.created_at)}</h1>
                    </div>

                    <div className='flex flex-col gap-2 relative w-full'>
                        <img src={`${process.env.REACT_APP_API_STORAGE}${rowData?.file}`} alt="preview" className="max-w-full h-auto rounded" />
                        <h1 className='text-sm text-[#839f55] font-bold'>{rowData?.file_name}</h1>
                    </div>

                    <div className='w-full flex flex-row justify-end gap-3 mt-2'>
                        <CloseButton handleClick={handleClose} title={"Cancel"} />
                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default ViewAds;