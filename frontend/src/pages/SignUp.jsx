import { NavBar } from "../components/NavBar";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import signup_img from "../assets/signup.jpeg";

export function SignUp() {
    const navigate = useNavigate();
    let [fname, setFName] = useState("");
    let [lname, setLName] = useState("");
    let [email, setEmail] = useState("");
    let [phone, setPhone] = useState(0);
    let [user_name, setUserName] = useState("");
    let [password, setPassword] = useState("");
    //<img src={signup_img} alt="" className="w-[100%] h-[100vh]" />
    return (
        <div className="relative">
            <div className="h-[100vh] w-[100%]  fixed top-0">
            </div>
            <NavBar pageName={"SignUp"} />
            <div className="flex items-center justify-center absolute left-[30%] w-[40%] bg-[#555555] bg-opacity-50  rounded-3xl text-white mt-[78px] pl-[24px] pr-[24px]">
                <div className="m-[2%] text-2xl w-[100%] align-middle justify-center p-4">
                    <p>First Name : </p>
                    <input
                        type="text"
                        placeholder="First Name"
                        className="mx-[4%] border-black border-2 p-[2%] rounded-3xl mb-4 text-black"
                        onChange={(e) => {
                            setFName(e.target.value);
                        }}
                    />
                    <p>Last Name :</p>
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="mx-[4%] border-black border-2 p-[2%] rounded-3xl mb-4 text-black"
                        onChange={(e) => {
                            setLName(e.target.value);
                        }}
                    />
                    <p>User Name :</p>
                    <input
                        type="text"
                        placeholder="User Name"
                        className="mx-[4%] border-black border-2 p-[2%] rounded-3xl mb-4 text-black"
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />
                    <p>Email :</p>
                    <input
                        type="email"
                        placeholder="Email Id"
                        className="mx-[4%] border-black border-2 p-[2%] rounded-3xl mb-4 text-black"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <p>Phone :</p>
                    <input
                        type="number"
                        placeholder="Phone Number"
                        className="mx-[4%] border-black border-2 p-[2%] rounded-3xl mb-4 text-black"
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    />

                    <p>Password :</p>
                    <input
                        type="password"
                        placeholder="Password"
                        className="mx-[4%] border-black border-2 p-[2%] rounded-3xl mb-4 text-black"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <button
                    className="text-3xl bg-blue-300 hover:bg-blue-500 m-8 p-2 pl-6 pr-4 ml-[2%] rounded-3xl"
                    onClick={async (e) => {
                        try {
                            let userdata = {
                                FirstName: fname,
                                LastName: lname,
                                Email: email,
                                Mobile: phone,
                                UserID: user_name,
                                Password: password,
                            };
                            console.log(userdata);
                        } catch (error) { }
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
