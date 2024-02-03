import { sql } from "../db.js";
import postgres from "postgres";
class TransportComp {
    async init() {
        await sql`create table not exists  transport_comp(
            comp_id serial primary key,
            comp_name varchar(20),
            comp_address varchar(50),
            comp_contact bigint
        );`;
    }
    async getAllRecords() {
        let trans_comp = [];
        await sql`select * from transport_comp;`.then((result) => {
            result.forEach((rec) => trans_comp.push(rec));
        });
        return trans_comp;
    }
    async insert(name, address, contact) {
        try {
            await sql`insert into transport_comp(comp_name, comp_address, comp_contact)
                    values(${name}, ${address}, ${contact});`;
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }
    async deleteComp(id) {
        try {
            await sql`delete from transport_comp where comp_id = ${id};`;
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }
}
export let transportComp = new TransportComp();
