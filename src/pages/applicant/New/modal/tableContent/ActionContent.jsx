import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import VisibilityIcon from '@mui/icons-material/Visibility';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import Tooltip from '@mui/material/Tooltip';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReceiptIcon from '@mui/icons-material/Receipt';



const MoveToContract = lazy(() => import('../MoveToContract'));
const ForRepoolingApplicant = lazy(() => import('../ForRepoolingApplicant'));
const RejectApplicant = lazy(() => import('../RejectApplicant'));
const ViewOnBoardingResult = lazy(() => import('../ViewOnBoardingResult'));
const ViewReadyHrExam = lazy(() => import('../ViewReadyHrExam'));
const ViewApplicantResult = lazy(() => import('../ViewApplicantResult'));
const ViewPersonalityResult = lazy(() => import('../ViewPersonalityResult'));
const ViewPreExamResult = lazy(() => import('../ViewPreExamResult'));
const ViewApplicantSnapShots = lazy(() => import('../ViewApplicantSnapShots'));
// const ViewApplicantApproval = lazy(() => import('../ViewApplicantApproval'));
const ViewVideoResult = lazy(() => import('../ViewVideoResult'));
const SendContract = lazy(() => import('../email_template/SendContract'));
const SendFinalNotification = lazy(() => import('../email_template/SendFinalNotification'));
// const TrainingSchedule = lazy(() => import('../email_template/TrainingSchedule'));
const ViewRatingTable = lazy(() => import('../ViewRatingTable'));
const QualificationApplicant = lazy(() => import('../QualificationApplicant'));
const MoveToHr = lazy(() => import('../MoveToHr'));
const DeleteApplicant = lazy(() => import('../DeleteApplicant'));
const UploadHRSysApplicant = lazy(() => import('../UploadHRSysApplicant'));

const Menu = lazy(() => import('@mui/material/Menu'));
const MenuItem = lazy(() => import('@mui/material/MenuItem'));

