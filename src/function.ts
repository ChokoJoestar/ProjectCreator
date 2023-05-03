import { exec } from "child_process";
import { mkdirSync, writeFileSync } from "fs";
const dirToCmd: string = "../data";

export const createProject = (projectDir: string, sourceDir: string) => {
   mkdirSync(projectDir);
   mkdirSync(`${projectDir}/${sourceDir}`);
};

export const initPackageInstaller = (
   packageInstaller: string,
   projectDir: string
) => {
   const cmdPackageInstaller = `${dirToCmd}/packageInstaller`;
   if (packageInstaller === "npm") {
      executeShell(cmdPackageInstaller, "npm", projectDir);
   } else if (packageInstaller === "yarn") {
      executeShell(cmdPackageInstaller, "yarn", projectDir);
   }
};

export const initTypescript = (
   installTypescript: boolean,
   packageInstaller: string,
   projectDir: string
) => {
   const cmdInstallTypescript = `${dirToCmd}/installTypescript`;
   if (installTypescript) {
      if (packageInstaller === "npm") {
         executeShell(cmdInstallTypescript, "typescriptWithNpm", projectDir);
      } else if (packageInstaller === "yarn") {
         executeShell(cmdInstallTypescript, "typescriptWithYarn", projectDir);
      }
   }
};

export const writePackageJson = (
   projectDir: string,
   projectVerison: string,
   projectDescription: string,
) => {
   const packageJson = `${projectDir}/package.json`;
   const packageJsonContent = `
   {
      "name": "${projectDir.toLowerCase()}",
      "description": "${projectDescription}",
      "version": "${projectVerison}",
      "main": "index.js"
      "license": "MIT"
      "scripts": {
         "start": "node ."
      },
      "dependencies": {},
      "devDependencies": {}
   }`;
   writeFileSync(packageJson, packageJsonContent);
};

export const executeShell = (
   dir: string,
   program: string,
   projectDir: string
) => {
   let cmd = "";
   if (process.platform === "win32") {
      cmd = `cd /d ${projectDir} && "${dir}/${program}.bat"`;
   } else if (process.platform === "linux" || process.platform === "darwin") {
      cmd = `cd ${projectDir} && "${dir}/${program}.sh"`;
   } else {
      console.error("Unsupported platform:", process.platform);
      process.exit(1);
   }

   exec(cmd, (error, stdout, stderr) => {
      if (error) {
         console.error("Command failed:", error);
         console.error("stderr:", stderr);
         process.exit(1);
      }
   });
};
