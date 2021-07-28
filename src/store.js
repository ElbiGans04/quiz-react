import { configureStore } from '@reduxjs/toolkit';
import questions from './features/questions/questionsSlice'


const store = configureStore({
    reducer: {
        questions,
    }
});


export default store;