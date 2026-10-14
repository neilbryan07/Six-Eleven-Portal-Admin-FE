import React, { useState, useEffect } from 'react'

import TextField from '@mui/material/TextField';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';

import { APIServices } from '../../../../contants/apiConfig';
import SaveButton from '../../../../component/Buttons/SaveButton';
import ErrorButton from '../../../../component/Buttons/ErrorButton';
import CloseButton from '../../../../component/Buttons/CloseButton';
import { useSelector } from 'react-redux';
import { enUS } from 'date-fns/locale';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

let dataFormat = [
  {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
    change: false,
  }
]

  let qualificationData = [

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

const FilterEvaluatedApplicant = ({ openModal, handleClose, setStatus, setScoreRange, setDateRange, is_Filter = false, setBranchID, is_repooling = false , is_all = null }) => {

  const user = useSelector((state) => state.user.userData)
  const [scoreFilter, setScoreFilter] = useState([0, 10]);
  const [statusFilter, setStatusFilter] = useState(is_Filter ? 0 : 5);
  const [branchList, setBranchlist] = useState([])

  const [state, setState] = useState(dataFormat);

  const handleClearTable = () => {

    let dataStatus;

    if (is_repooling) dataStatus = "2,7"
    else dataStatus = statusFilter;

    setStatus(dataStatus)
    setStatusFilter(5)
    setScoreRange([0, 10])
    handleClose();
    setDateRange([])
    setState(dataFormat);
    setBranchID(user?.branch_id ? user?.branch_id : 0)
    is_all(null)
  }

  const handleFilter = () => {
    setStatus(statusFilter)
    setScoreRange(scoreFilter)
    handleClose();

    if (state?.[0]?.change) setDateRange(state)

  }

  const handleChange = (event, newValue) => {
    setScoreFilter(newValue);
  };

  const handleDateChange = (item) => {

    let checker = item?.selection;
    checker.change = true;
    setState([checker]);

  };

  const handleBranch = async () => {

    let apiURL = `/branches`


    const response = await APIServices.get({ url: apiURL });

    if (response.status === 200) {
      setBranchlist(response?.data?.data)
    }
  }

  useEffect(() => {
    handleBranch();
  }, []);

  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={openModal}
    >

      <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2 '>

        <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

          <h1 className='text-sm text-[#556fa8] font-medium'>Filter Applicant Table</h1>

          <div onClick={handleClose} className='flex flex-col items-center'>
            <span className='text-gray-500 cursor-pointer'>
              <CancelOutlinedIcon size="s" />
            </span>

          </div>

        </div>

        <div className='w-full flex flex-col gap-2 max-h-[600px] overscroll-y-auto overflow-y-auto'>
        {/* {!is_repooling && */}

        <div className='w-full flex flex-col gap-2'>

          <FormControl fullWidth>
            <h1 className='text-xs text-[#839f55] font-bold mb-2'>Filter by branch:</h1>
            <Select
              size='small'
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => setBranchID(e.target.value)}
            >
              <MenuItem value={0}>Clear</MenuItem>
              {branchList.map((row, index) => (
                <MenuItem key={index} value={row?.id}>{row?.name}</MenuItem>
              ))}

            </Select>
          </FormControl>

        </div>
        {/* } */}

        { is_all && 
        <div className='w-full flex flex-col gap-2'>

          <FormControl fullWidth>
            <h1 className='text-xs text-[#839f55] font-bold mb-2'>Filter by qualification status:</h1>
            <Select
              size='small'
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => is_all(e.target.value)}
            >
              {qualificationData.map((row, index) => (
                <MenuItem key={index} value={row?.id}>{row?.description}</MenuItem>
              ))}
            </Select>
          </FormControl>

        </div>
        }

        <div className='w-full flex flex-col gap-2'>

          <FormControl fullWidth>
            <h1 className='text-xs text-[#839f55] font-bold mb-2'>Filter by status:</h1>
            <Select
              size='small'
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {is_Filter && <MenuItem value={1}>Pending</MenuItem>}
              <MenuItem value={2}>Passed</MenuItem>
              <MenuItem value={4}>Conditional</MenuItem>
              <MenuItem value={3}>Failed</MenuItem>
            </Select>
          </FormControl>

        </div>


        {/* {is_repooling &&

          <div className='w-full flex flex-col gap-2'>

            <FormControl fullWidth>
              <h1 className='text-xs text-[#839f55] font-bold mb-2'>Filter by pooling:</h1>
              <Select
                size='small'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value={2}>Recruitment Failed</MenuItem>
                <MenuItem value={7}>Training Failed</MenuItem>
              </Select>
            </FormControl>

          </div>

        } */}


        {/* <div className='w-full flex flex-col gap-2'>

          <h1 className='text-xs text-[#839f55] font-bold mb-2'>Score range from 0 to 10:</h1>

          <div className='w-[85%] self-center'>
            <Slider
              value={scoreFilter}
              onChange={handleChange}
              min={1}
              max={10}
              step={1}
              marks
              valueLabelDisplay="auto"
            />
          </div>

        </div> */}


        <div className='w-full flex flex-col gap-2'>

          <h1 className='text-xs text-[#839f55] font-bold mb-2'>Date Range Filter:</h1>

          <div className='w-[95%] flex flex-col items-center justify-center'>

            <DateRange
              locale={enUS}
              editableDateInputs={true}
              onChange={handleDateChange}
              moveRangeOnFirstSelection={false}
              ranges={state}
            />

          </div>
        </div>

        </div>



        <div className='w-full flex flex-row justify-end gap-3'>

          <SaveButton handleClick={handleFilter} title={"Apply Table Filter"} />

          <CloseButton handleClick={handleClearTable} title={"Clear Filter Table"} />

        </div>

      </div>

    </Backdrop>
  )
}

export default FilterEvaluatedApplicant;