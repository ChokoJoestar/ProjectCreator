#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import {
   createProject,
   initPackageInstaller,
   initTsConfig,
   initTypescript,
   writePackageJson,
} from "./function.js";

console.clear();
console.log(
   figlet.textSync("Project Creator", {
      horizontalLayout: "full",
   })
);

inquirer
   .prompt([
      {
         type: "input",
         name: "projectDir",
         message: "What is your project name ?",
         transformer(input, answers, flags) {
            return chalk.blue(input);
         },
      },
      {
         type: "input",
         name: "projectVersion",
         message: "What is your project version ?",
         default: "1.0.0",
         transformer(input, answers, flags) {
            return chalk.blue(input);
         },
      },
      {
         type: "input",
         name: "projectDescription",
         message: "What is your project description ?",
         transformer(input, answers, flags) {
            return chalk.blue(input);
         },
      },
      {
         type: "input",
         name: "sourceDir",
         message: "Entre your source dir:",
         default: "src",
         transformer(input, answers, flags) {
            return chalk.blue(input);
         },
      },
      {
         type: "list",
         name: "yarnOrNpm",
         message: "Choise your package installer:",
         choices: ["npm", "yarn"],
         default: "npm",
         transformer(input, answers, flags) {
            return chalk.blue(input);
         },
      },
      {
         type: "confirm",
         name: "installTypescript",
         message: "Do you want to install typescript ?",
         default: true,
         transformer(input, answers, flags) {
            return chalk.blue(input);
         },
      },
      {
         type: "confirm",
         name: "initTsConfig",
         message: "Do you want to create a tsConfig file ?",
         default: true,
         transformer(input, answers, flags) {
            return chalk.blue(input);
         },
         when(answers) {
            return answers.installTypescript;
         },
      },
   ])
   .then((responce: any) => {
      const projectDir: string = responce.projectDir;
      const projectVersion: string = responce.projectVersion;
      const projectDescription: string = responce.projectDescription;
      const sourceDir: string = responce.sourceDir;
      const packageInstaller: string = responce.yarnOrNpm;
      const installTypescript: boolean = responce.installTypescript;

      createProject(projectDir, sourceDir);
      writePackageJson(projectDir, projectVersion, projectDescription);
      initPackageInstaller(packageInstaller, projectDir);
      initTypescript(installTypescript, packageInstaller, projectDir);
      initTsConfig(projectDir, packageInstaller);
   })
   .catch((error) => {
      console.error(chalk.red(error));
   });
