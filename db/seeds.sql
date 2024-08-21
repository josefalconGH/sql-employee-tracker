-- Purpose: Seed data for the employee tracker database
delete from employee;
delete from role;
delete from department;

-- departments
INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Sales'),
    ('Marketing'),
    ('Finance'),
    ('Operations'),
    ('Human Resources');

-- roles
INSERT INTO role (title, salary, department_id) VALUES
    ('Junior Software Engineer', 80000, (select id from department where name = 'Engineering')),
    ('Senior Software Engineer', 130000, (select id from department where name = 'Engineering')),
    ('Principal Software Engineer', 180000, (select id from department where name = 'Engineering')),
    ('Engineering Director', 175000, (select id from department where name = 'Engineering')),
    ('Sales Manager', 95000, (select id from department where name = 'Sales')),
    ('Senior Marketing Specialist', 85000, (select id from department where name = 'Marketing')),
    ('Chief Marketing Officer', 150000, (select id from department where name = 'Marketing')),
    ('Senior Financial Analyst', 110000, (select id from department where name = 'Finance')),
    ('Chief Operations Officer', 160000, (select id from department where name = 'Operations')),
    ('HR Manager', 90000, (select id from department where name = 'Human Resources'));

-- managers
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Natalie', 'Parker', (select id from role where title = 'Engineering Director'), null),
    ('Grace', 'Kim', (select id from role where title = 'Chief Marketing Officer'), null),
    ('Ryan', 'Davis', (select id from role where title = 'Chief Operations Officer'), null),
    ('Sophia', 'Garcia', (select id from role where title = 'HR Manager'), null);

-- employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Ethan', 'Wilson', (select id from role where title = 'Senior Software Engineer'), (select id from employee where first_name = 'Natalie')),
    ('Olivia', 'Martinez', (select id from role where title = 'Junior Software Engineer'), (select id from employee where first_name = 'Natalie')),
    ('Liam', 'Anderson', (select id from role where title = 'Principal Software Engineer'), (select id from employee where first_name = 'Natalie')),
    ('Emma', 'Rodriguez', (select id from role where title = 'Senior Marketing Specialist'), (select id from employee where first_name = 'Grace')),
    ('James', 'Hernandez', (select id from role where title = 'Sales Manager'), null),
    ('Lucas', 'White', (select id from role where title = 'Senior Financial Analyst'), null));

select * from employee;
