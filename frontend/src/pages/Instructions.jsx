let beforeBoarding = [
    {
        "Plan your trip":
            "Know your bus stop location, departure/arrival times, and the route it takes",
    },
    {
        "Be on time":
            "Arrive at the bus stop at least 5 minutes early to avoid rushing.",
    },
    {
        "Wait safely":
            "Stand away from the curb, at least 10 feet back, and avoid playing or running around.",
    },
    {
        "Look both ways":
            "Always cross the street carefully before approaching the bus, using designated crosswalks and traffic signals.",
    },
];
let whileBoarding = [
    {
        "Queue politely":
            "Wait in line patiently and avoid pushing or shoving.",
    },
    {
        "Let others off first":
            "Allow passengers to disembark before boarding.",
    },
    {
        "Use the handrails":
            "Hold onto the handrails for balance and stability as you enter.",
    },
    {
        "Pay fare (if applicable)":
            "Have your fare ready, use the ticket machine if needed, and follow the driver's instructions for payment.",
    },
    {
        "Find a seat":
            "Look for an available seat and sit facing forward. Keep bags and belongings on your lap or under the seat.",
    },
];
let whileRiding = [
    {
        "Keep it quiet":
            "Avoid loud conversations or disruptive behavior that could distract the driver.",
    },
    {
        "Stay seated":
            "Stay in your seat throughout the journey and avoid standing or walking in the aisle while the bus is moving.",
    },
    {
        "Keep limbs inside":
            "Never extend your head, arms, or legs out of the window.",
    },
    {
        "Respect others":
            "Be mindful of other passengers and their personal space. Avoid eating or drinking on the bus unless permitted.",
    },
    {
        "Obey the driver":
            "Follow the driver's instructions and announcements for your safety and the safety of others.",
    },
];
let exiting = [
    {
        "Press the stop button (if applicable)":
            "Let the driver know you want to get off at the next stop.",
    },
    {
        "Wait for a complete stop":
            "Only attempt to get off once the bus comes to a complete stop and the doors open.",
    },
    {
        "Use the designated exit":
            "Exit the bus through the designated door and avoid using the emergency exit unless absolutely necessary.",
    },
    {
        "Move away from the bus":
            "Once you've exited, move away from the curb and avoid standing close to the bus as it pulls away.",
    },
];
let additionalTips = [
    {
        "Be aware of your surroundings":
            "Pay attention to what's happening inside and outside the bus. Report any suspicious activity to the driver.",
    },
    {
        "Carry essentials":
            "Have a valid ID, some cash, and your phone (charged) with you in case of emergencies.",
    },
    {
        "Trust your gut":
            "If you feel unsafe at any point, inform the driver and consider exiting the bus at the next safe stop.",
    },
];
/*
**Additional tips:**

* **Be aware of your surroundings:** Pay attention to what's happening inside and outside the bus. Report any suspicious activity to the driver.
* **Carry essentials:** Have a valid ID, some cash, and your phone (charged) with you in case of emergencies.
* **Trust your gut:** If you feel unsafe at any point, inform the driver and consider exiting the bus at the next safe stop.

Remember, following these guidelines can help ensure a safe and pleasant journey on the bus. Enjoy your ride!
*/

import { useState } from "react";
import { NavBar } from "../components/NavBar";
export function Instructions() {
    return (
        <div>
            <NavBar pageType={"instructions"} />
            <div>
                <div className="w-[94%] bg-gray-100 m-[3%] p-[1%] rounded-lg">
                    <h1 className="text-3xl">Before Boarding</h1>
                    <hr />
                    {/*list of boarding instructions that are list above in the comment*/}
                    <ul className="mt-[2%]">
                        {beforeBoarding.map((instruction, index) => {
                            return (
                                <li className="text-1xl">
                                    <i>{Object.keys(instruction)}</i>:{" "}
                                    {Object.values(instruction)}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="w-[94%] bg-gray-100 m-[3%] p-[1%] rounded-lg">
                    <h1 className="text-3xl">While Boarding</h1>
                    <hr />
                    {/*list of boarding instructions that are list above in the comment*/}
                    <ul className="mt-[2%]">
                        {whileBoarding.map((instruction, index) => {
                            return (
                                <li className="text-1xl">
                                    <i>{Object.keys(instruction)}</i>:{" "}
                                    {Object.values(instruction)}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="w-[94%] bg-gray-100 m-[3%] p-[1%] rounded-lg">
                    <h1 className="text-3xl">While Riding</h1>
                    <hr />
                    {/*list of boarding instructions that are list above in the comment*/}
                    <ul className="mt-[2%]">
                        {whileRiding.map((instruction, index) => {
                            return (
                                <li className="text-1xl">
                                    {" "}
                                    <i>{Object.keys(instruction)}</i>:{" "}
                                    {Object.values(instruction)}{" "}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="w-[94%] bg-gray-100 m-[3%] p-[1%] rounded-lg">
                    <h1 className="text-3xl">Exiting</h1>
                    <hr />
                    {/*list of boarding instructions that are list above in the comment*/}
                    <ul className="mt-[2%]">
                        {exiting.map((instruction, index) => {
                            return (
                                <li className="text-1xl">
                                    {" "}
                                    <i>{Object.keys(instruction)}</i>:{" "}
                                    {Object.values(instruction)}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="w-[94%] bg-gray-100 m-[3%] p-[1%] rounded-lg">
                    <h1 className="text-3xl">Additional Tips</h1>
                    <hr />
                    {/*list of boarding instructions that are list above in the comment*/}
                    <ul className="mt-[2%]">
                        {additionalTips.map((instruction, index) => {
                            return (
                                <li className="text-1xl">
                                    {" "}
                                    <i>{Object.keys(instruction)}</i> :{" "}
                                    {Object.values(instruction)}{" "}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
