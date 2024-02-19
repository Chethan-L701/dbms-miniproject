import express, { request, response } from "express";
import { dbquery } from "../db/queries.js";
import { users } from "../db/tables/users.js";

export const userRoute = express.Router("/user");
userRoute.use(express.json());
userRoute.get("/", (request, response) => {
    return response.status(200).send({
        message: "Connection Succesfull to user Route",
    });
});

userRoute.get("/:username", async (request, response) => {
    let username = request.params.username;
    return response.status(200).send({
        message: `Fetching Profile of the user ${username}`,
        data: await dbquery.getUserDetails(username),
    });
});
userRoute.get("/ps/:username", async (request, response) => {
    let username = request.params.username;
    return response.status(200).sendStatus({
        message: `Fetching password for user ${username}`,
        password: await dbquery.getPasswordForUser(username),
    });
});

userRoute.post("/create", async (request, response) => {
    let { fname, lname, username, email, phone, password } = request.body;
    if (
        (fname != "",
            lname != "",
            username != "",
            email != "",
            phone != 0,
            password != "")
    ) {
        await users
            .insert(username, password, fname, lname, email, phone)
            .then(() => {
                return response.status(200).send({
                    message: `Successfully Created new user ${username}`,
                    data: request.body,
                });
            })
            .catch((error) => {
                return response.status(500).send({
                    message: "Failed to insert into the user",
                    error: error,
                });
            });
    }
});

userRoute.delete("/delete/:username", async (request, response) => {
    let username = request.params.username;
    let profile = await users.getUserByUserName(username);
    await users
        .deleteUser(username)
        .then(async () => {
            return response.status(200).send({
                message: `Successfully deleted user : ${username}`,
                userdet: profile,
            });
        })
        .catch((error) => {
            return response.status(500).send({
                message: `Failed to delete user : ${username}`,
                error: error,
            });
        });
});

userRoute.put("/update/:username", async (request, response) => {
    let { fname, lname, username, email, phone, password } = request.body;
    username = request.params.username;
    let olddata = await dbquery.getUserDetails(username);
    if (
        (fname != "",
            lname != "",
            username != "",
            email != "",
            phone != 0,
            password != "")
    ) {
        await users.updateFName(username, fname);
        await users.updateLName(username, lname);
        await users.updateEmail(username, email);
        await users.updatePhone(username, phone);
    }
    return response.status(200).send({
        message: `Succesfully Updated profile for user ${username}`,
        olddata: olddata,
        newdata: request.body,
    });
});

userRoute.get("/res/:username", async (request, response) => {
    let username = request.params.username;
    await dbquery
        .getResDetailsForUser(username)
        .then((result) => {
            return response.status(200).send({
                message: `Succesfully Fetch all the reservations of ${username}`,
                reservations: result,
            });
        })
        .catch((error) => {
            return response.status(500).send({
                message: `Failed to get the user resevation details for ${username}`,
                error: error,
            });
        });
});
userRoute.get("/login/auth/:username/:password", async (request, response) => {
    let username = request.params.username;
    let password = request.params.password;
    try {
        let userinfo = await dbquery.getUserDetails(username);
        if (userinfo.user_name == username && password == userinfo.password) {
            return response.status(200).send({
                message: "succesfully authenticated user",
                auth: true,
            });
        } else {
            return response.status(200).send({
                message: "failed to authenticate",
                auth: false,
            });
        }
    } catch (error) {
        return response.status(200).send({
            message: "sometheing went wrong",
            auth: false,
            error: error,
        });
    }
});
