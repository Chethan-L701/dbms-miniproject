import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
/*
Example json that is returned from the server
{
    "comp_name":"Speedy Pvt Ltd",
    "comp_id":363,
    "comp_address":"789 Cargo Lane, Bangalore, Karnataka, 560001",
    "comp_contact":"7654321098",
    "bus_id":"KA73CA2656",
    "capacity":50,
    "route_id":297,
    "cost":450,
    "dep_loc":"Bangalore",
    "dep_date":"2024-02-03T00:00:00.000Z",
    "dep_time":"06:30:00",
    "arv_loc":"Ahmedabad",
    "arv_date":"2024-02-05T00:00:00.000Z",
    "arv_time":"21:30:00","nbooks":0
}
*/
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
export function RouteInfo({ route_id }) {
    if (route_id == null) {
        return (
            <div className="h-[100vh] w-[100%]">
                <NavBar pageType={"businfo"} />
                <div className="h-[100vh] w-[100%] flex justify-center items-center">
                    <h1 className="text-red-500 text-8xl align-middle justify-center">
                        Route Not Found
                    </h1>
                </div>
            </div>
        );
    }

    //comp_name, comp_id, comp_address, comp_contact, bus_id , capacity, route_id , cost, dep_loc, dep_date, dep_time, arv_loc, arv_date, arv_time, nbooks
    const navigate= useNavigate();
    let [info, setInfo] = useState({});
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
    }, []);
    return (
        <div>
            <NavBar pageType={"businfo"} />
            <div className="h-[100vh] ml-[3%] w-[94%]">
                {
                    //display comp info
                }
                <div className="w-[100%] bg-slate-300 m-3 p-4 rounded-md">
                    <h1 className="text-3xl">
                        {info.comp_name} |{" "}
                        <span className="font-mono">{info.comp_id}</span>
                    </h1>
                    <hr />
                    <div className="pt-6">
                        <span className="pt-[2%]">
                            Addres : {info.comp_address}
                        </span>{" "}
                        <br />
                        <span className="pt-[2%]">
                            Contact : {info.comp_contact}
                        </span>
                    </div>
                </div>
                <div className="w-[100%] bg-slate-300 m-3 p-4 rounded-md">
                    {
                        //display bus info
                    }
                    <h1 className="text-3xl">
                        {info.bus_id} |{" "}
                        <span className="font-mono">{info.route_id}</span>
                    </h1>
                    <hr />
                    <div className="pt-6">
                        <span className="pt-[2%]">
                            Capacity : {info.capacity}
                        </span>{" "}
                        <br />
                        <span className="pt-[2%]">Cost : {info.cost}</span>
                    </div>
                </div>
                <div className="w-[100%] bg-slate-300 m-3 p-4 rounded-md">
                    {
                        //display route info
                    }
                    <h1 className="text-3xl">Route Info</h1>
                    <hr />
                    <div className="pt-6">
                        <span className="pt-[2%]">
                            Departure Location : {info.dep_loc}
                        </span>{" "}
                        <br />
                        <span className="pt-[2%]">
                            Arrival Location : {info.arv_loc}
                        </span>{" "}
                        <br />
                        <span className="pt-[2%]">
                            Departure :{" "}
                            {parseZuluDateTime(info.dep_date, "date") +
                                ", " +
                                info.dep_time +
                                " IST"}
                        </span>{" "}
                        <br />
                        <span className="pt-[2%]">
                            Arrival :{" "}
                            {parseZuluDateTime(info.arv_date, "date") +
                                ", " +
                                info.arv_time +
                                " IST"}
                        </span>
                    </div>
                </div>
                <div className="w-[100%] bg-slate-300 m-3 p-4 rounded-md flex justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={
                        () => {
                            navigate("/reserve");
                            window.location.reload();
                        }
                    }
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}
