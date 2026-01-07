import bcrypt from "bcrypt";

(async () => {
  const password = "Admin@123";
  const hash = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hash);
})();
