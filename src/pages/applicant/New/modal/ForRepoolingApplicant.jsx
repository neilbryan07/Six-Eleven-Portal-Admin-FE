import React, { lazy, Suspense, useState, useEffect } from 'react';

import { format } from 'date-fns';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TextField from '@mui/material/TextField';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


import ErrorButton from '../../../../component/Buttons/ErrorButton';
import SaveButton from '../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../component/Buttons/CloseButton';

import { APIServices } from '../../../../contants/apiConfig';

import { handleTimeFormat } from '../../../../contants/contans';

import { useSelector } from 'react-redux';

const ViewQualificationLog = lazy(() => import('./ViewQualificationLog'));

const RepoolingOption = [
    { id: 1, name: "TAS Assessment Pending" },
    { id: 13, name: "TAS Assessment Approved" },
    { id: 6, name: "TD Approved" },
    { id: 15, name: "HR Onboarding Completed" },

]

const ForRepoolingApplicant = ({ openModal, handleClose, userData, handleApplicant }) => {

    const user = useSelector((state) => state.user.userData)
    const [viewQualification, setViewQualification] = useState(false);
    const [remarks, setRemarks] = useState("");
    const [repoolType, setRepoolType] = useState("");
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleApproval = async (data) => {
        setLoading(true);
        const response = await APIServices.post({
            url: '/create-qualification-status',
            payload: {
                "user_id": userData?.id,
                "qualification_id": repoolType,
                "remarks": remarks
            }
        });

        if (response.status === 200) {
            setLoading(false);
            handleClose();
            handleApplicant();
        }
    }

    const handleCloseQualification = () => {
        setViewQualification(false)
    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <Suspense>
                {viewQualification && <ViewQualificationLog openAppInfo={viewQualification} handleCloseForgot={handleCloseQualification} selectedData={userData} />}
            </Suspense>

            <div className='max-w-[550px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Repooling Applicant Approval</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="small" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2 max-h-[500px] overscroll-y-auto overflow-y-auto'>


                    <div className='w-full flex flex-row items-center justify-between gap-3'>

                        <Tooltip title="View Applicant Remarks History">
                            <div onClick={e => setViewQualification(true)} className='flex flex-row items-center gap-3 border border-green-700 p-2 border-dashed rounded cursor-pointer'>
                                <span className='text-[#839f55]'><AccountCircleOutlinedIcon /></span>
                                <h1 className='text-[#556fa8] font-semibold'>{userData?.last_name} , {userData?.first_name} {userData?.middle_name} </h1>
                            </div>
                        </Tooltip>

                        <div className='flex flex-row items-center gap-3'>

                            <span className='text-[#839f55]'><AccessTimeOutlinedIcon /></span>
                            <h1 className='text-[#556fa8] font-semibold'>Started: {handleTimeFormat(userData?.created_at)}</h1>

                        </div>

                    </div>


                    <div className='w-full flex flex-col gap-2'>

                        <FormControl fullWidth>
                            <h1 className='text-xs text-[#839f55] font-bold mb-2'>Select Repooling Type</h1>
                            <Select
                                size='small'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={(e) => setRepoolType(e.target.value)}
                            >
                                {RepoolingOption.map((row, index) => (
                                    <MenuItem key={index} value={row?.id}>{row?.name}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>

                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <TextField
                            label="Remarks"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            value={remarks} // controlled value
                            onChange={(e) => setRemarks(e.target.value)} // update state
                        />
                    </div>

                    {isError &&
                        <div className='w-full flex-col'>
                            <h1 className='text-xs text-red-500 font-bold mb-2'>Please Check if the email provided is Correct : </h1>
                            <h1 className='text-xs text-red-500 font-bold mb-2'>From : {user?.email}</h1>
                            <h1 className='text-xs text-red-500 font-bold mb-2'>To : {userData?.email}</h1>
                            <h1 className='text-xs text-red-500 font-bold mb-2'>Please Try Again</h1>
                        </div>
                    }

                    {remarks && repoolType &&
                        <div className='w-full flex flex-row justify-end gap-3 mt-5'>

                            <SaveButton title={"Process Applicant"} is_loading={loading} handleClick={handleApproval} />
                            <CloseButton title={"Close"} handleClick={handleClose} />

                        </div>
                    }


                </div>

            </div>

        </Backdrop>
    )
}

export default ForRepoolingApplicant;