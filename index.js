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
    .then ((data) => { 
        if (data.action == "View All Department") {
       db.query('SELECT * FROM `department`',function (err,results){
        console.table(results)
       })
      } else if (data.action == "View All Roles") {
        db.query('SELECT * FROM `department_role`',function (err,results){
            console.table(results)})
      } else if (data.action == "View All Employees") {
        db.query('SELECT employee.id, employee.first_name, employee.last_name, department_role.title, department_role.department_id, department_role.salary, manager_id FROM department_role JOIN employee ON employee.role_id = department_role.department_id',
          function (err, results) {
            console.table(results);
          }
        );
      } else if (data.action == "Add Employee") {
        console.log(data);
      } else {
        console.log(data);
      }
      console.log("")
    }
)}

function add_employee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the first name of the employee ",
          name: "first_name"
        },
        {
            type: "input",
            message: "What is the last name of the employee ",
            name: "last_name"
        },
        {
            type: "list",
            message: "What is this employee's role in the company?",
            name: "role_id",
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
      .then((data) => {return data})
    }

