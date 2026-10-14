import React from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';


import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import Tooltip from '@mui/material/Tooltip';


function createData(id, name, category ,alloted_time, instruction) {
  return { id, name, category , alloted_time, instruction};
}
const rows = [
  createData(1, 'Multiple Choice Question', "Exam for multiple choice question", 'mcqs' , "active",),
  createData(2, 'Audio Script & Mock Call', "Audio record and sample mock call recording" ,'audio' , "active", ),
  createData(3, 'Word Per Minute',  "Measure the typing speed of the applicant", 'wpm' ,  "active" ),
];

const ExamCategory = () => {


  return (
    <div className='w-full flex flex-col rounded gap-4'>

      <div className='w-full flex flex-row items-center justify-between'>

        <h1 className='font-normal text-lg text-[#839f55]'>Exam Category</h1>

        {/* <div className='flex flex-row gap-2 items-center'>
          <TextField id="outlined-basic" label="Search ..." variant="outlined" size='small' />

          <Tooltip title="Add Exam Type">
            <div className='p-[6px] rounded-lg border bg-blue-500 cursor-pointer'>
              <span className='text-white'><AddCircleOutlineOutlinedIcon /></span>
            </div>
          </Tooltip>

          <Tooltip title="Filter Exam Type">
            <div className='p-[6px] rounded-lg border border-[#556fa8] cursor-pointer'>
              <span className='text-[#556fa8]'><SettingsOutlinedIcon /></span>
            </div>
          </Tooltip>

        </div> */}

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
                <h1 className='text-[#556fa8] text-sm'>Description</h1>
              </div>
            
            </TableCell>

            <TableCell>
              
              <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-[#556fa8] text-sm'>Tag</h1>
              </div>
            
            </TableCell>

            <TableCell>
              
              <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-[#556fa8] text-sm'>Is Active</h1>
              </div>
            
            </TableCell>

          </TableRow>

        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <h1 className='text-gray-500 text-xs'>{row.id}</h1>
              </TableCell>

              <TableCell><h1 className='text-gray-500 font-semibold text-sm'>{row.name}</h1></TableCell>

              <TableCell>
                <h1 className='text-gray-500 text-xs'>{row.category}</h1>
              </TableCell>

              <TableCell>
                <Chip label={`${row.alloted_time}`} color="primary" variant="outlined" />
              </TableCell>

              <TableCell>
                <h1 className='text-green-500 text-xs'>{row.instruction}</h1>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
      
    </div>
  )
}

export default ExamCategory
