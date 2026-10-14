import React, { useState, lazy, Suspense } from 'react'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BadgeIcon from '@mui/icons-material/Badge';
import StackedBarChartOutlinedIcon from '@mui/icons-material/StackedBarChartOutlined';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import Tooltip from '@mui/material/Tooltip';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';

const Menu = lazy(() => import('@mui/material/Menu'));
const MenuItem = lazy(() => import('@mui/material/MenuItem'));

const EmailLogsList = lazy(() => import('../EmailLogsList'));
const ResumeContent = lazy(() => import('../ResumeContent'));
const ViewApplicantActivity = lazy(() => import('../ViewApplicantActivity'));
const ViewJobPreference = lazy(() => import('../ViewJobPreference'));
const ViewApplicantInformation = lazy(() => import('../ViewApplicantInformation'));
const EditApplicantInformation = lazy(() => import('../EditApplicantInformation'));
const ViewQualificationLog = lazy(() => import('../ViewQualificationLog'));
const ForgotPassword = lazy(() => import('../ForgotPassword'));
const EmailTemplateList = lazy(() => import('../EmailTemplateList'));

const TableNameContent = ({ row }) => {


    const [openAppInfo, setOpenAppInfo] = useState(false);
    const [openAppEdit, setOpenAppEdit] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const [openQualification, setOpenQualification] = useState(false);
    const [openAppAct, setOpenAppAct] = useState(false);
    const [openResume, setOpenResume] = useState(false);
    const [openEmailList, setOpenEmailList] = useState(false);
    const [openEmailLogs, setOpenEmailLogs] = useState(false);
    const [openJob, setOpenJob] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleCloseAct = () => {
        setAnchorEl(null);
        setOpenAppAct(false)
    }

    const handleCloseJob = () => {
        setAnchorEl(null);
        setOpenJob(false)
    }

    const handleOpenAct = () => {
        setAnchorEl(null);
        setOpenAppAct(true)
    }

    const handleCloseForgot = () => {
        setOpenAppEdit(false)
        setOpenAppInfo(false)
        setOpenQualification(false)
    }

    const handleCloseResume = () => {
        setOpenResume(false)
        setOpenQualification(false)
    }

    const handleForgotPassword = () => {
        setOpenPassword(false)
    }


    const handleViewQualification = () => {
        setOpenQualification(true);
        setAnchorEl(null);
    }

    const handleViewApplicant = () => {
        setOpenAppInfo(true);
        setAnchorEl(null);
    }

    const handleEditApplicant = () => {
        setOpenAppEdit(true);
        setAnchorEl(null);
    }

    const handleOpenForgotPassword = () => {
        setOpenPassword(true);
        setAnchorEl(null);
    }

    const handleOpenResume = () => {
        setOpenResume(true);
        setAnchorEl(null);
    }

    const HandleEmailList = () => {
        setOpenEmailList(true);
        setAnchorEl(null);
    }

    const HandleEmailLogs = () => {
        setOpenEmailLogs(true);
        setAnchorEl(null);
    }

    const HandleClosedEmailList = () => {
        setOpenEmailList(false);
    }

    const HandleClosedEmailLogs = () => {
        setOpenEmailLogs(false);
    }


    const handleJobApplicant = () => {
        setOpenJob(true);
        setAnchorEl(null);
    }

    return (
        <div className='flex flex-row gap-2 items-center justify-center'>
            <Tooltip title="View Applicant Logs">
                <div className='cursor-pointer' onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <BadgeIcon color="primary" />
                </div>
            </Tooltip>

            <Suspense>
                {openAppAct && <ViewApplicantActivity openAppInfo={setOpenAppAct} handleCloseForgot={handleCloseAct} selectedData={row} />}
            </Suspense>

            <Suspense>
                {openAppInfo && <ViewApplicantInformation openAppInfo={openAppInfo} handleCloseForgot={handleCloseForgot} selectedData={row} />}
            </Suspense>

            <Suspense>
                {openAppEdit && <EditApplicantInformation openAppInfo={openAppEdit} handleCloseForgot={handleCloseForgot} selectedData={row} />}
            </Suspense>


            <Suspense>
                {openPassword && <ForgotPassword openPassword={openPassword} handleClosedForgotPassword={handleForgotPassword} selectedData={row} />}
            </Suspense>

            <Suspense>
                {openQualification && <ViewQualificationLog openAppInfo={openQualification} handleCloseForgot={handleCloseForgot} selectedData={row} />}
            </Suspense>

            <Suspense>
                {openResume && <ResumeContent openResume={openResume} handleCloseResume={handleCloseResume} selectedData={row} />}
            </Suspense>

            <Suspense>
                {openEmailList && <EmailTemplateList openEmailList={openEmailList} HandleClosedEmailList={HandleClosedEmailList} selectedData={row} />}
            </Suspense>

            <Suspense>
                {openEmailLogs && <EmailLogsList openEmailList={openEmailLogs} HandleClosedEmailList={HandleClosedEmailLogs} selectedData={row} />}
            </Suspense>

            <Suspense>
                {openJob && <ViewJobPreference openModal={openJob} handleClose={handleCloseJob} selectedData={row} />}
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
                    <MenuItem onClick={handleViewApplicant}><PermIdentityOutlinedIcon color='info' /> <span className='ml-1'>Applicant Information</span></MenuItem>
                    <MenuItem onClick={handleEditApplicant}><EditNoteOutlinedIcon color='info' /> <span className='ml-1'>Edit Applicant</span></MenuItem>
                    <MenuItem onClick={handleJobApplicant}><CampaignOutlinedIcon color='info' /> <span className='ml-1'>Job Preference</span></MenuItem>
                    <MenuItem onClick={handleViewQualification}><ListAltOutlinedIcon color='info' /> <span className='ml-1'>Qualification Logs</span></MenuItem>
                    <MenuItem onClick={handleOpenAct}><StackedBarChartOutlinedIcon color='info' /> <span className='ml-1'>Applicant Activity</span></MenuItem>
                    <MenuItem onClick={handleOpenResume}><AssignmentOutlinedIcon color='info' /> <span className='ml-1'>Applicant Files</span></MenuItem>
                    <MenuItem onClick={HandleEmailList}><AttachEmailOutlinedIcon color='info' /> <span className='ml-1'>Email Templates</span></MenuItem>
                    <MenuItem onClick={HandleEmailLogs}><MarkEmailReadOutlinedIcon color='info' /> <span className='ml-1'>Email Sent Logs</span></MenuItem>
                    <MenuItem onClick={handleOpenForgotPassword}><LockResetOutlinedIcon color='info' /> <span className='ml-1'>Forgot Password</span></MenuItem>
                </Menu>
            </Suspense>

        </div >
    )
}

export default TableNameContent;