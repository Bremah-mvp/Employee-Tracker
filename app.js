const EmployeesD = require('./lib/EmployeesD');
const connection = require('./lib/connDB');
const cTable = require('console.table');
const figlet = require('figlet');
const inquirer = require('inquirer');
const view = require('/lib/viewFunction');
const add = require("./lib/functions");
const del = require('./lib/delFunc');
const update = require('./lib/updFuncs');

// use inquire to prompt user for information
const promptUser = (questions) => {
    return inquirer.prompt(questions);
};

// function to exit the application
const exitApp = () => {
    console.log('goodbye');
    connection.end();
    process.exit();
};

// object to hold the task functions to fire from inquirer prompt
const actionFunctions = {
    'View All Employees': view.viewEmployees,
    'View All Employees by Department': view.viewEmployeesByDept,
    'View All Employees by Manager': view.viewEmployeesByMgr,
    'Add Employee': add.addEmployee,
    'Remove Employee': del.delEmployee,
    'Update Employee Role': update.updateEmpRole,
    'Update Employee Manager': update.updateEmpMgr,
    'View All Roles': view.viewRoles,
    'Add Role': add.addRole,
    'Remove Role': del.delRole,
    'View All Departments': view.viewDepartments,
    'View Budget by Department': view.viewBudgetByDept,
    'Add Department': add.addDepartment,
    'Remove Department': del.delDepartment,
    'Exit Application': exitApp
}

// Inquirer question - list of tasks
const action = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'task',
        choices: [
            'View All Employees',
            'View All Employees by Department',
            'View All Employees by Manager',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'View All Roles',
            'Add Role',
            'Remove Role',
            'View All Departments',
            'View Budget by Department',
            'Add Department',
            'Remove Department',
            'Exit Application'
        ]
    }
];

