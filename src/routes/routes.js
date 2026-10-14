import React from "react";
import { Navigate } from "react-router-dom";

import { pageRoutes } from "./pageRoutes";

import RouteContainer from "../component/RouteContainer/RouteContainer";

import LoginPage from "../pages/auth/LoginPage"
import DashboardPage from "../pages/dashboard/DashboardPage";

import NewApplicant from "../pages/applicant/New/NewApplicant"
import ProcessedApplicant from "../pages/applicant/Processed/ProcessedApplicant"
import RepoolingApplicant from "../pages/applicant/Repooling/RepoolingApplicant"
import ListApplicant from "../pages/applicant/List/ListApplicant";

import MockCallSimulationTab from "../pages/exam/audio/MockCallSimulation/MockCallSimulationTab";
import AudioSimulationTab from "../pages/exam/audio/AudioSimulation/AudioSimulationTab";
import MCQS from "../pages/exam/mcqs/MCQS"
import ExamType from "../pages/exam/type/ExamType"
import WordPerMinute from "../pages/exam/wpm/WordPerMinute"
import ExamCategory from "../pages/exam/category/ExamCategory";
import ExamFormula from "../pages/exam/formula/ExamFormula";

import MCQNoExtraContent from "../pages/exam/type/subPages/MCQNoExtraContent"
import MCQAudioQuestionContent from "../pages/exam/type/subPages/MCQAudioQuestionContent";
import MCQAudioQuestionAnswerContent from "../pages/exam/type/subPages/MCQAudioQuestionAnswerContent";
import MCQReadQuestionContent from "../pages/exam/type/subPages/MCQReadQuestionContent";
import MCQReadQuestionAnswerContent from "../pages/exam/type/subPages/MCQReadQuestionAnswerContent";
import AdminList from "../pages/admin/AdminList";
import MyReferral from "../pages/admin/MyReferral";

import PersonalityExamType from "../pages/exam/personality/PersonalityExamType";
import PersonalityExamContent from "../pages/exam/personality/subPages/PersonalityExamContent";

import InformationExam from "../pages/exam/information/InformationExam";
import OneWayInterview from "../pages/exam/one-way/OneWayInterview";
import SelectedInterview from "../pages/exam/one-way/subPage/SelectedInterview";

import TasAssessmentApplicant from "../pages/applicant/Processed/TasAssessmentApplicant";
import HrAssessmentApplicant from "../pages/applicant/Processed/HrAssessmentApplicant";
import HrContactApplicant from "../pages/applicant/Processed/HrContactApplicant";
import TrnAssessmentApplicant from "../pages/applicant/Processed/TrnAssessmentApplicant";
import ContractSigningApplicant from "../pages/applicant/Processed/ContractSigningApplicant";

import BundleApplicant from "../pages/applicant/Processed/BundleApplicant";
import CompositeApplicant from "../pages/applicant/Processed/CompositeApplicant";

import OnBoardingExam from "../pages/exam/onboarding/OnBoardingExam";
import McqOnBoardingExam from "../pages/exam/onboarding/McqOnBoardingExam";
import PromptOnBoardingExam from "../pages/exam/onboarding/PromptOnBoardingExam";
import UploadedHRSysApplicant from "../pages/applicant/Processed/UploadedHRSysApplicant";

import AdsList from "../pages/ads/AdsList";
import JobPreference from "../pages/job/JobPreference";
import CompensationPlan from "../pages/compensation/CompensationPlan";
import ExportPDF from "../pages/applicant/New/modal/ExportPDF";

import ReferralList from "../pages/admin/ReferralList";
import RatingList from "../pages/admin/RatingList";

const routes = [
  {
    path: "app",
    element: <RouteContainer />,
    children: [
      { path: pageRoutes.DASHBOARD, element: <DashboardPage /> },

      { path: pageRoutes.NewApplicant, element: <NewApplicant /> },
      { path: pageRoutes.ProcessedApplicant, element: <ProcessedApplicant /> },
      { path: pageRoutes.RepoolingApplicant, element: <RepoolingApplicant /> },
      { path: pageRoutes.TasApplicant, element: <TasAssessmentApplicant /> },
      { path: pageRoutes.HrApplicant, element: <HrAssessmentApplicant /> },
      { path: pageRoutes.HrConApplicant, element: <HrContactApplicant /> },
      { path: pageRoutes.TrnApplicant, element: <TrnAssessmentApplicant /> },
      { path: pageRoutes.ContractSigning, element: <ContractSigningApplicant /> },
      { path: pageRoutes.HRSYS, element: <UploadedHRSysApplicant /> },

      { path: pageRoutes.ListApplicant, element: <ListApplicant /> },
      { path: pageRoutes.BundleApplicant, element: <BundleApplicant /> },
      { path: pageRoutes.CompositeApplicant, element: <CompositeApplicant /> },

      { path: pageRoutes.ExamAudio, element: <AudioSimulationTab /> },
      { path: pageRoutes.ExamMock, element: <MockCallSimulationTab /> },
      { path: pageRoutes.ExamMcqs, element: <MCQS /> },
      { path: pageRoutes.ExamType, element: <ExamType /> },
      { path: pageRoutes.ExamWpm, element: <WordPerMinute /> },
      { path: pageRoutes.ExamCategory, element: <ExamCategory /> },
      { path: pageRoutes.ExamFormula, element: <ExamFormula /> },

      { path: pageRoutes.OnBoardingExam, element: <OnBoardingExam /> },
      { path: pageRoutes.McqOnBoardingExam, element: <McqOnBoardingExam /> },
      { path: pageRoutes.PromptOnBoardingExam, element: <PromptOnBoardingExam /> },

      { path: pageRoutes.ExamMcqsNoContent, element: <MCQNoExtraContent /> },
      { path: pageRoutes.ExamMcqsAudioContent, element: <MCQAudioQuestionContent /> },
      { path: pageRoutes.ExamMcqsAudioQuestion, element: <MCQAudioQuestionAnswerContent /> },
      { path: pageRoutes.ExamMcqsReadContent, element: <MCQReadQuestionContent /> },
      { path: pageRoutes.ExamMcqsReadQuestion, element: <MCQReadQuestionAnswerContent /> },



      { path: pageRoutes.PersonExam, element: <PersonalityExamType /> },
      { path: pageRoutes.PersonExamContent, element: <PersonalityExamContent /> },

      { path: pageRoutes.PersonExamContent, element: <PersonalityExamContent /> },

      { path: pageRoutes.InformationExam, element: <InformationExam /> },
      { path: pageRoutes.OneWayInterview, element: <OneWayInterview /> },
      { path: pageRoutes.SelectedInterview, element: <SelectedInterview /> },


      { path: pageRoutes.AdminList, element: <AdminList /> },
      { path: pageRoutes.RefList, element: <ReferralList /> },
      { path: pageRoutes.RateList, element: <RatingList /> },
      { path: pageRoutes.MyReferral, element: <MyReferral /> },

      { path: pageRoutes.AdsList, element: <AdsList /> },
      { path: pageRoutes.JobPref, element: <JobPreference /> },
      { path: pageRoutes.CompPlan, element: <CompensationPlan /> },

      { path: pageRoutes.ExportExam, element: <ExportPDF /> },

    ],
  },
  {
    path: "/",
    children: [
      { path: pageRoutes.LOGIN, element: <LoginPage /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
