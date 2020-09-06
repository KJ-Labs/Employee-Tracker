const mysql = require('mysql');
const inquirer = require("inquirer");

//SQL Connection Info

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_db"
});


//SQL Connection Info
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    askQuestions();
});

//Begins the question prompt for user to decide what to do
function askQuestions() {
    inquirer.prompt({
        message: "what would you like to do?",
        type: "list",
        choices: [
            "1.) view all employees",
            "2.) view all departments",
            "3.) add employee",
            "4.) add department",
            "5.) add role",
            "6.) update employee role",
            "7.) delete an employee",
            "8.) QUIT"
        ],
        name: "choice"
    }).then(answers => {
        console.log(answers.choice);
        switch (answers.choice) {
            case "1.) view all employees":
                viewEmployees()
                break;

            case "2.) view all departments":
                viewDepartments()
                break;

            case "3.) add employee":
                addEmployee()
                break;

            case "4.) add department":
                addDepartment()
                break;

            case "5.) add role":
                addRole()
                break;


            case "6.) update employee role":
                updateEmployeeRole();
                break;

            case "7.) delete an employee":
                deleteEmployee();
                break;


            default:
                connection.end()
                break;
        }
    })
}

//Queries all employees
function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
        askQuestions();
    })
}

//Queries all departments
function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
        askQuestions();
    })
}

//Add a new employee
function addEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "firstName",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?"
        },
        {
            type: "number",
            name: "roleId",
            message: "What is the employees role ID"
        },
        {
            type: "number",
            name: "managerId",
            message: "What is the employees manager's ID?"
        }
    ]).then(function(res) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
}

//Add a new department
function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What is the department that you want to add?"
    }, ]).then(function(res) {
        connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function(err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
}


//Add a role
function addRole() {
    inquirer.prompt([
        {
            message: "enter title:",
            type: "input",
            name: "title"
        }, {
            message: "enter salary:",
            type: "number",
            name: "salary"
        }, {
            message: "enter department ID:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
            console.table(data);
     
        })
        askQuestions();
    })

}

//Update an Existing Role
function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "What is the first name of the employee would you like to update?",
            type: "input",
            name: "name"
        }, 
        {
            message: "What is the last name of the employee would you like to update?",
            type: "input",
            name: "last_name"
        },   
        {
            message: "enter the new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ? and last_name = ?", [response.role_id, response.name, response.last_name], function (err, data) {
            console.table(data);
      
        })
        askQuestions();
    })

}

//Delete an employee
function deleteEmployee() {
  inquirer.prompt([
      {
          message: "What is the first name of the employee you would like to delete? ",
          type: "input",
          name: "name"
      }, {
          message: "What is the employee's last name?",
          type: "input",
          name: "last_name"
      },  
        {
            message: "What is their employee ID:",
            type: "number",
            name: "empl_id"
        }
  ]).then(function (response) {
      connection.query("Delete from employee WHERE first_name = ? AND last_name = ? AND employee_id = ? ", [response.name, response.last_name], response.empl_id, function (err, data) {
          console.table(data);
         
      })
      askQuestions();
  })

}