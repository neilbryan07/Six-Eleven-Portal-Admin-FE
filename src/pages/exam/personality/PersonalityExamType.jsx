import React, { lazy, Suspense, useState, useEffect } from 'react';

import { useNavigate, useLocation } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import Chip from '@mui/material/Chip';

import Tooltip from '@mui/material/Tooltip';

import FAQButton from '../../../component/FAQ/FAQButton';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { APIServices } from '../../../contants/apiConfig';


const PersonalityExamType = () => {

    const navigate = useNavigate();

    const [openRead, setOpenRead] = useState(false);
    const [addRead, setAddRead] = useState(false);

    const [openListen, setOpenListen] = useState(false);
    const [addListen, setAddListen] = useState(false);

    const [typeData, setTypeData] = useState([]);
    const [passageData, setPassageData] = useState([]);


    const handleClosePassage = (number) => {

        if (number === 1) setOpenRead(false);
        else if (number === 2) setAddRead(false);

    };

    const handleCloseListen = (number) => {

        if (number === 1) setOpenListen(false);
        else if (number === 2) setAddListen(false);

    };

    useEffect(() => {
        handleExamType();
    }, []);

    const handleExamType = async () => {

        const response = await APIServices.get({
            url: '/person-exam/fetch-person-exam'
        });

        if (response.status === 200) {
            setTypeData(response?.data?.data)
        }
    }

    const handleContent = (row, number) => {

        if (row?.id === 6 && number === 1) setOpenRead(true);
        if (row?.id === 6 && number === 2) setAddRead(true);

        if (row?.id === 3 && number === 1) setOpenListen(true);
        if (row?.id === 3 && number === 2) setAddListen(true);

    }

    const handleNavigation = (data) => {
        navigate(`/app/personality-exam-content/${data}`);

    }

    return (
        <div className='w-full flex flex-col rounded gap-4'>

            <div className='w-full flex flex-row items-center justify-between'>

                <div className='flex flex-row items-center gap-2'>
                    <h1 className='font-normal text-lg text-[#839f55]'>Personality Exam Type</h1>
                    <FAQButton />
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
                                    <h1 className='text-[#556fa8] text-sm'>Exam Name</h1>
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Exam Total Time</h1>
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Total Items</h1>
                                </div>

                            </TableCell>


                            <TableCell>

                                <div className='flex flex-row gap-2 items-center justify-center'>
                                    <h1 className='text-[#556fa8] text-sm'>View Exam Content</h1>
                                </div>

                            </TableCell>

                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {typeData?.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell>
                                    <h1 className='text-gray-500 text-xs'>{row?.id}</h1>
                                </TableCell>

                                <TableCell><h1 className='text-gray-500 font-semibold text-sm'>{row?.name}</h1></TableCell>

                                <TableCell>
                                    <h1 className='text-gray-500 text-xs'>{row?.allotted_time}  mins</h1>
                                </TableCell>

                                <TableCell>
                                    <Chip label={`${row?.exam_contents_count}`} color="success" variant="outlined" />
                                </TableCell>

                                <TableCell>

                                    <div className='flex flex-row gap-2 items-center justify-center'>

                                        <Tooltip title="View Exam Content">
                                            <div className='cursor-pointer' onClick={() => handleNavigation(row?.id)} >
                                                <VisibilityOutlinedIcon color="primary" />
                                            </div>
                                        </Tooltip>

                                    </div>

                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>

        </div>
    )
}

export default PersonalityExamType
