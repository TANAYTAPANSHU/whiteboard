import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from './components/slice/menuSlice'
import ToolboxReducer from './components/slice/toolboxSlice'

export const store = configureStore({
    reducer:{
        menu : MenuReducer,
        tool : ToolboxReducer
    }
})