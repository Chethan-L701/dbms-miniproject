import postgres from "postgres";
import creds from "./creds.json" assert { type: "json" };
export const sql = postgres(
    `postgres://${creds.username}:${creds.password}@${creds.host}:${creds.port}/${creds.database}`,
);
