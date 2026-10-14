import React, { lazy, Suspense, useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { APIServices } from '../../../../contants/apiConfig';

const ViewFullPassage = lazy(() => import('./ViewFullPassage'));
// const ReadCompreEditContent = lazy(() => import('./modal/EditReadingPassage'));

const ReadCompreEditContent = lazy(() => import('./EditReadingPassage'));


 const ViewReadingPassage = ({ openModal , handleClose }) => {

  const [ ReadCompre , setReadCompre ] = useState([])

  const [ fullContent , setFullContent ] = React.useState([]);
  const [ openContent , setOpenContent ] = React.useState(false);

  const [editRead , setEditRead] = useState(false);

  useEffect(() => {
    handleExamType();
  }, []);
  
  const handleExamType = async () => {
    
      const response = await APIServices.get({
          url: '/exam-types'
      });
    
      if (response.status === 200) {
          setReadCompre(response?.data?.data?.passages)
      }
  }

  const handleViewFullContent = (data) => {
    setFullContent( data )
    setOpenContent(true);
  }

  const handleEditFullContent = (data) => {
    setFullContent( data )
    setEditRead(true);
  }

  const handleCloseContent = () => {
    setOpenContent(false);
  };

  
  const handleCloseEdit = () => {
    setEditRead(false);
  };

  return (
  <Backdrop
    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    open={openModal}
  >

      <Suspense>
          { openContent && <ViewFullPassage ReadCompre={fullContent} openModal={openContent} handleClose={handleCloseContent}/> }
      </Suspense>

      <Suspense>
        { editRead && <ReadCompreEditContent rowData={fullContent} openModal={editRead} handleClose={ handleCloseEdit }/> }
      </Suspense>

        <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

          <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

            <h1 className='text-sm text-[#556fa8] font-medium'>Reading Comprehension Contents</h1>

            <div onClick={ handleClose } className='flex flex-col items-center'>
              <span className='text-gray-500 cursor-pointer'>
                <CancelOutlinedIcon size="s"/>
              </span>
             
            </div>

          </div>

          <div className='w-full flex flex-col gap-2'>

            {ReadCompre?.map((row, index) => (
              <div className='flex flex-row items-center justify-between' key={index}>

                <h1 className='text-sm text-black font-medium'>{index + 1}.) { row?.reading_passage_name }</h1>


                <div className='flex flex-row items-center justify-between gap-2' key={index}>

                  <div onClick={ () => handleViewFullContent(row) } className='cursor-pointer'>
                    <VisibilityOutlinedIcon color="success"/>
                  </div>

                  <div onClick={ () => handleEditFullContent(row) } className='cursor-pointer'>
                    <EditOutlinedIcon color="info"/>
                  </div>

                </div>

              </div>
            ))}

          </div>

        
        </div>

      </Backdrop>
  )
}

export default ViewReadingPassage;