const ActionContent = ({ row, handleApplicant = null,
    is_approval = false,
    is_export = true,
    is_contact = false,
    is_training = false,
    is_hr = false,
    is_hr_exam_ready = false,
    is_qualify = false,
    is_repooling = false,
    is_hr_move = false,
    is_contract_move = false,
    is_delete_app = false,
    is_hrsys = false,
    is_rejected = false
}) => {

    const [openView, setOpenView] = useState(false);
    const [openPersonal, setOpenPersonal] = useState(false);
    const [openPreExam, setOpenPreExam] = useState(false);
    const [openSnap, setOpenSnap] = useState(false);
    const [openApproval, setOpenApproval] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);
    const [openContract, setOpenContract] = useState(false);
    const [openFinalNotif, setOpenFinalNotif] = useState(false);
    const [openTraining, setOpenTraining] = useState(false);
    const [openStartHRExam, setOpenStartHRExam] = useState(false);
    const [openViewOBExam, setViewOBExam] = useState(false);
    const [openViewQualify, setViewQualify] = useState(false);
    const [openViewRepooling, setViewRepooling] = useState(false);
    const [openViewRating, setViewRating] = useState(false);
    const [openHrmove, setHrmove] = useState(false);
    const [opendeleteApp, setDeleteApp] = useState(false);
    const [openhrsys, setHrsys] = useState(false);
    const [openReject, setReject] = useState(false);
    const [openMoveContract, setMoveContract] = useState(false);


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    let qualification_id = parseInt(row?.qualifications?.[0]?.qualification_id)

    const handleOpen = (type) => {
        setAnchorEl(null);

        switch (parseInt(type)) {
            case 2: setOpenView(true); break;
            case 3: setOpenPersonal(true); break;
            case 1: setOpenPreExam(true); break;
            case 4: setOpenSnap(true); break;
            // case 5: setOpenApproval(true); break;
            case 6: setOpenVideo(true); break;
            case 7: window.open(`/admin/app/report-exam/${row?.id}`, '_blank'); break;
            case 8: setOpenContract(true); break;
            case 9: setOpenFinalNotif(true); break;
            // case 10: setOpenTraining(true); break;
            case 11: setViewOBExam(true); break;
            case 12: setOpenStartHRExam(true); break;
            case 13: setViewQualify(true); break;
            case 14: setViewRepooling(true); break;
            case 15: setViewRating(true); break;
            case 16: setHrmove(true); break;
            case 17: setDeleteApp(true); break;
            case 18: setHrsys(true); break;
            case 19: setReject(true); break;
            case 20: setMoveContract(true); break;


        }

    };

    const handleClose = () => {
        setOpenView(false);
        setOpenPersonal(false)
        setOpenPreExam(false)
        setOpenSnap(false)
        // setOpenApproval(false)
        setOpenVideo(false);
        setOpenContract(false);
        setOpenFinalNotif(false)
        // setOpenTraining(false);
        setOpenStartHRExam(false);
        setViewOBExam(false)
        setViewQualify(false)
        setViewRepooling(false)
        setViewRating(false)
        setHrmove(false)
        setDeleteApp(false)
        setHrsys(false)
        setReject(false)
        setMoveContract(false);
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
                {openViewOBExam && <ViewOnBoardingResult openModal={openViewOBExam} handleClose={handleClose} userData={row} />}
            </Suspense>

            <Suspense>
                {openStartHRExam && <ViewReadyHrExam openModal={openStartHRExam} handleClose={handleClose} userData={row} handleApplicant={handleApplicant} />}
            </Suspense>

            <Suspense>
                {openView && <ViewApplicantResult openModal={openView} handleClose={handleClose} userData={row} isClickable={false} />}
            </Suspense>

            <Suspense>
                {openPersonal && <ViewPersonalityResult openModal={openPersonal} handleClose={handleClose} userData={row} />}
            </Suspense>

            <Suspense>
                {openPreExam && <ViewPreExamResult openModal={openPreExam} handleClose={handleClose} userData={row} />}
            </Suspense>

            <Suspense>
                {openSnap && <ViewApplicantSnapShots openModal={openSnap} handleClose={handleClose} userData={row} />}
            </Suspense>


            {/* <Suspense>
                {openApproval && <ViewApplicantApproval handleApplicant={handleApplicant} openModal={openApproval} handleClose={handleClose} userData={row} />}
            </Suspense> */}


            <Suspense>
                {openVideo && <ViewVideoResult handleApplicant={handleApplicant} openModal={openVideo} handleClose={handleClose} userData={row} />}
            </Suspense>

            <Suspense>
                {openContract && <SendContract handleApplicant={handleApplicant} openModal={openContract} handleClose={handleClose} userData={row} />}
            </Suspense>

            <Suspense>
                {openFinalNotif && <SendFinalNotification handleApplicant={handleApplicant} openModal={openFinalNotif} handleClose={handleClose} userData={row} />}
            </Suspense>


            {/* <Suspense>
                {openTraining && <TrainingSchedule handleApplicant={handleApplicant} openModal={openTraining} handleClose={handleClose} userData={row} />}
            </Suspense> */}

            <Suspense>
                {openViewQualify && <QualificationApplicant handleApplicant={handleApplicant} openModal={openViewQualify} handleClose={handleClose} userData={row} />}
            </Suspense>


            <Suspense>
                {openViewRepooling && <ForRepoolingApplicant handleApplicant={handleApplicant} openModal={openViewRepooling} handleClose={handleClose} userData={row} />}
            </Suspense>

            <Suspense>
                {openViewRating && <ViewRatingTable openModal={openViewRating} handleClose={handleClose} userData={row} />}
            </Suspense>


            <Suspense>
                {openHrmove && <MoveToHr handleApplicant={handleApplicant} openModal={openHrmove} handleClose={handleClose} userData={row} />}
            </Suspense>


            <Suspense>
                {openMoveContract && <MoveToContract handleApplicant={handleApplicant} openModal={openMoveContract} handleClose={handleClose} userData={row} />}
            </Suspense>


            <Suspense>
                {opendeleteApp && <DeleteApplicant openModal={opendeleteApp} handleClose={handleClose} userData={row} handleApplicant={handleApplicant} />}
            </Suspense>


            <Suspense>
                {openhrsys && <UploadHRSysApplicant openModal={openhrsys} handleClose={handleClose} userData={row} handleApplicant={handleApplicant} />}
            </Suspense>

            <Suspense>
                {openReject && <RejectApplicant openModal={openReject} handleClose={handleClose} userData={row} handleApplicant={handleApplicant} />}
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

                    {is_hr_exam_ready &&
                        <MenuItem onClick={() => handleOpen(12)}>
                            <ScheduleSendIcon color='info' />
                            <span className='ml-1'>Start OnBoarding Exam</span>
                        </MenuItem>
                    }

                    {is_contact && qualification_id !== 8 &&
                        <MenuItem onClick={() => handleOpen(8)}>
                            <ScheduleSendIcon color='info' />
                            <span className='ml-1'>Send Contract Invite</span>
                        </MenuItem>
                    }

                    {is_contact && qualification_id === 8 &&
                        <MenuItem onClick={() => handleOpen(9)}>
                            <ScheduleSendIcon color='info' />
                            <span className='ml-1'>Send Final Notifications</span>
                        </MenuItem>
                    }

                    {/* {is_approval &&
                        <MenuItem onClick={() => handleOpen(5)}>
                            <ContactEmergencyIcon color='info' />
                            <span className='ml-1'>Applicant Approval</span>
                        </MenuItem>
                    } */}

                    {/* {is_training &&
                        <MenuItem onClick={() => handleOpen(10)}>
                            <AccessTimeFilledIcon color='info' />
                            <span className='ml-1'>Training Schedule</span>
                        </MenuItem>
                    } */}

                    {is_qualify &&
                        <MenuItem onClick={() => handleOpen(13)}>
                            <ContactEmergencyIcon color='info' />
                            <span className='ml-1'>Applicant Approval</span>
                        </MenuItem>
                    }


                    {is_hr_move &&
                        <MenuItem onClick={() => handleOpen(16)}>
                            <SocialDistanceIcon color='info' />
                            <span className='ml-1'>Skip & Move to HR</span>
                        </MenuItem>
                    }


                    {is_contract_move &&
                        <MenuItem onClick={() => handleOpen(20)}>
                            <ReceiptIcon color='info' />
                            <span className='ml-1'>Move to Contract Invite</span>
                        </MenuItem>
                    }


                    {is_repooling &&
                        <MenuItem onClick={() => handleOpen(14)}>
                            <ReplayCircleFilledIcon color='info' />
                            <span className='ml-1'>Repool Applicant</span>
                        </MenuItem>
                    }

                    {is_hrsys &&
                        <MenuItem onClick={() => handleOpen(18)}>
                            <CloudUploadIcon color='info' />
                            <span className='ml-1'>HRSys Upload Test Phase N/A</span>
                        </MenuItem>
                    }

                    {is_rejected &&
                        <MenuItem onClick={() => handleOpen(19)}>
                            <ThumbDownIcon color='info' />
                            <span className='ml-1'>Not Qualified Applicant</span>
                        </MenuItem>
                    }

                    {is_delete_app &&
                        <MenuItem onClick={() => handleOpen(17)}>
                            <DeleteOutlineOutlinedIcon color='info' />
                            <span className='ml-1'>Delete Applicant</span>
                        </MenuItem>
                    }

                    <div className='w-full flex flex-col items-center justify-center'>
                        <h1 className='text-sky-500 text-xs'>=== Exam Information ===</h1>
                    </div>

                    <MenuItem onClick={() => handleOpen(1)}>
                        <StickyNote2OutlinedIcon color='info' />
                        <span className='ml-1'>Pre-exam Result</span>
                    </MenuItem>

                    <MenuItem onClick={() => handleOpen(2)}>
                        <StickyNote2OutlinedIcon color='info' />
                        <span className='ml-1'>Assessment Result</span>
                    </MenuItem>

                    <MenuItem onClick={() => handleOpen(3)}>
                        <StickyNote2OutlinedIcon color='info' />
                        <span className='ml-1'>Personality Result</span>
                    </MenuItem>

                    <MenuItem onClick={() => handleOpen(6)}>
                        <StickyNote2OutlinedIcon color='info' />
                        <span className='ml-1'>Video Interview Result</span>
                    </MenuItem>


                    {is_hr &&
                        <MenuItem onClick={() => handleOpen(11)}>
                            <StickyNote2OutlinedIcon color='info' />
                            <span className='ml-1'>View OnBoarding Result</span>
                        </MenuItem>
                    }

                    <MenuItem onClick={() => handleOpen(4)}>
                        <ImageOutlinedIcon color='info' />
                        <span className='ml-1'>View SnapShots</span>
                    </MenuItem>

                    <MenuItem onClick={() => handleOpen(15)}>
                        <StarHalfOutlinedIcon color='info' />
                        <span className='ml-1'>View Ratings</span>
                    </MenuItem>

                    {is_export &&
                        <MenuItem onClick={() => handleOpen(7)}>
                            <PictureAsPdfOutlinedIcon color='info' />
                            <span className='ml-1'>Export Exam Result</span>
                        </MenuItem>
                    }


                </Menu>
            </Suspense>


        </div>
    )
}

export default ActionContent;
