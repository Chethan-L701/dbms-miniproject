import { useState } from "react";
import {Routes , Route} from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
        </>
    );
}

export default App;
