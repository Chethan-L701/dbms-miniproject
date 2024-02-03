import { sql } from "../db.js";
import postgres from "postgres";

class Passenger {
    async init() {
        await sql`
            create table if not exists passenger(
                passenger_id serial primary key,
                res_id serial references reservation(res_id),
                seat_no int,
                FName varchar(25),
                LName varchar(25)
            );
        `;
    }
    async insert(res_id, fname, lname, seat_no) {
        try {
            await sql`
                insert into passenger(res_id, seat_no, fname, lname) 
                values (${res_id}, ${seat_no}, ${fname}, ${lname});
            `;
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }
    async getAllRecords() {
        let passengers = [];
        await sql`select * from passenger;`.then((result) => {
            result.forEach((rec) => passengers.push(rec));
        });
        return passengers;
    }
    async getPassengerByID(id) {
        let record = {};
        try {
            await sql`select * from passenger where passenger_id = ${id};`.then(
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
    async updateSeatNo(id, seat_no) {
        await sql`
            update passenger
            set seat_no = ${seat_no}
            where passenger_id = ${id};
        `;
    }
    async deletePassenger(id) {
        try {
            await sql`delete from passenger where passenger_id = ${id};`;
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }
}

export let passengers = new Passenger();
