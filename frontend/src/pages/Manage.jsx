import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { ReservationDet } from "../components/ReservationDet";
import axios from "axios";
export function Manage() {
    let [bookings, setBookings] = useState([]);
    useEffect(() => {
        let info = JSON.parse(localStorage.getItem("user_info"));
        console.log(info.user_name);
        axios
            .get(`http://localhost:5000/user/res/${info.user_name}`)
            .then((res) => {
                setBookings(res.data.reservations);
            });
    }, []);
    return (
        <div>
            <NavBar pageType={"manage"} />
            <div>
                {bookings.map((reservation) => {
                    return <ReservationDet  resData={reservation} key={reservation.res_id}/>;
                })}
            </div>
        </div>
    );
}
