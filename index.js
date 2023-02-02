const inquirer = require('inquirer');
const fs = require('fs');

inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'action',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role','View All Roles','Add Role','View All Dpartment','Add Department']
    },
  ])
  .then((data) => {
console.log(data.action)
  });