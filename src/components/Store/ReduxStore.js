import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import StudySlice from './StudySlice';


const ReduxStore = configureStore({
    reducer:{Auth:AuthSlice.reducer,Study:StudySlice.reducer}
})

export default ReduxStore;