import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';

import { useParams, useNavigate } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import AbcIcon from '@mui/icons-material/Abc';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import Tooltip from '@mui/material/Tooltip';

import { APIServices } from '../../../contants/apiConfig';
import { pageRoutes } from '../../../routes/pageRoutes';

import OnBoardActionContent from './tableContent/OnBoardActionContent';

const CreateModuleVideo = lazy(() => import('./modal/CreateModuleVideo'));

const OnBoardingExam = () => {

    const { id } = useParams();

    const [moduleData, setModuleData] = useState([])
    const [createModuleVid, setCreateModuleVid] = useState(false)

    const handleCloseCreateVideo = () => {
        setCreateModuleVid(false);
    };

    const handleOpenCreateVideo = () => {
        setCreateModuleVid(true);
    };

    useEffect(() => {
        handleModule();
    }, []);


    const handleModule = async (data) => {

        const response = await APIServices.get({
            url: '/onboarding/modules',
        });

        if (response.status === 200) {
            setModuleData(response?.data)
        }
    }

    return (
        <div className='w-full h-full flex flex-col gap-3'>

            <Suspense>
                {createModuleVid && <CreateModuleVideo openModal={createModuleVid} handleClose={handleCloseCreateVideo} refreshData={handleModule} />}
            </Suspense>

            <div className='w-full flex flex-row items-center justify-between'>

                <div className='flex flex-row gap-2 items-center'>
                    <h1 className='font-normal text-lg text-[#839f55]'>OnBoarding Test Exam</h1>

                </div>

                <div className='flex flex-row gap-2 items-center'>

                    <Tooltip title="Add Exam Type">
                        <div onClick={handleOpenCreateVideo} className='p-[6px] rounded-lg border bg-blue-500 cursor-pointer'>
                            <span className='text-white'><AddCircleOutlineOutlinedIcon /></span>
                        </div>
                    </Tooltip>

                </div>

            </div>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table" size="medium">
                    <TableHead>
                        <TableRow>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>ID</h1>
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Title</h1>
                                </div>

                            </TableCell>


                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Description</h1>
                                </div>

                            </TableCell>


                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Instruction</h1>
                                </div>

                            </TableCell>



                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Status</h1>
                                </div>

                            </TableCell>

                            <TableCell>
                                <h1 className='text-[#556fa8] text-sm self-center'>Action</h1>
                            </TableCell>

                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {

                            moduleData?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs'>{row?.id}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 font-semibold text-sm'>{row?.title}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs'>{row?.description}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs'>{row?.instruction}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className={`${row?.is_active ? " text-green-500" : " text-red-500"} text-xs font-semibold`}>{row?.is_active ? "Active" : "Inactive"}</h1>
                                    </TableCell>

                                    <TableCell>

                                        <div className='flex flex-row gap-2'>

                                            <OnBoardActionContent row={row} refreshData={handleModule} />

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

export default OnBoardingExam