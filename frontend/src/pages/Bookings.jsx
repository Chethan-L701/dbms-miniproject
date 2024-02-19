import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { SearchBar } from "../components/SearchBar";
import { RouteSum } from "../components/RouteSum";
import axios from "axios";
export function BookingsPage() {
    const [serchReasult, setSearchResult] = useState([]);
    useEffect(() => {
        let fetchroute = async () => {
            if (localStorage.getItem("from-to") != null) {
                let from_to = JSON.parse(localStorage.getItem("from-to"));
                if (from_to.from == "" && from_to.to == "") {
                    setSearchResult([]);
                } else if (from_to.from != "" && from_to.to == "") {
                    await axios
                        .get(`http://localhost:5000/bus/dep/${from_to.from}`)
                        .then((res) => {
                            setSearchResult(res.data.routes);
                        });
                } else if (from_to.from == "" && from_to.to != "") {
                    await axios
                        .get(`http://localhost:5000/bus/dest/${from_to.to}`)
                        .then((res) => {
                            setSearchResult(res.data.routes);
                        });
                } else if (from_to.from != "" && from_to.to != "") {
                    await axios
                        .get(
                            `http://localhost:5000/bus/${from_to.from}/${from_to.to}`
                        )
                        .then((res) => {
                            setSearchResult(res.data.routes);
                        });
                }
            }
        };
        fetchroute();
        console.log(serchReasult);
    }, []);
    return (
        <>
            <NavBar pageType={"bookings"}/>
            <div className="justify-start w-[40%] pt-[2%]">
                <SearchBar />
            </div>
            <div className="w-full">
                {serchReasult.map((res) => {
                    return <RouteSum routeInfo={res} key={res.route_id} />;
                })}
            </div>
        </>
    );
}
