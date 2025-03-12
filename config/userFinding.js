import Course from "../models/courseModel.js";
import User from "../models/userModel.js";

export const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

export const getCoursesOfUser = async (id) => {
  const courses = await Course.find({
    instructor: id,
  });
  return courses;
};
