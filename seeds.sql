USE employeetracker_db;

INSERT INTO department (name)
VALUES 
('Sales'), 
('Frontend'), 
('Backend'), 
('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES 
('Salesperson', 65000, 1),
('Frontend Engineer', 100000, 2),
('Backend Engineer', 120000, 3),
('HR Manager', 95000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Ab', 'Cd', 1, NULL),
('Ef', 'Gh', 2, NULL),
('Ij', 'Kl', 3, NULL),
('Mn', 'Op', 4, NULL);