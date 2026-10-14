import React from 'react'

import CircularProgress from '@mui/material/CircularProgress';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ErrorButton = ({ title, handleClick = null , is_loading = false }) => {
  return (
    <React.Fragment>
      <div className='mr-2'>
          { is_loading ? 
    
            <CircularProgress size="25px" /> :
            
            <div onClick={handleClick} className='px-2 py-[4px] flex flex-row gap-2 items-center justify-center bg-red-700 rounded cursor-pointer hover:bg-red-500'>
              <CancelOutlinedIcon />
              <h1 className='text-white text-sm font-semibold'>{title}</h1>
            </div>
    
          }
          </div>
        </React.Fragment>
  )
}

export default ErrorButton
