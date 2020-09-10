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

 const delDepartment = async () => {
     try {
         const departments = await employeesD.getDepartment();
         const remove = await promptUser([
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
                 message: "Select the department you want to delete?"
             },
         ]);

         // Search for roles in the department
         const deptRoles = await employeesD.getRolesByDept(remove.deptId);

         if (deptRoles.length) {
             console.log("\n-----------\n")
             console.log("Roles in use still in department:")
             deptRoles.forEach((role) => {
                 console.log(role.title)

             })
             console.log("deleting the department gets rid of all the roles and employess too")
             console.log("\n-----------\n")
         }

         const deleteDept = await employeesD.getDeptById(remove.deptId);
         const confirm = await promptUser([
             {
                 name: "yN",
                 type: "confirm",
                 default: false,
                 message: `\nConfirm you want to delete ${deleteDept[0].department}? THIS IS IRRIVERSIBLE!`

             }
         ]);

         if (confirm.yN) {
             await employeesD.deleteRole(remove.deptId)
             console.log(`\n${deleteRole[0].title} role deleted.`)
         }
         // if roles are found
        // ask user to change role to another department?
        // const id = parseInt(remove.deptId)
        // await empData.removeDepartment(id);
        // console.log(`Removed!`)

     } catch (err) {
         console.log(err)
     }
 }

 module.exports = { delDepartment, delEmployee, delRole }