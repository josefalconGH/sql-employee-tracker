// Purpose: Contains the CLI object, which is responsible for interacting with the user.
const inquirer = require("inquirer");
const pg = require("pg");
const sql = require("./queries.js");
const sf = require("./simpleFormat.js");
const questions = require("./questions.js");
const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "emp_o_matic",
});

// runQueryAndShowResults func
// runs a query and logs the results to the console
async function runQueryAndShowResults(query, params) {
  const results = await executeQuery(query, params);
  logResults(results);
}

// executeQuery func
// executes a query and returns the results
function executeQuery(queryString, queryParams = []) {
  return pool.query(queryString, queryParams);
}

// logResults func
// logs the results of a query to the console
function logResults(results) {
  sf.FORM.writeHeader(results.rows[0]);

  for (let ii = 0; ii < results.rowCount; ii++) {
    const element = results.rows[ii];
    sf.FORM.formatRow(element);
  }
}

// updateEmployeeRole func
async function updateEmployeeRole() {
  await questions.fetchEmployeeNames(pool);
  await questions.fetchRoleTitles(pool);
  const answers = await inquirer.prompt(questions.UPDATE_EMPLOYEE_ROLE);
  const { title, fullName } = answers;
  const result = await executeQuery(sql.UPDATE_EMPLOYEE_ROLE, [
    title,
    fullName,
  ]);

  await runQueryAndShowResults(sql.VIEW_EMPLOYEES);
}

// addDepartment func
async function addDepartment() {
  const answers = await inquirer.prompt(questions.ADD_DEPARTMENT);
  const { newDepartmentName } = answers;

  await executeQuery(sql.ADD_DEPARTMENT, [newDepartmentName]);
  await runQueryAndShowResults(sql.VIEW_DEPARTMENTS);
}

// addRole func
async function addRole() {
  const answers = await inquirer.prompt(questions.ADD_ROLE);
  const { roleName, salary, departmentID } = answers;
  const result = await executeQuery(sql.ADD_ROLE, [
    roleName,
    salary,
    departmentID,
  ]);

  await runQueryAndShowResults(sql.VIEW_ROLES);
}

// CLI object
// contains the promptUser function, which is responsible for interacting with the user
// calls the appropriate functions based on the user's choices
const CLI = {
  promptUser: async function () {
    const answers = await inquirer.prompt(questions.MAIN_MENU);
    const { chosenAction } = answers;

    if (questions.MAIN_MENU_CHOICES.Quit === chosenAction) {
      console.log("Okey-dokey. Come back soon!");
      process.exit(0);
    }

    switch (chosenAction) {
      case questions.MAIN_MENU_CHOICES.AddDepartment:
        await addDepartment();
        break;
      case questions.MAIN_MENU_CHOICES.AddEmployee:
        console.log("Adding an employee");
        break;
      case questions.MAIN_MENU_CHOICES.AddRole:
        console.log("Adding a role");
        await addRole();
        break;
      case questions.MAIN_MENU_CHOICES.UpdateEmployeeRole:
        await updateEmployeeRole();
        break;
      case questions.MAIN_MENU_CHOICES.ViewDepartments:
        await runQueryAndShowResults(sql.VIEW_DEPARTMENTS);
        break;
      case questions.MAIN_MENU_CHOICES.ViewEmployees:
        await runQueryAndShowResults(sql.VIEW_EMPLOYEES);
        break;
      case questions.MAIN_MENU_CHOICES.ViewRoles:
        await runQueryAndShowResults(sql.VIEW_ROLES);
        break;
      default:
        throw new Error(
          "Unrecognized choice from main manu. How did that sneak in here?"
        );
    }

    console.log();
    this.promptUser();
  },
};

// export the CLI object
module.exports = CLI;
