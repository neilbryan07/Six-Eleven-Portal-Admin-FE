import React from 'react'

import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ManageHistoryOutlinedIcon from '@mui/icons-material/ManageHistoryOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import VideoCameraFrontOutlinedIcon from '@mui/icons-material/VideoCameraFrontOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import ReduceCapacityOutlinedIcon from '@mui/icons-material/ReduceCapacityOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import { SidebarContainer } from './SidebarContainer/SidebarContainer'
import { SidebarItems } from './SidebarItem/SidebarItems'
import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';

import { pageRoutes } from "../../routes/pageRoutes"

import { useSelector } from 'react-redux';

const Sidebar = () => {

    const user = useSelector((state) => state.user.userData)

    return (
        <div className='min-w-[230px] max-w-[230px] w-full h-full flex flex-col border-r border-gray-300 p-4 bg-white'>

            <div className='self-start'>
                <img class="default_logo lazyloaded" src="https://www.sixelevenbpo.com/wp-content/uploads/2020/05/six-eleven-center-logo.png" alt="six-eleven-center-logo" data-ll-status="loaded" />
            </div>

            <div className='flex flex-col gap-2 mt-8'>

                <h1 className='text-[#556fa8] font-normal text-xs'>Overview</h1>
                <SidebarItems icon={<HomeOutlinedIcon fontSize="small" />} name={"Dashboard"} anchor={pageRoutes.DASHBOARD} />

            </div>

            <SidebarContainer name={"Applicant Content"}>

                {[1, 6, 7].includes(parseInt(user?.portal_role?.id)) &&
                    <React.Fragment>
                        <SidebarItems icon={<MoreTimeIcon fontSize="small" />} name={"Pending Applicants"} anchor={pageRoutes.NewApplicant} />
                        <SidebarItems icon={<CheckCircleOutlineIcon fontSize="small" />} name={"Evaluated Applicants"} anchor={pageRoutes.ProcessedApplicant} />
                        <SidebarItems icon={<HandshakeOutlinedIcon fontSize="small" />} name={"Contract Invite"} anchor={pageRoutes.ContractSigning} />
                    </React.Fragment>
                }

                {parseInt(user?.portal_role?.id) === 2 &&
                    <SidebarItems icon={<CheckCircleOutlineIcon fontSize="small" />} name={"TAS Assessment"} anchor={pageRoutes.TasApplicant} />
                }


                {[4, 7].includes(parseInt(user?.portal_role?.id)) &&
                    <SidebarItems icon={<PersonSearchOutlinedIcon fontSize="small" />} name={"Training Assessment"} anchor={pageRoutes.TrnApplicant} />
                }


                {[3, 5, 7].includes(parseInt(user?.portal_role?.id)) &&
                    <SidebarItems icon={<BadgeOutlinedIcon fontSize="small" />} name={"HR Onboarding"} anchor={pageRoutes.HrApplicant} />
                }

                {[3, 5, 7].includes(parseInt(user?.portal_role?.id)) &&
                    <SidebarItems icon={<ReceiptLongOutlinedIcon fontSize="small" />} name={"HR Contract Signing"} anchor={pageRoutes.HrConApplicant} />
                }

                {[1, 6, 3, 5, 4, 7].includes(parseInt(user?.portal_role?.id)) &&
                    <React.Fragment>
                        <SidebarItems icon={<WarningAmberOutlinedIcon fontSize="small" />} name={"Repooling Applicants"} anchor={pageRoutes.RepoolingApplicant} />
                    </React.Fragment>
                }

                <SidebarItems icon={<ListAltOutlinedIcon fontSize="small" />} name={"All Applicants"} anchor={pageRoutes.ListApplicant} />
                <SidebarItems icon={<ReduceCapacityOutlinedIcon fontSize="small" />} name={"Bundle Applicant"} anchor={pageRoutes.BundleApplicant} />
                <SidebarItems icon={<Diversity3OutlinedIcon fontSize="small" />} name={"Composite Applicant"} anchor={pageRoutes.CompositeApplicant} />

                {/* List Applicants (HrSys) - TEST PHASE */}
                {[1, 6, 3, 5, 7].includes(parseInt(user?.portal_role?.id)) &&
                    <React.Fragment>
                        <SidebarItems icon={<CloudUploadOutlinedIcon fontSize="small" />} name={"HrSys List"} anchor={pageRoutes.HRSYS} />
                    </React.Fragment>
                }

            </SidebarContainer>

            {[6, 1, 7].includes(parseInt(user?.portal_role?.id)) ?

                <SidebarContainer name={"Page Content"}>
                    <SidebarItems icon={<CampaignOutlinedIcon fontSize="small" />} name={"Advertisement"} anchor={pageRoutes.AdsList} />
                </SidebarContainer>

                : null}

            {[1, 6, 3, 5, 4, 7].includes(parseInt(user?.portal_role?.id)) ?

                <SidebarContainer name={"Additional Content"}>
                    <SidebarItems icon={<CampaignOutlinedIcon fontSize="small" />} name={"Job Preference"} anchor={pageRoutes.JobPref} />
                    <SidebarItems icon={<MonetizationOnOutlinedIcon fontSize="small" />} name={"Compensation Plan"} anchor={pageRoutes.CompPlan} />
                </SidebarContainer>

                : null}


            {[6, 7].includes(parseInt(user?.portal_role?.id)) ?

                <React.Fragment>
                    <SidebarContainer name={"TAS Exam Content"}>

                        <SidebarItems icon={<ManageHistoryOutlinedIcon fontSize="small" />} name={"Assessment Exam"} anchor={pageRoutes.ExamType} />
                        <SidebarItems icon={<SupervisedUserCircleOutlinedIcon fontSize="small" />} name={"Personality Exam"} anchor={pageRoutes.PersonExam} />
                        <SidebarItems icon={<ContactMailOutlinedIcon fontSize="small" />} name={"Information Exam"} anchor={pageRoutes.InformationExam} />
                        <SidebarItems icon={<VideoCameraFrontOutlinedIcon fontSize="small" />} name={"One Way Interview "} anchor={pageRoutes.OneWayInterview} />

                        <SidebarItems icon={<ScienceOutlinedIcon fontSize="small" />} name={"Exam Formula"} anchor={pageRoutes.ExamFormula} />
                        <SidebarItems icon={<GridViewOutlinedIcon fontSize="small" />} name={"Exam Category"} anchor={pageRoutes.ExamCategory} />

                        {/* <SidebarItems icon={<ReceiptLongOutlinedIcon fontSize="small"/>} name={"MCQs"} anchor={pageRoutes.ExamMcqs} /> */}
                        {/* <SidebarItems icon={<KeyboardVoiceOutlinedIcon fontSize="small"/>} name={"Audio Simulation"} anchor={pageRoutes.ExamAudio} /> */}
                        {/* <SidebarItems icon={<HeadsetMicOutlinedIcon fontSize="small"/>} name={"Mock Call"} anchor={pageRoutes.ExamMock} /> */}
                        {/* <SidebarItems icon={<KeyboardAltOutlinedIcon fontSize="small"/>} name={"Word Per Minute"} anchor={pageRoutes.ExamWpm}/> */}

                    </SidebarContainer>

                    <SidebarContainer name={"Admin"}>

                        <SidebarItems icon={<GroupOutlinedIcon fontSize="small" />} name={"List of Admin"} anchor={pageRoutes.AdminList} />
                        <SidebarItems icon={<MilitaryTechOutlinedIcon fontSize="small" />} name={"Referral Report"} anchor={pageRoutes.RefList} />
                        <SidebarItems icon={<StarBorderPurple500OutlinedIcon fontSize="small" />} name={"Ratings Report"} anchor={pageRoutes.RateList} />
                    </SidebarContainer>
                </React.Fragment>
                : null}

            {[5, 3, 7].includes(parseInt(user?.portal_role?.id)) ?

                <React.Fragment>
                    <SidebarContainer name={"Hr Exam Content"}>

                        <SidebarItems icon={<AssignmentIndOutlinedIcon fontSize="small" />} name={"OnBoarding Exam"} anchor={pageRoutes.OnBoardingExam} />

                    </SidebarContainer>

                </React.Fragment>
                : null}

            {[6, 1, 7].includes(parseInt(user?.portal_role?.id)) ?
                <div className='mt-2'>
                    <SidebarItems icon={<Groups3OutlinedIcon fontSize="small" />} name={"My Referral List"} anchor={pageRoutes.MyReferral} />
                </div>
                : null}

            <div className='pb-10' />

        </div>
    )
}

export default Sidebar
