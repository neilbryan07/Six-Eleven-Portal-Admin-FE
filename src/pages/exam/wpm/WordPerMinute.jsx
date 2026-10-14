import React from 'react'

import { useParams , useNavigate } from "react-router-dom";

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

import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';

import Tooltip from '@mui/material/Tooltip';
import { pageRoutes } from '../../../routes/pageRoutes';


function createData(id, name, content ,type, status) {
  return { id, name, content , type, status};
}
const rows = [
  createData(
    1,
    'Customer Service Response ',
    `Subject: Update on Your Delayed Shipment
  
  Dear [Customer Name],
  
  Thank you for reaching out regarding your order. I sincerely apologize for the delay and understand how frustrating this must be.
  
  Upon checking our system, I see that your order was delayed due to a temporary warehouse issue. However, I’m happy to inform you that your package has now been processed for shipment and is scheduled for delivery within the next 48 hours.
  
  To ensure you stay updated, I have sent your tracking details to your registered email. You can also track your order directly using this link: [Tracking Link].
  
  As a token of our apology for the inconvenience, we would like to offer you a 10% discount on your next purchase. Please use the code SHIP10 at checkout.
  
  If you need any further assistance, please don’t hesitate to reply to this email or contact our support team at [Customer Service Contact].
  
  We appreciate your patience and thank you for choosing [Company Name].
  
  Best regards,
  
  [Your Name]
  [Company Name]
  [Customer Support Team]
  `,
    "Word Per Minute",
    "Active"
  ),
  
];

const WordPerMinute = () => {

  const navigate = useNavigate();

  const handleNavigation = (data) => {
      navigate(`/app/${pageRoutes.ExamType}`)
  }

  return (
    <div className='w-full h-full flex flex-col gap-3'>
    <div className='w-full flex flex-row items-center justify-between'>

        <div className='flex flex-row gap-2 items-center'>

          <div onClick={handleNavigation} className='p-[2px] rounded-lg border border-[#556fa8] cursor-pointer'>
              <span className='text-[#556fa8]'><KeyboardDoubleArrowLeftOutlinedIcon /></span>
          </div>

          <h1 className='font-normal text-lg text-[#839f55]'>Word Per Minute</h1>

        </div>

        <div className='flex flex-row gap-2 items-center'>
          {/* <TextField id="outlined-basic" label="Search ..." variant="outlined" size='small' /> */}

          {/* <Tooltip title="Add Audio Simulation">
            <div className='p-[6px] rounded-lg border bg-blue-500 cursor-pointer'>
              <span className='text-white'><AddCircleOutlineOutlinedIcon /></span>
            </div>
          </Tooltip>

          <Tooltip title="Filter Table">
            <div className='p-[6px] rounded-lg border border-[#556fa8] cursor-pointer'>
              <span className='text-[#556fa8]'><SettingsOutlinedIcon /></span>
            </div>
          </Tooltip> */}

        </div>

      </div>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" size="medium">
        <TableHead>
          <TableRow>

            <TableCell>
              
              <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-[#556fa8] text-sm'>ID</h1>
                <span className='text-gray-500 cursor-pointer'><ExpandMoreOutlinedIcon/></span>
              </div>
            
            </TableCell>

            <TableCell>
              
              <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-[#556fa8] text-sm'>Name</h1>
                <span className='text-gray-500 cursor-pointer'><ExpandMoreOutlinedIcon/></span>
              </div>
            
            </TableCell>

            
            <TableCell>
              
              <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-[#556fa8] text-sm'>Content</h1>
              </div>
            
            </TableCell>

            <TableCell>
              
              <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-[#556fa8] text-sm'>Exam Type</h1>
              </div>
            
            </TableCell>

            <TableCell>
              
              <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-[#556fa8] text-sm'>Status</h1>
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

              <TableCell style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <h1 className='text-gray-500 text-xs'>{row.content}</h1>
              </TableCell>
               
              <TableCell>
                <Chip label={`${row.type}`} color="success" variant="outlined" />
              </TableCell>
              
              <TableCell>
                <h1 className='text-green-500 text-xs font-semibold'>{row.status}</h1>
              </TableCell>

              {/* <TableCell>
               
                <div className='flex flex-row gap-2'>
                  <Tooltip title="Edit Audio Data">
                    <span className='cursor-pointer'>
                      <CreateOutlinedIcon color="primary"/>
                    </span>
                  </Tooltip>
                </div>
      
              </TableCell> */}

            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
    </div>
  )
}

export default WordPerMinute