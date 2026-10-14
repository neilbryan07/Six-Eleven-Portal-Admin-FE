import React, { useState } from 'react'

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';

import CloseButton from '../../../component/Buttons/CloseButton';
import SaveButton from '../../../component/Buttons/SaveButton';

import { APIServices } from '../../../contants/apiConfig';

const AddCompensation = ({ openModal, handleClose, refreshData }) => {

    const [imgDescription, setImgDescription] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        name: "",
        basic_pay: "",
        attendance: "",
        night: "",
        rice: "",
        meal: "",
        uniform: "",
        total: "",
        gross: "",
        working: "",
    });

    const handleFileChange = (e) => {
        setImgFile(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
    };

    const validateForm = () => {
        const requiredFields = {
            name: "Compensation Plan",
            basic_pay: "Basic Pay",
            attendance: "Attendance Bonus",
            night: "Night Differential",
            rice: "Rice Allowance",
            meal: "Meal Allowance",
            uniform: "Uniform Allowance",
            total: "Total",
            gross: "Gross Salary",
            working: "Working Days",
        };

        for (const key in requiredFields) {
            if (
                form[key] === "" ||
                form[key] === null ||
                form[key] === undefined
            ) {
                alert(`${requiredFields[key]} is required.`);
                return false;
            }
        }

        return true;
    };

    const handleAddJobs = async () => {

        setLoading(true)

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {

            const response = await APIServices.post({
                url: '/job-compensations/create', payload: {

                    "compensation_plan": form?.name,
                    "gross_salary": form?.gross,
                    "basic_rate": form?.basic_pay,
                    "attendance_bonus": form?.attendance,
                    "night_diff": form?.night,
                    "rice_allowance": form?.rice,
                    "meal_allowance": form?.meal,
                    "uniform_allowance": form?.uniform,
                    "working_days": form?.working,
                    "total": form?.total,

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




    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[700px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Add Compensation Plan Content </h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2'>

                    <span className='text-red-500 text-xs'>**Note:** All fields are required. Please enter **N/A** for any field with unavailable or missing information.</span>

                    <div className='w-full flex flex-row gap-2 items-center justify-between'>

                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Compensation Name:</h1>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className='w-full flex flex-row gap-2 items-center justify-between'>

                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Basic Pay:</h1>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"

                                size='small'
                                name="basic_pay"
                                value={form.basic_pay}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Attendance Bonus:</h1>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"

                                size='small'
                                name="attendance"
                                value={form.attendance}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Night Differential:</h1>
                            <TextField
                                id="outlined-basic"

                                variant="outlined"
                                size='small'
                                name="night"
                                value={form.night}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className='w-full flex flex-row gap-2 items-center justify-between'>

                        <div className='flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Rice Allowance:</h1>
                            <TextField
                                id="outlined-basic"

                                variant="outlined"
                                size='small'
                                name="rice"
                                value={form.rice}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Meal Allowance:</h1>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"

                                size='small'
                                name="meal"
                                value={form.meal}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Uniform Allowance:</h1>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"

                                size='small'
                                name="uniform"
                                value={form.uniform}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className='w-full flex flex-row gap-2 items-center justify-between'>
                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Working Days:</h1>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                name="working"
                                value={form.working}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Gross:</h1>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                name="gross"
                                value={form.gross}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-bold'>Total Salary:</h1>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size='small'
                                name="total"
                                value={form.total}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className='w-full flex flex-row justify-end gap-3 mt-2'>

                        <SaveButton handleClick={handleAddJobs} is_loading={loading} title={"Add Compensation Content"} />
                        <CloseButton handleClick={handleClose} title={"Cancel"} />

                    </div>

                </div>

            </div>

        </Backdrop >
    )
}

export default AddCompensation;