import { configureStore } from '@reduxjs/toolkit';

import counterSlice from './counter';
import authSlice from './auth';

// 여러개의 리듀서를 병합해 스토어 생성
const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
  },
});

export default store;
