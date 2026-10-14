import React from 'react'

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

 const ViewQuestion = ({ openModal , handleClose , rowData }) => {

  const handleQualityChecker = ( data , letter ) => {
    if ( parseInt(data?.quality_level) === 1) return <h1 className='text-sm text-black font-normal'>{letter}) { data.choice_text} (Low)</h1>;
    if ( parseInt(data?.quality_level) === 3) return <h1 className='text-sm text-black font-normal'>{letter}) { data.choice_text} (Neutral)</h1>;
    if ( parseInt(data?.quality_level) === 5) return <h1 className='text-sm text-[#556fa8] font-bold'>{letter}) { data.choice_text} (Ideal)</h1>;
    if ( parseInt(data?.quality_level) === 2) return <h1 className='text-sm text-black font-normal'>{letter}) { data.choice_text} (Low - Neutral)</h1>;
    if ( parseInt(data?.quality_level) === 4) return <h1 className='text-sm text-black font-normal'>{letter}) { data.choice_text} (Ideal - Neutral)</h1>;
  }

  return (
  <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={openModal}
      >
        
        <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

          <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

            <h1 className='text-sm text-[#556fa8] font-medium'>{rowData?.exam_type?.name} ( Type )</h1>

            <div onClick={ handleClose } className='flex flex-col items-center'>
              <span className='text-gray-500 cursor-pointer'>
                <CancelOutlinedIcon size="s"/>
              </span>
             
            </div>

          </div>

          <div className='w-full flex flex-col gap-2'>
            
            <div className='flex flex-col gap-2'>
              <h1 className='text-xs text-[#839f55] font-light'>Name:</h1>
              <h1 className='text-sm text-black font-medium'>{rowData?.question_text}</h1>
            </div>

            { parseInt(rowData?.exam_type?.id) === 3 &&
              <div className='flex flex-col'>
                <h1 className='text-xs text-[#839f55] font-bold'>Exam Content:</h1>
                <h1 className='text-sm text-black font-medium'>{rowData?.audio_exam?.[0]?.audio_content}</h1>
              </div>  
            }

            { parseInt(rowData?.exam_type?.id) === 6 &&
              <div className='flex flex-col'>
                <h1 className='text-xs text-[#839f55] font-bold'>Exam Content:</h1>
                <h1 className='text-sm text-black font-medium'>{rowData?.passages?.[0]?.reading_passage_name}</h1>
              </div>  
            }

            <div className='flex flex-col gap-2'>
              <h1 className='text-xs text-[#839f55] font-light'>Items:</h1>
                { handleQualityChecker(rowData?.answers?.[0] , 'A') }
                { handleQualityChecker(rowData?.answers?.[1] , 'B') }
                { handleQualityChecker(rowData?.answers?.[2] , 'C') }
                { handleQualityChecker(rowData?.answers?.[3] , 'D') }
                { handleQualityChecker(rowData?.answers?.[4] , 'E') }
            </div>

            <div className='flex flex-col gap-2'>
              <h1 className='text-xs text-[#839f55] font-light'>Status:</h1>
              <h1 className={`${ rowData?.is_active ? " text-green-500" : " text-red-500"} text-xs font-semibold`}>{rowData?.is_active ? "Active" : "Inactive"}</h1>
            </div>


          </div>
          
        </div>

      </Backdrop>
  )
}

export default ViewQuestion;