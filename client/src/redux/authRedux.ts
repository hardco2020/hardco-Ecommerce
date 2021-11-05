import { createSlice,PayloadAction } from '@reduxjs/toolkit'


interface UserState {
    currentUser: string | null;
    isFetching: boolean;
    error: boolean;
}

const initialState:UserState = {
    currentUser: null,
    isFetching: false,
    error: false,
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        loginStart:(state)=> {
            state.isFetching=true
        },
        loginSuccess:(state,action)=> {
            state.isFetching = false
            state.currentUser = action.payload
        },
        loginFaliure:(state)=> {
            state.isFetching = false
            state.error = true
        },
    }
})

export const  { loginStart, loginSuccess, loginFaliure } = userSlice.actions

export default userSlice.reducer;