import React from 'react'

import TextField from '@mui/material/TextField';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

 const ViewFullPassage = ({ openModal , handleClose , ReadCompre }) => {

  return (
  <Backdrop
    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    open={openModal}
  >

        <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

          <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

            <h1 className='text-sm text-[#556fa8] font-medium'>{ReadCompre?.reading_passage_name}</h1>

            <div onClick={ handleClose } className='flex flex-col items-center'>
              <span className='text-gray-500 cursor-pointer'>
                <CancelOutlinedIcon size="s"/>
              </span>
             
            </div>

          </div>

          <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>
            <h1 className='text-sm text-black font-normal text-justify'>{ReadCompre?.text}</h1>
          </div>

        
        </div>

      </Backdrop>
  )
}

export default ViewFullPassage;