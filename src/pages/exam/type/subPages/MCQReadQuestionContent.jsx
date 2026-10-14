import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';

import { useParams, useNavigate } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import Backdrop from '@mui/material/Backdrop';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import AudioFileIcon from '@mui/icons-material/AudioFile';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import Tooltip from '@mui/material/Tooltip';

import SaveButton from '../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../component/Buttons/CloseButton';

import { APIServices } from '../../../../contants/apiConfig';
import { pageRoutes } from '../../../../routes/pageRoutes';

const AddReadingPassage = lazy(() => import('../modal/AddReadingPassage'));
const ViewFullPassage = lazy(() => import('../modal/ViewFullPassage'));
const EditReadingPassage = lazy(() => import('../modal/EditReadingPassage'));


const MCQReadQuestionContent = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [mcqsContent, setMCQsContent] = useState([]);

    const listeningCompre = useRef(null);

    const [filterContent, setFilterContent] = useState([]);

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [selectedRow, setSelectedRow] = useState([]);

    const [searchData, setSearchData] = useState(null);
    const [isTyping, setIsTyping] = useState(false)

    const [openListen, setOpenListen] = useState(false);
    const [addListen, setAddListen] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page on rowsPerPage change
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

    const handleStatusOpen = (row) => {
        setSelectedRow(row)
        setOpenStatus(true);
    };


    useEffect(() => {
        handleListeningExamContent();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;

        setSearchData(value);
        setIsTyping(true);
        setPage(0);

        if (!value) {

        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsTyping(false);
            if (searchData?.trim()) {

            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [searchData]);

    const handleListeningExamContent = async (isTrue = true) => {

        const response = await APIServices.get({
            url: '/mcq-admin/reading-passage-view'
        });

        if (response.status === 200) {
            listeningCompre.current = response?.data?.data;

            setFilterContent(response?.data?.passages)

        }
    }

    const handleNavigationHome = (data) => {
        navigate(`/app/${pageRoutes.ExamType}`)
    }

    const handleNavigation = (data) => {
        navigate("/app/exam-mcqs-read-question/" + data);
    }


    const handleCloseListen = (number) => {

        if (number === 1) setOpenListen(false);
        else if (number === 2) setAddListen(false);

    };

    const handleContent = (number) => {
        setAddListen(true);
    }

    const handleContentViewAudio = (row) => {

        setOpenListen(true);
        setSelectedRow(row)

    }

    const handleToggle = async (event) => {
        // setIsActive(event.target.checked ? 1 : 0);

        const response = await APIServices.post({
            url: '/mcq-admin/toggle-passage-status', payload: {
                "id": selectedRow?.id,
                "is_active": event.target.checked ? true : false
            }
        });

        if (response.status === 200) {
            setOpenStatus(false);
            handleListeningExamContent();
        }
    };

    return (
        <div className='w-full h-full flex flex-col gap-3'>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={openStatus}
            >

                <div className='max-w-[200px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                    <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                        <h1 className='text-sm text-[#556fa8] font-medium'>Status</h1>

                        <div onClick={() => setOpenStatus(false)} className='flex flex-col items-center'>
                            <span className='text-gray-500 cursor-pointer'>
                                <CancelOutlinedIcon size="s" />
                            </span>

                        </div>

                    </div>

                    <div className='w-full flex flex-col gap-2'>

                        <div className='flex flex-row gap-2 items-center'>
                            <h1 className='text-xs text-red-500 font-bold'>Inactive</h1>
                            <Switch color="success" checked={selectedRow?.is_active === 1 ? true : false} onChange={handleToggle} />
                            <h1 className='text-xs text-[#839f55] font-bold'>Active</h1>
                        </div>

                    </div>

                </div>

            </Backdrop>

            <Suspense>
                {openListen && <ViewFullPassage openModal={openListen} handleClose={() => handleCloseListen(1)} ReadCompre={selectedRow} />}
            </Suspense>

            <Suspense>
                {addListen && <AddReadingPassage openModal={addListen} handleClose={() => handleCloseListen(2)} refreshData={handleListeningExamContent} />}
            </Suspense>

            <Suspense>
                {openEdit && <EditReadingPassage rowData={selectedRow} openModal={openEdit} handleClose={handleCloseEdit} />}
            </Suspense>

            <div className='w-full flex flex-row items-center justify-between'>

                <div className='flex flex-row gap-2 items-center'>

                    <div onClick={handleNavigationHome} className='p-[2px] rounded-lg border border-[#556fa8] cursor-pointer'>
                        <span className='text-[#556fa8]'><KeyboardDoubleArrowLeftOutlinedIcon /></span>
                    </div>

                    <h1 className='font-normal text-lg text-[#839f55]'>Reading Comprehension</h1>

                </div>

                <div className='flex flex-row gap-2 items-center'>
                    {/* <TextField id="outlined-basic" label="Search ..." variant="outlined" size='small' value={searchData} onChange={handleSearch} /> */}

                    <Tooltip title="Add Audio Content">
                        <div onClick={() => handleContent(2)} className='p-[6px] rounded-lg border bg-blue-500 cursor-pointer'>
                            <span className='text-white'><AddCircleOutlineOutlinedIcon /></span>
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
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Passage Name</h1>
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
                                ? filterContent?.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                : filterContent
                            )?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs'>{row?.id}</h1>
                                    </TableCell>

                                    <TableCell style={{ maxWidth: '350px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h1 className='text-gray-500 font-semibold text-sm'>{row?.reading_passage_name}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 onClick={() => handleStatusOpen(row)} className={`${row?.is_active ? " text-green-500" : " text-red-500"} text-xs cursor-pointer font-semibold`}>{row?.is_active ? "Active" : "Inactive"}</h1>
                                    </TableCell>

                                    <TableCell>

                                        <div className='flex flex-row gap-2'>

                                            <Tooltip title="View Passage Content">
                                                <div onClick={() => handleContentViewAudio(row)} className='cursor-pointer'>
                                                    <AutoStoriesIcon color="primary" />
                                                </div>
                                            </Tooltip>

                                            <Tooltip title="Edit Exam Content">
                                                <div onClick={() => handleOpenEdit(row)} className='cursor-pointer'>
                                                    <EditIcon color="primary" />
                                                </div>
                                            </Tooltip>

                                            <Tooltip title="View Question Content">
                                                <div onClick={() => handleNavigation(row?.id)} className='cursor-pointer'>
                                                    <VisibilityIcon color="primary" />
                                                </div>
                                            </Tooltip>

                                        </div>

                                    </TableCell>

                                </TableRow>
                            ))}
                    </TableBody>
                </Table>

                {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={mcqsContent?.data?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}

            </TableContainer>
        </div>
    )
}

export default MCQReadQuestionContent