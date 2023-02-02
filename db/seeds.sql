USE company_employee_db;

INSERT INTO department (role) 
VALUES 
("Sales"),
("Engineering"),
("Legal"),
("Finance");

INSERT INTO department_role (title, salary, department_id) 
VALUES 
("Sales Lead, 500,1"),
("Salesperson, 100,1"),
("Lead Engineer, 300,2"),
("Software Engineer, 200, 2"),
("Account Manager, 600, 4"),
("Accountant, 300, 4"),
("Legal Team Lead, 800, 3"),
("Lawyer, 600, 3")