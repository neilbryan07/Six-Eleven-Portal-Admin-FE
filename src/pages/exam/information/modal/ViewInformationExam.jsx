import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

import SaveButton from '../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../component/Buttons/CloseButton';
import { APIServices } from '../../../../contants/apiConfig';

const ViewInformationExam = ({ openModal, handleClose, reFreshTable, questionData }) => {

    const [items, setItems] = useState([]);

    const [mockName, setMockName] = useState(null);
    const [questionType, setQuestionType] = useState(null);

    const handleAddMock = async () => {

        let filter, data;

        if (parseInt(questionType) === 1) {
            filter = items?.map(item => item.information_choices);
        }

        data = {
            "question": mockName,
            "is_fill": parseInt(questionType) === 2 ? 1 : 0,
        }

        if (filter && filter.length > 0) {
            data.choices = filter;
        }

        const response = await APIServices.post({
            url: '/informal/create-question', payload: data
        });

        if (response.status === 200) {
            reFreshTable()
            handleClose();
        }
    }

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const newItems = Array.from(items);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);

        setItems(newItems);
    };

    const addItem = () => {
        const newItem = {
            id: `item-${Date.now()}`, // Unique ID
            content: '', // Start with empty content
        };
        setItems([...items, newItem]);
    };

    const deleteItem = (id) => {
        setItems(items?.filter((item) => item.id !== id));
    };

    const updateItemContent = (id, newContent) => {
        setItems(
            items?.map((item) => (item.id === id ? { ...item, information_choices: newContent } : item))
        );
    };

    const handleQuestionType = (e) => {
        setQuestionType(e.target.value)
        setMockName(null);
        setItems([])
    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >
            <div className="max-w-[500px] max-h-[800px] w-full bg-white rounded-lg flex flex-col gap-2">
                <div className="w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2 pt-4 px-4">
                    <h1 className="text-sm text-[#556fa8] font-medium">View Information Question</h1>
                    <div onClick={handleClose} className="flex flex-col items-center">
                        <span className="text-gray-500 cursor-pointer">
                            <CancelOutlinedIcon size="s" />
                        </span>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-2 overscroll-y-auto overflow-y-auto px-4">

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-light'>Question Name:</h1>
                        <h1 className='text-sm text-black font-medium'>{questionData?.question}</h1>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-light'>Question Type:</h1>
                        <h1 className='text-sm text-black font-medium'>{questionData?.is_fill ? "Provide Answer" : "Multiple Choice"}</h1>
                    </div>

                    {questionData?.choices?.length >= 1 ?

                        <div className='flex flex-col gap-2'>
                            <h1 className='text-xs text-[#839f55] font-light'>Question Items:</h1>

                            {questionData?.choices?.map((row, index) => (
                                <h1 key={index} className='text-sm text-black font-medium'>{parseInt(index + 1)}.) {row?.choice}</h1>
                            ))}


                        </div>

                        : null}

                </div>

                <div className="w-full flex flex-row justify-end gap-3 p-4">

                    <CloseButton title={"Cancel"} handleClick={handleClose} />

                </div>
            </div>
        </Backdrop>
    );
};

export default ViewInformationExam;