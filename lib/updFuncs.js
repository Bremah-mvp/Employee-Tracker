const employeesD = require("./EmployeesD");
const cTable = require("console.table");
const inquirer = require("inquirer");

// create new db access object to access sql functions
const employeesD = new employeesD();

// inquirer to prompt user for information
const promptUser = (questions) => {
    returninquirer.prompt(questions);
};

const updateEployeRole = async ()=> {
    try {
        const employees = await employeesD.getEmployees();
        const roles = await employeesD.getRole();
        const updateEmp = await promptUser([

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
                message: "Select the employee role desired to update"
            },
        ]);
       const newRole = await promptUser([
           {
               name: "roleId",
               type: "list",
               choices: function () {
                   const choiceArray = [];
                   roles.forEach((role) => {
                       const roleObj = {
                           name: role.tittle,
                           value: role.id
                       }
                       choiceArray.push(roleObj)
                   })
                   return choiceArray;
               },
           }
       ])
    }
}