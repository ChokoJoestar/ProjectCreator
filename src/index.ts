#!/usr/bin/env node

import figlet from "figlet";
import inquirer from "inquirer";
import {
   createProject,
   initPackageInstaller,
   initTypescript,
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
      },
      {
         type: "input",
         name: "sourceDir",
         message: "Entre your source dir:",
         default: "src",
      },
      {
         type: "list",
         name: "yarnOrNpm",
         message: "Choise your package installer:",
         choices: ["npm", "yarn"],
         default: "npm",
      },
      {
         type: "confirm",
         name: "installTypescript",
         message: "Do you want to install typescript ?",
         default: true,
      },
   ])
   .then(async (responce: any) => {
      const projectDir: string = responce.projectDir;
      const sourceDir: string = responce.sourceDir;
      const packageInstaller: string = responce.yarnOrNpm;
      const installTypescript: boolean = responce.installTypescript;

      createProject(projectDir, sourceDir);
      initPackageInstaller(packageInstaller, projectDir);
      initTypescript(installTypescript, packageInstaller, projectDir);
   });
