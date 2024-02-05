import { Link } from "react-router-dom";
import { LoginComponent } from "./Login";
export function NavBar() {
    return (
        <div className="h-[14vh] bg-blue-100 flex items-center justify-end transition-all duration-500 hover:bg-blue-300 sticky top-0 rounded-2xl m-[4px]">
            <div className="font-medium text-white text-2xl flex  h-max w-[55%] justify-end mr-[2%]">
                <Link to="/">
                    <button className="font-medium p-2 pb-0 hover:border-b-4 hover:border-red-300">
                        Home
                    </button>
                </Link>
                <Link to="/bookings">
                    <button className="font-medium p-2 pb-0 hover:border-b-4 hover:border-red-300">
                        Book & Manage
                    </button>
                </Link>
                <Link to="/flights">
                    <button className="font-medium p-2 pb-0 hover:border-b-4 hover:border-red-300">
                        Where We Fly
                    </button>
                </Link>
                <Link to="/instructions">
                    <button className="font-medium p-2 pb-0 hover:border-b-4 hover:border-red-300">
                        Guidelines
                    </button>
                </Link>
                <LoginComponent loginStatus={localStorage.getItem("login")} />
            </div>
        </div>
    );
}
