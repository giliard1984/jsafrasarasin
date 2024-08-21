import bcrypt from "bcryptjs";

// it creates the hashed password
export const hashedPassword = (password: string): string => {
  // To ensure the strength of our password hashes, we determine the number of salt rounds.
  // This value dictates the computational cost of hashing and, consequently, the level of security.
  const salt = bcrypt.genSaltSync(10);

  // Once the salt is generated, we combine it with the user's password to compute the hash using
  // the bcrypt.hash() function. This results in a securely hashed password ready for storage.
  return bcrypt.hashSync(password, salt);
}

// it compares the provided password against the hashed one
export const doesPasswordMatch = (password: string, hashedPassword: string): boolean => {
  // To verify a password using bcrypt, use the bcrypt.compare() function.
  // This function compares a plaintext password provided by the user during login with the hashed
  // password stored in the database.
  return bcrypt.compareSync(password, hashedPassword);
}
