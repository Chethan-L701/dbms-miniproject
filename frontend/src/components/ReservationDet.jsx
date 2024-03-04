import { useState } from "react";
import { MdPlace } from "react-icons/md";
import { MdOutlinePlace } from "react-icons/md";
import axios from "axios";
import {useNavigate} from "react-router-dom";
/*
{
    "seat_no" : 0,
    "route_id" : 1,
    "res_id":49579407,
    "bus_id":"DL86KM7559",
    "payment_id":10,
    "res_date":"2024-03-04T00:00:00.000Z",
    "pmt_date":"2024-03-04T00:00:00.000Z",
    "fname":"Chethan",
    "lname":"L",
    "dep_loc":"Delhi",
    "dep_date":"2024-03-14T00:00:00.000Z",
    "dep_time":"01:00:00",
    "arv_loc":"Mumbai",
    "arv_date":"2024-03-16T00:00:00.000Z",
    "arv_time":"17:40:00",
    "amount":1750,
    "pmt_status":true
} */

function parseZuluDateTime(dateTimeString, type) {
    // Create a Date object from the string, which handles the "Z" for UTC
    const dateObject = new Date(dateTimeString);
    const navigate = useNavigate()
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
export function ReservationDet(resData) {
    let data = resData.resData;
    return (
        <>
            <div className="bg-red-200 m-4 p-8 shadow-lg w-[98%] rounded-lg">
                <div className="flex justify-between pb-6">
                    <div className="align-start font-mono">
                        {data.bus_id} | res id: {data.res_id} | passenger name:{" "}
                        {data.fname} {data.lname} | route_id : {data.route_id} | seat no : {data.seat_no}{" "}
                    </div>
                </div>
                <hr />
                <div className="flex justify-between">
                    <div className="pt-6 justify-center align-start flex text-xl">
                        <div className="justify-center align-middle items-stretch border-r-2 border-r-blue-300 pr-[3%] w-[500px]">
                            <div className="grid grid-cols-3 gap-0">
                                <span className="ml-0 justify-items-start flex align-middle items-center">
                                    <MdOutlinePlace className="p-0 mb-[-2px]" />{" "}
                                    From
                                </span>
                                <span>:</span>
                                {data.dep_loc}
                            </div>
                            <div className="grid grid-cols-3">
                                <span className="ml-0 justify-items-start flex items-center">
                                    <MdPlace />
                                    {" To"}
                                </span>
                                <span>:</span>
                                {data.arv_loc}
                            </div>
                        </div>
                        <div className="ml-10 justify-center align-middle border-r-2 border-r-blue-300 pr-[3%] w-[700px]">
                            <div className="grid  grid-cols-3">
                                <span className="ml-0 justify-items-start">
                                    Departure
                                </span>
                                <span>:</span>{" "}
                                {parseZuluDateTime(data.dep_date, "date") +
                                    ", " +
                                    data.dep_time +
                                    " IST"}
                            </div>
                            <div className="grid grid-cols-3">
                                <span className="ml-0 justify-items-start">
                                    Arrival
                                </span>
                                <span>:</span>{" "}
                                {parseZuluDateTime(data.arv_date, "date") +
                                    ", " +
                                    data.arv_time +
                                    " IST"}
                            </div>
                        </div>
                    </div>
                    <div className="text-3xl justify-center align-middle h-full mt-[2.5%] mr-[2%]  flex items-center">
                        <button className="bg-red-400 font-mono text-white rounded-xl p-[8px] hover:bg-red-500"
                            onClick={
                                () => {
                                    let confirmation = confirm("Are you sure , you want to cancel?");
                                    if(confirmation){
                                        axios.delete(`http://localhost:5000/reserve/cancel/${data.res_id}`);
                                        navigate("/manage")
                                    } else {
                                        alert("cancelation cancelled");
                                    }
                                    // axios.delete(`http://localhost:5000/reserve/cancel/${data.res_id}`);
                                }
                            }
                        >
                            cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
