import { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlinePlace } from "react-icons/md";
import { MdPlace } from "react-icons/md";
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
export function RouteSum({ routeInfo }) {
    const navigate = useNavigate();
    //comp_id, comp_name,bus_id,dep_loc,dep_date,dep_time, arv_loc, arv_date, arv_time
    return (
        <>
            <div className="bg-red-200 m-4 p-8 shadow-lg w-[98%] rounded-lg">
                <div className="flex justify-between pb-6">
                    <div className="align-start font-mono">
                        {routeInfo.bus_id} | id : {routeInfo.route_id}{" "}
                    </div>
                    <div className="align-end">{routeInfo.comp_name}</div>
                </div>
                <hr />
                <div className="flex justify-between">
                    <div className="pt-6 justify-center align-start flex text-xl">
                        <div className="justify-center align-middle items-stretch border-r-2 border-r-blue-300 pr-[3%] w-[400px]">
                            <div className="grid grid-cols-3 gap-0">
                                <span className="ml-0 justify-items-start flex align-middle items-center">
                                    <MdOutlinePlace className="p-0 mb-[-2px]" />{" "}
                                    From
                                </span>
                                <span>:</span>
                                {routeInfo.dep_loc}
                            </div>
                            <div className="grid grid-cols-3">
                                <span className="ml-0 justify-items-start flex items-center">
                                    <MdPlace />
                                    {" To"}
                                </span>
                                <span>:</span>
                                {routeInfo.arv_loc}
                            </div>
                        </div>
                        <div className="ml-10 justify-center align-middle border-r-2 border-r-blue-300 pr-[3%] w-[700px]">
                            <div className="grid  grid-cols-3">
                                <span className="ml-0 justify-items-start">
                                    Departure
                                </span>
                                <span>:</span>{" "}
                                {parseZuluDateTime(routeInfo.dep_date, "date") +
                                    ", " +
                                    routeInfo.dep_time +
                                    " IST"}
                            </div>
                            <div className="grid grid-cols-3">
                                <span className="ml-0 justify-items-start">
                                    Arrival
                                </span>
                                <span>:</span>{" "}
                                {parseZuluDateTime(routeInfo.arv_date, "date") +
                                    ", " +
                                    routeInfo.arv_time +
                                    " IST"}
                            </div>
                        </div>
                    </div>
                    <div className="text-3xl align-bottom h-full mt-[2.5%] flex items-center">
                        <span className="">
                            <FaRupeeSign />
                        </span>{" "}
                        <b>{routeInfo.cost + " /-"}</b>
                    </div>
                    <div className="align-end justify-center">
                        <button
                            className="border-2 border-transparent bg-blue-300 rounded-2xl text-lg  m-4 p-4 hover:bg-blue-500"
                            onClick={() => {
                                localStorage.removeItem("route_id");
                                localStorage.setItem(
                                    "route_id",
                                    routeInfo.route_id
                                );
                                navigate("/route/info");
                                window.location.reload();
                            }}
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
