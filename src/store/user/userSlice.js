import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  merchantsList: [],
  dashboardData: [],
  merchantsFetch: {
    isLoading: false,
    isNoUser: false
  }
};

const merchantSlice = createSlice({
  name: 'merchants',
  initialState,

  reducers: {
    // =========== add user ============

    addMerchants(state, action) {
      state.merchantsList = action.payload;
    },
    addDashboardData(state, action) {
      state.dashboardData = action.payload;
    },
    addMerchantFetch(state, action) {
      state.merchantsFetch = action.payload;
    },
  },
});

export const merchantAction = merchantSlice.actions;
export default merchantSlice;
