import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from "./components/SignUp";
import Schedule from "./components/Schedule";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import UserForms from "./components/UserForms";

export default function App() {
    const [userStatus, setUserStatus] = useState({username: null, userId: 0});

    const login = (username, userId) =>{
        setUserStatus({...userStatus, username: username, userId: userId})
    };

    const logout = () => {
        // "token" must match the name used in "/Login" route
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        setUserStatus((userStatus) => ({ ...userStatus, username: null, userId: 0}));
    };

    return (
        <BrowserRouter>
            <NavBar userStatus={userStatus} logout={logout}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/forms" element={<UserForms userStatus={userStatus} login={login} />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/schedule" element={<Schedule />} />

                {/* <Route path="/login" element={userStatus.user ? (<Navigate to="/" />) : (<LogIn userStatus={userStatus} test={3} />)}/> */}
            </Routes>
        </BrowserRouter>
    );
}

