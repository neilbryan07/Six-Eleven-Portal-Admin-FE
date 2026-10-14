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
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
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


import Rating from '@mui/material/Rating';

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

import { TableLoader } from '../../component/Loader/TableLoader';

const ViewTasReferralList = lazy(() => import('./model/ViewTasReferralList'));
const FilterReferral = lazy(() => import('./model/FilterReferral'));

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function valueFormatter(value) {
    return `${value}`;
}

const data = [
    { label: 'Group A', value: 400, color: '#0088FE' },
    { label: 'Group B', value: 300, color: '#00C49F' },
    { label: 'Group C', value: 300, color: '#FFBB28' },
    { label: 'Group D', value: 200, color: '#FF8042' },
];

const settings = {
    width: 200,
    height: 200,
    hideLegend: false,
};
const RatingList = () => {

    const user = useSelector((state) => state.user.userData)
    const [applicantData, setApplicantData] = useState([]);

    const [tableLoader, setTableLoader] = useState(false);

    const [branchRate, setBranchRate] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [openViewRef, setOpenViewRef] = useState(false)
    const [openViewFilter, setOpenViewFilter] = useState(false)

    const [selectedData, setSelectedData] = useState([]);

    const [dateRange, setDateRange] = useState(getCurrentQuarterRange());
    const [branchID, setBranchID] = useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page on rowsPerPage change
    };

    useEffect(() => {
        handleApplicant();
        handleBranchRates();
    }, [dateRange]);

    useEffect(() => {
        handleApplicant();
    }, [branchID, page, rowsPerPage]);


    const handleBranchRates = async (isTrue = true) => {

        let apiURL = `/branch-rates?from_date=${dateRange[0]}&to_date=${dateRange[1]}`

        const response = await APIServices.get({
            url: apiURL,
        });

        const mappedData = response?.data?.data?.map(item => ({
            total_reviews: item.total_reviews,
            average_rating: item.average_rating ?? 0,
            branch: item.branch_name,
            rate_one: item?.ratings?.rate_1,
            rate_two: item?.ratings?.rate_2,
            rate_three: item?.ratings?.rate_3,
            rate_four: item?.ratings?.rate_4,
            rate_five: item?.ratings?.rate_5,
        }));

        setBranchRate(mappedData)

    }

    const handleApplicant = async (isTrue = true) => {

        setTableLoader(true);

        let apiURL = `/branch-rates-list?&page=${page + 1}&limit=${rowsPerPage}&from_date=${dateRange[0]}&to_date=${dateRange[1]}`

        const response = await APIServices.get({
            url: apiURL, payload: {
                "branch_id": branchID,
            }
        });

        if (response.status === 200) {
            setApplicantData(response?.data)
            setTableLoader(false);
        }
    }

    const handleChange = (event) => {

        if (parseInt(event.target.value) === 9) {
            setBranchID(null);
        } else {
            setBranchID(event.target.value);
        }


        setPage(0);
    };


    const handleClose = () => {
        setOpenViewRef(false)
        setOpenViewFilter(false)
    }

    const handleSelect = (data) => {
        setSelectedData(data)
        setOpenViewRef(true)
    }

    return (
        <div className='w-full h-full flex flex-col gap-3'>


            <Suspense>
                {openViewRef && <ViewTasReferralList selectedData={selectedData} openAppInfo={openViewRef} handleCloseForgot={handleClose} />}
            </Suspense>


            <Suspense>
                {openViewFilter && <FilterReferral openModal={openViewFilter} handleClose={handleClose} setDateRange={setDateRange} setBranchID={setBranchID} />}
            </Suspense>


            <div className='w-full flex flex-row items-center justify-between'>

                <h1 className='font-normal text-lg text-[#839f55]'>Branch Rating Report</h1>

                <div className='flex flex-row gap-2 items-center'>

                    <div onClick={() => setOpenViewFilter(true)} className='p-[6px] rounded-lg border border-[#839f55] cursor-pointer'>
                        <span className='text-[#839f55]'><SettingsOutlinedIcon /></span>
                    </div>

                </div>

            </div>

            <div className='w-full flex flex-col bg-white border-black border-dashed border border-[#839f55] rounded h-full'>

                <div className='flex flex-col items-center justify-center my-3'>

                    <h1 className='font-bold text-md text-black'>📊 Distribution of Branch Rating Performance</h1>

                </div>

                <div className='w-full flex flex-row items-center gap-2 justify-center max-h-[600px] h-full'>

                    {branchRate?.length > 1 &&
                        <BarChart
                            dataset={branchRate}
                            height={500}
                            xAxis={[{ dataKey: 'branch' }]}
                            series={[
                                { dataKey: 'total_reviews', label: 'Total Reviews', valueFormatter, color: '#7C3AED' },
                                { dataKey: 'rate_one', label: 'One Star Rate', valueFormatter, color: '#DC2626', stack: 'total' },
                                { dataKey: 'rate_two', label: 'Two Star Rate', valueFormatter, color: '#F97316', stack: 'total' },
                                { dataKey: 'rate_three', label: 'Three Star Rate', valueFormatter, color: '#FACC15', stack: 'total' },
                                { dataKey: 'rate_four', label: 'Four Star Rate', valueFormatter, color: '#22C55E', stack: 'total' },
                                { dataKey: 'rate_five', label: 'Five Star Rate', valueFormatter, color: '#2563EB', stack: 'total' },
                            ]}
                        />
                    }


                    {/* {branchRate?.length > 1 &&
                        <BarChart
                            dataset={branchRate}
                            height={500}
                            xAxis={[{ dataKey: 'branch' }]}
                            series={[
                                { dataKey: 'total_reviews', label: 'Total Reviews', valueFormatter, color: '#7C3AED' },
                            ]}
                        />
                    } */}
                </div>

                <div className='w-full flex flex-row items-center gap-2 justify-center mb-5'>

                    <div className='w-1/2 flex flex-col gap-2'>

                        <h1 className='font-bold text-md text-black self-center mb-6'>⭐ Branch Average Rating Performance</h1>

                        {branchRate?.map((row, index) => (
                            <div className='flex flex-row items-center gap-2 w-full justify-between'>

                                <h1 className='text-md text-black font-semibold w-2/3'>{row?.branch}</h1>
                                <div className='flex flex-row items-center justify-between gap-2 w-[100px]'>
                                    <Rating
                                        name="simple-controlled"
                                        value={parseFloat(row?.average_rating)}
                                        precision={0.1}
                                        readOnly
                                    />
                                    <Chip label={row?.average_rating} color="warning" />
                                </div>

                            </div>
                        ))}

                    </div>


                </div>


            </div>
            <h1 className='font-normal text-lg text-black'>🤵🏻 Rating Information Table</h1>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Select Branch</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={branchID}
                    onChange={handleChange}
                >
                    <FormControlLabel value={2} control={<Radio size="small" />} label="Maa" />
                    <FormControlLabel value={1} control={<Radio size="small" />} label="Mabini" />
                    <FormControlLabel value={3} control={<Radio size="small" />} label="Ecoland" />
                    <FormControlLabel value={4} control={<Radio size="small" />} label="General Santos" />
                    <FormControlLabel value={5} control={<Radio size="small" />} label="Digos" />
                    <FormControlLabel value={6} control={<Radio size="small" />} label="Metro" />
                    <FormControlLabel value={7} control={<Radio size="small" />} label="Cagayan" />
                    <FormControlLabel value={8} control={<Radio size="small" />} label="Gmall" />
                    <FormControlLabel value={9} control={<Radio size="small" />} label="Clear" />
                </RadioGroup>
            </FormControl>

            <div className='h-full'>
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
                                        <h1 className='text-[#556fa8] text-sm'>Rate</h1>
                                    </div>

                                </TableCell>

                                <TableCell>
                                    <h1 className='text-[#556fa8] text-sm'>Date</h1>
                                </TableCell>

                                <TableCell>
                                    <h1 className='text-[#556fa8] text-sm'>Remarks</h1>
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>
                            {tableLoader ? (
                                <TableLoader />
                            ) :
                                applicantData?.data?.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>
                                            <h1 className='text-gray-500 text-xs'>{row?.user_id}</h1>
                                        </TableCell>

                                        <TableCell><h1 className='text-gray-500 font-semibold text-sm'>{row?.full_name}</h1></TableCell>

                                        <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            <h1 className='text-gray-500 text-xs'>{row?.rate}⭐</h1>
                                        </TableCell>

                                        <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            <h1 className='text-gray-500 text-xs'>{handleTimeFormat(row?.rated_at)}</h1>
                                        </TableCell>


                                        <TableCell style={{ maxWidth: '500px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            <h1 className='text-gray-500 text-xs'>{row?.remarks}</h1>
                                        </TableCell>


                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={applicantData?.pagination?.total || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                </TableContainer>
            </div>

            <br />
        </div>
    )
}

export default RatingList