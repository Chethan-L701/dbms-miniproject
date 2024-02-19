import { NavBar } from "../components/NavBar";
import { CiEdit } from "react-icons/ci";
import { BiUser } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Profile() {
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem("user_info"));
    console.log(user);
    return (
        <div className="h-full w-full flex-col relative align-middle justify-center">
            {/* <div className="h-[100vh] w-[100%]  fixed top-0">
                <img src={home_img} alt="" className="w-[100%] h-[100vh]" />
            </div> */}
            <NavBar pageType={"profile"}/>
            <div className="w-[60%] bg-gray-800 absolute ml-[5%] mt  bg-opacity-70 left-[20%] flex p-[5%] mt-[7%]">
                <div className="w-[60%]">
                    <div className="text-white text-5xl font-bold pl-8 pr-10 h-[10%] w-[60%] flex gap-4">
                        <BiUser /> {user.user_name}
                    </div>
                    <div className="text-2xl text-gray-300 mt-[2%] flex-col p-[3%]">
                        <section className="font-bold p-4">
                            Name :{" "}
                            <span className="underline italic">
                                {user.fname + " " + user.lname}
                            </span>
                        </section>
                        <section className="font-bold p-4">
                            Email :{" "}
                            <span className="underline italic">
                                {user.email}
                            </span>
                        </section>
                        <section className="font-bold p-4">
                            Mobile :{" "}
                            <span className="underline italic">
                                {user.phone}
                            </span>
                        </section>
                    </div>
                </div>
                <div className="flex-col w-[40%] bg-gray-700 bg-opacity-50">
                    <Link to="/profile/edit">
                        <button className=" text-xl bg-blue-300 flex gap-4 p-2 px-8 rounded-2xl ml-[30%] mt-[17%] hover:bg-blue-500">
                            <CiEdit />
                            Edit
                        </button>
                    </Link>
                    <button
                        className=" text-xl bg-green-300 flex gap-4 p-2 px-4 rounded-2xl ml-[30%] mt-[5%] hover:bg-green-500"
                        onClick={(e) => {
                            localStorage.removeItem("login");
                            localStorage.removeItem("user_info");
                            alert("you have loged out");
                            navigate("/");
                        }}
                    >
                        <CiLogout />
                        Logout
                    </button>
                    <button
                        className=" text-xl bg-red-300 flex gap-4 p-2 px-[18px] rounded-2xl ml-[30%] mt-[5%] hover:bg-red-500"
                        onClick={async (e) => {
                            try {
                                await axios
                                    .delete(
                                        `http://localhost:5000/user/delete/${user.user_name}`
                                    )
                                    .then((response) => {
                                        if (response.status == 200) {
                                            alert("account deleted forever)");
                                            localStorage.removeItem("login");
                                            localStorage.removeItem(
                                                "user_info"
                                            );
                                            navigate("/");
                                        } else if (response.status == 402) {
                                            alert(
                                                "could not find the user account"
                                            );
                                        }
                                    })
                                    .catch((error) => {
                                        console.log("error : ", error);
                                    });
                            } catch (error) {
                                console.log("error : ", error);
                            }
                        }}
                    >
                        <MdDeleteForever />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}