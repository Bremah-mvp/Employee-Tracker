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
                message: `\nConfirm you want delete ${empToDelete[0].first_name} ${empToDelete[0].last_name}? THIS IS IRRIVERSIBLE!`
            }
        ]);
        if (confirm.yN) {
            directReports.forEach(async (emp) => {
                try {
                    await employeesD.updateEmpMgr(null, emp.id)

                } catch (err) {
                    console.log(err)
                }

            })
            await employeesD.deleteEployee(deleteEmp.empId)
            console.log(`\n${empToDelete[0].first_name} ${empToDelete[0].last_name} deleted`)
        }
        // if (directReports.length) {
        //     console.log("\n------------------------\n")
        //     console.log("This employee is a manager. \nYou must assign these employees a new manager before this employee can be removed:\n")
        //     directReports.forEach((emp) => {
        //         console.log(`${emp.first_name} ${emp.last_name}`)
        //     })
        //     console.log("Choose the 'Update Employee Manager' task.")


        // } else {
        //     const empToRemove = await empData.getEmployeeById(deleteEmp.empId)

        //     const confirm = await promptUser([
        //         {
        //             name: "yN",
        //             type: "confirm",
        //             default: false,
        //             message: `\nAre you sure you want to remove ${empToRemove[0].first_name} ${empToRemove[0].last_name}?`
        //         }
        //     ]);
        //     if (confirm.yN) {
        //         await empData.removeEmployee(deleteEmp.empId)
        //         console.log(`\n${empToRemove[0].first_name} ${empToRemove[0].last_name} has been removed.`)
        //     }
        // }


        // get employees by mgr


        // if no employees (not a manager) - delete employee
        // tell user - sorry, this employee is a manager. You must reassign employees first.


     } catch (err) {
         console.log(err)
     }
 }

 const delDepartment = async 