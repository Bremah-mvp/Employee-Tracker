const employeesD = require("./EmployeesD");
const cTable = require("console.table");
const inquirer = require("inquirer");
const { async } = require("rxjs");

// create a new db access object to access sql query functions
const employeesD = new employeesD();

// use iquirer to promt user for infromation
const promptUser = (questions) => {
    return inquirer.prompt(questions);
};

// functions to view employee management data
const viewEmployees = async () => {
    try {
        const rows = await employeesD.getEmployees()
        console.table(rows);

    } catch (err) {
        console.log(err);
    }
}

const viewRoles = async () => {
    try {
        const rows = await employeesD.getRoles()
        console.table(rows);

    } catch (err) {
        console.log(err)
    }
}

const viewEmployeesByDept = async () => {
    try {
        const departments = await employeesD.getDepartments();
        const chosenDept = await promptUser([
            {
                name: "deptId",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    departments.forEach((dept) => {
                        const deptObj = {
                            name: dept.department,
                            value: dept.id
                        }
                        choiceArray.push(deptObj)
                    })
                    return choiceArray;
                },
                message:"Select the department's employees you would like to view"
            },
        ]);
        const rows = await employeesD.getEmployees();
        const chosenMgr = await promptUser([
            {
                name: "mgrId",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    employeesD.forEach((emp) => {
                        const mgrObj = {
                            
                        }
                    })
                }
            }
        ])
    }
}