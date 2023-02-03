1USE company_employee_db;

INSERT INTO department (name) 
VALUES 
("Sales"),
("Engineering"),
("Legal"),
("Finance");

INSERT INTO department_role (title, salary, department_id) 
VALUES 
("Sales Lead", 500,1),
("Salesperson", 100,1),
("Lead Engineer", 300,2),
("Software Engineer", 200, 2),
("Account Manager", 600, 4),
("Accountant", 300, 4),
("Legal Team Lead", 800, 3),
("Lawyer", 600, 3);

INSERT INTO employee (first_name, last_name,role_id, manager_id) 
VALUES 
("Jun","Zhang",1,NULL),
("Mei","Wang",2,1),
("Jian","Liu",3,NULL ),
("Lily","Chen",4,3),
("Hui","Lee",5,NULL),
("Sisi","Jin",6,5),
("Jessy","Cooper",7,NULL),
("June","Lin",8,7)


