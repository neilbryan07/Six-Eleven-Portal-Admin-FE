import React, { useState , useEffect } from 'react'

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

const EditListeningContent = ({ openModal, handleClose, rowData }) => {

  const [audioName, setAudioName] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [audioPreview, setAudioPreview] = useState(null);
  const [loading , setLoading] = useState(false)

  useEffect(() => {
    if (rowData) {
      setAudioName(rowData?.audio_content || '');
      setAudioPreview(rowData?.audio_file_url || null);
    }
  }, [rowData]);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleAddAudio = async () => {

    if (!audioName || !audioFile) {
      setUploadMessage('Please provide both name and audio file.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('audio_content', audioName);
    formData.append('audio_file', audioFile);
    formData.append('id', rowData?.id);

    try {

      const response = await APIServices.post({
            url: '/mcq-admin/audio-create-3', payload: formData
      });

      if (response.status === 200) {
        handleClose();
      } else {
        setLoading(false);
      }
    } catch (error) {
      handleClose();
      
    }


  }

  
  const handleRemoveDefaultStorage = (data) => {
    const fileName = data.replace("/storage/", "");
    return process.env.REACT_APP_API_STORAGE + fileName;
  }


  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={openModal}
    >

      <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

        <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

          <h1 className='text-sm text-[#556fa8] font-medium'>Edit Listening Comprehension Content</h1>

          <div onClick={handleClose} className='flex flex-col items-center'>
            <span className='text-gray-500 cursor-pointer'>
              <CancelOutlinedIcon size="s" />
            </span>

          </div>

        </div>

        <div className='w-full flex flex-col gap-2'>

          <div className='flex flex-col gap-2'>
            <h1 className='text-xs text-[#839f55] font-bold'>Read Passage Name:</h1>
            <TextField id="outlined-basic" variant="outlined" size='small' value={audioName} onChange={(e) => setAudioName(e.target.value)} />
          </div>

          <Box sx={{ mb: 2 }}>
            {audioFile &&  <h1 className='text-sm text-[#839f55] font-bold'>{audioFile.name}</h1>}
          </Box>

          <div className='max-w-[300px]'>
            <Button variant="contained" component="label" sx={{ mb: 2 }} color="success">
              <h1 className='text-sm text-white font-light'>Upload / Select Audio File</h1>
              <input type="file" accept="audio/*" hidden onChange={handleFileChange} />
            </Button>
          </div>

            {audioPreview && !audioFile && (
            <Box>
                <h1 className='text-xs text-[#839f55] font-bold'>Current Audio Preview:</h1>
                <audio controls src={handleRemoveDefaultStorage(rowData?.audio_file_path)}/>
            </Box>
            )}

          <div className='w-full flex flex-row justify-end gap-3 mt-2'>

            {
              audioName && audioFile?
                <SaveButton handleClick={handleAddAudio} title={"Save Content"} />
                : null
            }

            <CloseButton handleClick={handleClose} title={"Cancel"} />

          </div>


        </div>

      </div>

    </Backdrop>
  )
}

export default EditListeningContent;