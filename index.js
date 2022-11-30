// Packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');
// const generateMarkdown = require('./utils/generateMarkdown.js');
// const { log } = require('console');

// MIT License ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
// [License](#license)
// choices: [‘MIT’, ‘APACHE 2.0’, ‘GPL 3.0’, ‘BSD 3’, ‘None’],

// array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'Please provide your first and last name.  (Required)',
        name: 'first and last name',
        validate: firstAndLastNameInput => {
            if (firstAndLastNameInput ) {
                return true;
            } else {
                console.log('Please provide your first and last name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        message: 'What is the title of your project?  (Required)',
        name: 'title',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please provide a project title!');
                return false;
            }
        }
    },
    {
        type: 'input',
        message: 'Please enter your GitHub username. (Required)',
        name: 'github',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        message: 'Please enter the name of your repo. (Required)',
        name: 'repo',
        validate: repoInput => {
            if (repoInput) {
                return true;
            } else {
                console.log('Please enter the name of your repo!')
            }
        }
    },
    {
        type: 'input',
        message: 'Please provide a short description of your project. (Required)',
        name: 'description',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please provide a short description of your project!');
                return false;
            }
        }
    },
    {
        type: 'input',
        message: 'What does the user need to know about using your application. (Required)',
        name: 'usage',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please provide information on the usage of your application!');
                return false;
            }
        }
    },
    // {
    //     type: 'input',
    //     message: 'Please provide a link to your deployed application.',
    //     name: 'link',
    //     validate: linkInput => {
    //         if (linkInput) {
    //             return true;
    //         } else {
    //             console.log('Please enter a link!');
    //             return false;
    //         }
    //     }
    // },
    {
        type: 'input',
        message: 'What command should be run to install dependencies?',
        name: 'installation',
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log('Please enter installation instructions!');
                return false;
            }
        }
    },
    {
        type: 'list',
        message: 'Please choose a license for your application',
        name: 'license',
        choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'ISC'],
        default: 0,
        validate: licenseInput => {
            if (licenseInput) {
                return true;
            } else {
                console.log('Please provide a license for your application!');
                return false;
            }
        }
    }, 
    {
        type: 'input',
        message: 'Please enter your guidelines for contributing.',
        name: 'contributing',
        validate: contributingInput => {
            if (contributingInput) {
                return true;
            } else {
                console.log('Please enter guidelines for contributing!');
                return false;
            }
        }
    },
    {
        type: 'input',
        message: 'What command shoud be run to run tests?',
        name: 'tests',
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('What packages are required to run tests for your application?');
                return false;
            }
        }
    },
    {
        type: 'input',
        message: 'Please provide an email address for others to reach you with questions.',
        name: 'questions',
        validate: questionsInput => {
            if (questionsInput) {
                return true;
            } else {
                console.log('Please provide an email address!');
                return false;
            }
        }
    },

];


// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(`./dist/${fileName}`, data, err => {
        if (err) {
            throw err
        };
        console.log('README created!')
    });
};

// function to initialize program
function init() {
     inquirer.prompt(questions)
    
    .then(answers => generateMarkdown(answers))
    .then(generatedReadme => writeToFile('README.md', generatedReadme))
    .catch(err => {
        console.log(err);
    });
}

// function call to initialize program
init()
   


