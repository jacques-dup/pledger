import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import itemReducer from '../features/item/itemSlice';
import pledgeReducer from '../features/pledge/pledgeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemReducer,
    pledges: pledgeReducer,
  },
});
