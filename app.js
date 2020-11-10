console.log("PW4U");

const args = process.argv.slice(2);
const passwordName = args[0];
console.log(`You want to know the password of '${passwordName}'`);

if (passwordName === "caro") {
  console.log("Password is honigblume");
} else {
  console.log("Unknown password");
}
