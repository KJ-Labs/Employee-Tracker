var mysql = require("mysql");
var inquirer = require("inquirer");
const consoleTable = require("console.table");
const promisemysql = require("promise-mysql");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add an Employee",
        "Add a Department",
        "Add a Role",
        "Update an Employee",
        "Update a Department",
        "Update a Role",
        "Delete an Employee",
        "Delete a Department",
        "Delete a Role"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View All Employees":
        employeeSearch();
        break;

      case "View All Departments":
        departmentSearch();
        break;

      case "View All Roles":
        roleSearch();
        break;

      case "Add an Employee":
        addEmployee();
        break;

      case "Add a Department":
          addDepartment();
          break;

      case "Add a Role":
          addRole();
          break;

      case "Update an Employee":
            updateEmployee();
            break;
    
      case "Update a Department":
            updateDepartment();
            break;
    
      case "Update a Role":
            updateRole();
            break;

      case "Delete an Employee":
            deleteEmployee();
            break;
        
      case "Delete a Department":
            deleteDepartment();
            break;
        
      case "Add a Role":
            delteRole();
            break;
 
      }
    });
}

function employeeSearch() {
  connection.query("SELECT employee.*, role.title, department_name FROM employee left join employee_role role on role.role_id = employee.role_id left join department on department.department_id = role.department_id", function(err, answer) {
    console.log("\n Employees Retrieved from Database, please use down arrow to return to questions.  \n");
    console.table(answer);
    
  });
  runSearch();
};

function departmentSearch() {
  connection.query("SELECT  department_name FROM department ", function(err, answer) {
    console.log("\n Departments Retrieved from Database, please use down arrow to return to questions.  \n");
    console.table(answer);
    
  });
  runSearch();
};

function roleSearch() {
  connection.query("SELECT  title, salary  FROM employee_role ", function(err, answer) {
    console.log("\n Roles Retrieved from Database, please use down arrow to return to questions. \n");
    console.table(answer);
    
  });
  runSearch();
};

function addEmployee() {
  inquirer
    .prompt({
      name: "first_name",
      type: "input",
      message: "What is the firstname would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
        console.log(
          "Position: " +
            res[0].position +
            " || Song: " +
            res[0].song +
            " || Artist: " +
            res[0].artist +
            " || Year: " +
            res[0].year
        );
        runSearch();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "first_name"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "last_name"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "role_id"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "manager_id"
      }
    ])
    .then(function(answer) {

      
      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
      });
    });
};

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the department name?",
        name: "department_name"
      },
      {
        type: "input",
        message: "What's the department id?",
        name: "department_id"
      }
    ])
    .then(function(answer) {

      
      connection.query("INSERT INTO department (department_name, department_id) VALUES (?, ?)", [answer.department_name, answer.department_id ], function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
      });
    });
};

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the title of the role?",
        name: "title"
      },
      {
        type: "input",
        message: "What is the role id?",
        name: "role_id"
      },
      {
        type: "input",
        message: "What is the salary?",
        name: "salary"
      },
      {
        type: "input",
        message: "What is the deparment id number?",
        name: "department_id"
      }
    ])
    .then(function(answer) {

      
      connection.query("INSERT INTO employee_role (title, salary, role_id, department_id) VALUES (?, ?, ?, ?)", [answer.title, answer.salary, answer.role_id, answer.department_id], function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
      });
    });
};