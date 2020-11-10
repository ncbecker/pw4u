const inquirer = require("inquirer");
const fs = require("fs").promises;

console.log("PW4U");

const secretMasterPassword = "baum";

const questions = [
  {
    type: "input",
    name: "masterPassword",
    message: "What is the super secret master password?",
  },
];

async function validateAccess() {
  const { masterPassword } = await inquirer.prompt(questions);

  const passwordSafeJSON = await fs.readFile("./db.json", "utf8");
  const passwordSafe = JSON.parse(passwordSafeJSON);

  if (masterPassword !== secretMasterPassword) {
    console.error("You are not welcome here! 👿");
    validateAccess();
    return;
  }

  const args = process.argv.slice(2);
  const passwordName = args[0];
  console.log(`You want to know the password of '${passwordName}'`);

  const password = passwordSafe[passwordName];
  if (password) {
    console.log(`Password is ${password}`);
  } else {
    console.log("Unknown password");
  }
}

validateAccess();
