import React, { useState, useCallback, useRef, useEffect } from 'react'

import TextField from '@mui/material/TextField';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Button, Box, Typography } from '@mui/material';

import SaveButton from '../../../component/Buttons/SaveButton';
import CloseButton from '../../../component/Buttons/CloseButton';

import { APIServices } from '../../../contants/apiConfig';
import { nil } from 'ajv';

const CreateAdmin = React.memo(({ openModal, handleClose, branchId, reFreshData }) => {

    const [formData, setFormData] = useState({
        branch_id: null,
        portal_role_id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const [imgFile, setImgFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const [branchList, setBranchList] = useState([]);
    const [roleList, setRoleList] = useState([]);
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)


    useEffect(() => {
        handleApplicant();
        handleBranch();
    }, []);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleBranch = async () => {

        let apiURL = `/branches`

        const response = await APIServices.get({ url: apiURL });

        if (response.status === 200) {
            setBranchList(response?.data?.data)
        }
    }


    const handleApplicant = async (isTrue = true) => {

        let apiURL = `/get-portal-roles`

        const response = await APIServices.get({
            url: apiURL
        });

        if (response.status === 200) {
            const filteredData = response?.data?.data?.filter(
                item => !["TAS", "HEAD_HR", "HEAD_REC"].includes(item.acronym)
            );
            setRoleList(filteredData)
        }
    }

    const handleSubmit = async () => {

        setLoading(true);

        const formDataWithImage = new FormData();
        formDataWithImage.append('branch_id', formData?.branch_id);
        formDataWithImage.append('portal_role_id', formData?.portal_role_id);
        formDataWithImage.append('first_name', formData?.first_name);
        formDataWithImage.append('middle_name', formData?.middle_name);
        formDataWithImage.append('last_name', formData?.last_name);
        formDataWithImage.append('email', formData?.email);
        formDataWithImage.append('password', formData?.password);

        if (formDataWithImage) {
            formDataWithImage.append('signature', imgFile);
        }

        const response = await APIServices.post({
            url: '/create-admin',
            payload: formDataWithImage
        });

        if (response.status === 201) {
            reFreshData()
            handleClose()
        } else {
            setLoading(false);
            setIsError(response[0]?.response?.data?.errors?.email[0]);
        }


    }

    const handleFileChange = (e) => {

        setImgFile(e.target.files[0]);
    };

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[600px] w-full p-4 bg-white rounded-lg flex flex-col gap-2 ' >

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Add New Admin</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2 max-h-[900px] overscroll-y-auto overflow-y-auto'>

                    <FormControl fullWidth>
                        <h1 className='text-xs text-[#839f55] font-bold mb-2'>Role:</h1>
                        <Select
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="portal_role_id"
                            value={formData?.portal_role_id}
                            onChange={handleChange}
                        >
                            <MenuItem value={""}></MenuItem>
                            {roleList?.map((row, index) => (
                                <MenuItem key={index} value={row?.id}>{row?.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <h1 className='text-xs text-[#839f55] font-bold mb-2'>Branch:</h1>
                        <Select
                            size='small'
                            name="branch_id"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData?.branch_id}
                            onChange={handleChange}
                        >
                            <MenuItem value={""}></MenuItem>
                            {branchList?.map((row, index) => (
                                <MenuItem key={index} value={row?.id}>{row?.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>First Name:</h1>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size='small'
                            name="first_name"
                            value={formData?.first_name}
                            onChange={handleChange}
                        />
                    </div>


                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Middle Name:</h1>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size='small'
                            name="middle_name"
                            value={formData?.middle_name}
                            onChange={handleChange}
                        />
                    </div>


                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Last Name:</h1>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size='small'
                            name="last_name"
                            value={formData?.last_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Email:</h1>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size='small'
                            name="email"
                            value={formData?.email}
                            onChange={handleChange}
                        />
                    </div>


                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Password:</h1>

                        <OutlinedInput
                            id="outlined-adornment-password"
                            placeholder="type here..."
                            size='small'
                            name="password"
                            value={formData?.password}
                            onChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ?

                                            <VisibilityOff sx={{
                                                color: '#839f55',
                                                '&.Mui-checked': {
                                                    color: '#839f55',
                                                },
                                            }}
                                            /> :
                                            <Visibility sx={{
                                                color: '#839f55',
                                                '&.Mui-checked': {
                                                    color: '#839f55',
                                                },
                                            }}
                                            />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </div>


                    <Box sx={{ mb: 2 }}>
                        {imgFile ?
                            <div className='flex flex-col gap-2 relative w-full'>
                                <img src={URL.createObjectURL(imgFile)} alt="preview" className="max-w-full h-auto rounded" />
                                <h1 className='text-sm text-[#839f55] font-bold'>{imgFile.name}</h1>
                                <Tooltip title="Remove Uploaded Picture">
                                    <div onClick={e => setImgFile(null)} className='absolute cursor-pointer right-1 bg-white rounded-full p-1 items-center flex flex-col top-1'>
                                        <CancelIcon color='error' />
                                    </div>
                                </Tooltip>
                            </div>

                            : null
                        }
                    </Box>

                    <div className='max-w-[300px] gap-2 flex flex-col'>
                        <h1 className='text-xs text-red-500 font-bold'>File size should be less than 10mb</h1>
                        <Button variant="contained" component="label" sx={{ mb: 2 }} color="success">
                            <h1 className='text-sm text-white font-light'>Upload Email Signature Image File</h1>
                            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                        </Button>
                    </div>


                    {isError && <Alert severity="error">{isError}</Alert>}

                    <div className='w-full flex flex-row justify-end gap-3 mt-5'>

                        <SaveButton is_loading={loading} handleClick={handleSubmit} title={"Create Admin"} />

                        <CloseButton handleClick={handleClose} title={"Cancel"} />

                    </div>


                </div>

            </div>

        </Backdrop >
    )
});

export default CreateAdmin;