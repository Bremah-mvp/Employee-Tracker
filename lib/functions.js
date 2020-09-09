const employeesD = require('./EmployeesD');
const cTable = require('console.table');
const inquirer = require('inquirer');

// create a new database to access SQL query functions
const employeesD = new employeesD();

// usse iquirer to promt user for information
const promptUser = (questions) => {
    return inquirer.prompt(questions);

};

const addEmployee = async () => {
    try {
        const roles = await employeesD.getRoles();
        const employees = await employeesD.getEmployees();
        const newEmp = await promptUser([
            {
                type: "input",
                message: "Enter employees first name",
                name : "empFirstName"
            },

            {
                type: "input",
                message: "enter employees last name",
                name: "empLastName"
            },
            {
                name: "empRole",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    roles.forEach((role) => {
                        const roleObj = {
                            name: role.title,
                            value: role.id
                        }
                        choiceArray.push(roleObj)
                    })
                    return choiceArray;
                },
                message: "select employee's role:"
            },
            {
                name: "empMgr",
                type: "list",
                choices: function () {
                    const choiceArray = [{name: "None", value: -1 }];
                    employees.forEach((employee) => {
                        const mgrObj = {
                            name: employee.first_name + " " + employee.last_name,
                            value: employee.id
                        }
                    })
                }
            }
        ])
    }
}