import React from 'react'

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ViewApplicantInformation = ({ selectedData, openAppInfo, handleCloseForgot }) => {

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openAppInfo}
        >

            <div className='max-w-[550px] max-h-[700px] w-full p-4 bg-white rounded-lg flex flex-col gap-3'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Applicant Information</h1>

                    <div onClick={handleCloseForgot} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="small" />
                        </span>

                    </div>

                </div>

                <div className='w-full overscroll-y-auto overflow-y-auto overscroll-x-auto overflow-x-auto'>

                    <div className='w-full flex flex-col gap-3 p-2 border-2  border-gray-200 border-dashed rounded-lg'>

                        <h1 className='text-xs text-[#839f55] font-medium'>Personal Information</h1>

                        <div className='w-full flex-col flex h-full  p-[3px] text-center items-center'>

                            {selectedData?.profile_file &&
                                <img src={`${process.env.REACT_APP_API_STORAGE}${selectedData?.profile_file?.file_path}`} alt="preview" className="w-[150px] h-[150px] rounded" />
                            }
                        </div>


                        <div className='w-full flex flex-row items-center justify-between'>

                            <div className='w-2/3 flex flex-col items-start gap-2'>

                                <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>

                                    <div className='w-full flex flex-row gap-2'>
                                        <h1 className='text-sm text-gray-400 font-medium'>Full Name : </h1>
                                        <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.last_name} , {selectedData?.first_name} {selectedData?.middle_name} </h1>
                                    </div>

                                </div>

                                <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>

                                    <div className='w-full flex flex-row gap-2'>
                                        <h1 className='text-sm text-gray-400 font-medium'>Email : </h1>
                                        <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.email}</h1>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className='w-full flex flex-row gap-2 py-[2px]'>
                            <h1 className='text-sm text-gray-400 font-medium'>Current Address : </h1>
                            <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.current_address}</h1>
                        </div>


                        <div className='w-full flex flex-row gap-2 py-[2px]'>
                            <h1 className='text-sm text-gray-400 font-medium'>Permanent Address : </h1>
                            <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.permanent_address}</h1>
                        </div>

                        <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>

                            <div className='w-full flex flex-row gap-2'>
                                <h1 className='text-sm text-gray-400 font-medium'>Contact No. : </h1>
                                <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.contact_number}</h1>
                            </div>

                            <div className='w-full flex flex-row gap-2'>
                                <h1 className='text-sm text-gray-400 font-medium'>Gender : </h1>
                                <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.gender}</h1>
                            </div>
                        </div>

                        <div className='w-full flex flex-row gap-2 items-center  justify-between py-[2px]'>

                            <div className='w-full flex flex-row gap-2'>
                                <h1 className='text-sm text-gray-400 font-medium'>Birthday : </h1>
                                <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.birthday}</h1>
                            </div>

                            <div className='w-full flex flex-row gap-2'>
                                <h1 className='text-sm text-gray-400 font-medium'>Age : </h1>
                                <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.age}</h1>
                            </div>

                        </div>

                        <div className='w-full flex flex-row gap-2 items-center  justify-between py-[2px]'>

                            <div className='w-full flex flex-row gap-2'>
                                <h1 className='text-sm text-gray-400 font-medium'>Civil Status : </h1>
                                <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.civil_status}</h1>
                            </div>

                            <div className='w-full flex flex-row gap-2'>
                                <h1 className='text-sm text-gray-400 font-medium'>Branch Site : </h1>
                                <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.branch_name}</h1>
                            </div>

                        </div>

                    </div>

                    <div className='w-full flex flex-col gap-3 p-2 border-2  border-gray-200 border-dashed rounded-lg'>

                        <h1 className='text-xs text-[#839f55] font-medium'>Contact Information</h1>

                        <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>

                            <div className='w-full flex flex-row gap-2'>
                                <h1 className='text-sm text-gray-400 font-medium'>Father Name : </h1>
                                <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.father_name}</h1>
                            </div>
                        </div>

                        <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>
                            <div className='w-full flex flex-row gap-2'>
                                <h1 className='text-sm text-gray-400 font-medium'>Mother Name : </h1>
                                <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.mother_name}</h1>
                            </div>
                        </div>

                        <div className='w-full flex flex-row gap-2 py-[2px]'>
                            <h1 className='text-sm text-gray-400 font-medium'>Parents Address : </h1>
                            <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.parents_home_address}</h1>
                        </div>


                        <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>

                            <div className='w-full flex flex-row gap-2'>
                                <h1 className='text-sm text-gray-400 font-medium'>Emergency Contact Name : </h1>
                                <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.emergency_contact_name}</h1>
                            </div>
                        </div>

                        <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>
                            <div className='w-full flex flex-row gap-2'>
                                <h1 className='text-sm text-gray-400 font-medium'>Emergency Contact Number  : </h1>
                                <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.emergency_contact_number}</h1>
                            </div>
                        </div>

                        <div className='w-full flex flex-row gap-2 py-[2px]'>
                            <h1 className='text-sm text-gray-400 font-medium'>Emergency Contact Address : </h1>
                            <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.emergency_contact_address}</h1>
                        </div>

                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default ViewApplicantInformation;