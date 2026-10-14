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


const AddPromptQuestion = lazy(() => import('./modal/AddPromptQuestion'));
const EditPromptQuestion = lazy(() => import('./modal/EditPromptQuestion'));

const dummyData = [
    {
        "id": 1,
        "question": "Which SERVE value resonates most with you, and how can you apply it this week?",
        "is_active": true
    }
]

const PromptOnBoardingExam = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [moduleInfo, setModuleInfo] = useState([]);
    const [promptContent, setPromptContent] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [selectedRow, setSelectedRow] = useState([]);

    const [openAddPrompt, setOpenAddPrompt] = useState(false);
    const [openEditPrompt, setOpenEditPrompt] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page on rowsPerPage change
    };

    const handleCloseAddPrompt = () => {
        setOpenAddPrompt(false);
    };

    const handleOpenAddPrompt = () => {
        setOpenAddPrompt(true)
    };

    const handleOpenEditPrompt = (row) => {
        setOpenEditPrompt(true)
        setSelectedRow(row)
    };

    const handleCloseEditPrompt = () => {
        setOpenEditPrompt(false);
    };

    const handleNavigation = (data) => {
        navigate(`/app/${pageRoutes.OnBoardingExam}`)
    }


    useEffect(() => {
        handlePrompt();
        handleModuleInfo()
    }, []);


    const handleModuleInfo = async () => {

        const response = await APIServices.get({
            url: `/onboarding/modules?module_id=${id}`,
        });

        if (response.status === 200) {
            setModuleInfo(response?.data)
        }
    }


    const handlePrompt = async (data) => {

        const response = await APIServices.get({
            url: `/onboarding/reflections/${id}`,
        });

        if (response.status === 200) {
            setPromptContent(response?.data)
        }
    }

    return (
        <div className='w-full h-full flex flex-col gap-3'>


            <Suspense>
                {openAddPrompt && <AddPromptQuestion openModal={openAddPrompt} handleClose={handleCloseAddPrompt} refreshData={handlePrompt} />}
            </Suspense>


            <Suspense>
                {openEditPrompt && <EditPromptQuestion OnBoardingData={selectedRow} openModal={openEditPrompt} handleClose={handleCloseEditPrompt} refreshData={handlePrompt} />}
            </Suspense>


            <div className='w-full flex flex-row items-center justify-between'>

                <div className='flex flex-row gap-2 items-center'>

                    <div onClick={handleNavigation} className='p-[2px] rounded-lg border border-[#556fa8] cursor-pointer'>
                        <span className='text-[#556fa8]'><KeyboardDoubleArrowLeftOutlinedIcon /></span>
                    </div>

                    <h1 className='font-normal text-lg text-[#839f55]'>{moduleInfo?.title} - Reflection Prompts Content</h1>

                </div>

                <div className='flex flex-row gap-2 items-center'>

                    <Tooltip title="Add Reflection Prompts Exam">
                        <div onClick={handleOpenAddPrompt} className='p-[6px] rounded-lg border bg-blue-500 cursor-pointer'>
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
                                    <h1 className='text-[#556fa8] text-sm'>Question</h1>
                                    <span className='text-gray-500 cursor-pointer'><ExpandMoreOutlinedIcon /></span>
                                </div>

                            </TableCell>

                            <TableCell>
                                <h1 className='text-[#556fa8] text-sm self-center'>Status</h1>
                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Action</h1>
                                </div>

                            </TableCell>

                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {

                            promptContent?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs'>{row?.id}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 font-semibold text-sm'>{row?.question}</h1>
                                    </TableCell>


                                    <TableCell>
                                        <h1 className={`${row?.is_active ? " text-green-500" : " text-red-500"} text-xs font-semibold`}>{row?.is_active ? "Active" : "Inactive"}</h1>
                                    </TableCell>

                                    <TableCell>

                                        <div className='flex flex-row gap-2'>

                                            <Tooltip title="Edit Exam Content">
                                                <div onClick={e => handleOpenEditPrompt(row)} className='cursor-pointer'>
                                                    <EditIcon color="primary" />
                                                </div>
                                            </Tooltip>

                                        </div>

                                    </TableCell>

                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                {/* 
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={promptContent?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}

            </TableContainer>
        </div>
    )
}

export default PromptOnBoardingExam