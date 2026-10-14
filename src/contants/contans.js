import { format } from 'date-fns';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';

export const handleTimeFormat = (data) => {
  const date = new Date(data ? data : null);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return formattedDate;
}

export const handleScoreResultDisplay = (data) => {

  if (!data || typeof data !== "number") return null;

  let color, result;

  if (parseFloat(data) >= 7) {
    if (parseFloat(data) >= 7.5) {
      color = "success";
      result = "Passed";
    } else {
      color = "info";
      result = "Conditional";
    }


  }
  else {
    color = "error";
    result = "Failed"
  }

  return (
    <Chip label={`${result} | ${data}`} color={color} variant="outlined" />
  );
};

export const handleStatusResultDisplay = (data) => {
  if (!data || typeof data !== "string") return null;

  const normalized = data.toLowerCase();
  const colorMap = {
    passed: "text-green-500",
    failed: "text-red-500",
  };

  const color = colorMap[normalized] || "text-blue-400";
  const displayText =
    normalized === "passed"
      ? "Passed the Assessment Exam"
      : normalized === "failed"
        ? "Failed the Assessment Exam"
        : data.charAt(0).toUpperCase() + data.slice(1);

  return (
    <Tooltip title={displayText}>
      <h1 className={`${color} text-xs font-semibold`}>
        {normalized.toUpperCase()}
      </h1>
    </Tooltip>
  );
};

export const handleExpResultDisplay = (data) => {

  let displayType;

  if (data?.job_position === null) {

    displayType = data?.video_assessment_set?.set_name;

    if (data?.experience_bg === "Admin Support – Maintenance & Security") {
      displayType = data?.experience_bg;
    } else {
      displayType = data?.video_assessment_set?.set_name;
    }

  } else {
    displayType = data?.job_position;
  }

  const toolTipContent = (
    <div className="flex flex-col gap-1 text-xs">
      <span><strong className='text-white'>Experience:</strong> {data?.experience_bg || 'N/A'}</span>
      <span><strong className='text-white'>Job Position:</strong> {data?.job_position || 'N/A'}</span>
      <span><strong className='text-white'>Exam Type:</strong> {data?.video_assessment_set?.set_name || 'N/A'}</span>
    </div>
  );

  return (
    <Tooltip title={toolTipContent}>
      <h1 className={`text-purple-900 text-xs font-semibold border border-purple-500 p-[3px] text-center border-dashed rounded bg-purple-200`}>
        {displayType}
      </h1>
    </Tooltip>
  );
};

