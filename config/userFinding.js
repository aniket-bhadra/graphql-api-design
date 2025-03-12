import User from "../models/userModel.js";

export const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};
