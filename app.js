const inquirer = require("inquirer");

console.log("PW4U");

const args = process.argv.slice(2);
const passwordName = args[0];
console.log(`You want to know the password of '${passwordName}'`);

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

  if (masterPassword !== secretMasterPassword) {
    console.error("You are not welcome here! 👿");
    validateAccess();
    return;
  }

  if (passwordName === "caro") {
    console.log("Password is honigblume");
  } else {
    console.log("Unknown password");
  }
}

validateAccess();
