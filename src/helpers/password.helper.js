const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new Error(`Failed to hash password: ${error.message}`);
  }
}

async function comparePassword(inputPassword, hashedPassword) {
  try {
    console.log(
      `Input Password: ${inputPassword}, Hashed Password: ${hashedPassword}`
    );
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new Error(`Failed to compare password: ${error.message}`);
  }
}

module.exports = {
  hashPassword,
  comparePassword,
};
