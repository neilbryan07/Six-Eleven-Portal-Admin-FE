import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import EditIcon from '@mui/icons-material/Edit';

const Menu = lazy(() => import('@mui/material/Menu'));
const MenuItem = lazy(() => import('@mui/material/MenuItem'));

const SelectOnboardingQuality = lazy(() => import('../modal/SelectOnboardingQuality'));
const EditModuleVideo = lazy(() => import('../modal/EditModuleVideo'));
const ViewModuleVideo = lazy(() => import('../modal/ViewModuleVideo'));

const OnBoardActionContent = ({ row, refreshData }) => {

    const navigate = useNavigate();

    const [viewModuleVid, setViewModuleVid] = useState(false)
    const [viewSelectQuality, setViewSelectQuality] = useState(false)
    const [editModuleVid, setEditModuleVid] = useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    let qualification_id = parseInt(row?.qualifications?.[0]?.qualification_id)

    const handleOpen = (type) => {
        setAnchorEl(null);

        switch (parseInt(type)) {
            case 1: setViewModuleVid(true); break;
            case 2: setEditModuleVid(true); break;
            case 3: navigate(`/app/mcq-on-board-exam/${row?.id}`); break;
            case 4: navigate(`/app/prompt-on-board-exam/${row?.id}`); break;
            case 5: setViewSelectQuality(true); break;

        }

    };

    const handleClose = () => {
        setViewModuleVid(false);
        setEditModuleVid(false);
        setViewSelectQuality(false)
        // setOpenSnap(false)
        // setOpenApproval(false)
        // setOpenVideo(false);
        // setOpenContract(false);
        // setOpenFinalNotif(false)
        // setOpenTraining(false);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <div className='flex flex-row gap-2 items-center justify-center'>

            <Tooltip title="View Applicant Result">

                <div onClick={(e) => setAnchorEl(e.currentTarget)} className='cursor-pointer mt-1'>
                    <VisibilityIcon color="primary" />
                </div>
            </Tooltip>



            <Suspense>
                {editModuleVid && <EditModuleVideo OnBoardingData={row} openModal={editModuleVid} handleClose={handleClose} refreshData={refreshData} />}
            </Suspense>

            <Suspense>
                {viewModuleVid && <ViewModuleVideo OnBoardingData={row} openModal={viewModuleVid} handleClose={handleClose} />}
            </Suspense>

            <Suspense>
                {viewSelectQuality && <SelectOnboardingQuality questionData={row} openModal={viewSelectQuality} handleClose={handleClose} />}
            </Suspense>

            <Suspense>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                    slotProps={{
                        list: {
                            'aria-labelledby': 'basic-button',
                        },
                    }}
                >
                    <MenuItem />


                    <MenuItem onClick={() => handleOpen(1)}>
                        <VideoCameraFrontIcon color='info' />
                        <span className='ml-1'>View Video</span>
                    </MenuItem>

                    <MenuItem onClick={() => handleOpen(5)}>
                        <EditIcon color='info' />
                        <span className='ml-1'>Edit Exam Content</span>
                    </MenuItem>

                    <MenuItem onClick={() => handleOpen(3)}>
                        <VisibilityIcon color='info' />
                        <span className='ml-1'>View MCQ Content</span>
                    </MenuItem>

                    <MenuItem onClick={() => handleOpen(4)}>
                        <VisibilityIcon color='info' />
                        <span className='ml-1'>View Prompt Content</span>
                    </MenuItem>



                </Menu>
            </Suspense>


        </div>
    )
}

export default OnBoardActionContent;
