import React, { lazy, Suspense, useState, useEffect } from 'react';

import { format } from 'date-fns';
import dayjs from 'dayjs';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

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

const TrainingSchedule = ({ openModal, handleClose, userData, isClickable = true, handleApplicant }) => {


  const user = useSelector((state) => state.user.userData)

  const [formData, setFormData] = useState({
    site_location: "",
    person_to_look: "",
    remarks: "",
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [timeFrom, setTimeFrom] = useState(null);
  const [timeTo, setTimeTo] = useState(null);

  const [loading, setLoading] = useState(false)
  const [loadingError, setLoadingError] = useState(false)
  const [isError, setIsError] = useState(false);

  const handleSubmitContract = async () => {

    setLoading(true);
    setIsError(false);

    const errorMessage = validateForm();

    if (errorMessage) {
      setIsError(true);
      setLoading(false);
      console.error(errorMessage); // or toast(errorMessage)
      return;
    }

    let formDataSetup = {
      "toEmail": userData?.email,
      "replyToEmail": user?.email,
      "replyToName": `${user?.name} - TAS Team`,
      "name": "King Echo",
      "message": "Welcome to Six Eleven!",
      "date": format(new Date(selectedDate), "EEEE, MMMM dd, yyyy"),
      "time": `${format(new Date(timeFrom), "hh:mm a")} - ${format(new Date(timeTo), "hh:mm a")}`,
      "location": formData?.site_location,
      "branch_info": "Six Eleven Talent Acquisition Specialist",
      "trainer": formData?.person_to_look,
      "tas_name": `${user?.name}`,
      "job_title": "IS Security Analyst",
      "site": formData?.site_location,
      "signature": process.env.REACT_APP_API_STORAGE + user?.signature_path
    }

    const response = await APIServices.post({
      url: '/send-training-schedule',
      payload: formDataSetup
    });

    if (response.status === 200) {
      handleQualificationStatus(5)
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
        "remarks": formData?.remarks
      }
    });

    if (response.status === 200) {
      handleClose();
      handleApplicant();
      setLoading(false)
      setIsError(false);
      setLoadingError(false);
    }
  }

  const validateForm = () => {
    if (!formData.site_location.trim()) {
      return "Site location is required";
    }

    if (!formData.person_to_look.trim()) {
      return "Person to look for is required";
    }

    if (!selectedDate) {
      return "Date is required";
    }

    if (!timeFrom) {
      return "Start time is required";
    }

    if (!timeTo) {
      return "End time is required";
    }

    return null; // valid
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={openModal}
    >

      <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

        <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

          <h1 className='text-sm text-[#556fa8] font-medium'>Applicant Training Schedule</h1>

          <div onClick={handleClose} className='flex flex-col items-center'>
            <span className='text-gray-500 cursor-pointer'>
              <CancelOutlinedIcon size="small" />
            </span>

          </div>

        </div>

        <div className='w-full flex flex-col gap-2 max-h-[500px] overscroll-y-auto overflow-y-auto'>

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

          <FormControl fullWidth>

            <h1 className="text-xs text-[#839f55] font-bold mb-3">
              Site Location:
            </h1>

            <TextField
              id="outlined-basic"
              label="Enter names..."
              variant="outlined"
              size='small'
              name="site_location"
              value={formData?.site_location}
              onChange={handleChange}
            />

          </FormControl>

          <FormControl fullWidth>

            <h1 className="text-xs text-[#839f55] font-bold mb-3">
              Person to Look for:
            </h1>

            <TextField
              id="outlined-basic"
              label="Enter names..."
              variant="outlined"
              size='small'
              multiline
              rows={3}
              name="person_to_look"
              value={formData?.person_to_look}
              onChange={handleChange}
            />

          </FormControl>


          <FormControl fullWidth>

            <h1 className="text-xs text-[#839f55] font-bold mb-3">
              Remarks:
            </h1>

            <TextField
              id="outlined-basic"
              label="Enter remarks..."
              variant="outlined"
              size='small'
              multiline
              rows={3}
              name="remarks"
              value={formData?.remarks}
              onChange={handleChange}
            />

          </FormControl>


          {isError &&
            <div className='w-full flex-col'>
              <h1 className='text-xs text-red-500 font-bold mb-2'>Please Check if the email provided is Correct : </h1>
              <h1 className='text-xs text-red-500 font-bold mb-2'>From : {user?.email}</h1>
              <h1 className='text-xs text-red-500 font-bold mb-2'>To : {userData?.email}</h1>
              <h1 className='text-xs text-red-500 font-bold mb-2'>Please Try Again</h1>
              <h1 className='text-xs text-red-500 font-bold mb-2'>Please fill up all the form input</h1>
            </div>
          }

          {/* { selectedLocation && selectedDate &&  */}
          <div className='w-full flex flex-row justify-end gap-3 mt-5'>

            <SaveButton is_loading={loading} title={"Set Schedule"} handleClick={handleSubmitContract} />
            <CloseButton title={"Close"} handleClick={handleClose} />
          </div>
          {/* } */}

        </div>

      </div>

    </Backdrop>
  )
}

export default TrainingSchedule;