import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    name: null,
    session_key: null,
    email: null,
    admin_status: null,
    portal_role: null,
    branch_id: null,
    branch_name: null,
    signature_path: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUserDetails: (state, action) => {
      let update = {
        id: action.payload.id,
        name: action.payload.name,
        session_key: action.payload.session_key,
        email: action.payload.email,
        admin_status: action.payload.admin_status,
        portal_role: action.payload.portal_role,
        branch_id: action.payload.branch_id,
        branch_name: action.payload.branch_name,
        signature_path: action.payload.signature_path,
      };
      state.userData = update;
    },
  },
});

export const { storeUserDetails } = userSlice.actions;

export default userSlice.reducer;
