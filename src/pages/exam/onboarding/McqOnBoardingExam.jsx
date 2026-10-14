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


const EditMcqOBContent = lazy(() => import('./modal/EditMcqOBContent'));
const ViewMcqOBContent = lazy(() => import('./modal/ViewMcqOBContent'));
const AddMcqOBContent = lazy(() => import('./modal/AddMcqOBContent'));


const McqOnBoardingExam = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [moduleInfo, setModuleInfo] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [selectedRow, setSelectedRow] = useState([]);


    const [editMCQContent, setEditMCQContent] = useState(false)
    const [viewMCQContent, setViewMCQContent] = useState(false)
    const [addMCQContent, setAddMCQContent] = useState(false)

    const [mcqContent, setMcqContent] = useState([]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page on rowsPerPage change
    };


    const handleOpenMCQContent = (row) => {
        setSelectedRow(row)
        setViewMCQContent(true);
    };

    const handleOpenEditMCQContent = (row) => {
        setSelectedRow(row)
        setEditMCQContent(true);
    };

    const handleOpenAddMCQ = () => {
        setAddMCQContent(true);
    };


    const handleCloseAddMCQ = () => {
        setAddMCQContent(false);
    };

    const handleCloseViewMCQ = () => {
        setViewMCQContent(false);
    };

    const handleCloseEditMCQ = () => {
        setEditMCQContent(false);
    };


    const handleNavigation = (data) => {
        navigate(`/app/${pageRoutes.OnBoardingExam}`)
    }

    useEffect(() => {
        handleMcqInfo();
        handleModuleInfo();
    }, []);


    const handleModuleInfo = async () => {

        const response = await APIServices.get({
            url: `/onboarding/modules?module_id=${id}`,
        });

        if (response.status === 200) {
            setModuleInfo(response?.data)
        }
    }

    const handleMcqInfo = async (data) => {

        const response = await APIServices.get({
            url: `/onboarding/questions/${id}`,
        });

        if (response.status === 200) {
            setMcqContent(response?.data)
        }
    }


    return (
        <div className='w-full h-full flex flex-col gap-3'>


            <Suspense>
                {addMCQContent && <AddMcqOBContent openModal={addMCQContent} handleClose={handleCloseAddMCQ} refreshData={handleMcqInfo} />}
            </Suspense>


            <Suspense>
                {viewMCQContent && <ViewMcqOBContent OnBoardingData={selectedRow} openModal={viewMCQContent} handleClose={handleCloseViewMCQ} />}
            </Suspense>

            <Suspense>
                {editMCQContent && <EditMcqOBContent OnBoardingData={selectedRow} openModal={editMCQContent} handleClose={handleCloseEditMCQ} refreshData={handleMcqInfo} />}
            </Suspense>


            <div className='w-full flex flex-row items-center justify-between'>

                <div className='flex flex-row gap-2 items-center'>

                    <div onClick={handleNavigation} className='p-[2px] rounded-lg border border-[#556fa8] cursor-pointer'>
                        <span className='text-[#556fa8]'><KeyboardDoubleArrowLeftOutlinedIcon /></span>
                    </div>

                    <h1 className='font-normal text-lg text-[#839f55]'>{moduleInfo?.title} - MCQ OnBoarding Content</h1>

                </div>

                <div className='flex flex-row gap-2 items-center'>

                    <Tooltip title="Add Exam Type">
                        <div onClick={handleOpenAddMCQ} className='p-[6px] rounded-lg border bg-blue-500 cursor-pointer'>
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
                                    <h1 className='text-[#556fa8] text-sm'>Question</h1>
                                </div>

                            </TableCell>


                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Status</h1>
                                </div>

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

                            mcqContent?.map((row, index) => (
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

                                            <Tooltip title="View Question Content">
                                                <div onClick={() => handleOpenMCQContent(row)} className='cursor-pointer'>
                                                    <VisibilityIcon color="primary" />
                                                </div>
                                            </Tooltip>

                                            <Tooltip title="Edit Question Content">
                                                <div onClick={() => handleOpenEditMCQContent(row)} className='cursor-pointer'>
                                                    <EditIcon color="primary" />
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
                    count={mcqContent?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}

            </TableContainer>
        </div>
    )
}

export default McqOnBoardingExam