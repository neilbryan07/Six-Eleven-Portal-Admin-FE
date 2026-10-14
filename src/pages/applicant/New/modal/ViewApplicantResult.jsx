import React, { lazy, Suspense, useState, useEffect } from 'react';

import { format } from 'date-fns';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Chip from '@mui/material/Chip';

import Tooltip from '@mui/material/Tooltip';

import { APIServices } from '../../../../contants/apiConfig';

import { handleTimeFormat } from '../../../../contants/contans';
import SaveButton from '../../../../component/Buttons/SaveButton';

import { FaFileCsv } from "react-icons/fa";

const MCQsUserExamItems = lazy(() => import('./contents/MCQsUserExamItems'));
const AudioRecord = lazy(() => import('./contents/AudioRecord'));
const MockRecord = lazy(() => import('./contents/MockRecord'));
const TypingWPM = lazy(() => import('./contents/TypingWPM'));

const ExamContent = ({ title, number, rawScore, totalScore, openContent, isClickable }) => (
  <div className='flex flex-row items-center justify-between'>

    {/* <h1 onClick={isClickable ? openContent : null} className={`text-[#556fa8] text-xs font-semibold ${isClickable ? 'cursor-pointer underline' : ''} underline-offset-4`}>
      {number === 4 || number === 7 ? '🔴' : '🔵'} {number}.) {title}
    </h1> */}

    {number === 4 || number === 7 ?
      <h1 onClick={isClickable ? openContent : null} className={`cursor-pointer text-purple-900 text-xs font-semibold border border-purple-500 p-[3px] text-center border-dashed rounded bg-red-200`}>🔴 {number}.) {title}</h1>
      :
      <h1 onClick={isClickable ? openContent : null} className={`text-[#556fa8] text-xs font-semibold ${isClickable ? 'cursor-pointer underline' : ''} underline-offset-4`}>
        🔵 {number}.) {title}
      </h1>

    }



    <div className='flex flex-row items-center gap-2'>

      <div className='flex flex-row items-center gap-2'>
        <h1 className='text-[#556fa8] text-xs font-semibold'>Raw Score | Max Score </h1>
      </div>

      <div className='flex flex-row items-center gap-2'>

        <Chip color="primary" variant='outlined' label={`${rawScore} | ${totalScore}`} />
      </div>

    </div>

  </div>
)

