import React, { useState } from 'react'

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';

import CloseButton from '../../../component/Buttons/CloseButton';
import SaveButton from '../../../component/Buttons/SaveButton';

import { APIServices } from '../../../contants/apiConfig';

const AddAds = ({ openModal, handleClose, refreshData }) => {

    const [imgDescription, setImgDescription] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleFileChange = (e) => {
        setImgFile(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
    };

    const handleAddImage = async () => {

        setLoading(true)

        const formData = new FormData();
        formData.append('file_name', imgFile.name);
        formData.append('description', imgDescription);
        formData.append('file', imgFile);

        try {

            const response = await APIServices.post({
                url: '/ads/create', payload: formData
            });

            if (response.status === 201) {
                refreshData();
                handleClose();
                setLoading(false);
            }
        } catch (error) {
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

                    <h1 className='text-sm text-[#556fa8] font-medium'>Add Advertisements Content</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2'>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Content Description:</h1>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size='small'
                            multiline
                            rows={4}
                            value={imgDescription}
                            onChange={(e) => setImgDescription(e.target.value)}
                        />
                    </div>

                    <Box sx={{ mb: 2 }}>
                        {imgFile &&
                            <div className='flex flex-col gap-2 relative w-full'>
                                <img src={URL.createObjectURL(imgFile)} alt="preview" className="max-w-full h-auto rounded" />
                                <h1 className='text-sm text-[#839f55] font-bold'>{imgFile.name}</h1>
                                <Tooltip title="Remove Uploaded Picture">
                                    <div onClick={e => setImgFile(null)} className='absolute cursor-pointer right-1 bg-white rounded-full p-1 items-center flex flex-col top-1'>
                                        <CancelIcon color='error' />
                                    </div>
                                </Tooltip>
                            </div>
                        }
                    </Box>

                    <div className='max-w-[300px] gap-2 flex flex-col'>
                        <h1 className='text-xs text-red-500 font-bold'>File size should be less than 10mb</h1>
                        <Button variant="contained" component="label" sx={{ mb: 2 }} color="success">
                            <h1 className='text-sm text-white font-light'>Upload Image File</h1>
                            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                        </Button>
                    </div>
                    <div className='w-full flex flex-row justify-end gap-3 mt-2'>


                        {imgDescription && imgFile ?

                            <React.Fragment>
                                <SaveButton is_loading={loading} handleClick={handleAddImage} title={"Add Content"} />
                            </React.Fragment>

                            : null}


                        <CloseButton handleClick={handleClose} title={"Cancel"} />

                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default AddAds;