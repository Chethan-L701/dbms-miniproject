import { Link } from "react-router-dom";
export function LoginComponent({ loginStatus }) {
    if (!loginStatus) {
        return (
            <Link to="/login">
                <button className="text-white bg-blue-400 hover:bg-red-300 p-2 pl-4 pr-4 rounded-3xl ml-6">
                    Login
                </button>
            </Link>
        );
    } 
    else {
        let userName = JSON.parse(localStorage.getItem("user_info")).user_name;
        return (
            <Link to = "/profile">
            <div className="text-white w-[100px] flex  ml-2 bg-red-300 p-2  align-top pl-2 pr-2 rounded-md">
                 {userName}
            </div>
            </Link>
        );
    }
}
