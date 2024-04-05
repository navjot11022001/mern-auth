import User from "../models/user.model";
import bcrypt from "bcryptjs";

function getHashedPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

interface ICreateUser {
  email: string;
  name: string;
  password?: string;
  profilePhoto?: string;
}
async function createUser({
  email,
  password,
  name,
  profilePhoto,
}: ICreateUser) {
  const userPassword = password || Math.random().toString(36).slice(-8);
  const hashedPassword = getHashedPassword(userPassword);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    profilePhoto,
  });
  return user;
}
export { createUser };
