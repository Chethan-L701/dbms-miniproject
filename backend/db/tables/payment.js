import { sql } from "../db.js";
import postgres from "postgres";

class Payment {
    async init() {
        await sql`
            create table if not exists payment(
                payment_id serial primary key,
                res_id serial references reservation(res_id),
                amount int,
                pmt_status boolean,
                pmt_date date
            );
        `;
    }
    async getAllRecords() {
        let payments = [];
        await sql`select * from payment;`.then((result) => {
            result.forEach((rec) => payments.push(rec));
        });
        return payments;
    }

    async insert(res_id, amount, pmt_status, pmt_date) {
        try {
            await sql`
                insert into payment(res_id, amount, pmt_status, pmt_date) 
                values (${res_id}, ${amount}, ${pmt_status}, ${pmt_date});
            `;
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }
    async getPaymentStatus(id) {
        let record = {};
        try {
            await sql`select * from payment where payment_id = ${id};`.then(
                (result) => {
                    if (result.length === 0) {
                        console.log(`cannot find payment with id: ${id}`);
                    } else {
                        record = result.at(0);
                    }
                },
            );
        } catch (error) { }
        return record;
    }
    async deletePayment(id) {
        try {
            await sql`delete from payment where payment_id = ${id};`;
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }
    async updatePaymentStatus(id, status) {
        try {
            await sql`update payment set pmt_status = ${status} where payment_id=${id}`;
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }
    async getPaymentDetByID(id) {
        let record = {};
        try {
            await sql`select * from payment where payment_id = ${id};`.then(
                (result) => {
                    if (result.length === 0) {
                        console.log(`cannot find payment with id: ${id}`);
                    } else {
                        record = result.at(0);
                    }
                },
            );
        } catch (error) { }
        return record;
    }
}

export let payments = new Payment();
