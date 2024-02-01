-- users insert example
insert into users(FName , LName, user_name, email, phone) values('Chethan', 'L', 'chethanl', 'chethan.shantha@gmail.com', 7019098270);

-- bus entries example
insert into bus(bus_id, capacicity, comp_id) values('KA01AA0000', 50, 1);

-- company table insertion
insert into transport_comp(comp_name, comp_address, comp_contact) values('CLT', 'Electronic city,Bengaluru-560068', 7019098270);

-- reservation table
insert into reservation(bus_id, user_id, res_date) values('KA01AA0000', 1, date'2024-01-01');

-- passenger id
insert into passenger(res_id, seat_no, FName, LName) values(1, 24, 'Chethan', 'L');

-- bus route
insert into bus_route(bus_id, dep_date, cost, dep_loc, dep_time, arv_loc, arv_time) values ('KA01AA0000', date'2024-01-28', 450, 'Bengaluru', time'11:45:00', 'Mysore', time'01:40:00');

-- passenger reservations
insert into passenger_res(route_id, passenger_id, res_id, seat_no, res_date) values(1, 1, 1, 24, date'2024-01--1');

-- payment
insert into payment(res_id, amount, pmt_status, pmt_date) values (1, 450, TRUE, date'2024-01-02');