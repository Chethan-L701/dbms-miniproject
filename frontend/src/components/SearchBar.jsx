import { MdDepartureBoard } from "react-icons/md";
import { BsBusFront } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export function SearchBar() {
    const [fromCity, setFromCity] = useState("");
    const [toCity, setToCity] = useState("");
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between max-w-2xl mx-auto p-4 rounded-lg bg-gray-100 shadow-md">
            <div className="flex items-center space-x-4">
                <div className="flex items-center bg-white rounded-full px-3 py-2 border border-gray-300 focus-within:border-blue-500">
                    <MdDepartureBoard className="h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder={
                            localStorage.getItem("from-to") == null
                                ? "From"
                                : ((JSON.parse(localStorage.getItem("from-to"))
                                      .from == "") ? "From" : JSON.parse(localStorage.getItem("from-to")).from)
                        }
                        className="focus:outline-none bg-transparent pl-3"
                        value={fromCity}
                        onChange={(e) => setFromCity(e.target.value)}
                    />
                </div>
                <div className="flex items-center bg-white rounded-full px-3 py-2 border border-gray-300 focus-within:border-blue-500">
                    <BsBusFront className="h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder={
                            localStorage.getItem("from-to") == null
                                ? "To"
                                : ((JSON.parse(localStorage.getItem("from-to"))
                                      .to == "") ? "To" : JSON.parse(localStorage.getItem("from-to")).to)
                        }
                        className="focus:outline-none bg-transparent pl-3"
                        value={toCity}
                        onChange={(e) => setToCity(e.target.value)}
                    />
                </div>
            </div>
            <button
                type="button"
                onClick={() => {
                    localStorage.setItem(
                        "from-to",
                        JSON.stringify({
                            from: fromCity,
                            to: toCity,
                        })
                    );
                    navigate("/bookings");
                    window.location.reload();
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none ml-14"
            >
                <FaSearch className="h-5 w-5 mr-2" />
                Search
            </button>
        </div>
    );
}
