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
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import Tooltip from '@mui/material/Tooltip';

import { APIServices } from '../../../contants/apiConfig';
import { pageRoutes } from '../../../routes/pageRoutes';



const AddInformationExam = lazy(() => import('./modal/AddInformationExam'));
const ViewInformationExam = lazy(() => import('./modal/ViewInformationExam'));
const EditInformationExam = lazy(() => import('./modal/EditInformationExam'));


const InformationExam = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [mcqsContent, setMCQsContent] = useState([]);

    const readingPassage = useRef(null);
    const listeningCompre = useRef(null);

    const [filterContent, setFilterContent] = useState([]);

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [open5Edit, setOpen5Edit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [selectedRow, setSelectedRow] = useState([]);

    const [isActiveData, setIsActiveData] = useState('');
    const [searchData, setSearchData] = useState(null);
    const [question_type, setQuestion_type] = useState(null);
    const [isTyping, setIsTyping] = useState(false)

    const [filterAudioPassage, setFilterAudioPassage] = useState(null);

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
        setOpen5Edit(false);
    };
    const handleOpenEdit = (row) => {

        setSelectedRow(row)
        if (row?.answers?.length > 3) setOpen5Edit(true);
        else setOpenEdit(true);

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
    }, [question_type, isActiveData, filterAudioPassage]);


    const handleMCQsContent = async (isTrue = true) => {

        const response = await APIServices.get({
            url: '/informal/fetch-questions', payload: {
                "search": isTrue ? searchData : '',
                "personality_exam_type": id,
            }
        });

        if (response.status === 200) {
            setMCQsContent(response)
        }

    }

    const handleListeningExamContent = async (isTrue = true) => {

        const response = await APIServices.get({
            url: '/mcq-admin/get-audio-3'
        });

        if (response.status === 200) {
            listeningCompre.current = response?.data?.data;

            if (parseInt(id) === 3) setFilterContent(response?.data?.data)

        }
    }


    const handleStatus = (data) => {

        if (parseInt(data) === 1) return <h1 className={`text-green-500 text-xs font-semibold`}>Active</h1>
        else return <h1 className={`text-red-500 text-xs font-semibold`}>Inactive</h1>
    }

    return (
        <div className='w-full h-full flex flex-col gap-3'>

            <Suspense>
                {openAdd && <AddInformationExam questionExam={mcqsContent?.examType} openModal={openAdd} handleClose={handleCloseAdd} reFreshTable={handleMCQsContent} />}
            </Suspense>

            <Suspense>
                {open && <ViewInformationExam questionData={selectedRow} openModal={open} handleClose={handleClose} reFreshTable={handleMCQsContent} />}
            </Suspense>

            <Suspense>
                {openEdit && <EditInformationExam questionData={selectedRow} openModal={openEdit} handleClose={handleCloseEdit} questionExam={selectedRow} reFreshTable={handleMCQsContent} />}
            </Suspense>


            <div className='w-full flex flex-row items-center justify-between'>

                <div className='flex flex-row gap-2 items-center'>
                    <h1 className='font-normal text-lg text-[#839f55]'>Information Exam Type</h1>

                </div>

                <div className='flex flex-row gap-2 items-center'>
                    <TextField id="outlined-basic" label="Search ..." variant="outlined" size='small' value={searchData} onChange={handleSearch} />

                    <Tooltip title="Add Exam Type">
                        <div onClick={handleOpenAdd} className='p-[6px] rounded-lg border bg-blue-500 cursor-pointer'>
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
                                ? mcqsContent?.data?.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                : mcqsContent?.data
                            )?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs'>{row?.id}</h1>
                                    </TableCell>

                                    <TableCell style={{ maxWidth: '350px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h1 className='text-gray-500 font-semibold text-sm'>{row?.question}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <Chip label={`${row?.is_fill ? "Provide Answer" : "Multiple Choice"}`} color="success" variant="outlined" />
                                    </TableCell>


                                    <TableCell>
                                        {handleStatus(row?.is_active)}
                                    </TableCell>

                                    <TableCell>

                                        <div className='flex flex-row gap-2'>


                                            <Tooltip title="Edit Exam Content">
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
                    count={mcqsContent?.data?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </TableContainer>
        </div>
    )
}

export default InformationExam