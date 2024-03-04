import { useState } from "react";
import axios from "axios";

export function Passenger(info) {
    let [fname, setFname] = useState("");
    let [lname, setLname] = useState("");
    let [seat_no, setSeatNo] = useState("");
    let [resDone, setResDone] = useState(false);
    let res_id = Math.floor(Math.random() * 100000000);
    console.log(info.user_id);
    return (
        <div className="w-[98%] gap-2 bg-blue-200 h-[10%] p-[20px] m-4 mr-[40px] rounded-md">
            <div className="w-[98%] grid grid-cols-2 gap-2 bg-blue-200 h-[10%] p-[20px] m-4 mr-[40px] rounded-md">
                <span>First Name :</span>
                <input
                    type="text"
                    onChange={(e) => {
                        setFname(e.target.value);
                    }}
                />
                <span>Last Name :</span>
                <input
                    className=""
                    type="text"
                    onChange={(e) => {
                        setLname(e.target.value);
                    }}
                />
                <span>Seat NO:</span>
                <input
                    className=""
                    type="number"
                    onChange={(e) => {
                        setSeatNo(e.target.value);
                    }}
                />
                <br />
            </div>
            <hr />
            <div className="w-[100%] flex items-end justify-end">
                <button
                    className="bg-blue-300 pl-8 pr-8 mt-6 p-2 rounded-md hover:bg-red-400"
                    onClick={() => {
                        let data = {
                            res_id,
                            user_id: info.user_id,
                            bus_id: info.bus_id,
                            route_id: info.route_id,
                            cost: info.cost,
                            res_date: new Date(),
                            fname,
                            lname,
                            seat_no,
                        };
                        axios
                            .get(
                                `http://localhost:5000/reserve/resseat/${data.route_id},${data.seat_no}`
                            )
                            .then((respone) => {
                                if (respone.data.available) {
                                    axios
                                        .post(
                                            "http://localhost:5000/reserve/new",
                                            {
                                                data,
                                            }
                                        )
                                        .then((respone) => {
                                            console.log(respone.data);
                                        });
                                    console.log(data);
                                    setResDone(true);
                                } else {
                                    alert("Seat not available");
                                }
                            });
                    }}
                >
                    Confirm & Pay
                </button>
            </div>
            <div>
                {resDone ? (
                    <h1 className="text-center text-xl">Reservation Done</h1>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
