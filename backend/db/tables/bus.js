import { sql } from "../db.js";
import postgres from "postgres";

class Bus {
    async init() {
        await sql`create table if not exists bus(
            bus_id varchar(10) primary key,
            capacity int,
            comp_id serial references transport_comp(comp_id)
        );`;
    }
    async getAllBuses() {
        let buses = [];
        await sql`select * from bus;`.then((result) => {
            result.forEach((rec) => buses.push(rec));
        });
        return buses;
    }
    async getBusCapacity(id) {
        let capacity = 0;
        await sql`select capacity from bus where bus_id = ${id};`.then(
            (result) => (capacity = result.at(0).capacity),
        );
        return capacity;
    }
    async insert(id, capacity, comp_id) {
        try {
            await sql`insert into bus(bus_id, capacity, comp_id)
                    values(${id}, ${capacity}, ${comp_id});`;
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }
    async updateCapacity(id, capacity) {
        try {
            await sql`update transport_comp set capacity = ${capacity} where bus_id = ${id};`;
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }
}

export let bus = new Bus();
