import { createSlice } from "@reduxjs/toolkit";
// import { userApiSlice } from "../../api/userApiSlice";

const initialState = {
    userInfo: localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')) : null,
}
/*
This api slice handle the credientials and logout
*/
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        setCredentials : (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
            const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000
            localStorage.setItem("expirationTime", expirationTime) 
        },

        logout : (state) => {
            state.userInfo = null
            localStorage.clear()
        },
    },
})

export const {setCredentials, logout} = authSlice.actions
export default authSlice.reducer