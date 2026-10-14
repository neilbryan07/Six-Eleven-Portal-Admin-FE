import React, { use, useState } from 'react';
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

const AddInformationExam = ({ openModal, handleClose, reFreshTable }) => {

    const [items, setItems] = useState([]);

    const [mockName, setMockName] = useState(null);
    const [questionType, setQuestionType] = useState(null);
    const [loading , setLoading] = useState(false);

    const handleAddMock = async () => {

        setLoading(true);

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
        } else {
            setLoading(false);
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
                    <h1 className="text-sm text-[#556fa8] font-medium">Add Information Question</h1>
                    <div onClick={handleClose} className="flex flex-col items-center">
                        <span className="text-gray-500 cursor-pointer">
                            <CancelOutlinedIcon size="s" />
                        </span>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-2 overscroll-y-auto overflow-y-auto px-3">

                    <FormControl fullWidth>
                        <h1 className="text-xs text-[#839f55] font-bold mb-2">Question Type</h1>
                        <Select size="small" labelId="demo-simple-select-label" id="demo-simple-select"
                            value={questionType}
                            onChange={handleQuestionType}>
                            <MenuItem value={''}></MenuItem>
                            <MenuItem value={1}>Multiple Choice</MenuItem>
                            <MenuItem value={2}>Provide Answer</MenuItem>
                        </Select>
                    </FormControl>

                    {questionType ?

                        <React.Fragment>

                            <div className="flex flex-col gap-2">
                                <h1 className="text-xs text-[#839f55] font-bold">Question Name</h1>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    value={mockName}
                                    onChange={(e) => setMockName(e.target.value)}
                                />
                            </div>

                            {parseInt(questionType) === 1 ?
                                <React.Fragment>

                                    <div className="w-full my-2 flex flex-row items-center justify-between">
                                        <h1 className="text-xs text-blue-500 font-bold">
                                            All items below are draggable to change the content sequence.
                                        </h1>

                                        <div
                                            onClick={addItem}
                                            className="px-2 py-[4px] flex flex-row gap-2 items-center justify-center bg-[#839f55] rounded cursor-pointer"
                                        >
                                            <AddCircleOutlineOutlinedIcon />
                                            <h1 className="text-white text-sm font-semibold">Add</h1>
                                        </div>
                                    </div>




                                    <DragDropContext onDragEnd={handleOnDragEnd}>
                                        <Droppable droppableId="contentList">
                                            {(provided) => (
                                                <div
                                                    className="border-4 border-dotted p-2 flex flex-col gap-5 mb-2"
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                >
                                                    {items.map((item, index) => (
                                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                                            {(provided) => (
                                                                <div
                                                                    className="flex flex-col gap-2 border-2 border-dashed border-blue-500 p-2 cursor-grab"
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <div className="w-full flex flex-row items-center justify-between">
                                                                        <h1 className="text-xs text-[#839f55] font-bold">Question Choices</h1>
                                                                        <span
                                                                            className="cursor-pointer"
                                                                            onClick={() => deleteItem(item.id)}
                                                                        >
                                                                            <DeleteOutlinedIcon color="error" />
                                                                        </span>
                                                                    </div>
                                                                    <TextField
                                                                        id={`content-input-${item.id}`}
                                                                        multiline
                                                                        variant="outlined"
                                                                        size="small"
                                                                        value={item.information_choices}
                                                                        onChange={(e) => updateItemContent(item.id, e.target.value)}
                                                                    />
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                </React.Fragment>
                                : null}

                        </React.Fragment> : null}
                </div>
                <div className="w-full flex flex-row justify-end gap-3 p-4">
                    {mockName ?
                        <SaveButton is_loading={loading} handleClick={handleAddMock} title={"Create Question"} />
                        : null}
                    <CloseButton title={"Cancel"} />

                </div>
            </div>
        </Backdrop>
    );
};

export default AddInformationExam;