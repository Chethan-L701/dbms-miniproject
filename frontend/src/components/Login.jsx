import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
export function LoginComponent({ loginStatus }) {
    if (!loginStatus) {
        return (
            <Link to="/login">
                <button className="text-white bg-blue-400 hover:bg-red-300 p-2 pl-4 pr-4 rounded-3xl ml-6">
                    Login
                </button>
            </Link>
        );
    } else {
        let userName = JSON.parse(localStorage.getItem("user_info")).UserName;
        return (
            <div >

            </div>
        );
    }
}