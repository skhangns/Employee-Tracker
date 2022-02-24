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
        case "Add a new department":
          addNewDepartment();
          break;
        case `Add a new employee`:
          employeeAdd();
          break;
        case `Update an Employee's Role`:
          employeeUpdateRole();
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
const addNewDepartment = () => {
  inquirer
    .prompt([
      {
        name: `addNewDepartment`,
        type: `input`,
        message: `Enter the name of the department you would like to add`,
      },
    ])
    .then((response) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: response.addNewDepartment,
        },
        function (err) {
          if (err) throw err;
          console.log("Added " + response.addNewDepartment + " Department");
          promptstart();
        }
      );
    });
};

// function for adding an employee.
const employeeAdd = () => {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: `employeeAdd`,
          type: `input`,
          message: `Enter the first name of the employee you would like to add.`,
        },

        {
          name: `last_name`,
          type: `input`,
          message: `Enter the last name of the employee you would like to add.`,
        },

        {
          name: `role_id`,
          type: `list`,
          message: `Select the role of this employee.`,
          choices: results.map((item) => item.title),
        },
      ])

      .then((answer) => {
        const roleChosen = results.find(
          (item) => item.title === answer.role_id
        );
        const employeeFirstName = answer.employeeAdd;
        const employeeLastName = answer.last_name;
        connection.query("SELECT * FROM employee", function (err, results) {
          if (err) throw err;
          inquirer
            .prompt([
              {
                name: `manager_id`,
                type: `list`,
                message: `Select the Manager for this employee.`,
                choices: results.map((item) => item.first_name),
              },
            ])
            .then((answer) => {
              const managerChosen = results.find(
                (item) => item.first_name === answer.manager_id
              );

              connection.query(
                "INSERT INTO employee SET ?",
                {
                  first_name: employeeFirstName,
                  last_name: employeeLastName,
                  role_id: roleChosen.id,
                  manager_id: managerChosen.id,
                },
                function (err) {
                  if (err) throw err;
                  console.log(
                    "Added " +
                      employeeFirstName +
                      " " +
                      employeeLastName +
                      " to the team!"
                  );
                  promptstart();
                }
              );
            });
        });
      });
  });
};

const employeeUpdateRole = () => {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: `employeeUpdate`,
          type: `list`,
          message: `Choose the employee whose role you would like to update.`,
          choices: results.map((Columns) => Columns.first_name),
        },
      ])

      .then((response) => {
        const updateEmployee = response.employeeUpdate;
        connection.query("SELECT * FROM role", function (err, results) {
          if (err) throw err;
          inquirer
            .prompt([
              {
                name: `role_id`,
                type: `list`,
                message: `Select the new role of the employee.`,
                choices: results.map((Columns) => Columns.title),
              },
            ])
            .then(([response]) => {
              const roleChosen = results.find(
                (item) => item.title === response.role_id
              );

              connection.query(
                "UPDATE employee SET ? WHERE first_name = " +
                  "'" +
                  updateEmployee +
                  "'",
                {
                  role_id: "" + roleChosen.id + "",
                },
                function (err) {
                  if (err) throw err;
                  console.log(
                    "Successfully updated " +
                      updateEmployee +
                      "'s role to " +
                      response.role_id +
                      "!"
                  );
                  promptstart();
                }
              );
            });
        });
      });
  });
};
