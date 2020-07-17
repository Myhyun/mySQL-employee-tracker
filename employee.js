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
            const query = "INSERT INTO department (name) VALUES (?)";
            connection.query(query, answer.name, (err, res) => {
                if (err) {
                    console.log(err);
                }
                console.log("Successfully added new department " + answer.name);
                viewDepartments();
            });
        });
};

function addRole() {
    inquirer
        .prompt([
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
        ])
        .then((answer) => {
            const query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
            const values = [answer.title, answer.salary, answer.departmentId];
            connection.query(query, values, (err, res) => {
                if (err) throw err;
                console.log("Successfully added new role " + answer.title);
                viewRoles();
            });
        });
};

function addEmployee() {
    const roleList = [{ name: "Salesperson", value: 1 }, { name: "Frontend Engineer", value: 2 }, { name: "Backend Engineer", value: 3 }, { name: "HR Manager", value: 4 }];
    inquirer
        .prompt([
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
                type: "list",
                choices: roleList,
                message: "Please select a role for the new Employee"
            },
            {
                name: "managerCheck",
                type: "list",
                choices: ["yes", "no"],
                message: "Please select if you are a manager"
            },
        ])
        .then((answer) => {
            if (answer.managerCheck === "yes") {
                inquirer.prompt(
                    {
                        name: "managerId",
                        type: "input",
                        message: "Please enter your Manager Id number",
                    },
                )
                    .then((result) => {
                        const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                        const values = [answer.firstName, answer.lastName, answer.roleId, result.managerId];
                        connection.query(query, values, (err, res) => {
                            if (err) throw err;
                            console.log("Successfully created new Employee!");
                            viewEmployees();
                        });
                    })
            } else {
                const query = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)";
                const values = [answer.firstName, answer.lastName, answer.roleId];
                connection.query(query, values, (err, res) => {
                    if (err) throw err;
                    console.log("Successfully created new Employee!");
                    viewEmployees();
                });
            }
        });
};


function viewDepartments() {
    const query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    });
};

function viewRoles() {
    const query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    });
};

function viewEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    });
};

function updateRoles() {
    viewEmployees();
    const roleList = [{ name: "Salesperson", value: 1 }, { name: "Frontend Engineer", value: 2 }, { name: "Backend Engineer", value: 3 }, { name: "HR Manager", value: 4 }];
    inquirer
        .prompt([
            {
                name: "employeeId",
                type: "input",
                message: "Please input the id of the employee you wish to update\n"
            },
            {
                name: "newRole",
                type: "list",
                choices: roleList,
                message: "Please select the new role for the Employee",
            },
        ])
        
        .then((answer) => {
            const query = "UPDATE employee SET role_id = (?) WHERE id = (?)";
            const values = [answer.newRole, answer.employeeId];
            connection.query(query, values, (err, res) => {
                if (err) throw err;
                console.log("Successfully updated Employee's role!");
                viewEmployees();
            });
        })
};