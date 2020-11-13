const kleur = require("kleur");
const { readCommandLineArguments } = require("./lib/commandLine");
const { connect, close } = require("./lib/database");
const { getPassword, setPassword } = require("./lib/passwords");
const { askForMasterPassword } = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");
require("dotenv").config();

async function run() {
  console.log("Connecting to database...");

  await connect(process.env.DB_URL, process.env.DB_NAME);

  console.log("Connected to database 🎉");

  const [passwordName, newPasswordValue] = readCommandLineArguments();

  const masterPassword = await askForMasterPassword();

  if (!(await isMasterPasswordCorrect(masterPassword))) {
    console.error("You are not welcome here! 👿 Try again!");
    return run();
  }

  if (!passwordName) {
    console.error("Missing password name!");
    return process.exit(9);
  }

  if (newPasswordValue) {
    await setPassword(passwordName, newPasswordValue);
    console.log(`Password ${passwordName} set 🎉`);
  } else {
    const passwordValue = await getPassword(passwordName);
    console.log(`Your password is ${passwordValue} 🎉`);
  }
  await close();
}

run();
