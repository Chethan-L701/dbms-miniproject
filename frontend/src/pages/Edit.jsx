import { NavBar } from "../components/NavBar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BiUser } from "react-icons/bi";

export function Edit() {
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem("user_info"));
    let [fname, setFName] = useState("");
    let [lname, setLName] = useState("");
    let [email, setEmail] = useState("");
    let [phone, setPhone] = useState(0);
    return (
        <div className="h-full w-full flex-col relative align-middle justify-center">
            {/* <div className="h-[100vh] w-[100%]  fixed top-0">
                <img src={home_img} alt="" className="w-[100%] h-[100vh]" />
            </div> */}
            <NavBar pageName={"Profile"} />
            <div className="w-[70%] bg-gray-800 absolute mt-[2%]  bg-opacity-70 left-[20%] flex p-[3%] ">
                <div className="w-[60%]">
                    <div className="text-white text-4xl font-bold pl-8 pr-10 h-[10%] w-[60%] flex gap-4">
                        <BiUser /> {user.user_name}
                    </div>
                    <div className="text-2xl text-gray-300 mt-[2%] flex-col p-[2%]">
                        <section className="font-bold p-4">
                            First Name : <br />
                            <input
                                type="text"
                                placeholder={user.fname}
                                className="border-black w-[90%] border-2 p-[2%] rounded-3xl mb-2 text-black"
                                onChange={(e) => {
                                    setFName(e.target.value);
                                }}
                            />
                        </section>
                        <section className="font-bold p-4">
                            Last Name : <br />
                            <input
                                type="text"
                                placeholder={user.lname}
                                className=" border-black w-[90%] border-2 p-[2%] rounded-3xl mb-2 text-black"
                                onChange={(e) => {
                                    setLName(e.target.value);
                                }}
                            />
                        </section>
                        <section className="font-bold p-4">
                            Email : <br />
                            <input
                                type="text"
                                placeholder={user.email}
                                className="border-black w-[90%] border-2 p-[2%] rounded-3xl mb-2 text-black"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </section>
                        <section className="font-bold p-4">
                            Mobile : <br />
                            <input
                                type="text"
                                placeholder={user.phone}
                                className="border-black w-[90%] border-2 p-[2%] rounded-3xl mb-2 text-black"
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                            />
                        </section>
                    </div>
                </div>
                <div className="flex w-[40%] bg-opacity-50 align-middle justify-center items-center">
                    <div className="flex-col w-[60%] h-[40%] bg-gray-500 bg-opacity-50 rounded-2xl">
                        <button
                            className=" text-xl bg-blue-300 gap-4 p-2 px-8 rounded-2xl ml-[30%] mt-[20%] hover:bg-blue-500"
                            onClick={(e) => {
                                let id = user.user_name;
                                axios
                                    .put(
                                        `http://localhost:5000/user/update/${id}`,
                                        {
                                            fname: fname,
                                            lname: lname,
                                            email: email,
                                            phone: phone,
                                            username: user.user_name,
                                            password: user.password,
                                        }
                                    )
                                    .then((response) => {
                                        if (response.status == 200) {
                                            localStorage.setItem(
                                                "user_info",
                                                JSON.stringify({
                                                    user_name: user.user_name,
                                                    fname: fname,
                                                    lname: lname,
                                                    email: email,
                                                    phone: phone,
                                                    password: user.password,
                                                })
                                            );
                                            alert(
                                                "profile updated succesfully"
                                            );
                                            navigate("/profile");
                                            window.location.reload();
                                        }
                                    })
                                    .catch((error) => {
                                        alert("Fill all the fields");
                                    });
                            }}
                        >
                            Save
                        </button>
                        <Link to="/profile">
                            <button className=" text-xl bg-green-300 gap-4 p-2 px-6 rounded-2xl ml-[30%] mt-[10%] hover:bg-green-500">
                                Cancel
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
