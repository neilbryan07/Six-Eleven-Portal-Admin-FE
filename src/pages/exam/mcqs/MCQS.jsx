import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';

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

import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import Tooltip from '@mui/material/Tooltip';

import { APIServices } from '../../../contants/apiConfig';

const EditQuestion = lazy(() => import('./modal/EditQuestion'));
const ViewQuestion = lazy(() => import('./modal/ViewQuestion'));
const AddQuestion = lazy(() => import('./modal/AddQuestion'));
const FilterQuestion = lazy(() => import('./modal/FilterQuestion'));

const MCQS = () => {

  const [mcqsContent, setMCQsContent] = useState([]);

  const readingPassage = useRef(null);
  const listeningCompre = useRef(null);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedRow, setSelectedRow] = useState([]);

  const [isActiveData, setIsActiveData] = useState('');
  const [searchData, setSearchData] = useState(null);
  const [question_type, setQuestion_type] = useState(null);
  const [isTyping, setIsTyping] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rowsPerPage change
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (row) => {
    setSelectedRow(row)
    setOpen(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleOpenEdit = (row) => {
    setSelectedRow(row)
    setOpenEdit(true);
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


  useEffect(() => {
    handlePassageContent();
    handleListeningExamContent();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearchData(value);
    setIsTyping(true);
    setPage(0);

    if (!value) {
      handleMCQsContent(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTyping(false);
      if (searchData?.trim()) {
        handleMCQsContent();
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchData]);

  useEffect(() => {
    handleMCQsContent()
  }, [question_type, isActiveData]);




  const handleMCQsContent = async (isTrue = true) => {

    const response = await APIServices.get({
      url: '/mcq-admin/list-of-questions', payload: {
        "search": isTrue ? searchData : '',
        "question_type": question_type,
        "question_type": question_type,
        "status": isActiveData
      }
    });

    if (response.status === 200) {
      setMCQsContent(response?.data?.data)
    }
  }


  const handleListeningExamContent = async (isTrue = true) => {

    const response = await APIServices.get({
      url: '/mcq-admin/get-audio-3'
    });

    if (response.status === 200) {
      listeningCompre.current = response?.data?.data;
    }
  }

  const handlePassageContent = async (isTrue = true) => {

    const response = await APIServices.get({
      url: '/mcq-admin/reading-passage-view'
    });

    if (response.status === 200) {
      readingPassage.current = response?.data?.passages;
    }
  }

  return (
    <div className='w-full h-full flex flex-col gap-3'>

      <Suspense>
        {openFilter && <FilterQuestion openModal={openFilter} handleClose={handleCloseFilter} questionType={setQuestion_type} activeData={setIsActiveData} />}
      </Suspense>

      <Suspense>
        {openAdd && <AddQuestion openModal={openAdd} handleClose={handleCloseAdd} reFreshTable={handleMCQsContent} ListeningCompre={listeningCompre} ReadingPassageData={readingPassage} />}
      </Suspense>

      <Suspense>
        {openEdit && <EditQuestion openModal={openEdit} handleClose={handleCloseEdit} rowData={selectedRow} reFreshTable={handleMCQsContent} ListeningCompre={listeningCompre} ReadingPassageData={readingPassage} />}
      </Suspense>

      <Suspense>
        {open && <ViewQuestion openModal={open} handleClose={handleClose} rowData={selectedRow} />}
      </Suspense>


      <div className='w-full flex flex-row items-center justify-between'>

        <h1 className='font-normal text-lg text-[#839f55]'>Multiple Choice Question</h1>

        <div className='flex flex-row gap-2 items-center'>
          <TextField id="outlined-basic" label="Search ..." variant="outlined" size='small' value={searchData} onChange={handleSearch} />

          <Tooltip title="Add Exam Type">
            <div onClick={handleOpenAdd} className='p-[6px] rounded-lg border bg-blue-500 cursor-pointer'>
              <span className='text-white'><AddCircleOutlineOutlinedIcon /></span>
            </div>
          </Tooltip>

          <Tooltip title="Filter Exam Type">
            <div onClick={handleOpenFilter} className='p-[6px] rounded-lg border border-[#839f55] cursor-pointer'>
              <span className='text-[#839f55]'><SettingsOutlinedIcon /></span>
            </div>
          </Tooltip>

        </div>

      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table" size="medium">
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
                  <h1 className='text-[#556fa8] text-sm'>Question Name</h1>
                  <span className='text-gray-500 cursor-pointer'><ExpandMoreOutlinedIcon /></span>
                </div>

              </TableCell>


              <TableCell>

                <div className='flex flex-row gap-2 items-center'>
                  <h1 className='text-[#556fa8] text-sm'>Question Type</h1>
                  <span className='text-gray-500 cursor-pointer'><ExpandMoreOutlinedIcon /></span>
                </div>

              </TableCell>

              <TableCell>

                <div className='flex flex-row gap-2 items-center'>
                  <h1 className='text-[#556fa8] text-sm'>Question Total Items</h1>
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
                ? mcqsContent?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                : mcqsContent
              )?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <h1 className='text-gray-500 text-xs'>{row?.id}</h1>
                  </TableCell>

                  <TableCell style={{ maxWidth: '350px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <h1 className='text-gray-500 font-semibold text-sm'>{row?.question_text}</h1>
                  </TableCell>


                  <TableCell>
                    <Chip label={`${row?.exam_type?.name}`} color="success" variant="outlined" />
                  </TableCell>

                  <TableCell>
                    <h1 className='text-gray-500 text-xs'>{row?.answers?.length}</h1>
                  </TableCell>


                  <TableCell>
                    <h1 className={`${row?.is_active ? " text-green-500" : " text-red-500"} text-xs font-semibold`}>{row?.is_active ? "Active" : "Inactive"}</h1>
                  </TableCell>

                  <TableCell>

                    <div className='flex flex-row gap-2'>

                      <Tooltip title="View Exam Content">
                        <div onClick={() => handleOpen(row)} className='cursor-pointer'>
                          <VisibilityIcon color="primary" />
                        </div>
                      </Tooltip>

                      <Tooltip title="Edit Exam Content">
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
          count={mcqsContent?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </TableContainer>
    </div>
  )
}

export default MCQS