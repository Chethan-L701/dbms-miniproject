import { sql } from "../db.js";
import postgres from "postgres";

class PassegerRes {
    async init() {
        await sql`
            create table if not exists passenger_res(
                route_id serial references bus_route(route_id),
                passenger_id serial references passenger(passenger_id),
                res_id serial references reservation(res_id),
                seat_no int,
                res_date date,
                primary key(route_id, passenger_id, res_id)
            );
        `;
    }
    async getAllRecords() {
        let passenger_res = [];
        await sql`select * from passenger_res;`.then((result) => {
            result.forEach((rec) => passenger_res.push(rec));
        });
        return passenger_res;
    }
    async getPassengerResDet(id) {
        let record = {};
        try {
            await sql`select * from passenger_res where passenger_id = ${id};`.then(
                (result) => {
                    if (result.length === 0) {
                        console.log(`cannot find passenger with id: ${id}`);
                    } else {
                        record = result.at(0);
                    }
                },
            );
        } catch (error) { }
        return record;
    }
    async insert(passenger_id, route_id, res_id, seat_no, res_date) {
        try {
            console.log({
                passenger_id,
                route_id,
                res_id,
                seat_no,
                res_date
            })
            await sql`
                insert into passenger_res(route_id, passenger_id,res_id, seat_no, res_date) 
                values (${route_id},${passenger_id}, ${res_id}, ${seat_no}, ${res_date})
            `;
        } catch (error) {
            if(error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }

    async deletePassengerRes(res_id, passenger_id) {
        try {
            await sql`delete from passenger_res where passenger_id = ${passenger_id} and res_id = ${res_id};`;
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }
}
export let passenger_res = new PassegerRes();