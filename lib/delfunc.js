const employeesD = require("./EmployeesD");
const cTable = require("console.table");
const inquirer = require("inquirer");
const { async } = require("rxjs");

// create a new database access to access sql query functions
 const employeesD = new employeesD();

 //  use inquirer to prompt user for information
 const promptUser = (questions) => {
     return inquirer.prompt(questions);
 };

 const delEmployee = async () => {
     try {

        // inquirer choose employee
        const employees = await employeesD.getEmployees()
        const deleteEmp = await promptUser([

            {
                name: "empId",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    employees.forEach((emp) => {
                        const empObj = {
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id
                        }
                        choiceArray.push(empObj)
                    })
                    return choiceArray;

              },
              message: "Select employee to delete:"

            },
        ]);
        const directReports = await employeesD.getEmployeesWithMgr(deleteEmp.empId)
        const empToDelete = await employeesD.getEmployeeById(deleteEmp.empId)
        const confirm = await promptUser([
            {
                name:"yN",
                type: "confirm",
                default: false,
                message: `\nAre you sure you`
            }
        ])
     }
 }