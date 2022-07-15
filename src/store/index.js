import { configureStore } from "@reduxjs/toolkit";
import companies from './companiesSlice';


const store = configureStore({
    reducer: {companies},
    devTools: process.env.NODE_ENV !== 'production',
})


export default store;