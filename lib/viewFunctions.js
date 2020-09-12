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
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id

                        }
                        choiceArray.push(mgrObj)
                    })
                    return choiceArray;
                },
                message: "Select the manager's employee you would like to view"
            },
        ]);
        const rows = await employeesD.getEmployeesByMgr(chosenMgr.mgrId);
        if (!rows.length) {
            console.log("manager got no employees.");

        } else {
            console.log("\n-----------\n")
            console.table(rows);
        }

    } catch (err) {
        console.log(err)
    }
}

const viewBudgetByDept = async () => {
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
                message: "Select department's total utilized budget you would like to view"

            },
        ]);
        const rows = await employeesD.getBudgetByDept(chosenDept.deptId);

        if (rows.length) {
            console.log("\n")
            console.table(rows);
        } else {
            console.log("\n--------------\n")
            console.log("No active employees in this department at the moment")
            console.log("\n--------------\n")
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {viewEmployees, viewRoles, viewDepartments, viewEmployeesByDept, viewEmployeesByMgr, viewBudgetByDept}