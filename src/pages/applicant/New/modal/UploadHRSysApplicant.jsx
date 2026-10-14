import React, { lazy, Suspense, useState, useEffect } from 'react';

import { format } from 'date-fns';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import Rating from '@mui/material/Rating';

import ErrorButton from '../../../../component/Buttons/ErrorButton';
import SaveButton from '../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../component/Buttons/CloseButton';


import { APIServices } from '../../../../contants/apiConfig';

import { handleTimeFormat } from '../../../../contants/contans';

const UploadHRSysApplicant = ({ openModal, handleClose, userData, handleApplicant }) => {

    const [verifyState, setVerifyState] = useState({
        loading: false,
        message: null,
        verifying_state: false,
        upload_loading: false,
        upload_message: null
    });

    const handleVerifyApplicant = async () => {

        setVerifyState(prev => ({
            ...prev,
            loading: true,
            message: null,
        }));

        // let apiURL = `https://dev.teaconcepts.net/TKV3/api/tas/?act=fetch_user&ac=611&ak=546453435asd23asd143asdk23kj4h5y4gh23&
        //         fname=${userData?.first_name}
        //         &mname=${userData?.middle_name}
        //         &lname=${userData?.last_name}
        //         &mobile_no=${userData?.contact_number}
        //         &email=${userData?.email}
        //        `
        //     ;

        let apiURL = `https://611systems.com/api/tas/?act=fetch_user&ac=611&ak=546453435asd23asd143asdk23kj4h5y4gh23&
                fname=${userData?.first_name}
                &mname=${userData?.middle_name}
                &lname=${userData?.last_name}
                &mobile_no=${userData?.contact_number}
                &email=${userData?.email}
               `
            ;

        fetch(apiURL)
            .then(res => res.json())
            .then(data => {

                let is_verify = false;
                if (data?.stat === "ok" || data?.stat === "user_not_found") is_verify = true;

                setVerifyState(prev => ({
                    ...prev,
                    loading: false,
                    message: data,
                    verifying_state: is_verify
                }));


            })
            .catch(err => console.error(err));
    }


    const handleVerifyAssID = async (content) => {

        setVerifyState(prev => ({
            ...prev,
            upload_loading: true,
            message: null
        }));


        let {
            first_name, middle_name, last_name,
            contact_number, email, current_address,
            civil_status, permanent_address,
            father_name, mother_name, parents_home_address,
            emergency_contact_address, emergency_contact_name, emergency_contact_number,
            gender, birthday, ass_id
        } = userData;

        const baseParams = {
            fname: first_name,
            mname: middle_name,
            lname: last_name,
            mobile_no: contact_number,
            email,
            address: current_address,
            civilstatus: civil_status,
            permanent_address,
            father_name,
            mother_name,
            parent_address: parents_home_address,
            emergency_contact: `${emergency_contact_name} ${emergency_contact_number} ${emergency_contact_address}`,
            gender,
            birthdate: birthday,
        };

        // const baseURL = "https://dev.teaconcepts.net/TKV3/api/tas/";
        const baseURL = "https://611systems.com/api/tas/";
        const params = new URLSearchParams({
            act: ass_id ? "activate_user" : "register_user",
            ac: "611",
            ak: "546453435asd23asd143asdk23kj4h5y4gh23",
            ...(ass_id && { ass_id }), // only add if exists
            ...baseParams,
        });

        const apiURL = `${baseURL}?${params.toString()}`;


        fetch(apiURL)
            .then(res => res.json())
            .then(data => {

                setVerifyState(prev => ({
                    ...prev,
                    upload_loading: false,
                }));

                if (data?.stat === "ok") handleApproval();
                else {
                    setVerifyState(prev => ({
                        ...prev,
                        upload_message: data,
                    }));
                }

            })
            .catch(err => console.error(err));
    }


    const handleApproval = async (data = true) => {
        let checker = 17;

        const response = await APIServices.post({
            url: '/create-qualification-status',
            payload: {
                "user_id": userData?.id,
                "qualification_id": checker,
                "remarks": "Applicant added in HRSys"
            }
        });

        if (response.status === 200) {
            handleClose();
            handleApplicant();
        }
    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2 '>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Upload Applicant to HRSys</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="small" />
                        </span>

                    </div>

                </div>

                <div className='max-h-[700px] overscroll-y-auto overflow-y-auto w-full gap-2'>

                    <div className='w-full flex flex-col gap-3'>

                        <div className='w-full flex flex-col gap-3 p-2 border-2  border-gray-200 border-dashed rounded-lg'>

                            <h1 className='text-xs text-[#839f55] font-medium'>Personal Information</h1>

                            <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>

                                <div className='w-full flex flex-row gap-2'>
                                    <h1 className='text-sm text-gray-400 font-medium'>Full Name : </h1>
                                    <h1 className='text-sm text-[#556fa8] font-medium'>{userData?.last_name} , {userData?.first_name} {userData?.middle_name}</h1>
                                </div>

                            </div>

                            <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>

                                <div className='w-full flex flex-row gap-2'>
                                    <h1 className='text-sm text-gray-400 font-medium'>Email : </h1>
                                    <h1 className='text-sm text-[#556fa8] font-medium'>{userData?.email}</h1>
                                </div>

                            </div>

                            <div className='w-full flex flex-row gap-2 py-[2px]'>
                                <h1 className='text-sm text-gray-400 font-medium'>Current Address : </h1>
                                <h1 className='text-sm text-[#556fa8] font-medium'>{userData?.current_address}</h1>
                            </div>


                            <div className='w-full flex flex-row gap-2 py-[2px]'>
                                <h1 className='text-sm text-gray-400 font-medium'>Permanent Address : </h1>
                                <h1 className='text-sm text-[#556fa8] font-medium'>{userData?.permanent_address}</h1>
                            </div>

                            <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>

                                <div className='w-full flex flex-row gap-2'>
                                    <h1 className='text-sm text-gray-400 font-medium'>Contact No. : </h1>
                                    <h1 className='text-sm text-[#556fa8] font-medium'>{userData?.contact_number}</h1>
                                </div>

                                <div className='w-full flex flex-row gap-2'>
                                    <h1 className='text-sm text-gray-400 font-medium'>Gender : </h1>
                                    <h1 className='text-sm text-[#556fa8] font-medium'>{userData?.gender}</h1>
                                </div>
                            </div>

                            <div className='w-full flex flex-row gap-2 items-center  justify-between py-[2px]'>

                                <div className='w-full flex flex-row gap-2'>
                                    <h1 className='text-sm text-gray-400 font-medium'>Birthday : </h1>
                                    <h1 className='text-sm text-[#556fa8] font-medium'>{userData?.birthday}</h1>
                                </div>

                                <div className='w-full flex flex-row gap-2'>
                                    <h1 className='text-sm text-gray-400 font-medium'>Age : </h1>
                                    <h1 className='text-sm text-[#556fa8] font-medium'>{userData?.age}</h1>
                                </div>

                            </div>

                            <div className='w-full flex flex-row gap-2 items-center  justify-between py-[2px]'>

                                <div className='w-full flex flex-row gap-2'>
                                    <h1 className='text-sm text-gray-400 font-medium'>Civil Status : </h1>
                                    <h1 className='text-sm text-[#556fa8] font-medium'>{userData?.civil_status}</h1>
                                </div>

                                <div className='w-full flex flex-row gap-2'>
                                    <h1 className='text-sm text-gray-400 font-medium'>Branch Site : </h1>
                                    <h1 className='text-sm text-[#556fa8] font-medium'>{userData?.branch_name}</h1>
                                </div>

                            </div>

                        </div>

                        <div className='w-full flex flex-col gap-3 p-2 border-2  border-gray-200 border-dashed rounded-lg'>

                            <h1 className='text-xs text-[#839f55] font-medium'>Contact Information</h1>

                            <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>

                                <div className='w-full flex flex-row gap-2'>
                                    <h1 className='text-sm text-gray-400 font-medium'>Father Name : </h1>
                                    <h1 className='text-sm text-[#556fa8] font-medium'>{userData?.father_name}</h1>
                                </div>
                            </div>

                            <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>
                                <div className='w-full flex flex-row gap-2'>
                                    <h1 className='text-sm text-gray-400 font-medium'>Mother Name : </h1>
                                    <h1 className='text-sm text-[#556fa8] font-medium'>{userData?.mother_name}</h1>
                                </div>
                            </div>

                            <div className='w-full flex flex-row gap-2 py-[2px]'>
                                <h1 className='text-sm text-gray-400 font-medium'>Parents Address : </h1>
                                <h1 className='text-sm text-[#556fa8] font-medium'>{userData?.parents_home_address}</h1>
                            </div>


                            <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>

                                <div className='w-full flex flex-row gap-2'>
                                    <h1 className='text-sm text-gray-400 font-medium'>Emergency Contact Name : </h1>
                                    <h1 className='text-sm text-[#556fa8] font-medium'>{userData?.emergency_contact_name}</h1>
                                </div>
                            </div>

                            <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>
                                <div className='w-full flex flex-row gap-2'>
                                    <h1 className='text-sm text-gray-400 font-medium'>Emergency Contact Number : </h1>
                                    <h1 className='text-sm text-[#556fa8] font-medium'>{userData?.emergency_contact_number}</h1>
                                </div>
                            </div>

                            <div className='w-full flex flex-row gap-2 py-[2px]'>
                                <h1 className='text-sm text-gray-400 font-medium'>Emergency Contact Address : </h1>
                                <h1 className='text-sm text-[#556fa8] font-medium'>{userData?.emergency_contact_address}</h1>
                            </div>

                        </div>

                    </div>

                    {verifyState?.message &&
                        <div className='w-full flex flex-row gap-2 py-[2px] items-center my-2'>
                            <h1 className='text-sm text-gray-400 font-medium'>Message : </h1>
                            <h1 className='text-black text-xs font-semibold border border-blue-500 p-[3px] text-center border-dashed rounded px-2 bg-blue-100'>
                                {
                                    verifyState?.message?.stat === "ok" || verifyState?.message?.stat === "user_not_found" ?
                                        "Ready for HRSys Upload" : verifyState?.message?.statMsg
                                }
                            </h1>

                        </div>
                    }

                    {verifyState?.message?.data && verifyState?.message?.stat !== "ok" && (
                        <ul className="text-red-500 text-sm">
                            {Object.values(verifyState.message.data).map((msg, index) => (
                                <li key={index}>{msg}</li>
                            ))}
                        </ul>
                    )}

                    {verifyState?.upload_message &&
                        <div className='w-full flex flex-row gap-2 py-[2px] items-center my-2'>
                            <h1 className='text-sm text-gray-400 font-medium'>Message : </h1>
                            <h1 className='text-black text-xs font-semibold border border-blue-500 p-[3px] text-center border-dashed rounded px-2 bg-blue-100'>
                                {
                                    verifyState?.upload_message?.statMsg
                                }
                            </h1>

                        </div>
                    }


                    {!verifyState?.verifying_state &&
                        <div className='w-full flex flex-row justify-end gap-3 mt-5'>


                            <SaveButton title={"Verify Applicant"} is_loading={verifyState?.loading} handleClick={handleVerifyApplicant} />
                            <CloseButton handleClick={handleClose} title={"Cancel"} />

                        </div>
                    }

                    {verifyState?.verifying_state &&
                        <div className='w-full flex flex-row justify-end gap-3 mt-5'>

                            <SaveButton title={"Upload Applicant to HRSys"} is_loading={verifyState?.upload_loading} handleClick={handleVerifyAssID} />
                            <CloseButton handleClick={handleClose} title={"Cancel"} />

                        </div>
                    }


                </div>

            </div>

        </Backdrop>
    )
}

export default UploadHRSysApplicant;