const inquirer = require('inquirer');
const connection = require('./connection/connection');



connection.connect(()=>{
    promptstart()
})



function promptstart() {
    inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a new department",
          "Add a new role",
          "Add a new employee",
          "Update employee roles",
          "Exit"
        ]
      }])
      .then(function (res) {
        switch (res.choice) {
          case "View all departments":
            viewDepartments();
            break;
          case "View all roles":
            viewRoles();
            break;
            case "View all employees":
                viewAllEmployees();
                break;
            case "Exit":
                connection.end();
                break;

        }})

            }

