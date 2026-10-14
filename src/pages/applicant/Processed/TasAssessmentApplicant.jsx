import React, { lazy, Suspense, useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import Tooltip from '@mui/material/Tooltip';

import { handleTimeFormat, handleStatusResultDisplay, exportToCSV, handleQualificationStatus, handleScoreResultDisplay } from '../../../contants/contans';
import { APIServices } from '../../../contants/apiConfig';

import { format } from 'date-fns';

import { FaFileCsv } from "react-icons/fa";

import FAQButton from '../../../component/FAQ/FAQButton';

import TableNameContent from '../New/modal/tableContent/TableNameContent';
import ActionContent from '../New/modal/tableContent/ActionContent';

const FilterEvaluatedApplicant = lazy(() => import('./modal/FilterEvaluatedApplicant'));

const TasAssessmentApplicant = () => {

    const [status, setStatus] = useState(5);
    const [scoreRange, setScoreRange] = useState([0, 10]);
    const [dateRange, setDateRange] = useState([]);

    const [openFilter, setOpenFilter] = useState(false);


    const [applicantData, setApplicantData] = useState([]);
    const [search, setSearch] = useState('');
    const [branchID, setBranchID] = useState(0);


    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);


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
    }, [status, scoreRange, dateRange, branchID]);

    const handleApplicant = async (isTrue = true) => {

        let apiURL = `/filter-by-status/${status}?name=${isTrue ? search : ''}&branch_id=${branchID}&qualification_status_id=3,4&start_score=${scoreRange[0]}&end_score=${scoreRange[1]}&${dateRange?.length > 0 ?
            `start_date=${format(dateRange?.[0]?.startDate, 'yyyy-MM-dd')}&
      end_date=${format(dateRange?.[0]?.endDate, 'yyyy-MM-dd')}` : null
            }`


        const response = await APIServices.get({ url: apiURL });

        if (response.status === 200) {
            setApplicantData(response?.data?.users)
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


    return (
        <div className='w-full h-full flex flex-col gap-3'>

            <Suspense>
                {openFilter && <FilterEvaluatedApplicant openModal={openFilter} setBranchID={setBranchID} handleClose={handleCloseFilter} setDateRange={setDateRange} setStatus={setStatus} setScoreRange={setScoreRange} />}
            </Suspense>

            <div className='w-full flex flex-row items-center justify-between'>

                <div className='flex flex-row items-center gap-2'>
                    <h1 className='font-normal text-lg text-[#839f55]'>TAS Assessment Applicant</h1>
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
                                    <h1 className='text-[#556fa8] text-sm'>Status</h1>
                                </div>

                            </TableCell>

                            <TableCell>
                                <h1 className='text-[#556fa8] text-sm'>Score</h1>
                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Date of Application</h1>
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Qualification</h1>
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Assessor</h1>
                                </div>

                            </TableCell>

                            <TableCell>
                                <h1 className='text-[#556fa8] text-sm text-center'>Action</h1>
                            </TableCell>

                        </TableRow>

                    </TableHead>
                    <TableBody>

                        {
                            (rowsPerPage > 0
                                ? applicantData?.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                : applicantData
                            )?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs'>{row?.id}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <TableNameContent row={row} />
                                    </TableCell>

                                    <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h1 className='text-gray-500 text-xs'>{row?.email}</h1>
                                    </TableCell>

                                    <TableCell>
                                        {handleStatusResultDisplay(row?.status_name)}
                                    </TableCell>

                                    <TableCell>
                                        {handleScoreResultDisplay(row?.score)}
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs'>{handleTimeFormat(row?.created_at)}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs'>{handleQualificationStatus(row?.qualification_status_name)}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs'>{row?.admin_evaluator?.first_name} {row?.admin_evaluator?.last_name}</h1>
                                    </TableCell>

                                    <TableCell>

                                        <ActionContent row={row} handleApplicant={handleApplicant} />

                                    </TableCell>

                                </TableRow>
                            ))}
                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={applicantData?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </TableContainer>
        </div>
    )
}

export default TasAssessmentApplicant