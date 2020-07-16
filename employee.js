const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "employeetracker_DB",
});

connection.connect((err) => {
    if (err) {
        console.error(`error connecting: ${err.stack}`);
        return;
    }
    console.log(`connected as id ${connection.threadId}`);
});

function runInquirer() {
    const ADD_DEPARTMENTS = "Add a department";
    const ADD_ROLES = "Add a role";
    const ADD_EMPLOYEES = "Add an employee";
    const VIEW_DEPARTMENTS = "View departments";
    const VIEW_ROLES = "View roles";
    const VIEW_EMPLOYEES = "View employees";
    const UPDATE_EMPLOYEE_ROLES = "Update an employees role";

    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
            ADD_DEPARTMENTS,
            ADD_ROLES,
            ADD_EMPLOYEES,
            VIEW_DEPARTMENTS,
            VIEW_ROLES,
            VIEW_EMPLOYEES,
            UPDATE_EMPLOYEE_ROLES,
            "Exit"
        ],
    })
    .then((answer) => {
        switch (answer.choice) {
            case ADD_DEPARTMENTS:
                return addDepartment();
            case ADD_ROLES:
                return addRole();
            case ADD_EMPLOYEES:
                return addEmployee();
            case VIEW_DEPARTMENTS:
                return viewDepartments();
            case VIEW_ROLES:
                return viewRoles();
            case VIEW_EMPLOYEES:
                return viewEmployees();
            case UPDATE_EMPLOYEE_ROLES:
                return updateRoles();
            default: 
                connection.end();
        }
    });
}