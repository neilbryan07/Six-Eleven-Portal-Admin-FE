import React, { lazy, Suspense, useState, useEffect } from 'react';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Button, Box, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import { APIServices } from '../../../contants/apiConfig';

import { getCurrentQuarterRange } from '../../../contants/contans';


const dateQuarter = getCurrentQuarterRange();

const ViewTasReferralList = ({ selectedData, openAppInfo, handleCloseForgot }) => {

    const [tasRefData, setTasRefData] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        handleReferralData();
    }, [rowsPerPage, page]);

    const handleReferralData = async () => {

        let apiURL = `/admin-refs?admin_user_id=${selectedData?.id}&from_date=${dateQuarter[0]}&to_date=${dateQuarter[1]}&page=${page + 1}&limit=${rowsPerPage}`

        const response = await APIServices.get({
            url: apiURL
        });

        setTasRefData(response?.data)

    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page on rowsPerPage change
    };


    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openAppInfo}
        >

            <div className='max-w-[1050px] w-full p-4 bg-white rounded-lg flex flex-col gap-3'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>🤵🏻 Referred By : {selectedData?.name}</h1>

                    <div onClick={handleCloseForgot} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="small" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-3 max-h-[500px] overscroll-y-auto overflow-y-auto'>

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
                                                    <h1 className='text-gray-500 font-semibold text-sm'>{row?.user?.last_name} , {row?.user?.first_name} {row?.user?.middle_name}</h1>
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

        </Backdrop >
    )
}

export default ViewTasReferralList;