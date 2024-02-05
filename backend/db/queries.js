import { sql } from "./db.js";

class Query {
    async getAllRoutes() {
        let result = await sql`
            select c.comp_id, comp_name,b.bus_id,dep_loc,dep_date,dep_time, arv_loc, arv_date, arv_time
            from transport_comp c, bus b, bus_route r
            where c.comp_id = b.comp_id and b.bus_id = r.bus_id;
        `;
        let routes = [];
        result.forEach((rec) => routes.push(rec));
        return routes;
    }
    async getRouteByLoc(start, destination) {
        let result = await sql`
            select c.comp_id, comp_name,b.bus_id,dep_loc,dep_date,dep_time, arv_loc, arv_date, arv_time, route_id
            from transport_comp c, bus b, bus_route r
            where c.comp_id = b.comp_id and b.bus_id = r.bus_id and (dep_loc= ${start} and arv_loc = ${destination});
        `;
        let routes = [];
        result.forEach((rec) => routes.push(rec));
        return routes;
    }
    async getDetailsOnRoute(route_id) {
        let det;
        await sql`
            select comp_name, c.comp_id, comp_address, comp_contact, b.bus_id , capacity, route_id , cost, dep_loc, dep_date, dep_time, arv_loc, arv_date, arv_time, nbooks
            from transport_comp c, bus b, bus_route r
            where c.comp_id = b.comp_id and b.bus_id = r.bus_id and route_id = ${route_id};
        `.then((res) => {
            det = res.at(0);
        });
        return det;
    }
    async getResDetailsForUser(user_name) {
        let result = await sql`
            select res.res_id, br.bus_id, payment_id, res.res_date, pmt_date, p.fname, p.lname, br.dep_loc, br.dep_date, br.dep_time, br.arv_loc, br.arv_date, br.arv_time, amount, pmt_status 
            from reservation res, passenger_res pr, users u, bus_route br, payment pmt, passenger p 
            where u.user_id = res.user_id and br.bus_id = res.bus_id and u.user_name = ${user_name};
        `;
        let reserves = [];
        result.forEach((rec) => reserves.push(rec));
        return reserves;
    }
    async getUserDetails(user_name) {
        let profile;
        await sql`
            select * from users where user_name = ${user_name};
        `.then((rec) => (profile = rec.at(0)));
        return profile;
    }
    async getPasswordForUser(user_name) {
        let password;
        await this.getUserDetails(user_name).then((res) => password = res["password"])
        return password;
    }
}
export let dbquery = new Query();
