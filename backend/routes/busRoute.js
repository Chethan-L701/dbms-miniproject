import express from "express";
import { dbquery } from "../db/queries.js";

export const busRoute = express.Router("/bus");
busRoute.use(express.json());

busRoute.get("/dest/:destination", async (request, response) => {
    let dest = request.params.destination;
    let res = await dbquery.getRouteByArv(dest);
    return response.status(200).send({
        message: `Fetched Routes to location ${dest}`,
        routes: res,
    });
});

busRoute.get("/dep/:departure", async (request, response) => {
    let dep = request.params.departure;
    let routes = await dbquery.getRouteByDep(dep);
    return response.status(200).send({
        message: `Fetched Routes from location ${dep}`,
        routes: routes,
    });
});

busRoute.get("/:departure/:destination", async (request, response) => {
    let dep = request.params.departure;
    let dest = request.params.destination;
    let routes = await dbquery.getRouteByLoc(dep, dest);
    return response.status(200).send({
        message: `Fetched Routes from ${dep} to ${dest}`,
        routes: routes,
    });
});
busRoute.get("/info/det/:routeid", async (request, response) => {
    let routeid = request.params.routeid;
    let details = await dbquery.getDetailsOnRoute(routeid);
    return response.status(200).send({
        message: `Fetched details of ${routeid}`,
        details: details,
    });
});
