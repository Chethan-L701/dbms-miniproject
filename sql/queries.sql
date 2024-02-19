-- get all bus routes [getAllRoutes()]
select c.comp_id, comp_name,b.bus_id,dep_loc,dep_date,dep_time, arv_loc, arv_date, arv_time
from transport_comp c, bus b, bus_route r
where c.comp_id = b.comp_id and b.bus_id = r.bus_id;

-- get routes based on the dep_loc and arv_loc [getRouteByLoc()]
select c.comp_id, comp_name,b.bus_id,dep_loc,dep_date,dep_time, arv_loc, arv_date, arv_time
from transport_comp c, bus b, bus_route r
where c.comp_id = b.comp_id and b.bus_id = r.bus_id and (dep_loc= '' and arv_loc = '');

-- detailed info on bus route [getDetailsOnRoute()]
select comp_name, c.comp_id, comp_address, comp_contact, b.bus_id , capacity, route_id , cost, dep_loc, dep_date, dep_time, arv_loc, arv_date, arv_time, nbooks
from transport_comp c, bus b, bus_route r
where c.comp_id = b.comp_id and b.bus_id = r.bus_id and route_id = '';

-- get the details of the reservations done by the users. [getResDetialsForUser()]
select res.res_id, br.bus_id, payment_id, res.res_date, pmt_date, p.fname, p.lname, br.dep_loc, br.dep_date, br.dep_time, br.arv_loc, br.arv_date, br.arv_time, amount, pmt_status 
from reservation res, passenger_res pr, users u, bus_route br, payment pmt, passenger p 
where u.user_id = res.user_id and br.bus_id = res.bus_id and u.user_id = ${};

-- get user details [getUserDetails()]
select * from users where user_name = ${user_name};

-- get user password [getPasswordForUser()]
-- await this.getUserDetails(user_name).then((res) => password = res["password"])

-- get Route Info by Departure location [getRouteByDep()]
select c.comp_id, comp_name,b.bus_id,dep_loc,dep_date,dep_time, arv_loc, arv_date, arv_time
from transport_comp c, bus b, bus_route r
where c.comp_id = b.comp_id and b.bus_id = r.bus_id and (dep_loc= '');

-- get Route Info by Departure location [getRouteByArv()]
select c.comp_id, comp_name,b.bus_id,dep_loc,dep_date,dep_time, arv_loc, arv_date, arv_time
from transport_comp c, bus b, bus_route r
where c.comp_id = b.comp_id and b.bus_id = r.bus_id and (arv_loc= '');
