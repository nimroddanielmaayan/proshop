import { createSlice } from '@reduxjs/toolkit';

// If there is user information in local storage, use it. Otherwise, set userInfo to null
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

// Create a slice of state called authSlice, and set its initial state to the initialState object
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem('expirationTime', expirationTime);
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('expirationTime');
    },
  },
});

// Export the login action
export const { setCredentials, logout } = authSlice.actions;

// Export the authSlice reducer
export default authSlice.reducer;