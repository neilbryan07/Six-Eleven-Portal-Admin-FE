import React, { lazy, Suspense, useState, useEffect } from 'react';


import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';

import TextField from '@mui/material/TextField';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import { APIServices } from '../../contants/apiConfig';
import { useSelector } from 'react-redux';

import { handleTimeFormat } from '../../contants/contans';

const EditJob = lazy(() => import('./modal/EditJob'));
const DeleteJob = lazy(() => import('./modal/DeleteJob'));
const ViewJob = lazy(() => import('./modal/ViewJob'));
const AddJob = lazy(() => import('./modal/AddJob'));

const JobPreference = () => {

    const [openJob, setOpenAds] = useState(false);
    const [openViewAds, setViewAds] = useState(false);
    const [openEditAds, setEditAds] = useState(false);
    const [openDeleteAds, setDeleteAds] = useState(false);

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [modalState, setModalState] = useState({
        create: false,
        delete: false,
        view: false,
        update: false,
    });

    const [jobList, setJobList] = useState([]);
    const [selectedData, setSelectedData] = useState(null)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        console.log("Test")
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFetchJobs = async () => {

        const response = await APIServices.get({
            url: `/jobs?&page=${page + 1}&limit=${rowsPerPage}&search=${search}`
        });

        if (response.status === 200) {
            setJobList(response?.data);
        }

    }

    const handleClose = () => {
        setModalState({
            create: false,
            delete: false,
            view: false,
            update: false,
        });
    }

    const handleOpen = (type, row = null) => {

        setModalState({
            create: false,
            update: false,
            delete: false,
            view: false,
            [type]: true,
        });

        setSelectedData(row)

    }

    useEffect(() => {
        handleFetchJobs();
    }, [search, page, rowsPerPage]);

    return (
        <div className='w-full h-full flex flex-col gap-3'>

            <Suspense>
                {modalState?.create && <AddJob openModal={modalState?.create} handleClose={handleClose} refreshData={handleFetchJobs} />}
            </Suspense>

            <Suspense>
                {modalState?.view && <ViewJob openModal={modalState?.view} handleClose={handleClose} rowData={selectedData} />}
            </Suspense>

            <Suspense>
                {modalState?.update && <EditJob openModal={modalState?.update} handleClose={handleClose} refreshData={handleFetchJobs} rowData={selectedData} />}
            </Suspense>

            <Suspense>
                {modalState?.delete && <DeleteJob openModal={modalState?.delete} handleClose={handleClose} refreshData={handleFetchJobs} rowData={selectedData} />}
            </Suspense>

            <div className='w-full flex flex-row items-center justify-between'>

                <h1 className='font-normal text-lg text-[#839f55]'>Job Preference Content</h1>
                {/* setSearch */}
                <div className='flex flex-row gap-2 items-center'>
                    <TextField id="outlined-basic" label="Search Jobs..." variant="outlined" size='small' value={search} onChange={e => setSearch(e.target.value)} />

                    <Tooltip title="Add Ads Content">
                        <div onClick={e => handleOpen("create")} className='p-[6px] rounded-lg border bg-blue-500 cursor-pointer'>
                            <span className='text-white'><AddCircleOutlineOutlinedIcon /></span>
                        </div>
                    </Tooltip>
                </div>

            </div>

            <div className='w-full flex flex-col max-h-[800px] overscroll-y-auto overflow-y-auto bg-white p-4 rounded'>


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" size="medium">
                        <TableHead>
                            <TableRow>

                                <TableCell>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <h1 className='text-[#556fa8] text-xs'>ID</h1>
                                    </div>

                                </TableCell>

                                <TableCell>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <h1 className='text-[#556fa8] text-xs'>Job Position</h1>
                                    </div>

                                </TableCell>

                                <TableCell>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <h1 className='text-[#556fa8] text-xs'>Job Description</h1>
                                    </div>

                                </TableCell>

                                <TableCell>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <h1 className='text-[#556fa8] text-xs'>Compensation plan</h1>
                                    </div>

                                </TableCell>

                                <TableCell>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <h1 className='text-[#556fa8] text-xs'>Time of work</h1>
                                    </div>

                                </TableCell>

                                <TableCell>
                                    <h1 className='text-[#556fa8] text-xs'>Action</h1>
                                </TableCell>

                            </TableRow>

                        </TableHead>
                        <TableBody>

                            {jobList?.data?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs font-semibold'>{row?.id}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs font-bold'>{row?.job_position}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs font-bold'>{row?.job_description}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs font-bold'>{row?.compensation?.compensation_plan}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs font-bold'>{row?.time_of_work}</h1>
                                    </TableCell>



                                    <TableCell>

                                        <div className='flex flex-row gap-2'>

                                            <Tooltip title="View Job Content">
                                                <div onClick={() => handleOpen("view", row)} className='cursor-pointer'>
                                                    <VisibilityIcon color="primary" />
                                                </div>
                                            </Tooltip>

                                            <Tooltip title="Edit Job Content">
                                                <div onClick={() => handleOpen("update", row)} className='cursor-pointer'>
                                                    <EditIcon color="primary" />
                                                </div>
                                            </Tooltip>

                                            <Tooltip title="Delete Job Content">
                                                <div onClick={() => handleOpen("delete", row)} className='cursor-pointer'>
                                                    <DeleteIcon color="primary" />
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
                        count={jobList?.total || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                </TableContainer>


            </div>


        </div>
    )
}

export default JobPreference