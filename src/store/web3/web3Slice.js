import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  web3: null,
  polygonScanUrl: null,
};

const web3Slice = createSlice({
  name: 'web3',
  initialState,

  reducers: {
    // =========== add address ============
    addWeb3(state, action) {
      state.web3 = action.payload.web3;
    },
    addpolygonScanUrl(state, action) {
      state.polygonScanUrl = action.payload.polygonScanUrl;
    },
  },
});

export const web3Actions = web3Slice.actions;
export default web3Slice;
