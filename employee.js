const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "hyunmh98",
    database: "employeetracker_DB",
});

connection.connect((err) => {
    if (err) {
        console.error(`error connecting: ${err.stack}`);
        return;
    }
    runInquirer();
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
        type: "rawlist",
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

function addDepartment() {
    inquirer
        .prompt({
            name: "name",
            type: "input",
            message: "Please enter the new Department name",
        })
        .then((answer) => {
            const query = "INSERT INTO department (name) VALUES ('?')";
            connection.query(query, { name: answer.name }, (err, res) => {
                console.log(res);
            });
        });
};

function addRole() {
    inquirer
        .prompt(
            {
                name: "title",
                type: "input",
                message: "Please enter the new role title",
            },
            {
                name: "salary",
                type: "input",
                message: "Please enter the salary for the new role"
            },
            {
                name: "departmentId",
                type: "input",
                message: "Please enter the Department ID for the new role"
            },
        )
        .then((answer) => {
            const query = "INSERT INTO role (title, salary, department_id) VALUES ?";
            const values = [[answer.title, answer.salary, answer.departmentId]];
            connection.query(query, [values], (err, res) => {
                if (err) throw err;
                console.log(res);
            });
        });
};

function addEmployee() {
    inquirer
        .prompt(
            {
                name: "firstName",
                type: "input",
                message: "Please enter the first name of the new Employee",
            },
            {
                name: "lastName",
                type: "input",
                message: "Please enter the last name of the new Employee"
            },
            {
                name: "roleId",
                type: "input",
                message: "Please enter the role ID for the new Employee"
            },
            {
                name: "managerId",
                type: "input",
                message: "Please enter the manager ID for the new Employee, if nothing leave blank"
            },
        )
        .then((answer) => {
            const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?";
            const values = [[answer.firstName, answer.lastName, answer.roleId, answer.managerId]];
            connection.query(query, [values], (err, res) => {
                if (err) throw err;
                console.log(res);
            });
        });
};

function viewDepartments() {
    const query = "SELECT * FROM department";
    connection.query(query, function (err, res){
        if (err) throw err;
        console.log(res);
    });
};

function viewRoles() {
    const query = "SELECT * FROM roles";
    connection.query(query, function (err, res){
        if (err) throw err;
        console.log(res);
    });
};

function viewEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, function (err, res){
        if (err) throw err;
        console.log(res);
    });
};