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
import SaveButton from '../../../../../component/Buttons/SaveButton';
import CloseButton from '../../../../../component/Buttons/CloseButton';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

import { APIServices } from '../../../../../contants/apiConfig';

const EditMockCall = ({ openModal, handleClose, rowData, reFreshTable }) => {

  const [items, setItems] = useState(rowData?.mock_content);
  const [deletedMock, setDeletedMock] = useState([]);

  const [mockName, setMockName] = useState(rowData?.mock_call_content_name);
  const [loading , setLoading] = useState(false)

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
      customer_response_txt: '', // Start with empty content
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (data) => {

    if (typeof data?.id === 'number' && Number.isInteger(data?.id)) {
      setDeletedMock(prev => [...prev, data]);
    }

    setItems(items.filter((item) => item.id !== data?.id));
  };

  const updateItemContent = (id, newContent) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, customer_response_txt: newContent } : item))
    );
  };

  const handleEditMock = async () => {

    setLoading(true)

    const updatedArray = items?.map((item, index) => ({
      ...item,
      customer_response_sequence: index + 1,
    }));

    const stringIdItems = updatedArray.filter(item => typeof item.id === 'string');
    const numericIdItems = updatedArray.filter(item => typeof item.id === 'number');

    let dataEdit = {
      "id": rowData?.id,
      "existData": numericIdItems,
      "newData": stringIdItems,
      "deletedData": deletedMock,
      "mock_call_content_name": mockName
    }


    const response = await APIServices.put({
      url: '/mock/update-mock-content', payload: dataEdit
    });

    if (response.status === 200) {
      reFreshTable()
      handleClose();
    } else {
      setLoading(false)
    }
  }

  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={openModal}
    >
      <div className="max-w-[500px] w-full max-h-[800px] bg-white rounded-lg flex flex-col gap-2">
        <div className="w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2 pt-4 px-4">
          <h1 className="text-sm text-[#556fa8] font-medium">Edit Mock Call Content</h1>
          <div onClick={handleClose} className="flex flex-col items-center">
            <span className="text-gray-500 cursor-pointer">
              <CancelOutlinedIcon size="s" />
            </span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 overscroll-y-auto overflow-y-auto px-3">
          <div className="flex flex-col gap-2">
            <h1 className="text-xs text-[#839f55] font-bold">Mock call name:</h1>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={mockName}
              onChange={(e) => setMockName(e.target.value)}
            />
          </div>

          <FormControl fullWidth>
            <h1 className="text-xs text-[#839f55] font-bold mb-2">Audio Type:</h1>
            <Select size="small" labelId="demo-simple-select-label" id="demo-simple-select" value={10}>
              <MenuItem value={10}>Mock Call / Live Chat Simulation</MenuItem>
            </Select>
          </FormControl>

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
                  className="border-4 border-dotted p-2 flex flex-col gap-5 mb-2 "
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {items.map((item, index) => (
                    <Draggable key={item?.id} draggableId={item?.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          className="flex flex-col gap-2 border-2 border-dashed border-blue-500 p-2 cursor-grab "
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="w-full flex flex-row items-center justify-between">
                            <h1 className="text-xs text-[#839f55] font-bold">Mock call customer content</h1>
                            <span
                              className="cursor-pointer"
                              onClick={() => deleteItem(item)}
                            >
                              <DeleteOutlinedIcon color="error" />
                            </span>
                          </div>
                          <TextField
                            id={`content-input-${item?.id}`}
                            multiline
                            variant="outlined"
                            size="small"
                            value={item?.customer_response_txt}
                            onChange={(e) => updateItemContent(item?.id, e.target.value)}
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
        </div>
        <div className="w-full flex flex-row justify-end gap-3 p-4">
          <SaveButton is_loading={loading} handleClick={handleEditMock} title={"Update Mock Call Simulation"} />
          <CloseButton title={"Cancel"} />
        </div>
      </div>
    </Backdrop>
  );
};

export default EditMockCall;