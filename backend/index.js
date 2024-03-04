import express, { json, request, response } from "express";
import { reserverRoute } from "./routes/reserverRoute.js";
import cors from "cors";

import { userRoute } from "./routes/userRoute.js";
import { busRoute } from "./routes/busRoute.js";
const server = express();
server.use(cors());
server.use(json());
server.use("/user", userRoute);
server.use("/bus", busRoute);
server.use("/reserve", reserverRoute);
server.get("/", (request, response) => {
    return response.status(200).send({
        message: "connection to the server established succesfully.",
    });
});

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
