-- Purpose: Create the database schema for the employee_db database.
DROP DATABASE IF EXISTS employee_db;
create database employee_db;

\c employee_db;

drop table if exists employee;
drop table if exists role;
drop table if exists department;

create table department (
    id serial primary key,
    name varchar(30) unique not null 
);

create table role (
    id serial primary key,
    title varchar(30) not null,
    salary decimal(10, 2) not null,
    department_id integer not null,
    foreign key (department_id)
    references department(id)
);

create table employee (
    id serial primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id integer not null,
    manager_id integer,
    foreign key (role_id)
    references role(id),
    foreign key (manager_id)
    references employee(id)
);