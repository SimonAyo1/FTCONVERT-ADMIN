import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  account_spliced: null,
  account: null,
};

const addressSlice = createSlice({
  name: 'account',
  initialState,

  reducers: {
    // =========== add address ============
    addAccountSpliced(state, action) {
      state.account_spliced = action.payload.account_spliced;
    },
    addAccount(state, action) {
      state.account = action.payload.account;
    },
  },
});

export const addressActions = addressSlice.actions;
export default addressSlice;
