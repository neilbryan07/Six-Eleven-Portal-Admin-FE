export const pageRoutes = {
  /* Authenticate */
  LOGIN: "/",

  DASHBOARD: "dashboard",

  NewApplicant: "new-applicant",
  ProcessedApplicant: "processed-applicant",
  TasApplicant: "tas-applicant",
  HrApplicant: "hr-applicant",
  HrConApplicant: "hr-con-applicant",
  TrnApplicant: "train-applicant",
  RepoolingApplicant: "repooling-applicant",
  ListApplicant: "list-applicant",
  BundleApplicant: "bundle-applicant",
  CompositeApplicant: "composite-summary",
  ContractSigning: "contract-signing",
  MyReferral: "my-referral",
  HRSYS: "hrsys-applicant",

  ExamMcqs: "exam-mcqs",
  ExamAudio: "exam-audio-simulation",
  ExamMock: "exam-mock-call",
  ExamWpm: "exam-wpm",
  ExamType: "exam-type",
  ExamCategory: "exam-category",
  ExamFormula: "exam-formula",

  ExamMcqsNoContent: "exam-mcqs-content/:id?",
  ExamMcqsAudioContent: "exam-mcqs-audio-content/:id?",
  ExamMcqsAudioQuestion: "exam-mcqs-audio-question/:id?",
  ExamMcqsReadContent: "exam-mcqs-read-content/:id?",
  ExamMcqsReadQuestion: "exam-mcqs-read-question/:id?",
  ExamMcqsontent: `exam-mcqs-content/:id`,

  OnBoardingExam: "on-board-exam",
  SelectedOnBoardingContent: "on-boarding-content/:id?",
  PromptOnBoardingExam: "prompt-on-board-exam/:id?",
  McqOnBoardingExam: "mcq-on-board-exam/:id?",

  PersonExam: "personality-exam",
  PersonExamContent: "personality-exam-content/:id?",

  InformationExam: "information-exam",
  OneWayInterview: "one-way-interview",
  SelectedInterview: "one-way-interview-content/:id?",

  AdminList: "admin-list",
  RefList: "ref-list",
  RateList: "rate-list",

  AdsList: "ads-list",
  ExportExam: "report-exam/:id?",

  JobPref: "job-preference",
  CompPlan: "compensation-plan",

};
