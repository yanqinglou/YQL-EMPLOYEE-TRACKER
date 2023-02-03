USE company_employee_db;

SELECT 
employee.id, 
employee.first_name, 
employee.last_name, 
department_role.title, 
department.name,
department_role.salary
FROM department_role
RIGHT JOIN employee
ON employee.role_id = department_role.id
LEFT JOIN department
ON department.id = department_role.department_id;

SELECT id, concat (first_name, " ",last_name) AS full_name FROM employee WHERE manager_id IS NULL ;

