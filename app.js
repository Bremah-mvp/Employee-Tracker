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
const 