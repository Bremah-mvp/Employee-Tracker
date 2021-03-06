const EmpData = require('./src/EmpData');
const connection = require('./src/dbConn');
const cTable = require('console.table');
const figlet = require('figlet');
const inquirer = require('inquirer');
const view = require('./src/viewFunctions');
const add = require('./src/addFunctions');
const del = require('./src/delFunctions');
const update = require('./src/updateFunctions');


// Use inquirer to prompt user for information
const promptUser = (questions) => {
    return inquirer.prompt(questions);
};


// Function to exit the application
const exitApp = () => {
    console.log('Bye bye!');
    connection.end();
    process.exit();
};

// Object to hold the task functions to fire from inquirer prompt
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

// Init prompt user for task to complete
const init = async () => {
    try {
        console.log("\n------------------------\n")
        const actionChoice = await promptUser(action);
        console.log("\n------------------------\n")
        await actionFunctions[actionChoice.task]();
        init();
    } catch (err) {
        console.log(err);
    }
};

// Displays start graphic and starts the init function
const start = () => {
    figlet(' E - T', {
        font: 'Big'
    }, (err, data) => {
        if (err) {
            console.log(err)
        }
        console.log("\n")
        console.log(data);
        console.log("       ****************************************")
        console.log("\n                    Welcome to the \n             Employee Tracker Application!")
        console.log("\n       ****************************************")
        init();
    })

}

start();