import React, { lazy, Suspense, useState, useEffect } from 'react';

import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { BarChart } from '@mui/x-charts/BarChart';

import { format } from 'date-fns';

import { useNavigate } from "react-router-dom";

import { pageRoutes } from '../../routes/pageRoutes';

import { APIServices } from '../../contants/apiConfig';

import { Doughnut, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { DashboardChartData, optionsStack, optionsPie, DashboardChartDataQualificationPie, optionsStackQuali } from '../../contants/contans';

const FilterDashboardGraph = lazy(() => import('./modal/FilterDashboardGraph'));
const FilterQualificationGraph = lazy(() => import('./modal/FilterQualificationGraph'));

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const chartSetting = {
  yAxis: [
    {
      label: 'Total Applicant',
      width: 60,
    },
  ],
  height: 500,
};

function valueFormatter(value) {
  return `${value}`;
}

const dataset = [
  {
    qualification: 0,
    label: 'TAS Pending',
    name: 'TAS Pending',
    qualification_name: "TAS_PEN",
  },
  {
    qualification: 0,
    label: 'TAS Approved',
    name: 'TAS Approved',
    qualification_name: "TAS_COM",
  },
  {
    qualification: 0,
    label: 'TAS Failed',
    name: 'TAS Failed',
    qualification_name: "TAS_FAIL",
  },
  {
    qualification: 0,
    label: 'TD Approved',
    name: 'TD Approved',
    qualification_name: "TRN_COM",
  },
  {
    qualification: 0,
    label: 'TD Failed',
    name: 'TD Failed',
    qualification_name: "TRN_FAIL",
  },
  {
    qualification: 0,
    label: 'HR Onboarding Ongoing',
    name: 'HR Onboarding Ongoing',
    qualification_name: "HR_ONB_ONG",
  },
  {
    qualification: 0,
    label: 'HR Onboarding Completed',
    name: 'HR Onboarding Completed',
    qualification_name: "HR_ONB_COM",
  },
  {
    qualification: 0,
    label: 'HR Contract Completed',
    name: 'HR Contract Completed',
    qualification_name: "HR_CON_COM",
  }
];




const DashboardTotalConfigApplicant = ({ name, icon, anchor, data, id }) => {

  const navigate = useNavigate();

  const handleData = () => {

    if (id === 1) return data?.data?.total_new_applicants;
    if (id === 2) return data?.data?.total_passed_applicants;
    if (id === 3) return data?.data?.total_repooling_applicants;
    if (id === 0) return data?.data?.total_applicants;

  }

  return (

    <div className='p-4 flex flex-col border-dashed border border-[#839f55] bg-white rounded max-w-[400px] w-full'>

      <div className='flex flex-row gap-2 items-center'>
        {icon}
        <h1 className='font-light text-sm text-black'>{name}</h1>
      </div>

      <div className='flex flex-col'>
        <h1 className='font-medium text-lg text-black'>
          {handleData()}
        </h1>
      </div>

    </div>

  )
}


const DashboardPage = () => {

  const [dateRange, setDateRange] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);

  const [chartData, setChartData] = useState(DashboardChartData)

  const [chartDataQuali, setChartDataQuali] = useState(DashboardChartDataQualificationPie)
  const [barRange, setBarRange] = useState([]);

  useEffect(() => {
    handleTasResult();
    handleChart();
  }, [openFilter]);

  const handleChart = async (isTrue = true) => {

    let apiURL = `/branch-count-all?${dateRange?.length > 0 ?
      `start_date=${format(dateRange?.[0]?.startDate, 'yyyy-MM-dd')}&
              end_date=${format(dateRange?.[0]?.endDate, 'yyyy-MM-dd')}` : null
      }`

    const response = await APIServices.get({
      url: apiURL
    });

    if (response.status === 200) {

      const branchNames = response?.data?.data.map(item => item.branch_name);
      const totalUsers = response?.data?.data.map(item => item.total_users);

      const DataMapBar = dataset?.map((item) => {
        const matched = response?.data?.all?.qualifications?.find(
          q => q.qualification_name === item.qualification_name
        );

        return {
          ...item,
          qualification: matched?.count ?? 0
        };
      });

      const DataChart = chartDataQuali?.labels?.map((item, index) => {
        const matched = response?.data?.all?.qualifications?.find(
          q => q.description === item
        );

        return matched?.count ?? 0
      });

      setBarRange(DataMapBar)

      setChartDataQuali(prevState => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: DataChart
          }
        ]
      }));

    }
  }

  const handleTasResult = async (isTrue = true) => {

    let apiURL = `/branch-count?${dateRange?.length > 0 ?
      `start_date=${format(dateRange?.[0]?.startDate, 'yyyy-MM-dd')}&
              end_date=${format(dateRange?.[0]?.endDate, 'yyyy-MM-dd')}` : null
      }`

    const response = await APIServices.get({
      url: apiURL
    });

    if (response.status === 200) {

      const branchNames = response?.data?.data.map(item => item.branch_name);
      const totalUsers = response?.data?.data.map(item => item.total_users);

      const recPassed = response?.data?.data?.map(branch => {
        const trnOng = branch.qualifications.find(q => q.qualification_name === "TAS_COM");
        return trnOng ? trnOng.count : 0;
      });

      const recFailed = response?.data?.data?.map(branch => {
        const trnOng = branch.qualifications.find(q => q.qualification_name === "TAS_FAIL");
        return trnOng ? trnOng.count : 0;
      });


      const trnPassed = response?.data?.data?.map(branch => {
        const trnOng = branch.qualifications.find(q => q.qualification_name === "TRN_COM");
        return trnOng ? trnOng.count : 0;
      });

      const trnFailed = response?.data?.data?.map(branch => {
        const trnOng = branch.qualifications.find(q => q.qualification_name === "TRN_FAIL");
        return trnOng ? trnOng.count : 0;
      });

      setChartData(prevState => ({
        ...prevState,
        dataPie: {
          ...prevState.dataPie,
          labels: branchNames,
          datasets: [
            {
              ...prevState.dataPie.datasets[0],
              data: totalUsers
            }
          ]
        },
        dataStackBar: {
          ...prevState.dataStackBar,
          labels: branchNames,
          datasets: [
            {
              ...prevState.dataStackBar.datasets[0],
              data: recPassed
            },
            {
              ...prevState.dataStackBar.datasets[1],
              data: recFailed
            },
            {
              ...prevState.dataStackBar.datasets[2],
              data: trnPassed
            },
            {
              ...prevState.dataStackBar.datasets[3],
              data: trnFailed
            }
          ]
        }
      }));
    }
  }

  const handleClose = () => {
    setOpenFilter(false);
  }

  return (
    <div className='w-full flex flex-col gap-3'>

      <Suspense>
        {openFilter && <FilterDashboardGraph openModal={openFilter} handleClose={handleClose} setDateRange={setDateRange} />}
      </Suspense>

      <h1 className='font-normal text-lg text-[#839f55]'>Dashboard</h1>
      <div className='w-full flex flex-row items-center justify-between'>

        {dateRange?.length > 0 ?
          <h1 className='font-normal text-lg text-black'>Date Range Applied : From {format(dateRange?.[0]?.startDate, 'yyyy-MM-dd')} To {format(dateRange?.[0]?.endDate, 'yyyy-MM-dd')}</h1>
          : <h1 />}

        <div onClick={e => setOpenFilter(true)} className='p-[6px] rounded-lg border border-[#839f55] cursor-pointer hover:bg-green-200'>
          <span className='text-[#839f55]'><SettingsOutlinedIcon /></span>
        </div>

      </div>

      <div className='w-full flex flex-row gap-2 items-center bg-white border-black border-dashed border border-[#839f55] rounded'>

        <div className='w-full max-w-[450px] flex flex-col gap-2 p-2'>

          <div className='flex flex-col items-center justify-center'>

            <h1 className='font-bold text-md text-black'>📢 Total Applicant Per Branch</h1>

          </div>

          <Doughnut data={chartData?.dataPie} options={optionsPie} />

        </div>


        <div className='w-full max-w-[1050px] max-h-[1000px] h-full flex flex-col gap-2 p-2'>

          <div className='flex flex-col items-center justify-center'>

            <h1 className='font-bold text-md text-black'>📊 Branch Distribution of TAS and TD Results</h1>

          </div>

          <Bar data={chartData?.dataStackBar} options={optionsStack} />

          <div className='flex flex-row items-center justify-center gap-2'>

            <h1 className="font-semibold text-xs p-[3px] text-white bg-[rgba(46,204,113,1)] rounded">TAS Passed</h1>
            <h1 className="font-semibold text-xs p-[3px] text-white bg-[rgba(0,102,204,1)] rounded">TAS Failed</h1>
            <h1 className="font-semibold text-xs p-[3px] text-white bg-[rgba(52,152,219,1)] rounded">TD Passed</h1>
            <h1 className="font-semibold text-xs p-[3px] text-white bg-[rgba(0,204,204,1)] rounded">TD Failed</h1>

          </div>

        </div>

      </div>

      <div className='w-full flex flex-col bg-white border-black border-dashed border border-[#839f55] rounded '>

        <div className='flex flex-col items-center justify-center my-3'>

          <h1 className='font-bold text-md text-black'>📊 Qualification Stage Distribution of TAS Results</h1>

        </div>

        <BarChart
          dataset={barRange}
          xAxis={[{ dataKey: 'label' }]}
          series={[
            { dataKey: 'qualification', label: 'Total Applicant Per Qualifaction', valueFormatter },
          ]}
          slotProps={{
            tooltip: {
              itemContent: ({ item }) => {
                const row = barRange[item.dataIndex];

                return (
                  <div style={{ padding: 8 }}>
                    <strong>{row.name}</strong>
                    <div>
                      Total Applicant Per Qualification: {row.qualification}
                    </div>
                  </div>
                );
              },
            },
          }}
          {...chartSetting}
        />


        <div className='w-full grid grid-cols-2 pb-3'>

          <div className='w-full max-h-[500px] h-full flex flex-col gap-2 py-10 '>

            <div className='flex flex-col items-center justify-center'>

              <h1 className='font-bold text-md text-black'>📊 Chart Results</h1>

            </div>

            <Pie data={chartDataQuali} options={optionsStackQuali} />

          </div>

          <div className='w-full flex flex-col gap-2 py-10 border-l-2 border-dashed border-black pl-5 '>

            <div className='flex flex-col items-center justify-center'>

              <h1 className='font-bold text-md text-black'>📊 TAS Raw Data Results</h1>

            </div>

            {chartDataQuali?.labels?.map((row, index) => {
              const baseValue = chartDataQuali?.datasets?.[0]?.data?.[0] || 0;
              const currentValue = chartDataQuali?.datasets?.[0]?.data?.[index] || 0;

              const rawPercentage = (currentValue / baseValue) * 100;

              const percentage =
                baseValue === 0
                  ? '0%'
                  : rawPercentage < 1
                    ? `${rawPercentage.toFixed(3)}%`
                    : `${rawPercentage.toFixed(0)}%`;

              return (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-3 mt-2 place-items-center"
                >
                  <h1 className="font-medium text-md text-black">{row}</h1>
                  <h1 className="font-bold text-md text-black flex flex-row gap-2">
                    <span className={`text-black text-sm font-semibold border border-blue-500 px-[4px] py-[3px] text-center border-dashed rounded bg-blue-200`}>{currentValue}</span> |
                    <span className={`text-black text-sm font-semibold border border-purple-500 px-[4px] py-[3px] text-center border-dashed rounded bg-purple-200`}>{percentage}</span>
                  </h1>
                </div>
              );
            })}



          </div>

        </div>

      </div>

    </div>
  )
}

export default DashboardPage
