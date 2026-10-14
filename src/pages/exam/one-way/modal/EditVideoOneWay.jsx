import React, { useState, useEffect } from 'react'

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import FormControl from '@mui/material/FormControl';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Switch from '@mui/material/Switch';

import CloseButton from '../../../../component/Buttons/CloseButton';
import SaveButton from '../../../../component/Buttons/SaveButton';


import { APIServices } from '../../../../contants/apiConfig';

const EditVideoOneWay = ({ openModal, handleClose, reFreshTable, questionData, quality_detail }) => {

    const [videoFile, setvideoFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setvideoFile(file); // <-- use a state for video
        }
        // setvideoFile(e.target.files[0]);
    };

    const handleEditVideo = async () => {

        if (!videoFile) {
            setUploadMessage('Please provide both name and audio file.');
            return;
        }

        const formData = new FormData();
        formData.append('question_id', questionData?.id);
        formData.append('quality', quality_detail);
        formData.append('file', videoFile);
        setLoading(true)

        try {

            const response = await APIServices.post({
                url: '/video-assessment/upload-video', payload: formData
            });

            if (response.status === 200) {
                reFreshTable();
                handleClose();
                setLoading(false)
            }
        } catch (error) {
            handleClose();
        }


    }

    const handleCheckDefaultFile = () => {
        if (!questionData?.videos?.length) return null;

        const matchedVideo = questionData.videos.find(
            video => video.quality === quality_detail
        );

        const videoPath = matchedVideo?.file_path ?? questionData.videos[0]?.file_path;
        return `${process.env.REACT_APP_API_STORAGE}${videoPath}`;
    };

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Edit Video Content Quality : {quality_detail}p</h1>

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

                    {!videoFile &&
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-light'>Current Video Content:</h1>
                            <video
                                width="500"
                                controls
                                src={handleCheckDefaultFile()}
                            />

                        </div>
                    }

                    <div className='w-full p-[2px] bg-gray-100 my-2'></div>
                    {/* 
                    <Box sx={{ mb: 2 }}>
                        {videoFile && <h1 className='text-sm text-[#839f55] font-bold'>{videoFile.name}</h1>}
                    </Box> */}


                    {videoFile &&

                        <div className='flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-light'>Uploaded Video File:</h1>
                            <h1 className='text-sm text-[#556fa8] font-bold'>{videoFile.name}</h1>
                            <video
                                width="500"
                                controls
                                src={videoFile ? URL.createObjectURL(videoFile) : null}
                            />
                        </div>
                    }

                    <div className='max-w-[300px]'>
                        <Button variant="contained" component="label" sx={{ mb: 2 }} color="success">
                            <h1 className='text-sm text-white font-light'>New Upload Video File</h1>
                            <input type="file" accept="video/*" hidden onChange={handleFileChange} />
                        </Button>
                    </div>
                    <div className='w-full flex flex-row justify-end gap-3 mt-2'>

                        {
                            videoFile && !loading ?
                                <SaveButton handleClick={handleEditVideo} title={"Upload Video Content"} />
                                : null
                        }

                        {loading && <CloseButton title={"Video Uploading..."} />}

                        <CloseButton handleClick={handleClose} title={"Cancel"} />

                    </div>


                </div>

            </div>

        </Backdrop>
    )
}

export default EditVideoOneWay;