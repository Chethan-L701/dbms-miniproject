import { sql } from "../db.js";
import postgres from "postgres";
class Users {
    emailRegex = /[A-Za-z0-9._]+@[a-zA-Z]+\.[a-zA-z]+/;
    async init() {
        await sql`create table if not exists users (
            user_id serial primary key,
            FName varchar(25),
            LName varchar(25),
            user_name varchar(30),
            password varchar(10),
            email varchar(35),
            phone bigint
        );`;
    }
    async getAllRecords() {
        let users = [];
        await sql`select * from users;`.then((result) => {
            result.forEach((rec) => users.push(rec));
        });
        return users;
    }
    async getUserByUserID(user_id) {
        let record = {};
        try {
            await sql`select * from users where user_id = ${user_id};`.then(
                (result) => {
                    if (result.length === 0) {
                        console.log(`cannot find user with id: ${user_id}`);
                    } else {
                        record = result.at(0);
                    }
                },
            );
        } catch (error) { }
        return record;
    }
    async getUserByUserName(user_name) {
        let record = {};
        try {
            await sql`select * from users where user_name = ${user_name};`.then(
                (result) => {
                    if (result.length === 0) {
                        console.log(`cannot find user with id: ${user_name}`);
                    } else {
                        record = result.at(0);
                    }
                },
            );
        } catch (error) { }
        return record;
    }
    async insert(user_name, password, fname, lname, email, phone) {
        if (this.emailRegex.test(email)) {
            try {
                let name_exists = false;
                await sql`select count(*) from users where user_name = ${user_name};`.then(
                    (result) => (name_exists = parseInt(result.at(0)["count"]) > 0),
                );
                if (!name_exists) {
                    await sql`insert into users(FName, LName, user_name,password, email, phone) 
                            values (${fname}, ${lname}, ${user_name},${password}, ${email}, ${phone});`;
                }
            } catch (error) {
                throw error;
            }
        } else {
            throw new Error("invalid email");
        }
    }
    async deleteUser(user_name) {
        try {
            await sql`delete from users where user_name = ${user_name};`;
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }
    async updateFName(user_name, FName) {
        try {
            await sql`update users set FName = ${FName} where user_name = ${user_name};`;
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }
    async updateLName(user_name, LName) {
        try {
            await sql`update users set LName = ${LName} where user_name = ${user_name};`;
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }
    async updateEmail(user_name, email) {
        try {
            if (this.emailRegex.test(email)) {
                await sql`update users set email = ${email} where user_name = ${user_name};`;
            }
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }

    async updatePhone(user_name, phone) {
        try {
            await sql`update users set phone = ${phone} where user_name = ${user_name};`;
        } catch (error) {
            if (error instanceof postgres.PostgresError) {
                console.log(`PostgresError : ${error.message}`);
            } else {
                console.error(error);
            }
        }
    }
}

export let users = new Users();
