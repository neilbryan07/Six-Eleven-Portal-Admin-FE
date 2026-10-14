import React, { useState, useEffect } from 'react'

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import CloseButton from '../../../../component/Buttons/CloseButton';

import { APIServices } from '../../../../contants/apiConfig';


const ViewJobPreference = ({ openModal, handleClose, selectedData }) => {

    const [jobList, setJobList] = useState(null);


    const handleFetchJobs = async () => {

        const response = await APIServices.get({
            url: `/user-job-preferences?user_id=${selectedData?.id}`
        });

        if (response.status === 200) {
            setJobList(response?.data);
        }

    }

    useEffect(() => {
        handleFetchJobs();
    }, [selectedData]);

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>View Job Preference Content ( {jobList?.user_name} )</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2'>

                    {jobList?.job_preferences?.map((row, index) => (

                        <React.Fragment>

                            <div className='flex flex-col gap-2'>
                                <h1 className='text-xs text-[#839f55] font-bold'>Job name:</h1>
                                <h1 className='text-sm text-[#556fa8] font-bold'>{row?.job_position}</h1>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <h1 className='text-xs text-[#839f55] font-bold'>Job Compensation Plan:</h1>
                                <h1 className='text-sm text-[#556fa8] font-bold'>{row?.compensation_plan}</h1>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <h1 className='text-xs text-[#839f55] font-bold'>Time of Work:</h1>
                                <h1 className='text-sm text-[#556fa8] font-bold'>{row?.time_of_work}</h1>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <h1 className='text-xs text-[#839f55] font-bold'>Job Description:</h1>
                                <h1 className='text-sm text-[#556fa8] font-bold'>{row?.job_description}</h1>
                            </div>

                        </React.Fragment>

                    ))}

                    <div className='w-full flex flex-row justify-end gap-3 mt-2'>
                        <CloseButton handleClick={handleClose} title={"Cancel"} />
                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default ViewJobPreference;