import React, { lazy, Suspense, useState, useEffect } from 'react';

import { format } from 'date-fns';
import dayjs from 'dayjs';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import FormControl from '@mui/material/FormControl';

import ErrorButton from '../../../../../component/Buttons/ErrorButton';
import SaveButton from '../../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../../component/Buttons/CloseButton';

import { APIServices } from '../../../../../contants/apiConfig';

import { handleTimeFormat } from '../../../../../contants/contans';

import { useSelector } from 'react-redux';

let branchLocation = [
  { "branch": "Ma‑A, Davao City", "address": "𝐌𝐚-𝐀, 𝐃𝐚𝐯𝐚𝐨 𝐂𝐢𝐭𝐲 — Luxebridge Town, Maa (Beside Sans Hotel), Davao City" },
  { "branch": "Mabini, Davao City", "address": "𝐌𝐚𝐛𝐢𝐧𝐢, 𝐃𝐚𝐯𝐚𝐨 𝐂𝐢𝐭𝐲 — Araullo St., Near Red Corner / City High, Davao City" },
  { "branch": "𝐆𝐌𝐚𝐥𝐥 𝐁𝐚𝐣𝐚𝐝𝐚, 𝐃𝐚𝐯𝐚𝐨 𝐂𝐢𝐭𝐲", "address": "𝐆𝐌𝐚𝐥𝐥 𝐁𝐚𝐣𝐚𝐝𝐚, 𝐃𝐚𝐯𝐚𝐨 𝐂𝐢𝐭𝐲 — 2nd Floor, near Mr. DIY (in front of GIBI / Jamora Clinic), Davao City" },
  { "branch": "Ecoland, Davao City", "address": "𝐄𝐜𝐨𝐥𝐚𝐧𝐝, 𝐃𝐚𝐯𝐚𝐨 𝐂𝐢𝐭𝐲 — ACC Building, Quimpo Blvd., between Chowking & Green Coffee, Ecoland, Davao City" },
  { "branch": "Tiguman, Digos City", "address": "𝐓𝐢𝐠𝐮𝐦𝐚𝐧, 𝐃𝐢𝐠𝐨𝐬 𝐂𝐢𝐭𝐲 — Purok Cattleya, 100m from Citta de Oro, Tiguman, Digos City" },
  { "branch": "General Santos City", "address": "𝐆𝐞𝐧𝐞𝐫𝐚𝐥 𝐒𝐚𝐧𝐭𝐨𝐬 𝐂𝐢𝐭𝐲 — 4F Joji Ilagan Bldg., Leon Llido St., General Santos City" },
  { "branch": "Bulua, Cagayan de Oro City", "address": "𝐁𝐮𝐥𝐮𝐚, 𝐂𝐚𝐠𝐚𝐲𝐚𝐧 𝐝𝐞 𝐎𝐫𝐨 𝐂𝐢𝐭𝐲 — Zone 7, near Tropical Resort (Beside Sagatech Resort), Bulua, Cagayan de Oro City" },
]

const SendContract = ({ openModal, handleClose, userData, isClickable = true, handleApplicant }) => {


  const user = useSelector((state) => state.user.userData)

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false);

  const handleSubmitContract = async (data) => {

    setLoading(true)
    setIsError(false)

    if (!data) {
      handleQualificationStatus(10);
      return;
    }

    const formattedDate = format(new Date(selectedDate), "EEEE, MMMM dd, yyyy");
    const formattedTime = format(new Date(selectedDate), "hh:mm a");

    const response = await APIServices.post({
      url: '/send-email',
      payload: {
        "branch_id": userData?.branch_id,
        "toEmail": userData?.email,
        "replyToEmail": user?.email,
        "replyToName": `${user?.name} - TAS ${selectedLocation?.branch}`,
        "name": "King Echo",
        "message": "Welcome to Six Eleven!",
        "date": formattedDate,
        "time": formattedTime,
        "location": selectedLocation?.address,
        "branch_info": `Six Eleven Talent Acquisition Specialist`,
        "signature": process.env.REACT_APP_API_STORAGE + user?.signature_path
      }
    });

    if (response.status === 200) {
      handleQualificationStatus(8)
    } else {
      setLoading(false);
      setIsError(true);
    }
  }

  const handleQualificationStatus = async (data) => {

    const response = await APIServices.post({
      url: '/create-qualification-status',
      payload: {
        "user_id": userData?.id,
        "qualification_id": data,
        "remarks": "Contract Signing Status"
      }
    });

    if (response.status === 200) {
      handleClose();
      handleApplicant();
      setLoading(false)
      setIsError(false);
    }
  }


  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={openModal}
    >

      <div className='max-w-[400px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

        <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

          <h1 className='text-sm text-[#556fa8] font-medium'>Send Contract Invite to Applicant</h1>

          <div onClick={handleClose} className='flex flex-col items-center'>
            <span className='text-gray-500 cursor-pointer'>
              <CancelOutlinedIcon size="small" />
            </span>

          </div>

        </div>

        <div className='w-full flex flex-col gap-2 max-h-[500px] overscroll-y-auto overflow-y-auto'>

          <FormControl fullWidth>
            <h1 className='text-xs text-[#839f55] font-bold mb-2'>Selected Schedule:</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                  label="Date & Time"
                  orientation="landscape"
                  slotProps={{ textField: { size: 'small' } }}
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>

          </FormControl>

          <FormControl fullWidth>
            <h1 className='text-xs text-[#839f55] font-bold mb-2'>Select Branch Location:</h1>
            <Select
              size='small'
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
            >
              {
                branchLocation?.map((row, index) => (
                  <MenuItem key={index} value={row}>{row.address}</MenuItem>
                ))}

            </Select>
          </FormControl>

          {isError &&
            <div className='w-full flex-col'>
              <h1 className='text-xs text-red-500 font-bold mb-2'>Please Check if the email provided is Correct : </h1>
              <h1 className='text-xs text-red-500 font-bold mb-2'>From : {user?.email}</h1>
              <h1 className='text-xs text-red-500 font-bold mb-2'>To : {userData?.email}</h1>
              <h1 className='text-xs text-red-500 font-bold mb-2'>Please Try Again</h1>
            </div>
          }

          {selectedLocation && selectedDate &&
            <div className='w-full flex flex-row justify-end gap-3 mt-5'>

              <SaveButton is_loading={loading} title={"Send Contract"} handleClick={() => handleSubmitContract(true)} />
              {/* <ErrorButton title={"Reject Applicant"} handleClick={() => handleSubmitContract(false)} /> */}
              <CloseButton handleClick={handleClose} title={"Close"} />


            </div>
          }

        </div>

      </div>

    </Backdrop>
  )
}

export default SendContract;