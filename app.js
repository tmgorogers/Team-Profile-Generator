const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const http = require('http');
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRender");

const employees = [];




//They make your asynchronous code less "clever" and more readable. If you use the async keyword before a function definition, you can then use await within the function. 
//When you await a promise, the function is paused in a non-blocking way until the promise settles. ... If the promise rejects, the rejected value is thrown.//

async function askquestions() {

    const res = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What the employee's name?"
        },
        {
            type: "input",
            name: "id",
            message: " What is the employee's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's email address?"
        },
        {
            type: "list",
            name: "role",
            message: "Add an employee, or select Finish.",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "Finish"
            ]
        }
    ]);
    //request and response
    switch (res.role) {
        case "Manager":
            const phone = await inquirer.prompt([
                {
                    type: "input",
                    name: "officeNumber",
                    message: "What's the manager's office number?"
                }

            ]);
   
            employees.push(
            new Manager(res.name, res.Id, res.email, phone.officeNumber)
        );
        addAnotherEmployee();
    
        break;

    case "Engineer":
        
        const gitHub = await inquirer.prompt([
            {
                type: "input",
                name: "gitHubUsherName",
                message: "What the engineer's github username?"
            }
        ]);
        employees.push(
            new Engineer(res.name, res.id, res.email, gitHub.gitHubUserName)
        );
        addAnotherEmployee() 

        break;

        case "Intern":
            const school = await inquirer.prompt([
          {
                type: "input",
                name: "schoolName",
                message: "Which school does the intern go to?"
          }
            ]);
            employees.push(
                new Intern(res.name, res.id, res.email, school.schoolName)
            );

            addAnotherEmployee();
            break;
            default:
            }
        }
     askquestions();
     
     async function addAnotherEmployee() {
const addMoreEmployee = await inquirer.prompt([
    {
        type: "confirm",
        name: "addAgain",
        message: "Do you want to add another employee?"
    }
]);
addMoreEmployee.addAgain === true ? askquestions() : buildTeam(employees);
     }    
     
function buildTeam(employees){
    
    if (!fs.existsSync(OUTPUT_DIR)){
       fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(employees), "team.html");
    console.log("Created a team.html file")
};

//init()