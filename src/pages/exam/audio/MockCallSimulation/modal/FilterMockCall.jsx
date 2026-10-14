import React from 'react'

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import FormControl from '@mui/material/FormControl';


import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import SaveButton from '../../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../../component/Buttons/CloseButton';

 const FilterMockCall = ({ openModal , handleClose }) => {
  return (
  <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={openModal}
      >

        <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

          <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

            <h1 className='text-sm text-[#556fa8] font-medium'>Filter Table Display :</h1>

            <div onClick={ handleClose } className='flex flex-col items-center'>
              <span className='text-gray-500 cursor-pointer'>
                <CancelOutlinedIcon size="s"/>
              </span>
             
            </div>

          </div>

          <div className='w-full flex flex-col gap-2'>

            <FormControl fullWidth>
                <h1 className='text-xs text-[#839f55] font-bold mb-2'>Filter by Type:</h1>
                <Select
                    size='small'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={10}
                >
                <MenuItem value={10}>Mock Call / Live Chat Simulation</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <h1 className='text-xs text-[#839f55] font-bold mb-2'>Filter by Status:</h1>
                <Select
                    size='small'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={10}
                >
                <MenuItem value={10}>Active</MenuItem>
                <MenuItem value={20}>Inactive</MenuItem>
                </Select>
            </FormControl>


          </div>

          
            <div className='w-full flex flex-row justify-end gap-3'>
              
              <SaveButton title={"Filter Table"} />
   
              <CloseButton title={"Cancel"} />

            </div>
          
        </div>

      </Backdrop>
  )
}

export default FilterMockCall;