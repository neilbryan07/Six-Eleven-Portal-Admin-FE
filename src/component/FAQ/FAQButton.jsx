import React from 'react'

import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Tooltip from '@mui/material/Tooltip';

import { handleAdminManualDownload } from '../../contants/contans';

const FAQButton = () => {
  return (
    <div className='flex flex-row gap-2 items-center'>
      <Tooltip title="Download Admin Manual">
        <div className='cursor-pointer ' onClick={handleAdminManualDownload}>
          <LiveHelpIcon color="primary" sx={{ fontSize: 22 }} />
        </div>
      </Tooltip>

    </div>
  )
}

export default FAQButton
