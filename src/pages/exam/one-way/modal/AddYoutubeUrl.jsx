import React, { useState } from 'react'

import { useParams, useNavigate } from "react-router-dom";

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';

import CloseButton from '../../../../component/Buttons/CloseButton';
import SaveButton from '../../../../component/Buttons/SaveButton';

import { APIServices } from '../../../../contants/apiConfig';

const AddYoutubeUrl = ({ openModal, handleClose, refreshData, questionData, is_onboarding = false, }) => {

    const [loading, setLoading] = useState(false)

    const [promptformData, setPromptFormData] = useState({
        youtube_url: null,
    });

    const [videoFile, setvideoFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPromptFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddImage = async () => {

        setLoading(true)

        let videoData = is_onboarding
            ? {
                module_id: questionData?.id,
                youtube_url: getCleanEmbedUrl(promptformData?.youtube_url),
            }
            : {
                question_id: questionData?.id,
                youtube_url: getCleanEmbedUrl(promptformData?.youtube_url),
            };

        const url = is_onboarding
            ? '/onboarding/youtube-create-update'
            : '/video-assessment/youtube-create-update';

        try {

            const response = await APIServices.post({
                url: url, payload: videoData
            });

            if (response.status === 201 || response.status === 200) {
                // refreshData();
                handleClose();
                setLoading(false);
            }
        } catch (error) {
            handleClose();
        }

    }

    const getCleanEmbedUrl = (url) => {
        try {
            const videoId = new URL(url).searchParams.get("v");
            return `https://www.youtube.com/embed/${videoId}`;
        } catch {
            return "";
        }
    };

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Add / Update Exam Content Youtube URL</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2'>



                    {questionData?.youtube_videos?.length > 0 && promptformData?.youtube_url === null ?

                        <React.Fragment>
                            <div className='w-full flex flex-col h-[250px]'>
                                <h1 className='text-xs text-[#839f55] font-bold'>Existing Url Path:</h1>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={questionData?.youtube_videos?.[0]?.youtube_url}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </React.Fragment> :

                        <React.Fragment>
                            {promptformData?.youtube_url !== null ?
                                <div className='w-full flex flex-col h-[250px]'>
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={getCleanEmbedUrl(promptformData?.youtube_url)}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                : null}
                        </React.Fragment>

                    }



                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Url Path:</h1>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size='small'
                            name="youtube_url"
                            multiline={4}
                            value={promptformData?.youtube_url}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='w-full flex flex-row justify-end gap-3 mt-2'>


                        <SaveButton is_loading={loading} handleClick={handleAddImage} title={"Add URL"} />
                        <CloseButton handleClick={handleClose} title={"Cancel"} />

                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default AddYoutubeUrl;