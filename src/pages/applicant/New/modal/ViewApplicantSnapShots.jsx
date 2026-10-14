import React, { lazy, Suspense, useState, useEffect } from 'react';

import { format } from 'date-fns';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';


import { APIServices } from '../../../../contants/apiConfig';

import { handleTimeFormat } from '../../../../contants/contans';

const ViewApplicantSnapShots = ({ openModal, handleClose, userData, isClickable = true }) => {

  const [userSnap, setUserSnap] = useState([]);

  useEffect(() => {
    setUserSnap([])
    handleSnapShot();
  }, []);

  const handleSnapShot = async () => {

    const response = await APIServices.get({
      url: `fetch-snapShot`, payload: {
        "user_id": userData?.id
      }
    });

    if (response.status === 200) {
      setUserSnap(response?.data?.data)
    }
  }

  const getUserFolderPath = (userId, filePath) => {

    const groupStart =
      Math.floor((userId - 1) / 1000) * 1000 + 1;

    const groupEnd = groupStart + 999;

    return `snapshot/${groupStart}-${groupEnd}/${filePath}`;
  };

  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={openModal}
    >

      <div className='max-w-[750px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

        <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

          <h1 className='text-sm text-[#556fa8] font-medium'>View Applicant SnapShot</h1>

          <div onClick={handleClose} className='flex flex-col items-center'>
            <span className='text-gray-500 cursor-pointer'>
              <CancelOutlinedIcon size="small" />
            </span>

          </div>

        </div>

        <div className='w-full flex flex-col gap-2 max-h-[500px] overscroll-y-auto overflow-y-auto'>


          <div className='w-full flex flex-row items-center justify-between gap-3'>

            <div className='flex flex-row items-center gap-3'>
              <span className='text-[#839f55]'><AccountCircleOutlinedIcon /></span>
              <h1 className='text-[#556fa8] font-semibold'>{userData?.last_name} , {userData?.first_name} {userData?.middle_name} </h1>
            </div>

          </div>

          <div className='w-full flex flex-row items-center justify-between gap-3'>

            <div className='w-full flex flex-row items-center gap-3'>

              <span className='text-[#839f55]'><AccessTimeOutlinedIcon /></span>
              <h1 className='text-[#556fa8] font-semibold'>Started: {handleTimeFormat(userData?.created_at)}</h1>

            </div>

          </div>

          <div className="w-full grid grid-cols-3 gap-2 border-2 border-dashed p-2">
            {userSnap?.map((row, index) => (
              // <img
              //   key={index}
              //   className="w-32 h-32 object-cover"
              //   src={`${process.env.REACT_APP_API_STORAGE}${getUserFolderPath(
              //     row?.user_id,
              //     row?.snap_shot_file
              //   )}`}
              //   alt="six-eleven-center-logo"
              // />

              <img
                key={index}
                className="w-32 h-32 object-cover"
                src={`${process.env.REACT_APP_API_STORAGE}${getUserFolderPath(
                  row?.user_id,
                  row?.snap_shot_file
                )}`}
                onError={(e) => {

                  // fallback old/custom structure
                  e.target.src =
                    `${process.env.REACT_APP_API_STORAGE}${row?.snap_shot_file}`;
                }}
                alt="six-eleven-center-logo"
              />
            ))}
          </div>

        </div>

      </div>

    </Backdrop>
  )
}

export default ViewApplicantSnapShots;