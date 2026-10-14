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

import ErrorButton from '../../../../component/Buttons/ErrorButton';
import CloseButton from '../../../../component/Buttons/CloseButton';
import SaveButton from '../../../../component/Buttons/SaveButton';
import { APIServices } from '../../../../contants/apiConfig';

import { useSelector } from 'react-redux';

let branchLocation = [
    { "branch": "Ma‑A, Davao City", "address": "Luxebridge Town, Maa (Beside Sans Hotel), Davao City" },
    { "branch": "Mabini, Davao City", "address": "Araullo St., Near Red Corner / City High, Davao City" },
    { "branch": "Ecoland, Davao City", "address": "ACC Building, Quimpo Blvd., between Chowking & Green Coffee, Ecoland, Davao City" },
    { "branch": "Tiguman, Digos City", "address": "Purok Cattleya, 100m from Citta de Oro, Tiguman, Digos City" },
    { "branch": "General Santos City", "address": "4F Joji Ilagan Bldg., Leon Llido St., General Santos City" },
    { "branch": "Bulua, Cagayan de Oro City", "address": "Zone 7, near Tropical Resort (Beside Sagatech Resort), Bulua, Cagayan de Oro City" },
]

const ViewReadyHrExam = ({ openModal, handleClose, userData, handleApplicant }) => {


    const user = useSelector((state) => state.user.userData)
    const [loading, setLoading] = useState(false)


    const handleQualificationStatus = async (data) => {

        const response = await APIServices.post({
            url: '/create-qualification-status',
            payload: {
                "user_id": userData?.id,
                "qualification_id": 14,
                "remarks": "Start HR Onboarding Ongoing"
            }
        });

        if (response.status === 200) {
            handleClose();
            handleApplicant();
            setLoading(false)
        }
    }


    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[400px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Start Exam : {userData?.last_name} , {userData?.first_name} {userData?.middle_name}</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="small" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2 max-h-[500px] overscroll-y-auto overflow-y-auto'>

                    <div className='w-full flex flex-row justify-end gap-3 mt-5'>

                        <SaveButton is_loading={loading} title={"Start Exam"} handleClick={() => handleQualificationStatus(true)} />
                        <CloseButton title={"Close"} handleClick={handleClose} />
                    </div>


                </div>

            </div>

        </Backdrop>
    )
}

export default ViewReadyHrExam;