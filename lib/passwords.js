// const fs = require("fs").promises;
const CryptoJS = require("crypto-js");
const { collection } = require("./database");
const { readMasterPassword } = require("./masterPassword");

// async function readPasswordSafe() {
//   const passwordSafeJSON = await fs.readFile("./db.json", "utf8");
//   const passwordSafe = JSON.parse(passwordSafeJSON);
//   return passwordSafe;
// }

// async function writePasswordSafe(passwordSafe) {
//   await fs.writeFile("./db.json", JSON.stringify(passwordSafe, null, 2));
// }

// async function findCollection() {
//   const passwordsCollection = await collection("passwords").find({});
//   return passwordsCollection;
// }

async function findPasswordByName(passwordName) {
  const passwordObject = await collection("passwords").findOne({
    name: passwordName,
  });
  return passwordObject;
}

async function getPassword(passwordName) {
  const passwordObject = await findPasswordByName(passwordName);
  const passwordValue = passwordObject.value;
  const passwordBytes = CryptoJS.AES.decrypt(
    passwordValue,
    await readMasterPassword()
  );
  return passwordBytes.toString(CryptoJS.enc.Utf8);
}

async function setPassword(passwordName, newPasswordValue) {
  const encryptedValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    await readMasterPassword()
  ).toString();

  await collection("passwords").insertOne({
    name: passwordName,
    value: encryptedValue,
  });
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
