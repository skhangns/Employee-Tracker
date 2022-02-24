const inquirer = require("inquirer");
const connection = require("./connection/connection");

connection.connect(() => {
  promptstart();
});

function promptstart() {
  inquirer
    .prompt([
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
          "Exit",
        ],
      },
    ])
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
        case "Add a new role":
          addNewRole();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

const viewAllEmployees = () => {
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    console.table(data);
    promptstart();
  });
  /// do this for roles and departmennts
};

const viewRoles = () => {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);
    promptstart();
  });
  /// do this for roles and departmennts
};
const viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);
    promptstart();
  });
  /// do this for roles and departmennts
};

// add walkthrough
const addNewRole = () => {
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Please pick a department for the new role",
          choices: data.map((department) => department.name),
        },
        {
          type: "input",
          name: "roleTitle",
          message: "What is the title for your new role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is your salary?",
        },
      ])
      .then((response) => {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: response.roleTitle,
            salary: response.salary,
            department_id: response.departmentId.id,
          },
          () => {
            console.log("New role added");
            promptstart();
          }
        );
      });
  });
};
