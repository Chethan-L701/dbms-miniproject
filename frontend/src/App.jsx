import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { Edit } from "./pages/Edit";
import { BookingsPage } from "./pages/Bookings";
import { RouteInfo } from "./pages/RouteInfo";
import "./App.css";
import { Instructions } from "./pages/Instructions";
import { Reserve } from "./pages/Reserve";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/bookings" element={<BookingsPage />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/profile/edit" element={<Edit />}></Route>
                <Route
                    path="/route/info"
                    element={
                        <RouteInfo
                            route_id={localStorage.getItem("route_id")}
                        />
                    }
                ></Route>
                <Route path="/instructions" element={<Instructions />}></Route>
                <Route
                    path="/reserve"
                    element={
                        <Reserve route_id={localStorage.getItem("route_id")} />
                    }
                ></Route>
            </Routes>
        </>
    );
}

export default App;
