import React from 'react'

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';



const ViewMockCall = ({ openModal, handleClose, rowData }) => {

  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={openModal}
    >

      <div className='max-w-[500px] max-h-[800px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

        <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

          <h1 className='text-sm text-[#556fa8] font-medium'>Mock Call / Live Chat Simulation</h1>

          <div onClick={handleClose} className='flex flex-col items-center'>
            <span className='text-gray-500 cursor-pointer'>
              <CancelOutlinedIcon size="s" />
            </span>

          </div>

        </div>

        <div className='w-full flex flex-col gap-2 overscroll-y-auto overflow-y-auto'>

          <div className='flex flex-col gap-2'>
            <h1 className='text-xs text-[#839f55] font-light'>Name:</h1>
            <h1 className='text-sm text-black font-medium'>{rowData?.mock_call_content_name}</h1>
          </div>

          <div className='flex flex-col gap-2'>
            <h1 className='text-xs text-[#839f55] font-light'>Status:</h1>
            <h1 className='text-sm text-green-500 font-normal'>Active</h1>
          </div>

          <div className='flex flex-col gap-2'>
            <h1 className='text-xs text-[#839f55] font-light'>Content:</h1>

            <div className='border-4 border-dotted p-2 flex flex-col gap-3 mb-2'>

              {rowData?.mock_content?.map((row, index) => (
                <div className='flex flex-col gap-2 border-2 border-dashed border-blue-500 p-2' key={index}>

                  <div className='w-full flex flex-row items-center justify-between'>
                    <h1 className='text-xs text-[#839f55] font-bold'>Mock call customer content</h1>

                  </div>

                  <h1 className='text-xs text-black font-bold'>{row?.customer_response_txt}</h1>

                </div>
              ))}

            </div>

          </div>



        </div>

      </div>

    </Backdrop>
  )
}

export default ViewMockCall;