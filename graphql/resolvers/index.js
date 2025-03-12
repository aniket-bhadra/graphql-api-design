import userResolvers from "./userResolvers.js";
import courseResolvers from "./courseResolvers.js";
import { getUserById, getCoursesOfUser } from "../../config/userFinding.js";
const allResolvers = {
  Query: {
    ...userResolvers.Query,
    ...courseResolvers.Query,
  },

  Course: {
    instructor: async (parent, args) => {
      console.log("inside Course Resolver ", parent);
      return await getUserById(parent.instructor);
    },
  },
  User: {
    courses: async (parent) => {
      const courses = await getCoursesOfUser(parent._id);
      return courses;
    },
  },
};

export default allResolvers;
