import React, { lazy, Suspense, useState, useEffect } from 'react';

import { format } from 'date-fns';
import dayjs from 'dayjs';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
  { "branch": "Ma‑A, Davao City", "address": "Luxebridge Town, Maa (Beside Sans Hotel), Davao City" },
  { "branch": "Mabini, Davao City", "address": "Araullo St., Near Red Corner / City High, Davao City" },
  { "branch": "Ecoland, Davao City", "address": "ACC Building, Quimpo Blvd., between Chowking & Green Coffee, Ecoland, Davao City" },
  { "branch": "Tiguman, Digos City", "address": "Purok Cattleya, 100m from Citta de Oro, Tiguman, Digos City" },
  { "branch": "General Santos City", "address": "4F Joji Ilagan Bldg., Leon Llido St., General Santos City" },
  { "branch": "Bulua, Cagayan de Oro City", "address": "Zone 7, near Tropical Resort (Beside Sagatech Resort), Bulua, Cagayan de Oro City" },
]

const ApplicantInvite = ({ openModal, handleClose, userData, }) => {


  const user = useSelector((state) => state.user.userData)

  const [selectedDate, setSelectedDate] = useState(null);
  const [timeFrom, setTimeFrom] = useState(null);
  const [timeTo, setTimeTo] = useState(null);

  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false);

  const handleSubmitInvite = async () => {

    setLoading(true)
    setIsError(false)

    const formattedDate = format(new Date(selectedDate), "EEEE, MMMM dd, yyyy");
    const response = await APIServices.post({
      url: '/send-applicant-invite',
      payload: {
        "toEmail": userData?.email,
        "replyToEmail": user?.email,
        "replyToName": `${user?.name} - TAS Team`,
        "name": "King Echo",
        "message": "Welcome to Six Eleven!",
        "date": formattedDate,
        "time": `${format(new Date(timeFrom), "hh:mm a")} - ${format(new Date(timeTo), "hh:mm a")}`,
        "location": "ACC Building, Quimpo Blvd., between Chowking & Green Coffee, Ecoland, Davao City",
        "branch_info": "Six Eleven Talent Acquisition Specialist",
        "applicant_name": `${userData?.first_name} ${userData?.middle_name} ${userData?.last_name}`,
        "signature": process.env.REACT_APP_API_STORAGE + user?.signature_path
      }
    });

    if (response.status === 200) {
      handleClose();
    } else {
      setLoading(false);
      setIsError(true);
    }

  }

  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={openModal}
    >

      <div className='max-w-[400px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

        <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

          <h1 className='text-sm text-[#556fa8] font-medium'>Applicant Invitation</h1>

          <div onClick={handleClose} className='flex flex-col items-center'>
            <span className='text-gray-500 cursor-pointer'>
              <CancelOutlinedIcon size="small" />
            </span>

          </div>

        </div>

        <div className='w-full flex flex-col gap-2 max-h-[500px] overscroll-y-auto overflow-y-auto'>

          <div className='flex flex-row gap-2 items-center'>
            <h1 className='text-xs text-[#839f55] font-bold mb-2'>Applicant Name:</h1>
            <h1 className='text-xs text-[#556fa8] font-bold mb-2'>{userData?.first_name} {userData?.middle_name} {userData?.last_name}</h1>
          </div>

          <div className='flex flex-row gap-2 items-center'>
            <a
              href='https://docs.google.com/document/d/1tjLjkBebS6kJwA2SzlmohWca3yXyUm3WrHeaX-2X1QQ/edit?fbclid=IwY2xjawN8X81leHRuA2FlbQIxMQBzcnRjBmFwcF9pZAEwAAEeKfdg33TYBQ1pOUjGaYKTDihB-NsOahKZW_vGuxLkUqhnGJvxy9AIb4HAA74_aem_Be85jC2n9oSbv_B-Kp5nzA&tab=t.6mtv66u27872'
              className='text-xs text-teal-500 underline font-bold mb-2'
              target='_blank'
            >
              Email Reference Template
            </a>
          </div>

          <FormControl fullWidth>
            <h1 className='text-xs text-[#839f55] font-bold mb-2'>Select Date Schedule:</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <DatePicker
                  label="Date Select"
                  slotProps={{ textField: { size: 'small' } }}
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>

          </FormControl>

          <FormControl fullWidth>

            <h1 className="text-xs text-[#839f55] font-bold mb-2">
              Select Time From Schedule:
            </h1>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker']}>
                <TimePicker
                  label="From"
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  value={timeFrom}
                  onChange={(newValue) => setTimeFrom(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>

          </FormControl>

          <FormControl fullWidth>

            <h1 className="text-xs text-[#839f55] font-bold mb-2">
              Select Time To Schedule:
            </h1>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker']}>
                <TimePicker
                  label="To"
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  value={timeTo}
                  onChange={(newValue) => setTimeTo(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>

          </FormControl>


          {isError &&
            <div className='w-full flex-col'>
              <h1 className='text-xs text-red-500 font-bold mb-2'>Please Check if the email provided is Correct : </h1>
              <h1 className='text-xs text-red-500 font-bold mb-2'>From : {user?.email}</h1>
              <h1 className='text-xs text-red-500 font-bold mb-2'>To : {userData?.email}</h1>
              <h1 className='text-xs text-red-500 font-bold mb-2'>Please Try Again</h1>
            </div>
          }

          {timeFrom && timeTo && selectedDate &&
            <div className='w-full flex flex-row justify-end gap-3 mt-5'>

              <SaveButton is_loading={loading} title={"Send Invitation"} handleClick={handleSubmitInvite} />
              <CloseButton title={"Cancel"} handleClick={handleClose} />
            </div>
          }

        </div>

      </div>

    </Backdrop>
  )
}

export default ApplicantInvite;