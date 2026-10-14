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

import { APIServices } from '../../../contants/apiConfig';
import SaveButton from '../../../component/Buttons/SaveButton';
import ErrorButton from '../../../component/Buttons/ErrorButton';
import CloseButton from '../../../component/Buttons/CloseButton';
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

const FilterDashboardGraph = ({ openModal, handleClose, setDateRange }) => {

    const [state, setState] = useState(dataFormat);

    const handleClearTable = () => {

        handleClose();
        setDateRange([])
        setState(dataFormat);

    }

    const handleFilter = () => {

        handleClose();

        if (state?.[0]?.change) setDateRange(state)

    }

    const handleDateChange = (item) => {

        let checker = item?.selection;
        checker.change = true;
        setState([checker]);

    };


    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Filter Graph Information</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>


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



                <div className='w-full flex flex-row justify-end gap-3'>

                    <SaveButton handleClick={handleFilter} title={"Apply Table Filter"} />

                    <CloseButton handleClick={handleClearTable} title={"Clear Filter Table"} />

                </div>

            </div>

        </Backdrop>
    )
}

export default FilterDashboardGraph;