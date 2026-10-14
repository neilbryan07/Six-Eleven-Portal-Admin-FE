import React, { lazy, Suspense , useState , useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Chip from '@mui/material/Chip';

import { APIServices } from '../../../../../contants/apiConfig';

const ExamItemAnswer = ({ title , level , letter , userSelect }) =>  {

    return (
        <h1 className={`text-sm ${ userSelect ? 'text-[#556fa8] font-extrabold' : 'text-black font-normal' } flex flex-row items-center gap-2`}>
            {letter}) {title} ({level}) { level === 'Ideal' ? <CheckCircleIcon color='success' fontSize="small" /> : null }
        </h1>
    )
}

const TypingWPM = ({ openModal , handleClose , rowData }) => {

    const [ userExamItems , setUserExamItems] = useState([]);

    useEffect(() => {
                handleExamType();
    }, []);
            
    const handleExamType = async () => {
            
        const response = await APIServices.get({
            url: `wpm/fetch-wpm-result`, payload : {
                "user_id" : rowData?.userInfo?.id
            }
        });
            
        if (response.status === 200) {
            setUserExamItems(response?.data?.data)
        }
    }

    const handlePointResult = (  data) => {

        if (data === 1) return "Very Low : 1pt"
        if (data === 2) return "Low : 2pts"
        if (data === 3) return "Neutral : 3pts"
        if (data === 4) return "Ideal : 4pts"
        if (data === 5) return "Excellent : 5pts"

    }

  return (
    <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={openModal}
    >
    <div className='max-w-[350px] w-full p-4 bg-white rounded-lg flex flex-col gap-2 overscroll-y-auto overflow-y-auto'>

        <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2 sticky top-0 bg-white'>

            <h1 className='text-sm text-[#556fa8] font-medium'>Typing Speed & Accuracy</h1>

            <div onClick={ handleClose } className='flex flex-col items-center'>
              <span className='text-gray-500 cursor-pointer'>
                <CancelOutlinedIcon/>
              </span>
             
            </div>

        </div>

        <div className='max-h-[550px] h-full w-full bg-white rounded-lg flex flex-col gap-2 overscroll-y-auto overflow-y-auto gap-4'>
        
        <div className='flex flex-col gap-2'>

            <h1 className='text-xs text-black font-medium'>Speed Score (Words Typed Per Minute - WPM) :</h1>
                        
            <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-xs text-[#839f55] font-light'>Total Time:</h1>
                <h1 className='text-sm text-black font-normal'>{ userExamItems?.type_total_time }</h1>
            </div>
            
            {/* <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-xs text-[#839f55] font-light'>Total Character:</h1>
                <h1 className='text-sm text-black font-normal'>{ userExamItems?.type_total_word }</h1>
            </div>  */}

            <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-xs text-[#839f55] font-bold'>Total WPM:</h1>
                <h1 className='text-sm text-black font-bold'>{ userExamItems?.type_speed_score } ( {handlePointResult(userExamItems?.type_final_wpm)} )</h1>
            </div>

        </div>   

        
        <div className='flex flex-col gap-2'>

            <h1 className='text-xs text-black font-medium'>Accuracy Score (% of Correctly Typed Words) :</h1>
                        
            <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-xs text-[#839f55] font-light'>Total Correct Character:</h1>
                <h1 className='text-sm text-black font-normal'>{ userExamItems?.type_correct_type } Words</h1>
            </div>
            
            <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-xs text-[#839f55] font-light'>Total Character:</h1>
                <h1 className='text-sm text-black font-normal'>{ userExamItems?.type_total_word } Words</h1>
            </div> 

            <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-xs text-[#839f55] font-bold'>Total Accuracy:</h1>
                <h1 className='text-sm text-black font-bold'>{ userExamItems?.type_accuracy_score }% ( ( {handlePointResult(userExamItems?.type_final_accuracy)} ) ) </h1>
            </div>

        </div>

                
        <div className='flex flex-col gap-2'>

            <h1 className='text-xs text-black font-medium'>Final Score Calculation:</h1>
                    
            <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-xs text-[#839f55] font-bold'>Final Typing Score:</h1>
                <Chip color='primary' label={`${userExamItems?.type_final_score}`} />
            </div>

        </div>

    </div>
      </div>
    </Backdrop> 
  )
}

export default TypingWPM