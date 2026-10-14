import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  branch: {
    id: null,
    name: null,
  },
};

export const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    storeBranchDetails: (state, action) => {
      let update = {
        id: action.payload.id,
        name: action.payload.name,
      };
      state.branchData = update;
    },
  },
});

export const { storeBranchDetails } = branchSlice.actions;

export default branchSlice.reducer;
