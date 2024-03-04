import { Link } from "react-router-dom";
import { LoginComponent } from "./Login";
import { FaHome } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { BsTicketDetailedFill } from "react-icons/bs";
import { FaMoneyCheck } from "react-icons/fa";
import { MdManageHistory } from "react-icons/md";
function PageIcon({pageType}) {
    if(pageType == "home"){
        return (
            <FaHome />
        )
    } else if (pageType == "bookings") {
        return (
            <FaBook />
        )
    } else if (pageType == "instructions") {
        return (
            <FaInfo />
        )
    } else if(pageType == "businfo") {
        return (
            <BsTicketDetailedFill />
        )
    } else if (pageType == "reserve") {
        return (
            <FaMoneyCheck />
        )
    } else if (pageType == "profile") {
        return (
            <FaUser />
        )
   } else if (pageType == "manage") {
        return (
            <MdManageHistory />
        )    
   }
}
export function NavBar({pageType}) {
    return (
        <div className="h-[14vh] bg-blue-100 flex items-center justify-between transition-all duration-500 hover:bg-blue-300 sticky top-0 rounded-2xl m-[4px]">
            <div className="text-white text-4xl ml-[2%] justify-start flex items-start align-middle">
                    <div className="font-mono text-black">
                        <PageIcon pageType={pageType} />
                    </div>
            </div>
            <div className="font-medium text-black text-2xl flex  h-max w-[55%] justify-end mr-[2%]">
                <Link to="/">
                    <button className="font-medium p-2 pb-0 hover:border-b-4 hover:border-red-300">
                        Home
                    </button>
                </Link>
                <Link to="/bookings">
                    <button className="font-medium p-2 pb-0 hover:border-b-4 hover:border-red-300">
                        Book
                    </button>
                </Link>
                <Link to="/manage">
                    <button className="font-medium p-2 pb-0 hover:border-b-4 hover:border-red-300">
                        Manage
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
