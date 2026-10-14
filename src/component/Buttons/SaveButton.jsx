import React from 'react'

import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';

const SaveButton = ({ title, handleClick = null , is_loading = false }) => {
  return (
    <React.Fragment>
      { is_loading ? 

        <CircularProgress size="25px" /> :
        
        <div onClick={handleClick} className='px-2 py-[4px] flex flex-row gap-2 items-center justify-center bg-[#839f55] rounded cursor-pointer hover:bg-lime-600'>
          <SaveIcon />
          <h1 className='text-white text-sm font-semibold'>{title}</h1>
        </div>

      }
    </React.Fragment>
  )
}

export default SaveButton
