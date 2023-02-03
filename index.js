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
    .then((data) => {
      if (data.action == "View All Department") {
        viewAllDepartment();
        prompt_employee();
      } else if (data.action == "View All Roles") {
        viewAllRoles();
        prompt_employee();
      } else if (data.action == "View All Employees") {
        viewAllEmployee();
        prompt_employee();
      } else if (data.action == "Add Employee") {
        addEmployee();
        // prompt_employee();
      } else if (data.action == "Add Department") {
        console.log(data);
      }
      // console.log("");
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
        name: "role",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
        ],
      },
      {
        type: "list",
        message: "Who is his/her manager",
        name: "manager_id",
        choices: ["Jun Zhang", "Jian Liu", "Hui Lee", "Jessy Cooper", "N/A"],
      },
    ])
    .then((data) => {
      var roleID, managerID;
      if (data.role == "Sales Lead") {
        roleID = 1;
      } else if (data.role == "Salesperson") {
        roleID = 2;
      } else if (data.role == "Lead Engineer") {
        roleID = 3;
      } else if (data.role == "Software Engineer") {
        roleID = 4;
      } else if (data.role == "Account Manager") {
        roleID = 5;
      } else if (data.role == "Accountant") {
        roleID = 6;
      } else if (data.role == "Legal Team Lead") {
        roleID = 7;
      } else {
        roleID = 8;
      }

      if (data.manager_id == "Jun Zhang") {
        managerID = 1;
      } else if (data.manager_id == "Jian Liu") {
        managerID = 3;
      } else if (data.manager_id == "Hui Lee") {
        managerID = 5;
      } else if (data.manager_id == "Jessy Cooper") {
        managerID = 7;
      } else {
        managerID = "NULL";
      }
      console.log(roleID);
      console.log(managerID);
      db.query(
        `INSERT INTO
          employee
          (first_name, last_name,role_id, manager_id)
          VALUES
          ("${data.first_name}","${data.last_name}",${roleID},${managerID})`,
        function (err, results) {
          console.log(err)
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
              console.log(err)
              console.table(results);
            }
          );
        }
      );
    });
}
