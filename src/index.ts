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
   ])
   .then((responce: any) => {
      // Create Source Dir
      const sourceDir: string = responce.sourceDir
      mkdirSync(sourceDir);

      // Init Package Installer
      const packageInstaller: string = responce.YarnOrNpm;
      if (packageInstaller === "npm") {
         exec("npm init")
      } else if (packageInstaller === "yarn"){
         exec("yarn init")
      }
   });
