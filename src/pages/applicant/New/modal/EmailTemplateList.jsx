import React, { lazy, Suspense, useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';

const RejectApplicantEmail = lazy(() => import('./email_template/RejectApplicantEmail'));
const OnlineInterviewWithHost = lazy(() => import('./email_template/OnlineInterviewWithHost'));
const OnlineInterview = lazy(() => import('./email_template/OnlineInterview'));
const ApplicantInvite = lazy(() => import('./email_template/ApplicantInvite'));
const OnsiteCampaign = lazy(() => import('./email_template/OnsiteCampaign'));
const OnlineInitialInterview = lazy(() => import('./email_template/OnlineInitialInterview'));
const ManualSendContract = lazy(() => import('./email_template/ManualSendContract'));
const SendFinalNotification = lazy(() => import('./email_template/SendFinalNotification'));



const EmailTemplateList = ({ selectedData, openEmailList, HandleClosedEmailList }) => {

    const [templates, setTemplates] = useState([
        { id: 1, is_open: false, type: "Applicant Invitation" },
        { id: 2, is_open: false, type: "On-Site Campaign Interview Invitation" },
        { id: 3, is_open: false, type: "Online Client Interview Invitation" },
        { id: 4, is_open: false, type: "Online Client Interview Invitation with Host" },
        { id: 5, is_open: false, type: "Initial online interview details" },
        { id: 6, is_open: false, type: "Send Reject Applicant Email" },
        { id: 7, is_open: false, type: "Send Contract Invite" },
        { id: 8, is_open: false, type: "Send Final Contract Invite" },
    ]);

    const handleToggle = (id) => {
        setTemplates((prev) =>
            prev.map((template) =>
                template.id === id
                    ? { ...template, is_open: !template.is_open } // toggle only the clicked one
                    : { ...template, is_open: false } // close others
            )
        );
    };

    const closeAllTemplates = () => {
        setTemplates((prev) => prev.map((item) => ({ ...item, is_open: false })));
    };

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openEmailList}
        >

            <Suspense>
                {templates[0].is_open && <ApplicantInvite openModal={templates[0].is_open} handleClose={closeAllTemplates} userData={selectedData} />}
            </Suspense>

            <Suspense>
                {templates[1].is_open && <OnsiteCampaign openModal={templates[1].is_open} handleClose={closeAllTemplates} userData={selectedData} />}
            </Suspense>

            <Suspense>
                {templates[2].is_open && <OnlineInterview openModal={templates[2].is_open} handleClose={closeAllTemplates} userData={selectedData} />}
            </Suspense>

            <Suspense>
                {templates[3].is_open && <OnlineInterviewWithHost openModal={templates[3].is_open} handleClose={closeAllTemplates} userData={selectedData} />}
            </Suspense>

            <Suspense>
                {templates[4].is_open && <OnlineInitialInterview openModal={templates[4].is_open} handleClose={closeAllTemplates} userData={selectedData} />}
            </Suspense>

            <Suspense>
                {templates[5].is_open && <RejectApplicantEmail openModal={templates[5].is_open} handleClose={closeAllTemplates} userData={selectedData} />}
            </Suspense>

            <Suspense>
                {templates[6].is_open && <ManualSendContract openModal={templates[6].is_open} handleClose={closeAllTemplates} userData={selectedData} />}
            </Suspense>

            <Suspense>
                {templates[7].is_open && <SendFinalNotification openModal={templates[7].is_open} handleClose={closeAllTemplates} userData={selectedData} />}
            </Suspense>

            <div className='max-w-[400px] w-full p-4 bg-white rounded-lg flex flex-col gap-3'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>List of Email Template</h1>

                    <div onClick={HandleClosedEmailList} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="small" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-3 p-2 max-h-[500px] overscroll-y-auto overflow-y-auto'>

                    <div className='flex flex-col gap-2' >
                        <div className='flex flex-row items-center gap-2'>
                            <h1 className='text-sm text-[#556fa8] font-bold'>Select Template : </h1>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2' >

                        {templates.map((item, key) => (
                            <div onClick={() => handleToggle(item.id)} key={key} className='flex flex-row items-center gap-2'>
                                <div className='px-2 py-[4px] flex flex-row gap-2 items-center justify-center bg-blue-500 rounded cursor-pointer hover:bg-blue-700'>
                                    <AttachEmailOutlinedIcon />
                                    <h1 className='text-white text-sm font-semibold'>{key + 1}. {item.type}</h1>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default EmailTemplateList;