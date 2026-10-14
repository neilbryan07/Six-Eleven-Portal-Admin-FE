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

import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Chip from '@mui/material/Chip';
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

const FilterBundleApplicant = lazy(() => import('./modal/FilterBundleApplicant'));


const options = [
    { id: "1", label: "Grammar & Sentence Construction" },
    { id: "2", label: "Sentence Completion Test" },
    { id: "3", label: "Listening Comprehension" },
    { id: "4", label: "Verbal Communication & Pronunciation" },
    { id: "5", label: "Typing Speed & Accuracy" },
    { id: "6", label: "Reading Comprehension" },
    { id: "7", label: "Mock Call / Live Chat Simulation" },
    { id: "8", label: "Basic Computer Literacy" },
];

const BundleApplicant = () => {

    const user = useSelector((state) => state.user.userData)

    const [status, setStatus] = useState(0);
    const [dateRange, setDateRange] = useState([]);
    const [tableLoader, setTableLoader] = useState(false);

    const [openFilter, setOpenFilter] = useState(false);

    const [applicantData, setApplicantData] = useState([]);
    const [search, setSearch] = useState('');
    const [examType, setExamType] = useState(null)

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [selectedIds, setSelectedIds] = useState("");

    const [openCustom, setOpenCustom] = useState(false);


    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    useEffect(() => {
        handleApplicant();
    }, [dateRange, examType, rowsPerPage]);

    const handleApplicant = async (isTrue = true) => {

        setTableLoader(true);

        let apiURL = `/top-scores?page=1&top=${rowsPerPage}&per_page=${rowsPerPage}&exam_types=${examType}&${dateRange?.length > 0 ?
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

    return (
        <div className='w-full h-full flex flex-col gap-3'>

            <Suspense>
                {openFilter && <FilterBundleApplicant openModal={openFilter} is_repooling={false} handleClose={handleCloseFilter} setDateRange={setDateRange} setStatus={setStatus} />}
            </Suspense>

            <div className='w-full flex flex-row items-center justify-between'>

                <div className='flex flex-row items-center gap-2'>
                    <h1 className='font-normal text-lg text-[#839f55]'>Bundle Applicants by Assessment Exam Type</h1>
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
                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: "12px" }}>Select Bundle Type</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={examType}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={"1,2,3,8"} control={<Radio size="small" />} label="MCQ" />
                        <FormControlLabel value={"4,7"} control={<Radio size="small" />} label="Verbal / Mock Calll" />
                        <FormControlLabel value={"5"} control={<Radio size="small" />} label="Typing" />
                        <FormControlLabel value={"10"} control={<Radio size="small" />} label="Custom" />
                        <FormControlLabel value={null} control={<Radio size="small" />} label="Clear" />
                    </RadioGroup>
                </FormControl>

                <FormControl >
                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: "12px" }}>Select Total Display</FormLabel>
                    <Select
                        size='small'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(e.target.value)}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>

                    </Select>
                </FormControl>

            </div>

            {openCustom &&
                <FormControl component="fieldset">
                    <FormLabel sx={{ fontSize: "12px" }} component="legend">Select Custom Bundle</FormLabel>

                    <FormGroup
                        sx={{
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}
                    >
                        {options.map((opt) => (
                            <FormControlLabel
                                key={opt.id}
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={selectedIds.split(",").includes(opt.id)}
                                        onChange={() => handleChangeBox(opt.id)}
                                    />
                                }
                                label={opt.label}
                                slotProps={{
                                    typography: { sx: { fontSize: '12px' } }
                                }}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            }

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


                            {/* <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Mobile</h1>
                                </div>

                            </TableCell> */}

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-xs'>Email</h1>
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-xs'>Branch</h1>
                                </div>

                            </TableCell>

                            <TableCell>
                                <h1 className='text-[#556fa8] text-xs'>Filtered Weighted Score</h1>
                            </TableCell>

                            <TableCell>
                                <h1 className='text-[#556fa8] text-xs'>Overall Score</h1>
                            </TableCell>

                            <TableCell>
                                <h1 className='text-[#556fa8] text-xs text-center'>Applicant Info | Test Result</h1>
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
                                        <h1 className='text-gray-500 text-xs font-bold'>{row?.last_name} , {row?.first_name} {row?.middle_name} </h1>
                                    </TableCell>

                                    <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h1 className='text-gray-500 text-xs font-semibold'>{row?.email}</h1>
                                    </TableCell>


                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs font-semibold'><span className='text-orange-500'>{row?.branch}</span></h1>
                                    </TableCell>

                                    <TableCell>
                                        <div className='flex flex-col gap-2'>
                                            <h1 className={`text-black text-xs font-semibold border border-green-500 p-[3px] text-center border-dashed rounded bg-green-200`}>
                                                {Number(row?.weighted_score_filtered).toFixed(2) > 0 ?
                                                    <React.Fragment>
                                                        {Number(row?.weighted_score_filtered).toFixed(2)} | {row?.filtered_percentage}%
                                                    </React.Fragment>
                                                    : "N/A"}
                                            </h1>

                                        </div>
                                    </TableCell>


                                    <TableCell>
                                        <div className='flex flex-col gap-2'>
                                            <h1 className={`text-black text-xs font-semibold border border-blue-500 p-[3px] text-center border-dashed rounded bg-blue-200`}>
                                                {Number(row?.overall_weighted_score).toFixed(2) > 0 ?
                                                    <React.Fragment>
                                                        {Number(row?.overall_weighted_score).toFixed(2)} | {row?.overall_percentage}%
                                                    </React.Fragment> : "N/A"}
                                            </h1>

                                        </div>
                                    </TableCell>

                                    <TableCell>

                                        <div className='flex flex-row items-center justify-center gap-2'>
                                            <TableNameContent row={row} />
                                            <ActionContent row={row} handleApplicant={handleApplicant} />
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
        </div>
    )
}

export default BundleApplicant