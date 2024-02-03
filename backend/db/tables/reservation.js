import { sql } from "../db.js";
import postgres from "postgres";

class Reservation {
    async init() {
        await sql`
            create table reservation(
                res_id serial primary key,
                bus_id varchar(10) references bus(bus_id),
                user_id serial references users(user_id),
                res_date date
            );
        `;
    }
    async getAllRecords() {
        let users = [];
        await sql`select * from users;`.then((result) => {
            result.forEach((rec) => users.push(rec));
        });
        return users;
    }
    async insert(bus_id, user_id, date) {
        try {
            await sql`
                insert into reservation(bus_id, user_id, res_date)
                values (${bus_id}, ${user_id}, ${date});
            `;
        } catch (error) { }
    }
    async deleteReservation(id) {
        await sql`
            delete from reservation where res_id = ${id};
        `;
    }
}

export let reservation = new Reservation();
