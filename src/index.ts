#!/usr/bin/env node

import { exec } from "child_process";
import figlet from "figlet";
import { mkdirSync } from "fs";
import inquirer from "inquirer";

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
         name: "YarnOrNpm",
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
   .then((responce: any) => {
      const projectDir: string = responce.projectDir;
      const sourceDir: string = responce.sourceDir;
      const packageInstaller: string = responce.YarnOrNpm;
      const installTypescript: boolean = responce.installTypescript;
      const dirToCmd: string = "../cmd";

      // Create Project
      mkdirSync(projectDir);
      mkdirSync(`${projectDir}/${sourceDir}`);

      // Init Package Installer
      const cmdPackageInstaller = `${dirToCmd}/packageInstller`;
      if (packageInstaller === "npm") {
         executeShell(cmdPackageInstaller, "npm");
      } else if (packageInstaller === "yarn") {
         executeShell(cmdPackageInstaller, "yarn");
      }

      // Install Typescript
      const cmdInstallTypescript = `${dirToCmd}/installTypescript`;
      if (installTypescript) {
         if (packageInstaller === "npm") {
            executeShell(cmdPackageInstaller, "typescriptWithNpm");
         } else if (packageInstaller === "yarn") {
            executeShell(cmdInstallTypescript, "typescriptWithYarn");
         }
      }
   });

const executeShell = (dir: string, program: string) => {
   if (process.platform === "win32") {
      exec(`"${dir}/${program}.bat"`);
   } else if (process.platform === "linux") {
      exec(`"${dir}/${program}.sh"`);
   }
};
