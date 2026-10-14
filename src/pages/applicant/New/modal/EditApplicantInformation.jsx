import React, { useState, useCallback, useRef, useEffect } from 'react'

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { APIServices } from '../../../../contants/apiConfig';

import Alert from '@mui/material/Alert';

import SaveButton from '../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../component/Buttons/CloseButton';

const EditApplicantInformation = ({ selectedData, openAppInfo, handleCloseForgot }) => {

    const [isError, setIsError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [formData, setFormData] = useState({
        user_id: selectedData?.id,
        first_name: selectedData ? selectedData?.first_name : "",
        middle_name: selectedData ? selectedData?.middle_name : "",
        last_name: selectedData ? selectedData?.last_name : "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleEdit = async () => {

        setIsLoading(true);

        const response = await APIServices.post({
            url: `/edit-user-new`,
            payload: formData
        });

        if (response.status === 200) {
            // reFreshData()
            setIsLoading(false);
            window.location.reload();
            handleCloseForgot()
        }

    }

    const handleVerify = async () => {

        setIsSaving(false);
        setIsLoading(true);

        const params = new URLSearchParams({
            act: 'fetch_user',
            ac: '611',
            ak: '546453435asd23asd143asdk23kj4h5y4gh23',
            fname: formData.first_name,
            mname: formData.middle_name,
            lname: formData.last_name,
            email: selectedData?.email,
            mobile_no: selectedData?.contact_number,
        });

        const response = await APIServices.get({
            url: `https://611systems.com/api/tas/?${params.toString()}`,
        });

        if (response.status === 200 && response?.data?.stat === "data_mismatched") {
            setIsError("The input name already exists in the HRIS. Therefore, we cannot proceed with editing the applicant record.");
        } else if (response.status === 200 && response?.data?.stat === "user_not_found") {
            setIsError(null)
            setIsSaving(true);
            setIsLoading(false);
        }

    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openAppInfo}
        >

            <div className='max-w-[500px] max-h-[700px] w-full p-4 bg-white rounded-lg flex flex-col gap-3'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Edit Applicant</h1>

                    <div onClick={handleCloseForgot} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="small" />
                        </span>

                    </div>

                </div>

                <div className='w-full overscroll-y-auto overflow-y-auto overscroll-x-auto overflow-x-auto'>

                    <div className='flex flex-col gap-2 w-full'>

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

                    </div>

                </div>

                {isError && <Alert severity="error">{isError}</Alert>}
                {isSaving && <Alert severity="success">Please proceed....</Alert>}


                {!isSaving && <SaveButton is_loading={isLoading} handleClick={handleVerify} title={"Verify Applicant"} />}

                {isSaving && <SaveButton is_loading={isLoading} handleClick={handleEdit} title={"Update Applicant"} />}



            </div>

        </Backdrop>
    )
}

export default EditApplicantInformation;