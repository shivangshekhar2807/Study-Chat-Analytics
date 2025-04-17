import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';


const ReduxStore = configureStore({
    reducer:{Auth:AuthSlice.reducer}
})

export default ReduxStore;