import React, { lazy, Suspense, useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

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

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';

import Tooltip from '@mui/material/Tooltip';

import { APIServices } from '../../../../contants/apiConfig';
import { pageRoutes } from '../../../../routes/pageRoutes';

const AddAudio = lazy(() => import('./modal/AddAudio'));
const FilterAudio = lazy(() => import('./modal/FilterAudio'));
const ViewAudio = lazy(() => import('./modal/ViewAudio'));
const EditAudio = lazy(() => import('./modal/EditAudio'));

function createData(id, name, content, type, status) {
  return { id, name, content, type, status };
}
const rows = [
  createData(1, 'Customer Support Message', '"Thank you for calling. I understand your concern, and I’ll do my best to resolve it. May I put you on hold for a moment while I check the details?"', "Verbal Communication & Pronunciation", "Active"),
  createData(2, 'Information Disclosure', '"Your order is currently being processed, and we expect it to arrive within three days. If you have any concerns, we’re happy to assist you further."', "Verbal Communication & Pronunciation", "Active"),
  createData(3, 'Apology Statement', '"I sincerely apologize for the delay. We value your time and will do everything possible to resolve this quickly."', "Verbal Communication & Pronunciation", "Active"),
];

const AudioSimulationTab = () => {

  const navigate = useNavigate();

  const [openAdd, setOpenAdd] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [audioContent, setAudioContent] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

  const [ searchData , setSearchData ] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [ isActiveData , setIsActiveData ] = useState('');

  const [isTyping, setIsTyping] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rowsPerPage change
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleClose = () => {
    setOpenView(false);
  };
  const handleOpen = (data) => {
    setSelectedRow(data)
    setOpenView(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleOpenEdit = (data) => {
    setSelectedRow(data)
    setOpenEdit(true);
  };
  

  useEffect(() => {
    handleAudioContent();
  }, [isActiveData]);

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearchData(value);
    setIsTyping(true);
    setPage(0);

    if (!value) {
      handleAudioContent(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTyping(false);
      if (searchData?.trim()) {
        handleAudioContent();
      } 
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchData]);

  const handleAudioContent = async ( isTrue = true) => {

    const response = await APIServices.get({
      url: '/verbal/fetch-verbal-content' , payload: {
        "search": isTrue ? searchData : '',
        "nolimit_random" : true,
        "is_active" : parseInt(isActiveData) === 1 ? parseInt(isActiveData) : parseInt(isActiveData) === 0 ? parseInt(isActiveData) : '',
      }
    });

    if (response.status === 200) {
      setAudioContent(response?.data?.data)
    }
  }

  const handleNavigation = (data) => {
      navigate(`/app/${pageRoutes.ExamType}`)
  }

  return (
    <div className='w-full h-full flex flex-col gap-3'>

      <Suspense>
        {openAdd && <AddAudio openModal={openAdd} handleClose={handleCloseAdd} reFreshTable={handleAudioContent} />}
      </Suspense>

      <Suspense>
        {openFilter && <FilterAudio openModal={openFilter} handleClose={handleCloseFilter} filterActive = { setIsActiveData } />}
      </Suspense>

      <Suspense>
        {openView && <ViewAudio openModal={openView} handleClose={handleClose} rowData={selectedRow} />}
      </Suspense>

      <Suspense>
        {openEdit && <EditAudio openModal={openEdit} handleClose={handleCloseEdit} rowData={selectedRow} reFreshTable={handleAudioContent} />}
      </Suspense>




      <div className='w-full flex flex-row items-center justify-between'>

        <div className='flex flex-row gap-2 items-center'>

          <div onClick={handleNavigation} className='p-[2px] rounded-lg border border-[#556fa8] cursor-pointer'>
              <span className='text-[#556fa8]'><KeyboardDoubleArrowLeftOutlinedIcon /></span>
          </div>

          <h1 className='font-normal text-lg text-[#839f55]'>Audio Simulation</h1>

        </div>

        <div className='flex flex-row gap-2 items-center'>
          <TextField id="outlined-basic" label="Search ..." variant="outlined" size='small' value={searchData} onChange={handleSearch} />

          <Tooltip title="Add Audio Simulation">
            <div onClick={handleOpenAdd} className='p-[6px] rounded-lg border bg-blue-500 cursor-pointer'>
              <span className='text-white'><AddCircleOutlineOutlinedIcon /></span>
            </div>
          </Tooltip>

          <Tooltip title="Filter Table">
            <div onClick={handleOpenFilter} className='p-[6px] rounded-lg border border-[#839f55] cursor-pointer'>
              <span className='text-[#839f55]'><SettingsOutlinedIcon /></span>
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
                  <span className='text-gray-500 cursor-pointer'><ExpandMoreOutlinedIcon /></span>
                </div>

              </TableCell>

              <TableCell>

                <div className='flex flex-row gap-2 items-center'>
                  <h1 className='text-[#556fa8] text-sm'>Name</h1>
                  <span className='text-gray-500 cursor-pointer'><ExpandMoreOutlinedIcon /></span>
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

              <TableCell>
                <h1 className='text-[#556fa8] text-sm'>Action</h1>
              </TableCell>

            </TableRow>

          </TableHead>
          <TableBody>
            {

              (rowsPerPage > 0
                ? audioContent?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : audioContent
              )?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell>
                  <h1 className='text-gray-500 text-xs'>{row?.id}</h1>
                </TableCell>

                <TableCell><h1 className='text-gray-500 font-semibold text-sm'>{row?.verbal_content_name}</h1></TableCell>

                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <h1 className='text-gray-500 text-xs'>{row?.verbal_content_text}</h1>
                </TableCell>

                <TableCell>
                  <Chip label={`${row?.exam_type?.name}`} color="success" variant="outlined" />
                </TableCell>

                <TableCell>
                   <h1 className={`${ parseInt(row?.is_active) === 1 ? " text-green-500" : " text-red-500"} text-xs font-semibold`}>{row?.is_active ? "Active" : "Inactive"}</h1>
                </TableCell>

                <TableCell>

                  <div className='flex flex-row gap-2'>

                    <Tooltip title="View Audio Content">

                      <div onClick={() => handleOpen(row)} className='cursor-pointer'>
                        <VisibilityIcon color="primary" />
                      </div>
                    </Tooltip>

                    <Tooltip title="Edit Audio Content">
                      <div onClick={() => handleOpenEdit(row)} className='cursor-pointer'>
                        <EditIcon color="primary" />
                      </div>
                    </Tooltip>

                  </div>

                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={audioContent?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  )
}

export default AudioSimulationTab