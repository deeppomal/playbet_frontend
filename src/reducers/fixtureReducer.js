import { createSlice } from "@reduxjs/toolkit";

export const fixtureSlice = createSlice({
    name:'fixture',
    initialState:{
        value:[]
    },
    reducers:{
        changeFixture: (state,action) => {
            state.value = action.payload
        }
    }
})

export const {changeFixture} = fixtureSlice.actions
export const getFixture = (state) => state.fixture.value

export default fixtureSlice.reducer