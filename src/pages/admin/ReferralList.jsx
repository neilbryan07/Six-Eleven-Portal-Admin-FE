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
import { FaFileCsv } from "react-icons/fa";

import { format } from 'date-fns';
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

const exportToCSV = (data) => {

  const csvRows = [];

  const headers = ['TAS Name', 'Total Referrals', 'Signed Contract', 'Showed UP' ];
  csvRows.push(headers.join(','));

  data.forEach(row => {
    const values = [
        `"${row?.last_name},${row?.first_name} ${row?.middle_name}"`,
        `"${row.total_referrals}"`,
        `"${row?.hr_contract_com}"`,
        `"${row?.hrsys_up}"`,
    ];
    csvRows.push(values.join(','));
  });

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `TAS_REFERRAL_REPORT_${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}.csv`;
  link.click();

  URL.revokeObjectURL(url);
};

const ReferralList = () => {

    const user = useSelector((state) => state.user.userData)
    const [applicantData, setApplicantData] = useState([]);
    const [applicantWOutRef, setApplicantWOutRef] = useState([]);
    const [tableLoader, setTableLoader] = useState(false);
    const [tableLoaderWOutRef, setTableLoaderWOutRef] = useState(false);

    const [refDataTas, setRefDataTas] = useState([]);
    const [refBranchTas, setRefBranchTas] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [pageWOutRef, setPageWOutRef] = useState(0);
    const [rowsPerPageWOutRef, setRowsPerPageWOutRef] = useState(10);

    const [openViewRef, setOpenViewRef] = useState(false)
    const [openViewFilter, setOpenViewFilter] = useState(false)

    const [selectedData, setSelectedData] = useState([]);

    const [dateRange, setDateRange] = useState(getCurrentQuarterRange());
    const [branchID, setBranchID] = useState(null);
    const [qualifyID, setQualifyID] = useState(1);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleChangePageWOutRef = (event, newPage) => {
        setPageWOutRef(newPage);
    };

    const handleChangeRowsPerPageWOutRef = (event) => {
        setRowsPerPageWOutRef(parseInt(event.target.value, 10));
        setPageWOutRef(0); // Reset to first page on rowsPerPage change
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page on rowsPerPage change
    };

    const handleChange = (event) => {

        if (parseInt(event.target.value) === 9) {
            setBranchID(null);
        } else {
            setBranchID(event.target.value);
        }


        setPage(0);
    };

    const handleQualifyChange = (event) => {

        if (parseInt(event.target.value) === 100) {
            setQualifyID(null);
        } else {
            setQualifyID(event.target.value);
        }


        setPage(0);
    };

    useEffect(() => {
        handleRefTop();
        handleBranchTop();
        handleApplicant();
        handleApplicantWithOutRef();
    }, [dateRange, branchID, qualifyID]);



    useEffect(() => {
        handleApplicantWithOutRef();
    }, [pageWOutRef, rowsPerPageWOutRef]);

    useEffect(() => {
        handleApplicant();
    }, [page, rowsPerPage]);

    const handleBranchTop = async (isTrue = true) => {

        let apiURL = `/branch-refs?from_date=${dateRange[0]}&to_date=${dateRange[1]}`

        const response = await APIServices.get({
            url: apiURL
        });

        const branchNames = response?.data?.branch_referrals?.map(item => item.branch_name);
        const branchData = response?.data?.branch_referrals?.map(item => item.total_referrals);

        const dataSet = {
            labels: branchNames,
            datasets: [
                {
                    label: "Total Referred Applicant",
                    data: branchData,
                    backgroundColor: [
                        "rgba(0, 102, 204, 1)",
                        "rgba(0, 153, 204, 1)",
                        "rgba(0, 204, 204, 1)",
                        "rgba(64, 224, 208, 1)",
                        "rgba(102, 255, 204, 1)"
                    ],
                    borderColor: [
                        "rgba(0, 102, 204, 1)",
                        "rgba(0, 153, 204, 1)",
                        "rgba(0, 204, 204, 1)",
                        "rgba(64, 224, 208, 1)",
                        "rgba(102, 255, 204, 1)"
                    ],
                    borderWidth: 1
                }
            ]
        };

        setRefBranchTas(dataSet)


    }

    const handleRefTop = async (isTrue = true) => {

        // let apiURL = `/top-refs?from_date=${dateRange[0]}&to_date=${dateRange[1]}`

        let apiURL = `/admin-list-refs?&page=1&limit=10&from_date=${dateRange[0]}&to_date=${dateRange[1]}&qualification_id=${qualifyID}`

        const response = await APIServices.get({
            url: apiURL
        });
        if (response.status === 200) {
            setRefDataTas(response?.data?.admins)
        }
    }

    const handleApplicant = async (isTrue = true) => {


        setTableLoader(true);

        let apiURL = `/admin-list-refs?&page=${page + 1}&limit=500&qualification_id=${qualifyID}&from_date=${dateRange[0]}&to_date=${dateRange[1]}${branchID ? `&branch_id=${branchID}` : ""
            }`

        const response = await APIServices.get({
            url: apiURL
        });

        if (response.status === 200) {
            setApplicantData(response?.data)
            setTableLoader(false);
        }
    }

    const handleApplicantWithOutRef = async (isTrue = true) => {

        setTableLoaderWOutRef(true);

        let apiURL = `/users-not-referred?&page=${pageWOutRef + 1}&limit=${rowsPerPageWOutRef}&qualification_id=${qualifyID}&from_date=${dateRange[0]}&to_date=${dateRange[1]}${branchID ? `&branch_id=${branchID}` : ""
            }`

        const response = await APIServices.get({
            url: apiURL
        });

        if (response.status === 200) {
            setApplicantWOutRef(response?.data)
            setTableLoaderWOutRef(false);
        }
    }


    const getMedal = (index) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        if (index >= 3 && index <= 9) return '🏅';
        return null;
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

                <h1 className='font-normal text-lg text-[#839f55]'>Referral TAS TEAM Report</h1>

                <div className='flex flex-row gap-2 items-center'>

                    <div onClick={() => setOpenViewFilter(true)} className='p-[6px] rounded-lg border border-[#839f55] cursor-pointer'>
                        <span className='text-[#839f55]'><SettingsOutlinedIcon /></span>
                    </div>

                </div>

            </div>

            <div className='w-full flex flex-row items-center justify-between gap-2'>

                <h1 className={`text-black text-sm font-semibold border border-yellow-500 p-[3px] text-center border-dashed rounded px-2 bg-yellow-100`}>
                    Date Range Selected : {`${dateRange[0]} - ${dateRange[1]}`}
                </h1>

                <div className='flex flex-col justify-end'>
                    <h1 className='font-semibold text-sm text-red-500 text-end'>Qualification Status</h1>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={qualifyID}
                            onChange={handleQualifyChange}
                        >
                            <FormControlLabel value={1} control={<Radio size="small" />} label="TAS PENDING" />
                            <FormControlLabel value={6} control={<Radio size="small" />} label="TD APPROVED" />
                            <FormControlLabel value={9} control={<Radio size="small" />} label="HR CONTRACT" />
                            {/* <FormControlLabel value={100} control={<Radio size="small" />} label="Clear" /> */}
                        </RadioGroup>
                    </FormControl>
                </div>

            </div>

            <div className="w-full grid grid-cols-[600px_1fr] gap-2 items-stretch">

                <div className='w-full max-w-[700px] flex flex-col items-start gap-2 p-4 border-2 border-gray-200 border-dashed rounded-lg bg-white'>

                    <div className='flex flex-col items-center justify-center'>

                        <h1 className='font-normal text-lg text-black'>📢 Total Applicants Referred by Branch</h1>

                    </div>
                    <div className='w-full h-full flex flex-col items-center justify-center'>
                        {parseInt(refBranchTas?.labels?.length) > 5 &&
                            <Doughnut data={refBranchTas} options={optionsPie} />
                        }
                    </div>

                </div>

                <div className='w-full flex flex-col items-start gap-2 p-4 border-2 border-gray-200 border-dashed rounded-lg bg-white'>

                    <h1 className='font-normal text-lg text-black'>🏆 Top 10 TAS with the Most Referrals</h1>

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
                                            <h1 className='text-[#556fa8] text-sm'>Branch</h1>
                                        </div>

                                    </TableCell>

                                    <TableCell>

                                        <div className='flex flex-row gap-2 items-center'>
                                            <h1 className='text-[#556fa8] text-sm'>Ref.Code</h1>
                                        </div>

                                    </TableCell>

                                    <TableCell>

                                        <div className='flex flex-row gap-2 items-center'>
                                            <h1 className='text-[#556fa8] text-sm'>Total Referrals</h1>
                                        </div>

                                    </TableCell>

                                </TableRow>

                            </TableHead>
                            <TableBody>
                                {
                                    refDataTas?.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>
                                                <h1 className='text-gray-500 text-xs'>{row?.id}</h1>
                                            </TableCell>

                                            <TableCell>
                                                <div className='flex flex-row gap-2 items-center'>
                                                    {getMedal(index) && (
                                                        <h1 className="text-2xl">{getMedal(index)}</h1>
                                                    )}
                                                    {/* <h1 className='text-gray-500 font-semibold text-sm'>{row?.name}</h1> */}
                                                    <h1 className='text-gray-500 text-xs font-bold'>{row?.last_name} , {row?.first_name} {row?.middle_name} </h1>
                                                </div>
                                            </TableCell>

                                            <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                <h1 className='text-gray-500 text-xs'>{row?.branch?.branch_name}</h1>
                                            </TableCell>

                                            <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                <h1 className={`text-black text-xs font-semibold border border-red-500 p-[3px] text-center border-dashed rounded px-2 bg-red-100`}>
                                                    {row?.ref_code}
                                                </h1>
                                            </TableCell>

                                            <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                <div className='flex flex-row gap-2 items-center'>
                                                    <Chip label={row?.total_referrals} color="success" />
                                                </div>
                                            </TableCell>


                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>


                    </TableContainer>

                </div>

            </div>

            <div className='w-full flex flex-row items-center justify-between gap-2'>
                <h1 className='font-normal text-lg text-black'>🤵🏻 TAS Management Table</h1>

                <div onClick={ () => exportToCSV(applicantData?.admins)} className='p-[6px] flex flex-row items-center gap-2 rounded-lg border border-purple-500 cursor-pointer hover:bg-purple-200'>
                    <span className='text-purple-500 text-lg'><FaFileCsv /></span>
                    <span className='text-purple-500 text-sm'>Export to CSV</span>
                </div>
            
            </div>

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
                                    <h1 className='text-[#556fa8] text-sm'>Branch</h1>
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Ref.Code</h1>
                                </div>

                            </TableCell>


                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Total Referrals</h1>
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Signed Contract</h1>
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Showed UP</h1>
                                </div>

                            </TableCell>

                            <TableCell>
                                <h1 className='text-[#556fa8] text-sm'>Action</h1>
                            </TableCell>

                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {tableLoader ? (
                            <TableLoader />
                        ) :
                            applicantData?.admins?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs'>{row?.id}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs font-bold'>{row?.last_name} , {row?.first_name} {row?.middle_name} </h1>
                                    </TableCell>

                                    <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h1 className='text-gray-500 text-xs'>{row?.branch?.branch_name}</h1>
                                    </TableCell>

                                    <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h1 className={`text-black text-xs font-semibold border border-red-500 p-[3px] text-center border-dashed rounded px-2 bg-red-100`}>
                                            {row?.ref_code}
                                        </h1>
                                    </TableCell>

                                    <TableCell style={{ maxWidth: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h1 className={`text-black text-xs font-semibold border border-green-500 p-[3px] text-center border-dashed rounded px-2 bg-green-100`}>
                                            {row?.total_referrals ? row?.total_referrals : "N/A"}
                                        </h1>
                                    </TableCell>

                                    <TableCell style={{ maxWidth: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h1 className={`text-black text-xs font-semibold border border-teal-500 p-[3px] text-center border-dashed rounded px-2 bg-teal-100`}>
                                            {row?.hr_contract_com ? row?.hr_contract_com : "N/A"}
                                        </h1>
                                    </TableCell>

                                    <TableCell style={{ maxWidth: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h1 className={`text-black text-xs font-semibold border border-sky-500 p-[3px] text-center border-dashed rounded px-2 bg-sky-100`}>
                                            {row?.hrsys_up ? row?.hrsys_up : "N/A"}
                                        </h1>
                                    </TableCell>

                                    <TableCell>

                                        <div className='flex flex-row gap-2'>

                                            <div onClick={e => handleSelect(row)} className='cursor-pointer'>
                                                <VisibilityIcon color="primary" />
                                            </div>

                                        </div>

                                    </TableCell>

                                </TableRow>
                            ))}
                    </TableBody>
                </Table>

                {/* <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={applicantData?.pagination?.total || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}

            </TableContainer>

            <h1 className='font-normal text-lg text-black'>🤵🏻 Applicant Without Referral Code</h1>
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
                                    <h1 className='text-[#556fa8] text-sm'>Branch</h1>
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Date Application</h1>
                                </div>

                            </TableCell>


                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {tableLoaderWOutRef ? (
                            <TableLoader />
                        ) :
                            applicantWOutRef?.users?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs'>{row?.id}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs font-bold'>{row?.last_name} , {row?.first_name} {row?.middle_name} </h1>
                                    </TableCell>

                                    <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h1 className='text-gray-500 text-xs'>{row?.branch?.branch_name}</h1>
                                    </TableCell>

                                    <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h1 className='text-gray-500 text-xs'>{handleTimeFormat(row?.created_at)}</h1>
                                    </TableCell>


                                </TableRow>
                            ))}
                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={applicantWOutRef?.pagination?.total || 0}
                    rowsPerPage={rowsPerPageWOutRef}
                    page={pageWOutRef}
                    onPageChange={handleChangePageWOutRef}
                    onRowsPerPageChange={handleChangeRowsPerPageWOutRef}
                />

            </TableContainer>

            <br />
        </div>
    )
}

export default ReferralList