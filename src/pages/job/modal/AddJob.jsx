import React, { useState, useEffect } from 'react'

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import CloseButton from '../../../component/Buttons/CloseButton';
import SaveButton from '../../../component/Buttons/SaveButton';

import { APIServices } from '../../../contants/apiConfig';

const AddJob = ({ openModal, handleClose, refreshData }) => {

    const [loading, setLoading] = useState(false)
    const [branchList, setBranchlist] = useState([])
    const [compList, setComplist] = useState([])
    const [compDetail, setCompDetail] = useState(null)

    const [form, setForm] = useState({
        job_name: "",
        job_description: "",
        job_compensation_plan: "",
        job_time_of_work: "",
        job_branch: [],
    });


    const handleAddJobs = async () => {

        setLoading(true)

        console.log(form)

        try {

            const response = await APIServices.post({
                url: '/job-preferences/create', payload: {
                    "job_position": form?.job_name,
                    "job_description": form?.job_description,
                    "job_compensation_id": form?.job_compensation_plan,
                    "time_of_work": form?.job_time_of_work,
                    "branch_ids": form.job_branch,
                }
            });

            if (response.status === 201) {
                refreshData();
                handleClose();
                setLoading(false);
            }
        } catch (error) {
            handleClose();
        }

    }


    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChangeComp = (e) => {
        const id = e.target.value;

        setForm((prev) => ({
            ...prev,
            job_compensation_plan: id,
        }));

        const selected = compList.find(item => item.id === id);
        setCompDetail(selected || null);
    };

    const handleBranchChange = (event) => {
        const {
            target: { value },
        } = event;

        setForm((prev) => ({
            ...prev,
            job_branch: typeof value === "string" ? value.split(",") : value,
        }));
    };

    const handleBranch = async () => {

        let apiURL = `/branches`

        const response = await APIServices.get({ url: apiURL });

        if (response.status === 200) {
            setBranchlist(response?.data?.data)
        }
    }


    const handleCompensations = async () => {

        let apiURL = `/job-compensations`

        const response = await APIServices.get({ url: apiURL });

        if (response.status === 200) {
            setComplist(response?.data?.data)
        }
    }


    useEffect(() => {
        handleBranch();
        handleCompensations();
    }, [form]);


    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className="max-w-[500px] w-full max-h-[600px] overflow-y-auto p-4 bg-white rounded-lg flex flex-col gap-2">

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Add Job Preference Content</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2'>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Job Name</h1>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size='small'
                            name="job_name"
                            value={form.job_name}
                            onChange={handleChange}
                        />
                    </div>


                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Time of Work:</h1>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size='small'
                            name="job_time_of_work"
                            value={form.job_time_of_work}
                            onChange={handleChange}
                        />
                    </div>


                    <div className='w-full flex flex-col gap-2'>

                        <FormControl fullWidth>
                            <h1 className='text-xs text-[#839f55] font-bold mb-2'>Select Compensation Plan:</h1>
                            <Select
                                size="small"
                                name="job_compensation_plan"
                                value={form.job_compensation_plan}
                                onChange={handleChangeComp}
                            >
                                {compList.map((row) => (
                                    <MenuItem key={row.id} value={row.id}>
                                        {row.compensation_plan}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {compDetail &&
                            <div className='w-full flex flex-col gap-2 border border-gray-500 p-2 rounded-lg '>

                                <div className='w-full flex flex-row gap-2 items-center justify-start'>

                                    <div className='w-full flex flex-col gap-2'>
                                        <h1 className='text-xs text-[#839f55]'>Basic Pay:</h1>
                                        <h1 className='text-xs text-[#556fa8]'>{compDetail?.basic_rate}</h1>
                                    </div>

                                    <div className='w-full flex flex-col gap-2'>
                                        <h1 className='text-xs text-[#839f55]'>Attendance Bonus:</h1>
                                        <h1 className='text-xs text-[#556fa8]'>{compDetail?.attendance_bonus}</h1>
                                    </div>

                                    <div className='w-full flex flex-col gap-2'>
                                        <h1 className='text-xs text-[#839f55]'>Night Differential:</h1>
                                        <h1 className='text-xs text-[#556fa8]'>{compDetail?.night_diff}</h1>
                                    </div>

                                </div>

                                <div className='w-full flex flex-row gap-2 items-center justify-start'>
                                    <div className='w-full flex flex-col gap-2'>
                                        <h1 className='text-xs text-[#839f55]'>Rice Allowance:</h1>
                                        <h1 className='text-xs text-[#556fa8]'>{compDetail?.rice_allowance}</h1>
                                    </div>

                                    <div className='w-full flex flex-col gap-2'>
                                        <h1 className='text-xs text-[#839f55]'>Meal Allowance:</h1>
                                        <h1 className='text-xs text-[#556fa8]'>{compDetail?.meal_allowance}</h1>
                                    </div>

                                    <div className='w-full flex flex-col gap-2'>
                                        <h1 className='text-xs text-[#839f55]'>Uniform Allowance:</h1>
                                        <h1 className='text-xs text-[#556fa8]'>{compDetail?.uniform_allowance}</h1>
                                    </div>

                                </div>

                                <div className='w-full flex flex-row gap-2 items-center justify-start'>

                                    <div className='w-full flex flex-col gap-2'>
                                        <h1 className='text-xs text-[#839f55]'>Working Days:</h1>
                                        <h1 className='text-xs text-[#556fa8]'>{compDetail?.working_days}</h1>
                                    </div>

                                    <div className='w-full flex flex-col gap-2'>
                                        <h1 className='text-xs text-[#839f55]'>Gross:</h1>
                                        <h1 className='text-xs text-[#556fa8]'>{compDetail?.gross_salary}</h1>
                                    </div>

                                    <div className='w-full flex flex-col gap-2'>
                                        <h1 className='text-xs text-[#839f55]'>Total Salary:</h1>
                                        <h1 className='text-xs text-[#556fa8]'>{compDetail?.total}</h1>
                                    </div>

                                </div>

                            </div>
                        }


                    </div>

                    <div className='w-full flex flex-col gap-2'>

                        <FormControl fullWidth size="small">
                            <h1 className="text-xs text-[#839f55] font-bold mb-2">
                                Select Branch:
                            </h1>

                            <Select
                                multiple
                                value={form.job_branch}
                                onChange={handleBranchChange}
                                renderValue={(selected) =>
                                    branchList
                                        .filter((branch) => selected.includes(branch.id))
                                        .map((branch) => branch.name)
                                        .join(", ")
                                }
                            >
                                {branchList?.map((row) => (
                                    <MenuItem key={row.id} value={row.id}>
                                        {row.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Job Description:</h1>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size='small'
                            multiline
                            rows={4}
                            name="job_description"
                            value={form.job_description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='w-full flex flex-row justify-end gap-3 mt-2'>

                        <SaveButton handleClick={handleAddJobs} is_loading={loading} title={"Add Job Content"} />
                        <CloseButton handleClick={handleClose} title={"Cancel"} />

                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default AddJob;