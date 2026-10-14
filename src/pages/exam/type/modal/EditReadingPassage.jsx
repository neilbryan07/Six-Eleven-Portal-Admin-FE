import { useState } from 'react'

import TextField from '@mui/material/TextField';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import FormControl from '@mui/material/FormControl';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Switch from '@mui/material/Switch';

import SaveButton from '../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../component/Buttons/CloseButton';

import { APIServices } from '../../../../contants/apiConfig';

const EditReadingPassage = ({ openModal, handleClose, rowData }) => {

  const [audioName, setAudioName] = useState(rowData?.reading_passage_name);
  const [audioContent, setAudioContent] = useState(rowData?.text);
  const [loading , setLoading] = useState(false)

  const handleEditAudio = async () => {

    setLoading(true)

    const response = await APIServices.post({
      url: '/mcq-admin/reading-passage-create', payload: {
        "id": rowData?.id,
        "reading_passage_name": audioName,
        "text": audioContent

      }
    });

    if (response.status === 200) {
      handleClose()
    } else {
      setLoading(false)
    }

  }


  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={openModal}
    >

      <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

        <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

          <h1 className='text-sm text-[#556fa8] font-medium'>Edit Read Comprehension</h1>

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


          <div className='flex flex-col gap-2'>
            <h1 className='text-xs text-[#839f55] font-bold'>Read Passage Content:</h1>
            <TextField id="outlined-basic" multiline variant="outlined" size='small' defaultValue={audioContent} onChange={(e) => setAudioContent(e.target.value)} />
          </div>

          <div className='w-full flex flex-row justify-end gap-3'>

            <SaveButton is_loading={loading} handleClick={handleEditAudio} title={"Save Content"} />

            <CloseButton title={"Cancel"} />

          </div>

        </div>

      </div>

    </Backdrop>
  )
}

export default EditReadingPassage;