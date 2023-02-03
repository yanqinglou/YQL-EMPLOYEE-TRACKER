const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
const { async } = require("rxjs");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "company_employee_db",
  },
  console.log(`Connected to the classlist_db database.`)
);

prompt_employee();

function prompt_employee() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Department",
          "Add Department",
        ],
      },
    ])
    .then(async (data) => {
      if (data.action == "View All Department") {
        const department = await viewAllDepartment();
        prompt_employee();
      } else if (data.action == "View All Roles") {
        viewAllRoles();
        prompt_employee();
      } else if (data.action == "View All Employees") {
        viewAllEmployee();
        prompt_employee();
      } else if (data.action == "Add Employee") {
        addEmployee();
      } else {
        console.log(data);
      }
      console.log("");
    });
}

const viewAllDepartment = () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
  });
};
const viewAllRoles = () => {
  db.query(
    "SELECT department_role.title,department.name,department_role.salary FROM department_role JOIN department ON department_role.department_id = department.id",
    function (err, results) {
      console.table(results);
    }
  );
};

const viewAllEmployee = () => {
  db.query(
    `SELECT 
      employee.id, 
      employee.first_name, 
      employee.last_name, 
      department_role.title, 
      department.name,
      department_role.salary, 
      employee.manager_id 
      FROM department_role
      RIGHT JOIN employee
      ON employee.role_id = department_role.id
      LEFT JOIN department
      ON department.id = department_role.department_id;`,
    function (err, results) {
      console.table(results);
    }
  );
};

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the employee ",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the last name of the employee ",
        name: "last_name",
      },
      {
        type: "list",
        message: "What is his/her role?",
        name: "role_id",
        choices: ["1.Sales Lead", "2.Salesperson", "3.Lead Engineer", "4.Software Engineer", "5.Account Manager", "6.Accountant", "7.Legal Team Lead", "8.Lawyer"]
      },
      {
        type: "list",
        message: "Who is his/her manager",
        name: "manager_id",
        choices: ["1.Jun Zhang", "2.Jian Liu", "3.Hui Lee", "4.Jessy Cooper", "5.N/A"]
      }
    ])
    .then((data) => {
      roleID = data.role_id.split[0];
      if (data.manager_id == "5.N/A"){
        manager = "NULL"
      }else
      db.query(
        `INSERT INTO 
        employee 
        (first_name, last_name,role_id, manager_id) 
        VALUES 
        (${data.first_name},${data.last_name},${roleID},${manager})`,
        function (err, results) {
          console.table(results);}
      );
      console.log(data);
    });
}
