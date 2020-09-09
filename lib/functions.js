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
                         choiceArray.push(mgrObj)
                    })
                    return choiceArray;
                },
                message: "Choose the employee's manager:"
            },
        ]);

        await employeesD.createEmployee(newEmp);
        console.log(`\n${newEmp.empFirst} ${newEmp.empLast} added!`)

    } catch (err) {
        console.log(err)
    }
}


const addDepartment = async () => {
    try{

        const newDept = await promptUser([
            {
                type: "input",
                message: "enter the name of the new department:",
                name: "deptName"

            },
           
        ]),
        
        await employeesD.createDepartment(newDept);
        console.log(`${newDept.deptName} department added!`)

    } catch  (err) {
        console.log(err)
    }
}

const addRole = async () => {
    try {
        const departments = await employeesD.getDepartments();
        const newRole = await promptUser([
            {
                type: "input",
                message: "enter the title of the new role:",
                name: "roleTitle"
            },

            {
                type: "input",
                message: "Enter the salary for this role:",
                name: "roleSalary"
            },
            {
                name: "roleDept",
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
                message: "Select the department for this role"
            },
        ]),

        await employeesD.createRole(newRole);
        console.log(`${newRole.roletitle} role added!`)

    } catch (err) {
        console.log(err)
    }
} 

module.exports = {addEmployee, addDepartment, addRole }