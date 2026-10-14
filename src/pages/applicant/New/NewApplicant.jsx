import React, { lazy, Suspense, useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

import { format } from 'date-fns';

import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';

import Tooltip from '@mui/material/Tooltip';
import FAQButton from '../../../component/FAQ/FAQButton';

import { handleTimeFormat, handleStatusResultDisplay, handleExpResultDisplay } from '../../../contants/contans';

import { TableLoader } from '../../../component/Loader/TableLoader';

import { APIServices } from '../../../contants/apiConfig';
import TableNameContent from './modal/tableContent/TableNameContent';
import ActionContent from './modal/tableContent/ActionContent';

import { useSelector } from 'react-redux';

const FilterPendingApplicant = lazy(() => import('./modal/FilterPendingApplicant'));

function createData(id, name, content, type, status, dateStarted) {
  return { id, name, content, type, status, dateStarted };
}
const rows = [
  createData(1, 'Test Applicant 1', 'testApplicant1@gmail.com', 6, "Pending", "05/14/2025"),
  createData(2, 'Test Applicant 2', 'testApplicant1@gmail.com', 2, "Pending", "05/14/2025"),
  createData(3, 'Test Applicant 3', 'testApplicant1@gmail.com', 5, "Pending", "05/14/2025"),
  createData(4, 'Test Applicant 4', 'testApplicant1@gmail.com', 4, "Pending", "05/14/2025"),
];

const NewApplicant = () => {

  const user = useSelector((state) => state.user.userData)
  const [applicantData, setApplicantData] = useState([]);
  const [search, setSearch] = useState('');

  const [dateRange, setDateRange] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openFilter, setOpenFilter] = useState(false);
  const [branchID, setBranchID] = useState(user?.branch_id ? user?.branch_id : 0);
  const [tableLoader, setTableLoader] = useState(false);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    handleApplicant();
  }, [dateRange, branchID, page, rowsPerPage]);

  const handleApplicant = async (isTrue = true) => {

    setTableLoader(true);

    let apiURL = `/filter-by-status/1?name=${isTrue ? search : ''}&branch_id=${branchID}&page=${page + 1}&limit=${rowsPerPage}&qualification_status_id=1&${dateRange?.length > 0 ?
      `start_date=${format(dateRange?.[0]?.startDate, 'yyyy-MM-dd')}&
          end_date=${format(dateRange?.[0]?.endDate, 'yyyy-MM-dd')}` : null
      }`

    const response = await APIServices.get({
      url: apiURL
    });

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

  return (
    <div className='w-full h-full flex flex-col gap-3'>

      <Suspense>
        {openFilter && <FilterPendingApplicant openModal={openFilter} handleClose={handleCloseFilter} setDateRange={setDateRange} setBranchID={setBranchID} />}
      </Suspense>

      <div className='w-full flex flex-row items-center justify-between'>

        <div className='flex flex-row items-center gap-2'>
          <h1 className='font-normal text-lg text-[#839f55]'>Pending Applicants</h1>
          <FAQButton />
        </div>

        <div className='flex flex-row gap-2 items-center'>
          <TextField id="outlined-basic" label="Search Applicant..." variant="outlined" size='small' value={search} onChange={handleSearch} />

          <Tooltip title="Filter Table">
            <div onClick={() => setOpenFilter(true)} className='p-[6px] rounded-lg border border-[#839f55] cursor-pointer'>
              <span className='text-[#839f55]'><SettingsOutlinedIcon /></span>
            </div>
          </Tooltip>

        </div>

      </div>

      <div className='flex flex-row gap-2 items-center'>
        <span className='text-gray-400 text-xs'>BG Color: All Assessment Exam Types Completed</span>
        <div className='p-[8px] bg-[#ccff99] rounded-full'></div>
      </div>

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
                  <h1 className='text-[#556fa8] text-xs'>Assessor | Branch</h1>
                </div>

              </TableCell>

              <TableCell>

                <div className='flex flex-row gap-2 items-center '>
                  <h1 className='text-[#556fa8] text-xs'>Date Application</h1>
                </div>

              </TableCell>

              {/* <TableCell>

                <div className='flex flex-row gap-2 items-center'>
                  <h1 className='text-[#556fa8] text-xs'>Assessment Status</h1>
                </div>

              </TableCell> */}



              <TableCell>

                <div className='flex flex-row gap-2 items-center'>
                  <h1 className='text-[#556fa8] text-xs'>Current Exam</h1>
                </div>

              </TableCell>

              <TableCell>

                <div className='flex flex-row gap-2 items-center'>
                  <h1 className='text-[#556fa8] text-xs'>Exp type</h1>
                </div>

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
              applicantData?.users?.map((row, index) => (
                <TableRow
                  key={row.index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: row?.for_manual_checking ? '#f2ffe6' : 'white' }}
                >
                  <TableCell>
                    <h1 className='text-gray-500 text-xs font-semibold'>{row?.id}</h1>
                  </TableCell>

                  <TableCell>
                    {/* <h1 className='text-gray-500 text-xs font-bold'>{row?.name}</h1> */}
                    <h1 className='text-gray-500 text-xs font-bold'>{row?.last_name} , {row?.first_name} {row?.middle_name} </h1>
                  </TableCell>

                  {/* <TableCell>
                    <h1 className='text-gray-500 text-xs font-semibold'>{row?.contact_number}</h1>
                  </TableCell> */}

                  <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <h1 className='text-gray-500 text-xs font-semibold'>{row?.email}</h1>
                  </TableCell>


                  <TableCell>
                    <h1 className='text-gray-500 text-xs font-semibold '>{row?.admin_evaluator?.first_name} {row?.admin_evaluator?.last_name} | <span className='text-orange-500'>{row?.branch_name}</span></h1>
                  </TableCell>


                  <TableCell>
                    <h1 className='text-gray-500 text-xs font-semibold'>{handleTimeFormat(row?.created_at)}</h1>
                  </TableCell>

                  {/* <TableCell>
                    {handleStatusResultDisplay(row?.status_name)}
                  </TableCell> */}

                  <TableCell>
                    {row?.exam_detail?.name ?
                      <h1 className={`text-black text-xs font-semibold border border-green-500 p-[3px] text-center border-dashed rounded bg-emerald-200`}>
                        {row?.exam_detail?.name}
                      </h1>
                      :
                      <h1 className={`text-black text-xs font-semibold border border-red-500 p-[3px] text-center border-dashed rounded bg-red-200`}>
                        Ready for manual checking
                      </h1>
                    }

                  </TableCell>

                  <TableCell>
                    {/* <h1 className='text-orange-500 text-xs font-bold'>{row?.video_assessment_set?.set_name} | {row?.experience_bg}</h1> */}
                    <h1 className='text-orange-500 text-xs font-bold'>{handleExpResultDisplay(row)}</h1>

                  </TableCell>


                  <TableCell sx={{ maxWidth: '100px' }}>

                    <div className='flex flex-row items-center justify-center gap-2'>
                      <TableNameContent row={row} />
                      <ActionContent row={row} handleApplicant={handleApplicant} is_delete_app={true} is_rejected={true} />
                    </div>

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
  )
}

export default NewApplicant