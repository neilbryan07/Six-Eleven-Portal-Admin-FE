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
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';


import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import Tooltip from '@mui/material/Tooltip';

import { APIServices } from '../../../contants/apiConfig';
import { pageRoutes } from '../../../routes/pageRoutes';


const ViewModuleVideo = lazy(() => import('./modal/ViewModuleVideo'));
const CreateModuleVideo = lazy(() => import('./modal/CreateModuleVideo'));
const EditModuleVideo = lazy(() => import('./modal/EditModuleVideo'));

const dummyData = [
    {
        "id" : 1,
        "title" : "Multiple Choice Question",
        "description" : "Test Description",
        "instruction" : "Test Instruction",
        "is_active" : true
    },
    {
        "id" : 1,
        "title" : "Reflection Prompts",
        "description" : "Test Description",
        "instruction" : "Test Instruction",
        "is_active" : true
    }
]

const SelectedOnBoardingContent = () => {

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

    const [ viewModuleVid , setViewModuleVid ] = useState(false)
    const [ createModuleVid , setCreateModuleVid ] = useState(false)
    const [ editModuleVid , setEditModuleVid ] = useState(false)


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
    const handleOpenVideo = (row) => {
        setSelectedRow(row)
        setViewModuleVid(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setOpen5Edit(false);
    };
    const handleOpenEdit = (row) => {

        setSelectedRow(row)
        setEditModuleVid(true);

    };

    const handleCloseVideo = () => {
        setViewModuleVid(false);
    };

    const handleCloseCreateVideo = () => {
        setCreateModuleVid(false);
    };

    const handleCloseEditVideo = () => {
        setEditModuleVid(false);
    };

    const handleOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleOpenCreateVideo = () => {
        setCreateModuleVid(true);
    };

    
    const handleNavigation = (data) => {
        navigate(`/app/${pageRoutes.OnBoardingExam}`)
    }


    return (
        <div className='w-full h-full flex flex-col gap-3'>


            <div className='w-full flex flex-row items-center justify-between'>

                <div className='flex flex-row gap-2 items-center'>

                    <div onClick={handleNavigation} className='p-[2px] rounded-lg border border-[#556fa8] cursor-pointer'>
                        <span className='text-[#556fa8]'><KeyboardDoubleArrowLeftOutlinedIcon /></span>
                    </div>

                    <h1 className='font-normal text-lg text-[#839f55]'>OnBoarding Test Content</h1>

                </div>

                <div className='flex flex-row gap-2 items-center'>
                    
                    <Tooltip title="Add Exam Type">
                        <div onClick={handleOpenCreateVideo} className='p-[6px] rounded-lg border bg-blue-500 cursor-pointer'>
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
                                    <h1 className='text-[#556fa8] text-sm'>Title</h1>
                                    <span className='text-gray-500 cursor-pointer'><ExpandMoreOutlinedIcon /></span>
                                </div>

                            </TableCell>


                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Description</h1>
                                    <span className='text-gray-500 cursor-pointer'><ExpandMoreOutlinedIcon /></span>
                                </div>

                            </TableCell>

                            
                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Instruction</h1>
                                    <span className='text-gray-500 cursor-pointer'><ExpandMoreOutlinedIcon /></span>
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
                        {

                            dummyData?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs'>{row?.id}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 font-semibold text-sm'>{row?.title}</h1>
                                    </TableCell>

                                    <TableCell>
                                         <h1 className='text-gray-500 text-xs'>{row?.description}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs'>{row?.instruction}</h1>
                                    </TableCell>


                                    <TableCell>

                                        <div className='flex flex-row gap-2'>

                                            <Tooltip title="View Content">
                                                <div onClick={() => handleOpenVideo(row)} className='cursor-pointer'>
                                                    <VisibilityIcon color="primary" />
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

export default SelectedOnBoardingContent