import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import axios from "axios";
function parseZuluDateTime(dateTimeString, type) {
    // Create a Date object from the string, which handles the "Z" for UTC
    const dateObject = new Date(dateTimeString);
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };
    const formattedDate = dateObject.toLocaleDateString("en-US", options);
    let time = formattedDate
        .trim()
        .split(",")
        .map((x) => x.trim());
    if (type == "date") {
        return time[0];
    } else if (type == "time") {
        return time[1];
    }
}
export function Reserve({ route_id }) {
    if (route_id == null) {
        return (
            <div className="items-center">
                <NavBar pageType={"reserve"} />
                <h1 className="text-red-500 text-9xl h-[100vh] w-[90%] justify-center align-middle">
                    How the hell did you get here
                </h1>
            </div>
        );
    }
    if (!localStorage.getItem("login")) {
        return (
            <div className="items-center">
                <NavBar pageType={"reserve"} />
                <h1 className="text-red-500 text-4xl h-[100vh] w-[90%] justify-center align-middle">
                    Login to continue
                </h1>
            </div>
        );
    }
    let [info, setInfo] = useState({});
    let user_name = JSON.parse(localStorage.getItem("user_info")).user_name;
    let user_info = JSON.parse(localStorage.getItem("user_info"));
    useEffect(() => {
        let fetchrouteDet = async () => {
            if (route_id != null) {
                await axios
                    .get(`http://localhost:5000/bus/info/det/${route_id}`)
                    .then((res) => {
                        setInfo(res.data.details);
                    });
            }
        };
        fetchrouteDet();
        console.log(info);
    }, []);
    let [seats, setSeats] = useState(0);
    return (
        <div>
            <NavBar pageType={"reserve"} />
            <div className="h-[100vh] w-[100%]">
                {/* user information */}
                <div className="w-[98%] bg-slate-300 m-3 p-4 rounded-md">
                    <span>User Name : {user_name}</span> <br />
                    <span>User ID :{user_info.user_id} </span>
                </div>
                {/* route information */}
                <div className="w-[98%] bg-slate-300 m-3 p-4 rounded-md">
                    <span>Bus Name : {info.bus_id}</span> <br />
                    <span>Route ID : {info.route_id}</span> <br />
                    <span>Capacity : {info.capacity}</span> <br />
                    <span>Cost : {info.cost}</span> <br />
                    <span>Departure : {info.dep_loc}</span> <br />
                    <span>
                        Departure Time :{" "}
                        {parseZuluDateTime(info.dep_date, "date")}, {info.dep_time}
                    </span> <br/>
                    <span>
                        Arrival : {info.arv_loc}
                    </span> <br/>
                    <span>
                        Arrival Time :{" "}
                        {parseZuluDateTime(info.arv_date, "date")}, {info.arv_time}
                    </span>
                    <br />
                </div>
                <div className="w-[98%] bg-slate-300 m-3 p-4 rounded-md">
                    <span>No of seats to be reserved :</span>
                    <input
                        className="ml-8 focus:border-transparent outline-none p-1 text-center"
                        type="number"
                        onChange={(e) => {
                            setSeats(e.target.value);
                        }}
                    />
                    <button className="ml-8 bg-blue-300 pl-8 pr-8 p-2 rounded-md hover:bg-blue-400">
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}
