import { createSlice } from "@reduxjs/toolkit";

export const dateSlice = createSlice({
    name:'date',
    initialState:{
        value:''
    },
    reducers:{
        changeDate: (state,action) => {
            state.value = action.payload
        }
    }
})

export const {changeDate} = dateSlice.actions
export const getDate = (state) => state.date.value

export default dateSlice.reducer