import React, { lazy, Suspense, useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Chip from '@mui/material/Chip';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PeopleIcon from '@mui/icons-material/People';
import TextField from '@mui/material/TextField';
import { APIServices } from '../../contants/apiConfig';
import { useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TableLoader } from '../../component/Loader/TableLoader';

import { optionsPie, handleTimeFormat } from '../../contants/contans';

import { Doughnut, Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { getCurrentQuarterRange } from '../../contants/contans';

const ViewTasReferralList = lazy(() => import('./model/ViewTasReferralList'));
const FilterReferral = lazy(() => import('./model/FilterReferral'));

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const MyReferral = () => {

    const user = useSelector((state) => state.user.userData)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [openViewRef, setOpenViewRef] = useState(false)
    const [openViewFilter, setOpenViewFilter] = useState(false)


    const [dateRange, setDateRange] = useState(getCurrentQuarterRange());
    const [branchID, setBranchID] = useState(null);

    const [tasRefData, setTasRefData] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page on rowsPerPage change
    };

    useEffect(() => {
        handleReferralData();
    }, [page, rowsPerPage, dateRange]);

    const handleReferralData = async () => {

        // ${user?.id}
        let apiURL = `/admin-refs?admin_user_id=${user?.id}&from_date=${dateRange[0]}&to_date=${dateRange[1]}&page=${page + 1}&limit=${rowsPerPage}`

        const response = await APIServices.get({
            url: apiURL
        });

        setTasRefData(response?.data)

    }


    const handleClose = () => {
        setOpenViewRef(false)
        setOpenViewFilter(false)
    }

    return (
        <div className='w-full h-full flex flex-col gap-3'>


            <Suspense>
                {openViewFilter && <FilterReferral openModal={openViewFilter} handleClose={handleClose} setDateRange={setDateRange} setBranchID={setBranchID} />}
            </Suspense>

            <div className='w-full flex flex-row items-center justify-between'>

                <h1 className='font-normal text-lg text-[#839f55]'>My Referred List</h1>

                <div className='flex flex-row gap-2 items-center'>

                    <div onClick={() => setOpenViewFilter(true)} className='p-[6px] rounded-lg border border-[#839f55] cursor-pointer'>
                        <span className='text-[#839f55]'><SettingsOutlinedIcon /></span>
                    </div>

                </div>

            </div>


            <div className='w-full flex flex-row items-center justify-between gap-2'>

                <h1 className='font-semibold text-sm text-black'>Date Range Selected : {`${dateRange[0]} - ${dateRange[1]}`}</h1>
            </div>


            <div className='w-full flex flex-col gap-3 '>

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
                                        <h1 className='text-[#556fa8] text-sm'>Name</h1>
                                    </div>

                                </TableCell>

                                <TableCell>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <h1 className='text-[#556fa8] text-sm'>Email</h1>
                                    </div>

                                </TableCell>


                                <TableCell>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <h1 className='text-[#556fa8] text-sm'>Age</h1>
                                    </div>

                                </TableCell>


                                <TableCell>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <h1 className='text-[#556fa8] text-sm'>Gender</h1>
                                    </div>

                                </TableCell>

                                <TableCell>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <h1 className='text-[#556fa8] text-sm'>Branch</h1>
                                    </div>

                                </TableCell>


                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {
                                tasRefData?.referrals?.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>
                                            <h1 className='text-gray-500 text-xs'>{row?.user?.id}</h1>
                                        </TableCell>

                                        <TableCell>
                                            <div className='flex flex-row gap-2 items-center'>
                                                <h1 className='text-gray-500 font-semibold text-sm'>{row?.user?.name}</h1>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className='flex flex-row gap-2 items-center'>
                                                <h1 className='text-gray-500 font-semibold text-sm'>{row?.user?.email}</h1>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className='flex flex-row gap-2 items-center'>
                                                <h1 className='text-gray-500 font-semibold text-sm'>{row?.user?.age}</h1>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className='flex flex-row gap-2 items-center'>
                                                <h1 className='text-gray-500 font-semibold text-sm'>{row?.user?.gender}</h1>
                                            </div>
                                        </TableCell>

                                        <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            <h1 className='text-gray-500 text-xs'>{row?.user?.branch?.branch_name}</h1>
                                        </TableCell>


                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>


                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={tasRefData?.pagination?.total || 0}
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

export default MyReferral