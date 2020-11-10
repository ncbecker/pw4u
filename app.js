const inquirer = require("inquirer");

console.log("PW4U");

const passwordSafe = {
  wifi: "123",
  gmail: "321",
};
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