export const exportToCSV = (appplicantData, fileName) => {

  const csvRows = [];

  const headers = ['Name', 'Email', 'Status', 'Date of Application', 'Exam Score'];
  csvRows.push(headers.join(','));

  appplicantData.forEach(row => {
    const values = [
      `"${row.name}"`,
      `"${row.email}"`,
      `"${row?.status_name}"`,
      `"${handleTimeFormat(row.created_at)}"`,
      `"${row.score}"`
    ];
    csvRows.push(values.join(','));
  });

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}_${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}.csv`;
  link.click();

  URL.revokeObjectURL(url);
};

export const handleAdminManualDownload = () => {
  const fileUrl = 'http://tas.611systems.com/public/admin/admin_manual.pdf';
  window.open(fileUrl, '_blank');
};

export const handleQualificationStatus = (data) => {
  let sampleData = [

    { id: 11, name: "HR_EXAM_PEN", description: "HR Exam Pending" },
    { id: 12, name: "HR_EXAM_COM", description: "HR Exam Completed" },
    { id: 4, name: "TAS_REJ", description: "TAS Rejected" },
    { id: 5, name: "TRN_ONG", description: "Training Ongoing" },

    // NEW SETUP //

    { id: 1, name: "TAS_PEN", description: "TAS Assessment Pending" },
    { id: 2, name: "TAS_FAIL", description: "TAS Assessment Failed" },
    { id: 13, name: "TAS_COM", description: "TAS Assessment Approved" },

    { id: 6, name: "TRN_COM", description: "TD Approved" },
    { id: 7, name: "TRN_FAIL", description: "TD Failed" },

    { id: 8, name: "TAS_INV", description: "Received a contract invite" },

    { id: 14, name: "HR_ONB_ONG", description: "HR Onboarding Ongoing" },
    { id: 15, name: "HR_ONB_COM", description: "HR Onboarding Completed" },

    { id: 9, name: "HR_CON_COM", description: "HR Contract Completed" },
    { id: 10, name: "HR_CON_INC", description: "HR Contract Incomplete" },

    { id: 16, name: "HR_IS_COM", description: "HR IS Completed" },
    { id: 17, name: "HRSYS_UP", description: "HRSYS Uploaded Applicant" },

  ];

  const result = sampleData.find(item => item.name === data);

  return (
    // <Tooltip title={result?.description}>
    <h1 className={`text-black text-xs font-semibold border border-blue-500 p-[3px] text-center border-dashed rounded px-2 bg-blue-100`}>
      {result?.description}
    </h1>
    // <Chip label={`${result?.description}`} color={"primary"} variant='outlined' />
    // </Tooltip>
  );
};

export const DashboardChartData = {
  dataPie: {
    // labels: ["Mabini", "Maa", "Ecoland", "Gensan", "Digos"],
    labels: [],
    datasets: [
      {
        label: "Total Applicant",
        // data: [30, 15, 5, 10, 10],
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",   // red-pink
          "rgba(255, 159, 64, 1)",   // orange
          "rgba(255, 205, 86, 1)",   // yellow
          "rgba(75, 192, 192, 1)",   // teal
          "rgba(153, 102, 255, 1)",  // purple
          "rgba(201, 203, 207, 1)",  // gray
          "rgba(255, 99, 71, 1)",    // tomato
          "rgba(46, 204, 113, 1)"    // green
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(201, 203, 207, 1)",
          "rgba(255, 99, 71, 1)",
          "rgba(46, 204, 113, 1)"
        ],
        borderWidth: 1
      }
    ]
  },
  dataStackBar: {
    labels: [],
    datasets: [
      {
        label: "TAS Passed",
        data: [],
        backgroundColor: "rgba(46, 204, 113, 1)",
        borderColor: "rgba(46, 204, 113, 1)",
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
        borderSkipped: "bottom",
      },
      {
        label: "TAS Failed",
        data: [],
        backgroundColor: "rgba(0, 102, 204, 1)",
        borderColor: "rgba(0, 102, 204, 1)",
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
        borderSkipped: "bottom",
      },
      {
        label: "TD Passed",
        data: [],
        backgroundColor: "rgba(52, 152, 219, 1)",
        borderColor: "rgba(52, 152, 219, 1)",
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
        borderSkipped: "bottom",
      },
      {
        label: "TD Failed",
        data: [],
        backgroundColor: "rgba(0, 204, 204, 1)",
        borderColor: "rgba(0, 204, 204, 1)",
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
        borderSkipped: "bottom",
      }
    ]
  }
}

export const optionsStackQuali = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
    tooltip: {
      enabled: true
    }
  },
  elements: {
    arc: {
      spacing: 1
    }
  }
};



export const DashboardChartDataQualificationPie = {
  labels: [
    "TAS Assessment Pending",
    "TAS Assessment Approved",
    "TAS Assessment Failed",
    "TD Approved",
    "TD Failed",
    "HR Onboarding Ongoing",
    "HR Onboarding Completed",
    "HR Contract Completed",
  ],
  datasets: [
    {
      label: "Total Applicant",
      data: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      backgroundColor: [
        "rgba(255, 193, 7, 1)",
        "rgba(220, 53, 69, 1)",
        "rgba(13, 110, 253, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(25, 135, 84, 1)",
        "rgba(108, 117, 125, 1)",
        "rgba(32, 201, 151, 1)",
        "rgba(255, 99, 132, 1)"
      ],
      borderWidth: 1
    }
  ]
};


export const optionsStack = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      suggestedMax: 2,
      grid: {
        color: "rgba(200, 200, 200, 0.2)"
      }
    }
  }
};

export const optionsPie = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom"
    }
  }
};

export const getCurrentQuarterRange = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based

  let startMonth = 0;
  let endMonth = 2;

  if (month >= 3 && month <= 5) {
    startMonth = 3;
    endMonth = 5;
  } else if (month >= 6 && month <= 8) {
    startMonth = 6;
    endMonth = 8;
  } else if (month >= 9) {
    startMonth = 9;
    endMonth = 11;
  }

  const startDate = new Date(year, startMonth, 1);
  const endDate = new Date(year, endMonth + 1, 0); // last day of month

  return [
    startDate.toISOString().split("T")[0], // index 0 → YYYY-MM-DD
    endDate.toISOString().split("T")[0],   // index 1 → YYYY-MM-DD
  ];
};
