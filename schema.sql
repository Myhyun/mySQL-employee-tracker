CREATE DATABASE employeetracker_DB;

USE employeetracker_DB;

CREATE TABLE department(
	id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY(id)
    );
    
CREATE TABLE role(
	id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    PRIMARY KEY(id)
	);
    
CREATE TABLE employee(
	id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    PRIMARY KEY(id)
	);

SELECT * FROM department;
