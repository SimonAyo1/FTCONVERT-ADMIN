import { configureStore } from '@reduxjs/toolkit';
import merchantSlice from './user/userSlice';
import addressSlice from './web3/addressSlice';
import web3Slice from './web3/web3Slice';

const store = configureStore({
  reducer: {
    merchant: merchantSlice.reducer,
    account: addressSlice.reducer,
    web3: web3Slice.reducer,
  },
});

export default store;
