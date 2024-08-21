// Purpose: Contains the QUERY object, which is responsible for storing SQL queries.
// QUERY contains the following properties:
const QUERY = {
  // query to view all employees
  VIEW_EMPLOYEES: `select emp.id "ID", emp.first_name "First Name", emp.last_name "Last Name",
    role.title "Title", dep.name "Department", role.salary "Salary",
    concat(mng.first_name, ' ', mng.last_name) "Manager"
    from employee emp
    join role on emp.role_id = role.id
    join department dep on role.department_id = dep.id
    left join employee mng on emp.manager_id = mng.id;`,
  // query to view all departments
  VIEW_DEPARTMENTS: `select id, name from department;`,
  // query to view all roles
  VIEW_ROLES: `select role.id "ID", role.title "Title", role.salary "Salary", department.name "Department"
    from role join department dep
    on role.department_id = dep.id;`,
  // query to update employee role
  UPDATE_EMPLOYEE_ROLE: `update employee set role_id = $1 where id = $2;`,
  // query to add a department
  ADD_DEPARTMENT: `insert into department (name) values ($1);`,
  // query to add a role
  ADD_ROLE: `insert into role (title, salary, department_id) values ($1, $2, $3);`,
  // query to fetch role titles
  FETCH_ROLE_TITLES: `select title from role;`,
  // query to fetch employee names
  FETCH_EMPLOYEE_NAME: `select id, first_name, last_name from employee;`,
};

// export QUERY object
module.exports = QUERY;
