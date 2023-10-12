import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from './components/slice/menuSlice'

export const store = configureStore({
    reducer:{
        menu : MenuReducer
    }
})