import React, { lazy, Suspense, useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import PeopleIcon from '@mui/icons-material/People';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { APIServices } from '../../contants/apiConfig';
import { useSelector } from 'react-redux';

const ForgotPassword = lazy(() => import('../applicant/New/modal/ForgotPassword'));

const FilterTable = lazy(() => import('./model/FilterTable'));
const EditAdmin = lazy(() => import('./model/EditAdmin'));
const ViewAdmin = lazy(() => import('./model/ViewAdmin'));
const CreateAdmin = lazy(() => import('./model/CreateAdmin'));

const AdminList = () => {

  const user = useSelector((state) => state.user.userData)
  const [applicantData, setApplicantData] = useState([]);
  const [search, setSearch] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openCreateAdmin, setOpenCreateAdmin] = useState(false)
  const [openViewAdmin, setOpenViewAdmin] = useState(false)
  const [openEditAdmin, setOpenEditAdmin] = useState(false)
  const [openForgotPassword, setOpenForgotPassword] = useState(false)

  const [selectedData, setSelectedData] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);

  const [brandIDFil, setBrandIDFil] = useState(null);
  const [roleIDFil, setRoleIDFil] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rowsPerPage change
  };

  useEffect(() => {
    handleApplicant();
  }, [brandIDFil, roleIDFil]);

  const handleApplicant = async (isTrue = true) => {

    let apiURL = `/admin-users?search=${isTrue ? search : ''}`

    if (brandIDFil) {
      apiURL += `&branch_id=${brandIDFil}`;
    }

    if (roleIDFil) {
      apiURL += `&portal_role_id=${roleIDFil}`;
    }

    setApplicantData(null)

    const response = await APIServices.get({
      url: apiURL
    });

    if (response.status === 200) {
      setApplicantData(response?.data?.data)
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

  const handleStatus = (data) => {

    if (parseInt(data) === 1) return <h1 className={`text-green-500 text-xs font-semibold`}>Active</h1>
    else return <h1 className={`text-red-500 text-xs font-semibold`}>Inactive</h1>
  }

  const handleClose = () => {
    setOpenCreateAdmin(false)
    setOpenViewAdmin(false)
    setOpenEditAdmin(false)
    setOpenFilter(false)
    setOpenForgotPassword(false)
  }

  const handleSelect = (data, type) => {
    setSelectedData(data)

    if (type === 1) setOpenViewAdmin(true)
    else if (type === 3) setOpenForgotPassword(true)
    else setOpenEditAdmin(true)

  }

  return (
    <div className='w-full h-full flex flex-col gap-3'>


      <Suspense>
        {openCreateAdmin && <CreateAdmin openModal={openCreateAdmin} handleClose={handleClose} branchId={user?.branch_id} reFreshData={handleApplicant} />}
      </Suspense>

      <Suspense>
        {openViewAdmin && <ViewAdmin selectedData={selectedData} openAppInfo={openViewAdmin} handleCloseForgot={handleClose} />}
      </Suspense>

      <Suspense>
        {openEditAdmin && <EditAdmin selectedData={selectedData} openModal={openEditAdmin} handleClose={handleClose} branchId={user?.branch_id} reFreshData={handleApplicant} />}
      </Suspense>


      <Suspense>
        {openFilter && <FilterTable roleID={setRoleIDFil} openModal={openFilter} handleClose={handleClose} branchId={setBrandIDFil} reFreshData={handleApplicant} />}
      </Suspense>


      <Suspense>
        {openForgotPassword && <ForgotPassword openPassword={openForgotPassword} handleClosedForgotPassword={handleClose} selectedData={selectedData} />}
      </Suspense>


      <div className='w-full flex flex-row items-center justify-between'>

        <h1 className='font-normal text-lg text-[#839f55]'>List of Admin Account</h1>

        <div className='flex flex-row gap-2 items-center'>
          <TextField id="outlined-basic" label="Search Admin..." variant="outlined" size='small' value={search} onChange={handleSearch} />

          <Tooltip title="Add Admin Type">
            <div onClick={() => setOpenCreateAdmin(true)} className='p-[6px] rounded-lg border bg-blue-500 cursor-pointer'>
              <span className='text-white'><AddCircleOutlineOutlinedIcon /></span>
            </div>
          </Tooltip>

          <Tooltip title="Filter Table">
            <div onClick={() => setOpenFilter(true)} className='p-[6px] rounded-lg border border-[#839f55] cursor-pointer'>
              <span className='text-[#839f55]'><SettingsOutlinedIcon /></span>
            </div>
          </Tooltip>
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
                  <h1 className='text-[#556fa8] text-sm'>Role</h1>
                </div>

              </TableCell>

              <TableCell>

                <div className='flex flex-row gap-2 items-center'>
                  <h1 className='text-[#556fa8] text-sm'>Branch</h1>
                </div>

              </TableCell>


              <TableCell>

                <div className='flex flex-row gap-2 items-center'>
                  <h1 className='text-[#556fa8] text-sm'>Status</h1>
                </div>

              </TableCell>


              <TableCell>

                <div className='flex flex-row gap-2 items-center'>
                  <h1 className='text-[#556fa8] text-sm'>Ref.Code</h1>
                </div>

              </TableCell>


              <TableCell>
                <h1 className='text-[#556fa8] text-sm'>Action</h1>
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
                    <h1 className='text-gray-500 text-xs font-bold'>{row?.last_name} , {row?.first_name} {row?.middle_name} </h1>
                  </TableCell>

                  <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <h1 className='text-gray-500 text-xs'>{row?.email}</h1>
                  </TableCell>

                  <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <h1 className='text-gray-500 text-xs'>{row?.portal_role_name}</h1>
                  </TableCell>

                  <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <h1 className='text-gray-500 text-xs'>{row?.branch_name}</h1>
                  </TableCell>

                  <TableCell>
                    {handleStatus(row?.is_active)}
                  </TableCell>

                  <TableCell>
                    {parseInt(row?.portal_role_id) === 6 || parseInt(row?.portal_role_id) === 1 ?
                      row?.ref_code && <Chip label={row?.ref_code} color="info" variant="outlined" /> : null
                    }
                  </TableCell>

                  <TableCell>

                    <div className='flex flex-row gap-2'>


                      <Tooltip title="View Admin">
                        <div onClick={e => handleSelect(row, 1)} className='cursor-pointer'>
                          <VisibilityIcon color="primary" />
                        </div>
                      </Tooltip>

                      <Tooltip title="Edit Admin">
                        <div onClick={e => handleSelect(row, 2)} className='cursor-pointer'>
                          <EditIcon color="primary" />
                        </div>
                      </Tooltip>


                      <Tooltip title="Forgot Password">
                        <div onClick={e => handleSelect(row, 3)} className='cursor-pointer'>
                          <LockResetOutlinedIcon color="primary" />
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

export default AdminList