const ViewApplicantResult = ({ openModal, handleClose, userData, isClickable = true }) => {

  const [openView, setOpenView] = useState(false);
  const [openAudio, setOpenAudio] = useState(false);
  const [openMock, setOpenMock] = useState(false);
  const [openType, setOpenType] = useState(false);

  const [userScore, setUserScore] = useState([]);

  const [selectedData, setSelectedData] = useState([]);

  const handleCloseModal = () => {
    setOpenView(false);
  };

  const handleOpenModal = (row) => {

    if (row?.exam_type_id === 4) setOpenAudio(true);
    else if (row?.exam_type_id === 7) setOpenMock(true);
    else if (row?.exam_type_id === 5) setOpenType(true);
    else setOpenView(true);

    let rowData = row;
    rowData['userInfo'] = userData
    setSelectedData(rowData)
  };

  const handleCloseAudio = () => {
    setOpenAudio(false);
  };

  const handleCloseMock = () => {
    setOpenMock(false);
  };

  const handleCloseType = () => {
    setOpenType(false);
  };



  useEffect(() => {
    handleExamType();
  }, []);

  const handleExamType = async () => {

    const response = await APIServices.get({
      url: `scoring/${userData?.id}`
    });

    if (response.status === 200) {
      setUserScore(response?.data)
    }
  }

  const handleResetAttempt = async () => {

    const response = await APIServices.post({
      url: `mcq-admin/reset-attempts`, payload: {
        "user_id": userData?.id
      }
    });

    if (response.status === 200) {
      handleExamType();
    }

  }

  const exportToCSV = () => {

    const rows = [
      ['Name', userScore?.user.full_name],
      ['Date', format(new Date(userData?.created_at), 'yyyy-MM-dd')],
      ['Total', userScore?.final_suitability_score],
      ['Assessment', userScore?.user?.status],
      ['Remarks', userScore?.user?.qualification_remarks],
      ['Approval', userScore?.user?.qualification_result === "N/A" ? userScore?.user?.qualification_result :
        userScore?.user?.qualification_result ? "Qualified" : "Not Qualified"],
      [],
      ['Exam Type', "Raw Score", "Max Score"],
      ['Grammar & Sentence Construction', userScore?.scores?.[0]?.raw_score, userScore?.scores?.[0]?.max_score],
      ['Sentence Completion Test', userScore?.scores?.[1]?.raw_score, userScore?.scores?.[1]?.max_score],
      ['Listening Comprehension', userScore?.scores?.[2]?.raw_score, userScore?.scores?.[2]?.max_score],
      ['Verbal Communication & Pronunciation', userScore?.scores?.[3]?.raw_score, userScore?.scores?.[3]?.max_score],
      ['Typing Speed & Accuracy', userScore?.scores?.[4]?.raw_score, userScore?.scores?.[4]?.max_score],
      ['Reading Comprehension', userScore?.scores?.[5]?.raw_score, userScore?.scores?.[5]?.max_score],
      ['Mock Call / Live Chat Simulation', userScore?.scores?.[6]?.raw_score, userScore?.scores?.[6]?.max_score],
      ['Basic Computer Literacy', userScore?.scores?.[7]?.raw_score, userScore?.scores?.[7]?.max_score],
    ];

    const csvContent = rows.map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = userScore?.user?.full_name + "_" + format(new Date(), 'yyyy-MM-dd HH:mm:ss') + ".csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={openModal}
    >

      <Suspense>
        {openType && <TypingWPM rowData={selectedData} openModal={openType} handleClose={handleCloseType} />}
      </Suspense>

      <Suspense>
        {openAudio && <AudioRecord rowData={selectedData} openModal={openAudio} handleClose={handleCloseAudio} reFreshData={handleExamType} />}
      </Suspense>

      <Suspense>
        {openMock && <MockRecord rowData={selectedData} openModal={openMock} handleClose={handleCloseMock} reFreshData={handleExamType} />}
      </Suspense>

      <Suspense>
        {openView && <MCQsUserExamItems rowData={selectedData} openModal={openView} handleClose={handleCloseModal} />}
      </Suspense>

      <div className='max-w-[750px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

        <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

          <h1 className='text-sm text-[#556fa8] font-medium'>View Applicant Result</h1>

          <div onClick={handleClose} className='flex flex-col items-center'>
            <span className='text-gray-500 cursor-pointer'>
              <CancelOutlinedIcon size="small" />
            </span>

          </div>

        </div>

        <div className='w-full flex flex-col gap-2'>


          <div className='w-full flex flex-row items-center justify-between gap-3'>

            <div className='flex flex-row items-center gap-3'>
              <span className='text-[#839f55]'><AccountCircleOutlinedIcon /></span>
              <h1 className='text-[#556fa8] font-semibold'>{userScore?.user?.last_name} , {userScore?.user?.first_name} {userScore?.user?.middle_name} </h1>
            </div>

            <div className='flex flex-row'>

              {parseInt(userScore?.user?.remaining_attempts) <= 0 ?
                <SaveButton handleClick={handleResetAttempt} title={"Reset User Exam Attempt"} />
                : <h1 className='text-[#556fa8] font-semibold text-xs'>Exam Attempt : {userScore?.user?.exam_attempts}</h1>}
            </div>


          </div>

          <div className='w-full flex flex-row items-center justify-between gap-3'>

            <div className='w-full flex flex-row items-center gap-3'>

              <span className='text-[#839f55]'><AccessTimeOutlinedIcon /></span>
              <h1 className='text-[#556fa8] font-semibold'>Started: {handleTimeFormat(userData?.created_at)}</h1>

            </div>

            <Tooltip title="Export Applicant CSV">
              <div onClick={exportToCSV} className='p-[6px] rounded-lg border border-blue-500 cursor-pointer hover:bg-gray-200'>
                <span className='text-blue-500 text-2xl'><FaFileCsv /></span>
              </div>
            </Tooltip>

          </div>

          <div className='flex flex-row gap-2 items-center'>
            <span className='text-gray-500 font-semibold text-[10px]'>🔵 Blue – Automated Scoring</span>
            <span className='text-black text-[10px] font-semibold border border-red-500 p-[3px] text-center border-dashed rounded bg-red-200'>🔴 Red – Manual Scoring</span>
          </div>

          <div className='w-full flex flex-col gap-2 border-2 border-dashed p-2'>

            <div className='w-full flex flex-row items-center justify-between'>

              <div className='flex flex-row items-center gap-2'>
                <h1 className='text-[#839f55] text-xs font-semibold'>Exam Result :</h1>
                <h1 className='text-[#556fa8] text-sm font-bold'>{userScore?.exam_result}</h1>
              </div>

              <div className='flex flex-row items-center gap-2'>

                <div className='flex flex-row items-center gap-2'>
                  <h1 className='text-[#556fa8] text-xs font-semibold'>Total Score </h1>
                </div>

                <div className='flex flex-row items-center gap-2'>

                  <Chip color="success" label={userScore?.final_suitability_score} />
                </div>

              </div>

            </div>

            {userScore?.scores?.map((row, index) => (

              <React.Fragment key={index}>

                <ExamContent
                  title={`${row?.exam_name}`}
                  number={index + 1}
                  rawScore={row?.raw_score}
                  totalScore={row?.max_score}
                  isClickable={true}
                  openContent={() => handleOpenModal(row)}
                />

              </React.Fragment>

            ))}


          </div>



        </div>



      </div>

    </Backdrop>
  )
}

export default ViewApplicantResult;