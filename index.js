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
        message: 'Please provide a project title.  (Required)',
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
        message: 'Provide a description of your application. (Required)',
        name: 'description',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please provide a description of your application!');
                return false;
            }
        }
    },
    {
        type: 'input',
        message: 'Please provide information on the usage of your application. (Required)',
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
    {
        type: 'checkbox',
        message: 'Any additional sections you would like to include in your README?',
        name: 'contents',
        choices: [
            {
                name: 'Deployed Application',
                checked: false
            },
            {
                name: 'Installation',
                checked: false
            },
            {
                name: 'Usage',
                // checked: ''
            },
            {
                name: 'User Story',
                checked: true
            },
            {
                name: 'Acceptance Criteria and Screenshots',
                checked: true
            },
            {
                name: 'Technologies',
                checked: true
            },
            {
                name: 'License',
                checked: false
            },
            {
                name: 'Contributing',
                checked: false
            },
            {
                name: 'Tests',
                checked: false
            },
            {
                name: 'Questions',
                checked: true
            },
            {
                name: 'Credits',
                checked: true
            },
            {
                name: 'Contributors',
                checked: true
            },
        ]
    },
    {
        type: 'input',
        message: 'Please provide a link to your deployed application.',
        name: 'link',
        when: ({ contents }) => {
            if (contents.indexOf('Deployed Application') > -1) {
                return true;
            } else { 
                return false;
            }
        },
        validate: linkInput => {
            if (linkInput) {
                return true;
            } else {
                console.log('Please enter a link!');
                return false;
            }
        }
    },
    {
        type: 'input',
        message: 'Please list any required packages for installation of your application.',
        name: 'installation',
        when: ({ contents }) => {
            if (contents.indexOf('Installation') > -1) {
                return true;
            } else {
                return false;
            }
        },
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
        message: 'Please provide license information.',
        name: 'license',
        choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'ISC'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('License') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: licenseInput => {
            if (licenseInput) {
                return true;
            } else {
                console.log('Please provide license information!');
                return false;
            }
        }
    }, 
    {
        type: 'checkbox',
        message: 'Please select the technologies that your application was built with.',
        name: 'technologies',
        choices: ['HTML', 'CSS', 'SASS', 'JavaScript', 'Node.js'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('Technologies') > -1) {
                return true;
            } else {
                return false;
            }
        }
    }, 
    {
        type: 'input',
        message: 'Please enter your guidelines for contributing.',
        name: 'contributing',
        when: ({ contents }) => {
            if (contents.indexOf('Contributing') > -1) {
                return true;
            } else {
                return false;
            }
        },
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
        message: 'Please enter test information for your application.',
        name: 'tests',
        when: ({ contents }) => {
            if (contents.indexOf('Tests') > -1) {
                return true;
            } else {
                return false;
            }
        },
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
        when: ({ contents }) => {
            if (contents.indexOf('Questions') > -1) {
                return true;
            } else { 
                return false;
            }
        },
        validate: questionsInput => {
            if (questionsInput) {
                return true;
            } else {
                console.log('Please provide an email address!');
                return false;
            }
        }
    },
// ];

// array of prompts for adding acceptance criteria and screenshots
// const screenshotQuestions = [
    {
        type: 'input',
        message: 'Please provide the acceptance criteria and screenshots. (Required)',
        name: 'acceptanceCriteriaandScreenshots',
        validate: acceptanceCriteriaandScreenshotsInput => {
            if (acceptanceCriteriaandScreenshotsInput) {
                return true;
            } else {
                console.log('Please provide the acceptance criteria and screenshots!')
                return false;
            }
        }
    },
    {
        type: 'input',
        message: 'Please provide alt text for your screenshot. (Required)',
        name: 'screenshotsAlt',
        validate: screenshotsAltInput => {
            if (screenshotsAltInput) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        message: 'Please provide descriptions of your screenshots. (Optional)',
        name: 'screenshotDescriptions'
    },
    {
        type: 'confirm',
        message: 'Would you like to add another screenshot?',
        name: 'confirmAddScreenshots',
        default: true
    }
];

// array of prompts for adding credits
const creditQuestions = [
    {
        type: 'input',
        message: 'Please give your credit a name. (Required)',
        name: 'creditName',
        validate: creditName => {
            if (creditName) {
                return true;
            } else {
                console.log('Please enter a name for the credit!');
                return false;
            }
        }
    },
    {
        type: 'input',
        message: 'Please provide a link for the credit.  (Required)',
        name: 'creditLink',
        validate: creditLink => {
            if (creditLink) {
                return true;
            } else {
                console.log('Please enter a name for the credit!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        message: 'Would you like to add another credit?',
        name: 'confirmAddCredit',
        default: true
    }
]

// recursive function for adding screenshots
addScreenshots = readmeData => {
    
    // initiates screenshot array
    if (!readmeData.screenshots) {
        readmeData.screenshots = [];
    }
    console.log(`
==================
Add New Screenshot
==================
    `);
    return inquirer.prompt(screenshotQuestions)
    .then(screenshotData => {
        
        // adds the screenshot to the array
        readmeData.screenshots.push(screenshotData);
        
        // will call addScreenshots again based on user input
        if (screenshotData.confirmAddScreenshots) {
            return addScreenshots(readmeData);
        } else {
            return readmeData;
        };
    });
};

// recursive function for adding credits
addCredits = readmeInfo => {
    
    // initiates array for credits
    if (!readmeInfo.credits) {
        readmeInfo.credits = [];
    };
    console.log(`
==============
Add New Credit
==============
    `);
    return inquirer.prompt(creditQuestions)
    .then(creditData => {
        
        // adds credits to array
        readmeInfo.credits.push(creditData);
        
        // will call addCredits again based on user input
        if (creditData.confirmAddCredit) {
            return addCredits(readmeInfo);
        } else {
            return readmeInfo;
        }
    });
};

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
     .then(userResponse => { 
       
        // calls function to add screenshots based on user selection
        if (userResponse.contents.indexOf('Screenshots') > -1) {
            return addScreenshots(userResponse);
        } else {
            return userResponse;
        }
    })
    .then(response => {
        
        // calls function to add credits based on user selection
        if (response.contents.indexOf('Credits') > -1) {
            return addCredits(response);
        } else {
            return response;
        }
    })
    .then(answers => generateMarkdown(answers))
    .then(generatedReadme => writeToFile('README.md', generatedReadme))
    .catch(err => {
        console.log(err);
    });
}

// function call to initialize program
init()
   


