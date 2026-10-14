import React, { lazy, Suspense, useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ViewListeningContent = ({ openModal, handleClose , selectedData }) => {

  const handleRemoveDefaultStorage = (data) => {
    const fileName = data.replace("/storage/", "");
    return process.env.REACT_APP_API_STORAGE + fileName;
  }

  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={openModal}
    >

      <div className='max-w-[350px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

        <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

          <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.audio_content}</h1>

          <div onClick={handleClose} className='flex flex-col items-center'>
            <span className='text-gray-500 cursor-pointer'>
              <CancelOutlinedIcon size="s" />
            </span>

          </div>

        </div>

        <div className='w-full flex flex-col items-center gap-2'>

          <div className='flex flex-row items-center justify-between' >

              <div className='flex flex-col gap-2'>
                <audio controls src={handleRemoveDefaultStorage(selectedData?.audio_file_path)} />
              </div>

            </div>

        </div>


      </div>

    </Backdrop>
  )
}

export default ViewListeningContent;