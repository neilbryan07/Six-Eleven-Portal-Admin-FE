import React, { lazy, Suspense, useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FlagIcon from '@mui/icons-material/Flag';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import VisibilityIcon from '@mui/icons-material/Visibility';
import TextField from '@mui/material/TextField';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import Tooltip from '@mui/material/Tooltip';

import { handleTimeFormat, handleStatusResultDisplay, exportToCSV, handleScoreResultDisplay, handleQualificationStatus, handleExpResultDisplay } from '../../../contants/contans';
import { APIServices } from '../../../contants/apiConfig';

import { format } from 'date-fns';

import { FaFileCsv } from "react-icons/fa";

import FAQButton from '../../../component/FAQ/FAQButton';

import TableNameContent from '../New/modal/tableContent/TableNameContent';
import ActionContent from '../New/modal/tableContent/ActionContent';
import { useSelector } from 'react-redux';

import { TableLoader } from '../../../component/Loader/TableLoader';

import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';

import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';

const ViewPersonalityResult = lazy(() => import('../New/modal/ViewPersonalityResult'));

const FilterBundleApplicant = lazy(() => import('./modal/FilterBundleApplicant'));

const CompositeApplicant = () => {

    const user = useSelector((state) => state.user.userData)

    const [status, setStatus] = useState(0);
    const [dateRange, setDateRange] = useState([]);
    const [tableLoader, setTableLoader] = useState(false);

    const [openFilter, setOpenFilter] = useState(false);

    const [applicantData, setApplicantData] = useState([]);
    const [search, setSearch] = useState('');
    const [examType, setExamType] = useState(null)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [selectedIds, setSelectedIds] = useState("");

    const [openCustom, setOpenCustom] = useState(false);

    const [openPersonal, setOpenPersonal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [sortDirect, setSortDirect] = useState("desc");
    const [sortBy, setSortBy] = useState("overall_personality_weighted");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page on rowsPerPage change
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    useEffect(() => {
        handleApplicant();
    }, [dateRange, examType, rowsPerPage, page, sortDirect]);

    const handleApplicant = async (isTrue = true) => {

        setTableLoader(true);

        let apiURL = `/person-exam/fetch-composite-result?search=${isTrue ? search : ''}
        &sort_by=${sortBy}&risk_level=${examType}&sort_direction=${sortDirect}&page=${page + 1}&limit=${rowsPerPage}&${dateRange?.length > 0 ?
                `start_date=${format(dateRange?.[0]?.startDate, 'yyyy-MM-dd')}&end_date=${format(dateRange?.[0]?.endDate, 'yyyy-MM-dd')}` : null
            }`

        const response = await APIServices.get({ url: apiURL });

        if (response.status === 200) {
            setApplicantData(response?.data)
            setTableLoader(false);
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value;

        setSearch(value);
        setPage(0);
        if (!value) {
            handleApplicant(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {

            if (search?.trim()) {
                handleApplicant();
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [search]);


    const handleChange = (event) => {

        if (parseInt(event.target.value) === 10) {
            setOpenCustom(true)
            setExamType(null)
            setSelectedIds("")
        } else {
            setOpenCustom(false)
        }

        setExamType(event.target.value);

    };

    const handleChangeBox = (id) => {
        const currentArray = selectedIds ? selectedIds.split(",") : [];

        let updatedArray;

        if (currentArray.includes(id)) {
            updatedArray = currentArray.filter((item) => item !== id);
        } else {
            updatedArray = [...currentArray, id];
        }

        setSelectedIds(updatedArray.join(","));
        setExamType(updatedArray.join(","));
    };

    const handleClose = () => {
        setOpenPersonal(false)
    };

    const handleSelected = (data) => {
        setSelectedRow(data)
        setOpenPersonal(true)
    }

    const handleSortToggle = (data) => {

        const dataSelected = [
            'overall_personality_weighted',
            'folder_rank_sales',
            'folder_rank_customer_sales',
            'folder_rank_stability',
            'folder_rank_dev_track',
        ]

        setSortBy(dataSelected[data])

        setSortDirect(prev => (prev === "desc" ? "asc" : "desc"));
    };

    const handleChecker = (index) => {
        const dataSelected = [
            'overall_personality_weighted',
            'folder_rank_sales',
            'folder_rank_customer_sales',
            'folder_rank_stability',
            'folder_rank_dev_track',
        ];

        return sortBy === dataSelected[index] ? '#d0f5d0' : 'white';

    }

    const handleTableHeader = (toolText, headerName, index) => {

        const dataSelected = [
            'overall_personality_weighted',
            'folder_rank_sales',
            'folder_rank_customer_sales',
            'folder_rank_stability',
            'folder_rank_dev_track',
        ];

        return (
            <React.Fragment>
                <Tooltip title={toolText}>
                    <div className='flex flex-row items-center gap-2 cursor-pointer' onClick={e => handleSortToggle(index)}>
                        <h1 className='text-[#556fa8] text-xs'>{headerName}</h1>
                        <div className=' text-green-700'>
                            {sortBy === dataSelected[index] ?
                                sortDirect === 'desc' ? <KeyboardDoubleArrowUpOutlinedIcon /> : <KeyboardDoubleArrowDownOutlinedIcon />
                                : <KeyboardDoubleArrowUpOutlinedIcon />}

                        </div>
                    </div>
                </Tooltip>
            </React.Fragment>
        )
    }

    const handleRiskFlagInfo = (row) => {

        const toolTipContent = (
            <div className="flex flex-col gap-1 text-xs">
                <span className='text-white text-xs'>Risk Score: {row?.risk_score}</span>
                <span className='text-white text-xs'>ER Risk Score: {row?.er_risk_score}</span>
                <span className='text-white text-xs'>SR Risk Score: {row?.sr_risk_score}</span>
                <span className='text-white text-xs'>ER Risk Flags: {row?.risk_flags[0]}</span>
                <span className='text-white text-xs'>SR Risk Flags: {row?.risk_flags[1]}</span>
            </div>
        );

        return (
            <React.Fragment>
                <Tooltip title={toolTipContent}>
                    <div className={`flex flex-row gap-[3px] items-center justify-center text-black text-xs font-semibold border border-blue-500 p-[3px] text-center border-dashed rounded bg-blue-200 cursor-pointer`}>
                        <InfoOutlinedIcon sx={{ fontSize: "15px" }} />
                        <h1>
                            {row?.risk_level}
                        </h1>
                    </div>
                </Tooltip>
            </React.Fragment>
        )
    }

    return (
        <div className='w-full h-full flex flex-col gap-3'>

            <Suspense>
                {openFilter && <FilterBundleApplicant openModal={openFilter} is_repooling={false} handleClose={handleCloseFilter} setDateRange={setDateRange} setStatus={setStatus} />}
            </Suspense>

            <Suspense>
                {openPersonal && <ViewPersonalityResult openModal={openPersonal} handleClose={handleClose} userData={selectedRow} />}
            </Suspense>

            <div className='w-full flex flex-row items-center justify-between'>

                <div className='flex flex-row items-center gap-2'>
                    <h1 className='font-normal text-lg text-[#839f55]'>Personality Exam Summary Result</h1>
                    <FAQButton />
                </div>

                <div className='flex flex-row gap-2 items-center'>
                    <TextField id="outlined-basic" label="Search Applicant..." variant="outlined" size='small' value={search} onChange={handleSearch} />

                    <Tooltip title="Filter Table">
                        <div onClick={() => setOpenFilter(true)} className='p-[6px] rounded-lg border border-[#839f55] cursor-pointer hover:bg-green-200'>
                            <span className='text-[#839f55]'><SettingsOutlinedIcon /></span>
                        </div>
                    </Tooltip>

                    {applicantData?.length > 0 ?

                        <Tooltip title="Export CSV">
                            <div onClick={() => exportToCSV(applicantData, "Evaluated_applicant")} className='p-[6px] rounded-lg border border-gray-500 cursor-pointer hover:bg-gray-200'>
                                <span className='text-gray-500 text-2xl'><FaFileCsv /></span>
                            </div>
                        </Tooltip>

                        : null}

                </div>

            </div>

            <div className='w-full flex flex-row items-center justify-between gap-2'>

                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: "12px" }}>Select Risk Level</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={examType}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={"low"} control={<Radio size="small" />} label="Low" />
                        <FormControlLabel value={"moderate"} control={<Radio size="small" />} label="Moderate" />
                        <FormControlLabel value={"elevated"} control={<Radio size="small" />} label="Elevated" />
                        <FormControlLabel value={"high"} control={<Radio size="small" />} label="High" />
                        <FormControlLabel value={null} control={<Radio size="small" />} label="Clear" />
                    </RadioGroup>
                </FormControl>

            </div>

            {dateRange?.length > 0 ?
                <div className='w-full flex flex-row items-center justify-between gap-2'>

                    <h1 className='font-semibold text-sm text-black'>Date Range Selected : {`${format(dateRange?.[0]?.startDate, 'yyyy-MM-dd')} - ${format(dateRange?.[0]?.endDate, 'yyyy-MM-dd')}`}</h1>
                </div>
                : null}

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
                                    <h1 className='text-[#556fa8] text-xs'>Name</h1>
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-xs'>Risk</h1>
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-xs'>Archetype Label</h1>
                                </div>

                            </TableCell>

                            <TableCell style={{ backgroundColor: handleChecker(1) }}>
                                {handleTableHeader("Folder Rank / Sales", "Sales Score", 1)}
                            </TableCell>

                            <TableCell style={{ backgroundColor: handleChecker(2) }}>
                                {handleTableHeader("Folder Rank / Customer Care", "Customer Score", 2)}
                            </TableCell>

                            <TableCell style={{ backgroundColor: handleChecker(3) }}>
                                {handleTableHeader("Folder Rank / Stability", "Stability Score", 3)}
                            </TableCell>

                            {/* <TableCell style={{ backgroundColor: handleChecker(4) }}>
                                {handleTableHeader("Folder Rank Development Track", "F.R.D.T", 4)}
                            </TableCell> */}

                            <TableCell style={{ backgroundColor: handleChecker(0) }} >
                                {handleTableHeader("Overall Personality Score", "Overall Personality Score", 0)}
                            </TableCell>

                            <TableCell>
                                <h1 className='text-[#556fa8] text-xs text-center'>Test Result</h1>
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
                                        <h1 className='text-gray-500 text-xs font-semibold'>{row?.id}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <div className={`flex flex-row items-center gap-2 rounded ${row?.folder_rank_dev_track ? "bg-red-500 text-white" : "bg-white text-gray-500"} `}>
                                            {row?.folder_rank_dev_track && <FlagIcon sx={{ color: 'white', fontSize: '20px' }} />}
                                            <h1 className='text-gray-500 text-xs font-bold'>{row?.last_name} , {row?.first_name} {row?.middle_name} </h1>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        {handleRiskFlagInfo(row)}
                                    </TableCell>

                                    <TableCell>
                                        <h1 className={`text-black text-xs font-semibold border border-blue-500 p-[3px] text-center border-dashed rounded bg-blue-200`}>
                                            {row?.archetype}
                                        </h1>
                                    </TableCell>

                                    <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h1 className={`text-black text-xs font-semibold border border-purple-500 p-[3px] text-center border-dashed rounded bg-purple-200`}>
                                            {row?.folder_rank_sales?.toFixed(1)}%
                                        </h1>
                                    </TableCell>

                                    <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h1 className={`text-black text-xs font-semibold border border-purple-500 p-[3px] text-center border-dashed rounded bg-purple-200`}>
                                            {row?.folder_rank_customer_sales?.toFixed(1)}%
                                        </h1>
                                    </TableCell>

                                    <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h1 className={`text-black text-xs font-semibold border border-purple-500 p-[3px] text-center border-dashed rounded bg-purple-200`}>
                                            {row?.folder_rank_stability?.toFixed(1)}%
                                        </h1>
                                    </TableCell>

                                    {/* <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h1 className={`text-black text-xs font-semibold border border-purple-500 p-[3px] text-center border-dashed rounded bg-purple-200`}>
                                            {row?.folder_rank_dev_track?.toFixed(1)}%
                                        </h1>
                                    </TableCell> */}

                                    <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h1 className={`text-black text-xs font-semibold border border-green-500 p-[3px] text-center border-dashed rounded bg-green-200`}>
                                            {row?.overall_personality_weighted?.toFixed(1)}%
                                        </h1>
                                    </TableCell>

                                    <TableCell>

                                        <div className='flex flex-row items-center justify-center gap-2'>

                                            <Tooltip title="View Personality Result">
                                                <div onClick={e => handleSelected(row)} className='cursor-pointer mt-1'>
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
                    count={applicantData?.total || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </TableContainer>
        </div>
    )
}

export default CompositeApplicant