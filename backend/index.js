import { sql } from "./db/db.js";
import { users } from "./db/tables/users.js";
import { transportComp } from "./db/tables/transport_comp.js";
import { bus } from "./db/tables/bus.js";
import { passengers } from "./db/tables/passenger.js";
import { busRoutes } from "./db/tables/bus_route.js";
import { payments } from "./db/tables/payment.js";
import express, { json } from "express";
import cors from "cors";
import { reservation } from "./db/tables/reservation.js";

const server = express();
server.use(cors());
server.use(json());
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
