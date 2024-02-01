create table users (
    user_id serial primary key,
    FName varchar(25),
    LName varchar(25),
    user_name varchar(30),
    email varchar(35),
    phone bigint
);

create table transport_comp(
    comp_id serial primary key,
    comp_name varchar(20),
    comp_address varchar(50),
    comp_contact bigint
);

create table bus(
    bus_id varchar(10) primary key,
    capacity int,
    comp_id serial references transport_comp(comp_id)
);


create table reservation(
    res_id serial primary key,
    bus_id varchar(10) references bus(bus_id),
    user_id serial references users(user_id),
    res_date date
);

create table passenger(
    passenger_id serial primary key,
    res_id serial references reservation(res_id),
    seat_no int,
    FName varchar(25),
    LName varchar(25)
);

create table bus_route(
    route_id serial primary key,
    bus_id varchar(10) references bus(bus_id),
    dep_date date,
    cost int,
    dep_loc varchar(20),
    dep_time time,
    arv_loc varchar(20),
    arv_time time
);

create table passenger_res(
    route_id serial references bus_route(route_id),
    passenger_id serial references passenger(passenger_id),
    res_id serial references reservation(res_id),
    seat_no int,
    res_date date,
    primary key(route_id, passenger_id, res_id)
);

create table payment(
    payment_id serial primary key,
    res_id serial references reservation(res_id),
    amount int,
    pmt_status boolean,
    pmt_date date
);