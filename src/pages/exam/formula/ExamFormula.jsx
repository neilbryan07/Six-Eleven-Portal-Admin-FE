import React, { lazy, Suspense, useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import Backdrop from '@mui/material/Backdrop';

import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

import { APIServices } from '../../../contants/apiConfig';

import SaveButton from '../../../component/Buttons/SaveButton';
import CloseButton from '../../../component/Buttons/CloseButton';

const GuidesFormula = lazy(() => import('./guides/GuidesFormula'));

const ExamFormula = () => {

  const [ formulaData , setFormulaData ] = useState([]);
  const [ editFormula , setEditFormula ] = useState(false);

  const [ itemLimit , setItemLimit ] = useState(1);
  const [ weightValue , setWeightValue ] = useState(0);
  const [ examTime , setExamTime ] = useState(0);

  const [ formulaGuides , setFormulaGuides ] = useState(false);

  useEffect(() => {
      handleExamType();
  }, []);

  const handleExamType = async () => {
  
    const response = await APIServices.get({
      url: '/mcq-admin/fetch-exam-type-formula'
    });
  
      if (response.status === 200) {
        setFormulaData(response?.data?.data)
      }
  }

  const handleExamFormulaEdit = async () => {
  
    const response = await APIServices.post({
      url: '/mcq-admin/crud-settings' , 
      payload: {
        "exam_type_id" : editFormula?.id,
        "item_limit" : itemLimit,
        "weighted_value" : weightValue / 100,
        "allotted_time" : examTime
      }
    });
  
      if (response.status === 200) {
        handleClose();
        handleExamType();
      }
  }

  const handleEditFormula = (data) => {
    setEditFormula(data)

    if ( parseInt(data?.id) === 4 ) setItemLimit(3);
    else if ( parseInt(data?.id) === 7 ) setItemLimit(4);
    else setItemLimit(1);

    setWeightValue(data?.weighted_value * 100)
    setExamTime(data?.allotted_time)
  }

  const handleClose = () => {
    setEditFormula(false)
  }

  const handleCloseGuide = () => {
      setFormulaGuides(false)
  }

  return (
    <div className='w-full flex flex-col rounded gap-4'>

      <Suspense>
          {formulaGuides && <GuidesFormula open={formulaGuides} handleCloseGuide={handleCloseGuide} />}
      </Suspense>


    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={editFormula ? true : false}
    >

      <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

        <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

          <h1 className='text-sm text-[#556fa8] font-medium'>Edit {editFormula?.name} Formula</h1>

          <div oclassName='flex flex-col items-center' onClick={ handleClose }>
            <span className='text-gray-500 cursor-pointer'>
              <CancelOutlinedIcon size="s" />
            </span>

          </div>

        </div>

        <div className='w-full flex flex-col gap-2'>

          {![4, 5, 7].includes(editFormula?.id) && (

            <div className='flex flex-col gap-2'>
              <h1 className='text-xs text-[#839f55] font-bold'>Exam Total Item Limit:</h1>
              <TextField id="outlined-basic" variant="outlined" size='small' value={itemLimit} onChange={(e) => setItemLimit(e.target.value)} />
            </div>

          )}

          <div className='flex flex-col gap-2'>
            <h1 className='text-xs text-[#839f55] font-bold'>Weight Percent :</h1>
            <TextField id="outlined-basic" variant="outlined" size='small' value={weightValue} onChange={(e) => setWeightValue(e.target.value)} />
          </div>

          <div className='flex flex-col gap-2'>
            <h1 className='text-xs text-[#839f55] font-bold'>Exam Alloted Time: (min/s)</h1>
            <TextField id="outlined-basic" variant="outlined" size='small' value={examTime} onChange={(e) => setExamTime(e.target.value)} />
          </div>

          <div className='w-full flex flex-row justify-end gap-3 mt-2'>

            <SaveButton handleClick={handleExamFormulaEdit} title={`Save Formula`} />
            <CloseButton handleClick={handleClose} title={"Cancel"} />

          </div>

        </div>

      </div>

    </Backdrop>



      <div className='w-full flex flex-row items-center justify-between'>

        <h1 className='font-normal text-lg text-[#839f55]'>Scoring Breakdown by Assessment Component</h1>

        <div className='flex flex-row gap-2 items-center'>
          <Tooltip title="Exam Formula Example">
            <div className='cursor-pointer' onClick={ () => setFormulaGuides(true)}>
              <LiveHelpIcon color="primary"/>
            </div>
          </Tooltip>

        </div>

      </div>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" size="medium">
        <TableHead>
          <TableRow>

            <TableCell>
              
              <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-[#556fa8] text-sm'>ID</h1>
              </div>
            
            </TableCell>

            <TableCell>
              
              <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-[#556fa8] text-sm '>Name</h1>
              </div>
            
            </TableCell>

            
            <TableCell>
              
              <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-[#556fa8] text-sm'>Max Raw Score</h1>
              </div>
            
            </TableCell>

            <TableCell>
              
              <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-[#556fa8] text-sm'>Weight</h1>
              </div>
            
            </TableCell>

            <TableCell>
              
              <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-[#556fa8] text-sm'>Weight Value</h1>
              </div>
            
            </TableCell>

            <TableCell>
              
              <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-[#556fa8] text-sm'>Allotted Time</h1>
              </div>
            
            </TableCell>

            <TableCell>
              
              <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-[#556fa8] text-sm'>Formula</h1>
              </div>
            
            </TableCell>

            <TableCell>
              
              <div className='flex flex-row gap-2 items-center justify-center'>
                  <h1 className='text-[#556fa8] text-sm'>Action</h1>
              </div>
            
            </TableCell>

          </TableRow>

        </TableHead>
        <TableBody>
          {formulaData?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <h1 className='text-gray-500 text-xs'>{row?.id}</h1>
              </TableCell>

              <TableCell><h1 className='text-gray-500 font-semibold text-sm'>{row?.name}</h1></TableCell>

              <TableCell>
                <h1 className='text-gray-500 text-xs'>{row?.max_raw_score}</h1>
              </TableCell>

              <TableCell>
                <h1 className='text-gray-500 text-xs'>{row?.weight}</h1>
              </TableCell>

              <TableCell>
                <h1 className='text-gray-500 text-xs'>{row?.weighted_value}</h1>
              </TableCell>

              <TableCell>
                <h1 className='text-gray-500 text-xs font-bold'>{row?.allotted_time} min/s</h1>
              </TableCell>

              <TableCell>
                <h1 className='text-green-500 text-xs font-bold'>{row?.formula}</h1>
              </TableCell>

              <TableCell>
                                                   
                <div className='flex flex-row gap-2 items-center justify-center'>
                
                  <Tooltip title="View Exam Content">
                      <div className='cursor-pointer' onClick={() => handleEditFormula(row)}>
                          <CreateOutlinedIcon color="primary"/>
                      </div>
                  </Tooltip>
                
                </div>

              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
      
    </div>
  )
}

export default ExamFormula
