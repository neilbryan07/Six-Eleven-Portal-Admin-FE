import React, { useState } from 'react'

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';

import CloseButton from '../../../../component/Buttons/CloseButton';
import SaveButton from '../../../../component/Buttons/SaveButton';

import { APIServices } from '../../../../contants/apiConfig';

const EditModuleVideo = ({ openModal, handleClose, refreshData, OnBoardingData, quality_detail }) => {

    const [imgDescription, setImgDescription] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [loading, setLoading] = useState(false)

    const [videoformData, setVideoFormData] = useState({
        title: OnBoardingData?.title,
        description: OnBoardingData?.description,
        instruction: OnBoardingData?.instruction,
    });

    const [videoFile, setvideoFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setvideoFile(file); // <-- use a state for video
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideoFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddImage = async () => {

        setLoading(true)

        const formData = new FormData();
        formData.append('title', videoformData.title);
        formData.append('description', videoformData.description);
        formData.append('instruction', videoformData.instruction);
        formData.append('quality', quality_detail);

        if (videoFile) {
            formData.append('video_path', videoFile);
        }

        try {

            if (parseInt(quality_detail) === 480 || parseInt(quality_detail) === 360) {

                const formDataQuality = new FormData();
                formDataQuality.append('module_id', OnBoardingData?.id);
                formDataQuality.append('video_path', videoFile);
                formDataQuality.append('quality', quality_detail);


                const response = await APIServices.post({
                    url: `/onboarding/new-video`, payload: formDataQuality
                });

                if (response.status === 200) {
                    // refreshData();
                    handleClose();
                    setLoading(false);
                }

            } else {

                const response = await APIServices.post({
                    url: `/onboarding/modules/update/${OnBoardingData?.id}`, payload: formData
                });

                if (response.status === 200) {
                    // refreshData();
                    handleClose();
                    setLoading(false);
                }

            }

        } catch (error) {
            handleClose();
        }

    }

    const handleCheckDefaultFile = () => {
        if (!OnBoardingData) return null;

        // If quality is NOT 480 or 360 → use default video path
        if (quality_detail !== 480 && quality_detail !== 360) {
            return `${process.env.REACT_APP_API_STORAGE}${OnBoardingData?.video_path}`;
        }

        // If quality is 480 or 360 → find matching video
        const matchedVideo = OnBoardingData?.videos?.find(
            (video) => video.quality === quality_detail
        );

        return matchedVideo
            ? `${process.env.REACT_APP_API_STORAGE}${matchedVideo.video_path}`
            : null;
    };

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Edit OnBoarding Exam Video Content Quality: {quality_detail}</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2'>


                    {quality_detail !== 480 && quality_detail !== 360 && (
                        <React.Fragment>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-xs text-[#839f55] font-bold'>Title:</h1>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    size='small'
                                    name="title"
                                    value={videoformData?.title}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className='flex flex-col gap-2'>
                                <h1 className='text-xs text-[#839f55] font-bold'>Description:</h1>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    size='small'
                                    name="description"
                                    value={videoformData?.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <h1 className='text-xs text-[#839f55] font-bold'>Instruction:</h1>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    size='small'
                                    name="instruction"
                                    value={videoformData?.instruction}
                                    onChange={handleChange}
                                />
                            </div>

                        </React.Fragment>)}

                    <Box sx={{ mb: 2 }}>
                        {!videoFile ?

                            <div className='flex flex-col gap-2'>
                                <h1 className='text-xs text-[#839f55] font-light'>Uploaded Video File:</h1>
                                <video
                                    width="500"
                                    controls
                                    src={handleCheckDefaultFile()}
                                />
                            </div> :


                            <div className='flex flex-col gap-2'>
                                <h1 className='text-xs text-[#839f55] font-light'>New Uploaded Video File:</h1>
                                <h1 className='text-sm text-[#556fa8] font-bold'>{videoFile?.name}</h1>

                                <video
                                    width="500"
                                    controls
                                    src={videoFile ? URL.createObjectURL(videoFile) : null}
                                />
                            </div>


                        }
                    </Box>

                    <div className='max-w-[300px] gap-2 flex flex-col'>

                        <Button variant="contained" component="label" sx={{ mb: 2 }} color="success">
                            <h1 className='text-sm text-white font-light'>New Upload Video File</h1>
                            <input type="file" accept="video/*" hidden onChange={handleFileChange} />
                        </Button>
                    </div>
                    <div className='w-full flex flex-row justify-end gap-3 mt-2'>


                        <SaveButton is_loading={loading} handleClick={handleAddImage} title={"Add Module Content"} />
                        <CloseButton handleClick={handleClose} title={"Cancel"} />

                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default EditModuleVideo;