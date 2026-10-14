import { useState } from 'react'

import TextField from '@mui/material/TextField';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import FormControl from '@mui/material/FormControl';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Switch from '@mui/material/Switch';

import SaveButton from '../../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../../component/Buttons/CloseButton';

import { APIServices } from '../../../../../contants/apiConfig';


const EditAudio = ({ openModal, handleClose, reFreshTable, rowData }) => {

  const [audioName, setAudioName] = useState(rowData?.verbal_content_name);
  const [audioContent, setAudioContent] = useState(rowData?.verbal_content_text);
  const [isActive, setIsActive] = useState(rowData?.is_active);
  const [loading , setLoading] = useState(false)

  const handleToggle = (event) => {
    setIsActive(event.target.checked ? 1 : 0);
  };

  const handleEditAudio = async () => {

    setLoading(true);

    const response = await APIServices.put({
      url: '/verbal/update-verbal-content', payload: {
        "id": rowData?.id,
        "verbal_content_name": audioName,
        "verbal_content_text": audioContent,
        "is_active" : isActive
      }
    });

    if (response.status === 200) {
      reFreshTable();
      handleClose()
    } else {
          setLoading(false);
    }
  }


  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={openModal}
    >
      <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

        <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

          <h1 className='text-sm text-[#556fa8] font-medium'>Edit Audio Simulation</h1>

          <div onClick={handleClose} className='flex flex-col items-center'>
            <span className='text-gray-500 cursor-pointer'>
              <CancelOutlinedIcon size="s" />
            </span>

          </div>

        </div>

        <div className='w-full flex flex-col gap-2'>

          <div className='flex flex-col gap-2'>
            <h1 className='text-xs text-[#839f55] font-bold'>Audio Name:</h1>
            <TextField id="outlined-basic" variant="outlined" size='small' value={audioName} onChange={(e) => setAudioName(e.target.value)} />
          </div>


          <div className='flex flex-col gap-2'>
            <h1 className='text-xs text-[#839f55] font-bold'>Audio Content:</h1>
            <TextField id="outlined-basic" multiline variant="outlined" size='small' defaultValue={audioContent} onChange={(e) => setAudioContent(e.target.value)} />
          </div>

          <FormControl fullWidth>
            <h1 className='text-xs text-[#839f55] font-bold mb-2'>Audio Type:</h1>
            <Select
              size='small'
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={10}
            >
              <MenuItem value={10}>Verbal Communication & Pronunciation</MenuItem>
            </Select>
          </FormControl>

          <div className='flex flex-col gap-2'>
            <h1 className='text-xs text-[#839f55] font-bold'>Status:</h1>

            <div className='flex flex-row gap-2 items-center'>
              <h1 className='text-sm text-gray-500 font-normal'>Inactive</h1>
              <Switch
                checked={isActive === 1}
                onChange={handleToggle}
                color="success"
              />
              <h1 className='text-sm text-green-500 font-normal'>Active</h1>
            </div>

          </div>

          <div className='w-full flex flex-row justify-end gap-3'>

            <SaveButton is_loading={loading} handleClick={handleEditAudio} title={"Save Audio Simulation"} />

            <CloseButton title={"Cancel"} />

          </div>

        </div>

      </div>

    </Backdrop>
  )
}

export default EditAudio;