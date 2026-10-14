import React, { useState, useCallback, useRef, useEffect } from 'react'

import TextField from '@mui/material/TextField';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import Switch from '@mui/material/Switch';
import { Button, Box, Typography } from '@mui/material';
import SaveButton from '../../../component/Buttons/SaveButton';
import CloseButton from '../../../component/Buttons/CloseButton';

import { APIServices } from '../../../contants/apiConfig';

const EditAdmin = React.memo(({ openModal, handleClose, branchId, reFreshData, selectedData }) => {

    const { branch_id, portal_role_id, first_name, middle_name, last_name, email, id, status, signature_path, ref_code } = selectedData

    const [formData, setFormData] = useState({
        branch_id: branch_id,
        portal_role_id: portal_role_id,
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        email: email,
        is_active: status,
        ref_code: ref_code
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
            const filteredData = response?.data?.data?.filter(item => item.acronym !== "TAS");
            setRoleList(filteredData)
        }
    }

    const handleSubmit = async () => {


        setLoading(true);

        const formDataWithImage = new FormData();

        formDataWithImage.append('portal_role_id', formData?.portal_role_id);
        formDataWithImage.append('first_name', formData?.first_name);
        formDataWithImage.append('middle_name', formData?.middle_name);
        formDataWithImage.append('last_name', formData?.last_name);
        formDataWithImage.append('email', formData?.email);
        formDataWithImage.append('status', formData?.is_active);


        if (branch_id) {
            formDataWithImage.append('branch_id', branch_id);
        }

        if (imgFile) {
            formDataWithImage.append('signature', imgFile);
        }

        const response = await APIServices.post({
            url: `/edit-admin/${id}`,
            payload: formDataWithImage
        });

        if (response.status === 200) {
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

    const handleClick = async () => {


        const response = await APIServices.post({
            url: `/generate-ref-code`,
            payload: { "user_id": id }
        });

        setFormData(prev => ({
            ...prev,
            ref_code: response?.data?.data?.ref_code
        }));

        reFreshData()

    };

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[600px] w-full max-h-[600px] p-4 bg-white rounded-lg flex flex-col gap-2 ' >

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Edit New Admin</h1>

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

                    {![5, 6].includes(parseInt(portal_role_id)) &&


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
                                <MenuItem value={""}>Head</MenuItem>
                                {branchList?.map((row, index) => (
                                    <MenuItem key={index} value={row?.id}>{row?.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    }

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


                    <div className='flex flex-row gap-2 items-center my-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Referral Code :</h1>
                        {selectedData?.portal_role_id === 6 || selectedData?.portal_role_id === 1 ?
                            formData?.ref_code ?
                                <div className='flex flex-row gap-2 items-center'>
                                    <Chip label={formData?.ref_code} color="warning" />
                                    <span onClick={handleClick} className='text-black cursor-pointer'><RotateLeftIcon /></span>
                                </div> :
                                <Chip label="Generate Code" color="info" onClick={handleClick} />
                            : null
                        }
                    </div>


                    <div className='flex flex-row gap-2 items-center'>
                        <h1 className='text-sm text-gray-500 font-normal'>Inactive</h1>
                        <Switch
                            checked={formData.is_active === 1}
                            value={formData?.is_active}
                            name='is_active'
                            onChange={(e) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    is_active: e.target.checked ? 1 : 0 // convert boolean → 1/0 for Laravel
                                }));
                            }}
                            color="success"
                        />
                        <h1 className='text-sm text-green-500 font-normal'>Active</h1>
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

                            :

                            <div className='flex flex-col gap-2 relative w-full'>
                                <img src={`${process.env.REACT_APP_API_STORAGE}${signature_path}`} alt="preview" className="max-w-full h-auto rounded" />
                                {/* <h1 className='text-sm text-[#839f55] font-bold'>{rowData?.file_name}</h1> */}
                            </div>
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

                        <SaveButton is_loading={loading} handleClick={handleSubmit} title={"Edit Admin"} />

                        <CloseButton handleClick={handleClose} title={"Cancel"} />

                    </div>


                </div>

            </div>

        </Backdrop >
    )
});

export default EditAdmin;