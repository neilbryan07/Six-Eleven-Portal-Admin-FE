import React from 'react'

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Button, Box, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';

const ViewAdmin = ({ selectedData, openAppInfo, handleCloseForgot }) => {


    const handleStatus = (data) => {

        if (data) return <h1 className={`text-green-500 text-xs font-semibold mt-[3px]`}>Active</h1>
        else return <h1 className={`text-red-500 text-xs font-semibold mt-[3px]`}>Inactive</h1>
    }

    const handleClick = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy:', err);
            });
    };




    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openAppInfo}
        >

            <div className='max-w-[550px] w-full p-4 bg-white rounded-lg flex flex-col gap-3'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Admin Information</h1>

                    <div onClick={handleCloseForgot} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="small" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-3 p-2 border-2  border-gray-200 border-dashed rounded-lg'>

                    <h1 className='text-xs text-[#839f55] font-medium'>Personal Information</h1>

                    <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>

                        <div className='w-full flex flex-row gap-2'>
                            <h1 className='text-sm text-gray-400 font-medium'>Full Name : </h1>
                            <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.first_name} {selectedData?.middle_name} {selectedData?.last_name}</h1>
                        </div>

                    </div>

                    <div className='w-full flex flex-row gap-2 items-center justify-between py-[2px]'>

                        <div className='w-full flex flex-row gap-2'>
                            <h1 className='text-sm text-gray-400 font-medium'>Email : </h1>
                            <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.email}</h1>
                        </div>

                    </div>

                    <div className='w-full flex flex-row gap-2 py-[2px]'>
                        <h1 className='text-sm text-gray-400 font-medium'>Branch Site : </h1>
                        <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.branch_name}</h1>
                    </div>


                    <div className='w-full flex flex-row gap-2 py-[2px]'>
                        <h1 className='text-sm text-gray-400 font-medium'>Role : </h1>
                        <h1 className='text-sm text-[#556fa8] font-medium'>{selectedData?.portal_role_name}</h1>
                    </div>

                    {selectedData?.portal_role_id === 6 || selectedData?.portal_role_id === 1 &&
                        <div className='w-full flex flex-row gap-2 py-[2px] items-center'>
                            <h1 className='text-sm text-gray-400 font-medium'>Referral Code : </h1>
                            {selectedData?.ref_code &&
                                <Chip label="611-X5Y2" color="warning" onClick={e => handleClick("611-X5Y2")} />
                            }
                        </div>
                    }

                    <div className='w-full flex flex-row gap-2 py-[2px]'>
                        <h1 className='text-sm text-gray-400 font-medium'>Status : </h1>
                        <h1 className='text-sm text-[#556fa8] font-medium'>{handleStatus(selectedData?.status)}</h1>
                    </div>

                    <Box sx={{ mb: 2 }}>
                        {selectedData?.signature_path ?
                            <div className='flex flex-col gap-2 relative w-full'>
                                <img src={`${process.env.REACT_APP_API_STORAGE}${selectedData?.signature_path}`} alt="preview" className="max-w-full h-auto rounded" />
                                {/* <h1 className='text-sm text-[#839f55] font-bold'>{rowData?.file_name}</h1> */}
                            </div>

                            : null
                        }
                    </Box>

                </div>

            </div>

        </Backdrop >
    )
}

export default ViewAdmin;