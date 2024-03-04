import express, { request, response } from "express";
import { sql } from "../db/db.js";
import { dbquery } from "../db/queries.js";
import { reservation } from "../db/tables/reservation.js";
import { passengers } from "../db/tables/passenger.js";
import { passenger_res } from "../db/tables/passenger_res.js";
import { payments } from "../db/tables/payment.js";

export const reserverRoute = express.Router("/reserver");
reserverRoute.use(express.json());
reserverRoute.get("/", (request, response) => {
    return response.status(200).send({
        message: "Connection Succesfull to reserver Route",
    });
});

reserverRoute.post("/new", async (request, response) => {
    let {
        res_id,
        bus_id,
        user_id,
        res_date,
        fname,
        lname,
        seat_no,
        route_id,
        cost,
    } = request.body.data;
    console.log(request.body.data);
    await reservation.insert(res_id, bus_id, user_id, res_date);
    await passengers.insert(res_id, fname, lname, Number(seat_no));
    let passenger_id = await dbquery.getPassengerId(res_id);
    await passenger_res.insert(
        passenger_id,
        route_id,
        res_id,
        Number(seat_no),
        res_date
    ).catch((error) => {
        console.log(error);
    })
    await payments.insert(res_id, cost, true, new Date());
    return response.status(200).send({
        message: `Successfully created new reservation`,
        data: {
            res_id,
            passenger_id,
            bus_id,
            user_id,
            res_date,
            fname,
            lname,
            seat_no,
            route_id,
        },
    });
});

reserverRoute.delete("/cancel/:res_id", async (request, response) => {
    let res_id = request.params.res_id;
    await dbquery.cancelReservation(res_id);
    return response.status(200).send({
        message: `Successfully deleted reservation ${res_id}`,
    });
});
reserverRoute.get("/resseat/:req",async (request, response) => {
    let req = request.params.req;
    let [route_id, seat_no] = req.split(",");
    let bookedSeats = Array.from(await dbquery.getAllBookedSeats(route_id));
    console.log({bookedSeats})
    let available = true
    bookedSeats.forEach((seat) => {
        console.log(seat, seat_no)
        if (seat_no == seat) {
                available = false
        }
    })
    return response.status(200).send({
        message: `status of seat ${seat_no} in route ${route_id}`,
        available : available
    })
})
