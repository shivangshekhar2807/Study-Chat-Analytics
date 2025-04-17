import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("Usertoken") || "";
const initialEmail = localStorage.getItem("Useremail") || "";
const isUserLoggedIn = !!initialToken;

const AuthSlice = createSlice({
    name: 'User',
    initialState: { token: initialToken, email:initialEmail,isloggedIn: isUserLoggedIn },
    
    reducers: {
        logginHandler(state,action) {
            state.token = action.payload.token;
             state.email = action.payload.email;
            state.isloggedIn = true;
             localStorage.setItem("Useremail", action.payload.email);
             localStorage.setItem("Usertoken", action.payload.token);
        },
        logoutHandler(state) {
            state.token = '';
            state.email = '';
            state.isloggedIn = false;

            localStorage.removeItem("Usertoken");
            localStorage.removeItem("Useremail");
                
        }
    }
})

export const AuthAction = AuthSlice.actions;

export default AuthSlice;