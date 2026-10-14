import React from 'react'

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import SaveButton from '../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../component/Buttons/CloseButton';

import { APIServices } from '../../../../contants/apiConfig';

const ForgotPassword = ({ selectedData, openPassword, handleClosedForgotPassword }) => {

    const handleForgotPassword = async (data) => {

        const response = await APIServices.post({
            url: '/forgot-password', payload: {
                "email": selectedData?.email
            }
        });

        if (response.status === 200) {
            handleClosedForgotPassword();
        }

    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openPassword}
        >

            <div className='max-w-[350px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Forgot User Password?</h1>

                    <div onClick={handleClosedForgotPassword} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="small" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-row justify-end gap-3'>

                    <SaveButton title={"Proceed"} handleClick={handleForgotPassword} />
                    <CloseButton title={"Close"} handleClick={handleClosedForgotPassword} />

                </div>

            </div>

        </Backdrop>
    )
}

export default ForgotPassword;