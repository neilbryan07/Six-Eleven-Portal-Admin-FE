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

const FilterTable = React.memo(({ openModal, handleClose, branchId, reFreshData, roleID }) => {

    const [formData, setFormData] = useState({
        branch_id: null,
        portal_role_id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const [branchList, setBranchList] = useState([]);
    const [roleList, setRoleList] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        handleApplicant();
        handleBranch();
    }, []);

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

        branchId(formData?.branch_id)
        roleID(formData?.portal_role_id)

        handleClose()

    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[400px] w-full max-h-[600px] p-4 bg-white rounded-lg flex flex-col gap-2 ' >

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Filter Admin Table</h1>

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
                            <MenuItem value={""}>Head</MenuItem>
                            {branchList?.map((row, index) => (
                                <MenuItem key={index} value={row?.id}>{row?.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <div className='w-full flex flex-row justify-end gap-3 mt-5'>

                        <SaveButton is_loading={loading} handleClick={handleSubmit} title={"Apply Table Filter"} />
                        <CloseButton handleClick={handleClose} title={"Cancel"} />

                    </div>

                </div>
            </div>

        </Backdrop >
    )
});

export default FilterTable;