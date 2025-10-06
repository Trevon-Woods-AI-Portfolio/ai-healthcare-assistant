import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  diagnosis: [],

};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    setDiagnosis: (state, action) => { 
      state.diagnosis = action.payload.diagnosis;
    }
  },
});

export const {
    setLogin, setLogout, setDiagnosis
} = authSlice.actions;
export default authSlice.reducer;