import { createSlice } from "@reduxjs/toolkit";

export const registerUsersSlice = createSlice({
  name: "registerUsers",
  initialState: { status:"fulfilled", registerUsers: [
    {
      userName:'Suresh00001',
      password:'12345678',
      confirmPassword:'12345678'
    }
  ], error:null },
  reducers: {
    addUsers: (state: any, action: any) => {
      state.registerUsers.push(action.payload);
    },
    removeUsers: (state: any, action: any) => {
      state.registerUsers = state.registerUsers.filter((h: any) => h.ticket_id !== action.payload.ticket_id);
    }
  },
  extraReducers:(builder)=>{}
});

export const { addUsers } = registerUsersSlice.actions;
export default registerUsersSlice.reducer;
