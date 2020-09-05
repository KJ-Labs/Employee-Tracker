DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE employee(
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NULL,
  last_name VARCHAR(100) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (employee_id)
);

insert into employee values
(1, 'Bob', 'Boberton', 1, null),
(2, 'Dave', 'Smith', 2, 1),
(3, 'Jane', 'Samson', 3, 1),
(4, 'Samtha', 'Jameson', 4, 3),
(5, 'Rowena', 'McGonnal', 4, 3); 

CREATE TABLE employee_role (
 role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NULL,
  salary DECIMAL(10,0) NULL,
  department int,
  PRIMARY KEY (role_id)
);

insert into employee_role values
(1, 'CEO', 100000, 1), 
(2, 'Manager', 80000, 2),
(3, 'Nerd', 75000, 2),
(4, 'Intern', 45000, 3); 

CREATE TABLE department (
 department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NULL,
  PRIMARY KEY (department_id)
);

insert into department 
values 
(1, 'C-suite'),
(2, 'Dept 2'),
(3, 'Dept 3');



SELECT * FROM employee;
select * from employee_role;
select * from department;
