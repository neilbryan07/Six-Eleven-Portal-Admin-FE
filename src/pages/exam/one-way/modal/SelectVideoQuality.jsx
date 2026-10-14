import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import YouTubeIcon from '@mui/icons-material/YouTube';

import FormControl from '@mui/material/FormControl';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Switch from '@mui/material/Switch';

import CloseButton from '../../../../component/Buttons/CloseButton';
import SaveButton from '../../../../component/Buttons/SaveButton';

import { APIServices } from '../../../../contants/apiConfig';

const AddYoutubeUrl = lazy(() => import('./AddYoutubeUrl'));
const EditVideoOneWay = lazy(() => import('./EditVideoOneWay'));

const SelectVideoQuality = ({ openModal, handleClose, reFreshTable, questionData }) => {

    const [openEdit, setOpenEdit] = useState(false);
    const [quality, setQuality] = useState(null);
    const [youtube, setYoutube] = useState(null);

    const handleOpenEdit = (quality) => {
        setQuality(quality)
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setYoutube(false);
    };

    const handleOpenYoutube = (quality) => {
        setYoutube(true);
    };

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >


            <Suspense>
                {youtube && <AddYoutubeUrl questionData={questionData} openModal={youtube} handleClose={handleCloseEdit} reFreshTable={reFreshTable} />}
            </Suspense>

            <Suspense>
                {openEdit && <EditVideoOneWay quality_detail={quality} questionData={questionData} openModal={openEdit} handleClose={handleCloseEdit} reFreshTable={reFreshTable} />}
            </Suspense>

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Select Video Quality Content</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2'>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Content Name:</h1>
                        <h1 className='text-xs text-[#556fa8] font-bold'>{questionData?.question}</h1>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Preview Quality:</h1>

                        <div className='w-full flex flex-col items-center gap-2'>

                            <div onClick={() => handleOpenEdit(1080)} className='max-w-[300px] w-full flex flex-row items-center justify-center gap-2 text-black cursor-pointer border border-sky-500 p-[3px] text-center border-dashed rounded bg-sky-200 hover:bg-sky-500'>
                                <OndemandVideoIcon />
                                <h1 className='text-xs font-semibold '>
                                    Original Video Quality
                                </h1>
                            </div>

                            <div onClick={() => handleOpenEdit(480)} className='max-w-[300px] w-full flex flex-row items-center justify-center gap-2 text-black cursor-pointer border border-sky-500 p-[3px] text-center border-dashed rounded bg-sky-200 hover:bg-sky-500'>
                                <OndemandVideoIcon />
                                <h1 className='text-xs font-semibold '>
                                    480p Video Quality
                                </h1>
                            </div>

                            <div onClick={() => handleOpenEdit(360)} className='max-w-[300px] w-full flex flex-row items-center justify-center gap-2 text-black cursor-pointer border border-sky-500 p-[3px] text-center border-dashed rounded bg-sky-200 hover:bg-sky-500'>
                                <OndemandVideoIcon />
                                <h1 className='text-xs font-semibold '>
                                    360p Video Quality
                                </h1>
                            </div>

                            <div onClick={() => handleOpenYoutube()} className='max-w-[300px] w-full flex flex-row items-center justify-center gap-2 text-black cursor-pointer border border-sky-500 p-[3px] text-center border-dashed rounded bg-sky-200 hover:bg-sky-500'>
                                <YouTubeIcon />
                                <h1 className='text-xs font-semibold '>
                                    Add Youtube URL
                                </h1>
                            </div>


                        </div>
                    </div>



                </div>

            </div>

        </Backdrop>
    )
}

export default SelectVideoQuality;