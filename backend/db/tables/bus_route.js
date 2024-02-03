import { sql } from "../db.js";
import postgres from "postgres";

class BusRoute {
    async init() {
        await sql`
            create table bus_route(
                route_id serial primary key,
                bus_id varchar(10) references bus(bus_id),
                dep_date date,
                cost int,
                dep_loc varchar(20),
                dep_time time,
                arv_loc varchar(20),
                arv_time time,
                arv_date date
            );
        `;
    }
    async getAllRecords() {
        let bus_routes = [];
        await sql`select * from bus_route;`.then((result) => {
            result.forEach((rec) => bus_routes.push(rec));
        });
        return bus_routes;
    }
    async insert(
        bus_id,
        cost,
        dep_loc,
        dep_date,
        dep_time,
        arv_loc,
        arv_date,
        arv_time,
    ) {
        try {
            await sql`
                    insert into bus_route(bus_id, cost, dep_loc, dep_date, dep_time, arv_loc, arv_date, arv_time) 
                    values (${bus_id}, ${cost}, ${dep_loc}, ${dep_date}, ${dep_time}, ${arv_loc}, ${arv_date}, ${arv_time});
            `;
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }

    async deleteRoute(route_id) {
        try {
            await sql`delete from bus_route where route_id = ${route_id};`;
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }

    async getRouteDetails(id) {
        let record = {};
        try {
            await sql`select * from bus_route where route_id = ${id};`.then(
                (result) => {
                    if (result.length === 0) {
                        console.log(`cannot find route with id: ${id}`);
                    } else {
                        record = result.at(0);
                    }
                },
            );
        } catch (error) { }
        return record;
    }
}

export let busRoutes = new BusRoute();
