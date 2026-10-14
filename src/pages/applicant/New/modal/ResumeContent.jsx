import React, { useState, useEffect } from 'react'

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Switch from '@mui/material/Switch';

import { handleTimeFormat } from '../../../../contants/contans';

import CloseButton from '../../../../component/Buttons/CloseButton';
import SaveButton from '../../../../component/Buttons/SaveButton';
import ErrorButton from '../../../../component/Buttons/ErrorButton';
import { APIServices } from '../../../../contants/apiConfig';

const ResumeContent = ({ openResume, handleCloseResume, selectedData }) => {

    const [AddResume, setAddResume] = useState(false);
    const [updateResume, setUpdateResume] = useState(false);
    const [deleteResume, setDeleteResume] = useState(false);
    const [viewResume, setViewResume] = useState([]);

    const [isProfile, setIsProfile] = useState(false);

    const [selectedFile, setSelectedFile] = useState([]);

    const [imgFile, setImgFile] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleFileChange = (e) => {
        setImgFile(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
    };

    const handleAddResume = async () => {

        setLoading(true)

        const formData = new FormData();
        formData.append('file', imgFile);
        formData.append('user_id', selectedData?.id);
        
        if(isProfile){
            formData.append('is_profile', isProfile);
        }


        try {

            const response = await APIServices.post({
                url: '/user-attachments/create', payload: formData
            });

            if (response.status === 201) {
                handleFetchResume();
                setLoading(false);
                setAddResume(false)
                setImgFile(null)
            }
        } catch (error) {
            handleCloseResume();
        }

    }

    const handleDeleteResume = async () => {

        setLoading(true)

        const formData = new FormData();
        formData.append('id', selectedFile?.id);

        try {

            const response = await APIServices.post({
                url: '/user-attachments/delete', payload: formData
            });

            if (response.status === 200) {
                handleFetchResume();
                setLoading(false);
                setDeleteResume(false)
                setImgFile(null)
            }
        } catch (error) {
            handleCloseResume();
        }

    }


    const handleUpdateResume = async () => {

        setLoading(true)

        const formData = new FormData();
        formData.append('file', imgFile);
        formData.append('id', selectedFile?.id);

        if(isProfile){
            formData.append('is_profile', isProfile);
        }

        try {

            const response = await APIServices.post({
                url: '/user-attachments/update', payload: formData
            });

            if (response.status === 200) {
                handleFetchResume();
                setLoading(false);
                setUpdateResume(false)
                setImgFile(null)
            }
        } catch (error) {
            handleCloseResume();
        }

    }

    const handleFetchResume = async () => {

        const response = await APIServices.get({
            url: `/user-attachments/index`,
            payload: {
                user_id: selectedData?.id
            }
        });

        if (response.status === 200) {
            setViewResume(response?.data)
        }
    }

    const handleCancelAdd = () => {
        setAddResume(false)
        setUpdateResume(false)
        setDeleteResume(false)
    }

    const handleUpdate = (row) => {
        setUpdateResume(true)
        setDeleteResume(false)
        setSelectedFile(row)
    }


    const handleDelete = (row) => {
        setDeleteResume(true)
        setUpdateResume(false)
        setSelectedFile(row)
    }

    useEffect(() => {
        handleFetchResume();
    }, []);



    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openResume}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Applicant Files : {selectedData?.last_name} , {selectedData?.first_name} {selectedData?.middle_name}</h1>

                    <div onClick={handleCloseResume} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='flex flex-row gap-2 items-center justify-end'>
                    <Tooltip title="Add Files">
                        <div className='p-[6px] rounded-lg border bg-blue-500 cursor-pointer' onClick={e => setAddResume(true)} >
                            <span className='text-white'><AddCircleOutlineOutlinedIcon /> Add files</span>
                        </div>
                    </Tooltip>
                </div>

                {AddResume &&

                    <div className='w-full flex flex-col gap-2'>

                        <Box sx={{ mb: 2 }}>
                            {imgFile &&
                                <div className='flex flex-col gap-2 relative w-full'>
                                    <a
                                        href={URL.createObjectURL(imgFile)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        {imgFile.name}
                                    </a>
                                    <Tooltip title="Remove Uploaded Picture">
                                        <div onClick={e => setImgFile(null)} className='absolute cursor-pointer right-1 bg-white rounded-full p-1 items-center flex flex-col top-1'>
                                            <CancelIcon color='error' />
                                        </div>
                                    </Tooltip>
                                </div>
                            }
                        </Box>

                        <div className='w-full flex flex-row justify-between gap-2'>

                        <div className='w-full gap-2 flex flex-col'>
                            <h1 className='text-[10px] text-red-500 font-bold'>File size should be less than 50mb</h1>
                            <Button variant="contained" component="label" sx={{ mb: 2 }} color="success">
                                <h1 className='text-sm text-white font-light'>Upload File</h1>
                                <input type="file" hidden onChange={handleFileChange} />
                            </Button>
                        </div>

                        <div className='w-full gap-2 flex flex-row items-center justify-end'>
                            <h1 className='text-[10px] text-red-500 font-bold'>File is for profile picture ?</h1>
                            <Switch
                                checked={isProfile}
                                value={isProfile}
                                name='for_profile'
                                onChange={(e) => {
                                    setIsProfile(e.target.checked ? 1 : 0);
                                }}
                                color="success"
                            />
                        </div>

                        </div>

                        <div className='w-full flex flex-row justify-end gap-3 mt-2'>


                            {imgFile ?

                                <React.Fragment>
                                    <SaveButton is_loading={loading} handleClick={handleAddResume} title={"Add File"} />
                                </React.Fragment>

                                : null}


                            <CloseButton handleClick={handleCancelAdd} title={"Cancel Add"} />

                        </div>

                    </div>

                }

                {updateResume &&

                    <div className='w-full flex flex-col gap-2'>

                        <Box sx={{ mb: 2 }}>
                            {imgFile ?
                                <div className='flex flex-col gap-2 relative w-full'>
                                    <a
                                        href={URL.createObjectURL(imgFile)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        {imgFile.name}
                                    </a>
                                    <Tooltip title="Remove Uploaded Picture">
                                        <div onClick={e => setImgFile(null)} className='absolute cursor-pointer right-1 bg-white rounded-full p-1 items-center flex flex-col top-1'>
                                            <CancelIcon color='error' />
                                        </div>
                                    </Tooltip>
                                </div>

                                :
                                <div className='w-full flex flex-col gap-2'>
                                    <h1 className='text-sm text-[#556fa8] font-medium'>Uploaded File</h1>
                                    <a
                                        href={`${process.env.REACT_APP_API_STORAGE}${selectedFile?.file_path}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline w-1/2"
                                    >
                                        {selectedFile.file_path}
                                    </a>
                                </div>
                            }
                        </Box>

                        <div className='max-w-[300px] gap-2 flex flex-col'>
                            <h1 className='text-[10px] text-red-500 font-bold'>File size should be less than 50mb</h1>
                            <Button variant="contained" component="label" sx={{ mb: 2 }} color="success">
                                <h1 className='text-sm text-white font-light'>Upload & Update File</h1>
                                <input type="file" hidden onChange={handleFileChange} />
                            </Button>
                        </div>
                        <div className='w-full flex flex-row justify-end gap-3 mt-2'>


                            {imgFile ?

                                <React.Fragment>
                                    <SaveButton is_loading={loading} handleClick={handleUpdateResume} title={"Update Selected File"} />
                                </React.Fragment>

                                : null}


                            <CloseButton handleClick={handleCancelAdd} title={"Cancel Update"} />

                        </div>

                    </div>

                }

                <div className='w-full flex flex-col gap-2'>
                    <h1 className='text-sm text-[#556fa8] font-medium'>List Of Uploaded Files</h1>
               
                    {viewResume?.map((row, index) => (
                        <div key={index} className='w-full flex flex-row items-center justify-between gap-3 border-b-2 pb-3 border-gray-500'>
                            <a
                                href={`${process.env.REACT_APP_API_STORAGE}${row?.file_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex flex-col cursor-pointer gap-2"
                            >
                                <div className='flex flex-row gap-2'>
                                    <InsertDriveFileIcon color='success' />
                                    <h1 className='text-blue-500 underline'>{row?.is_profile ? "Applicant Profile Picture : " : ""}{row?.original_name}</h1>
                                </div> 

                                <h1 className='text-blue-500 underline'>{handleTimeFormat(row?.created_at)}</h1>
                            </a>

                            <div className='w-full flex flex-row justify-end'>

                                <div className='cursor-pointer' onClick={e => handleUpdate(row)} >
                                    <Tooltip title="Update Content">
                                        <EditIcon color='info' />
                                    </Tooltip>
                                </div>

                                <div className='cursor-pointer' onClick={e => handleDelete(row)} >
                                    <Tooltip title="Delete File">
                                        <DeleteIcon color='error' />
                                    </Tooltip>
                                </div>

                            </div>

                        </div>
                    ))}
                    <div className='w-full flex flex-row justify-end gap-3'>

                        {deleteResume ?

                            <React.Fragment>
                                <ErrorButton is_loading={loading} handleClick={handleDeleteResume} title={"Delete Selected File"} />

                                <CloseButton handleClick={handleCancelAdd} title={"Cancel Delete"} />

                            </React.Fragment>
                            : null}
                    </div>

                </div>

            </div>

        </Backdrop >
    )
}

export default ResumeContent;