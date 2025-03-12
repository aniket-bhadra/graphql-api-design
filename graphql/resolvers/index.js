import userResolvers from "./userResolvers.js";
import courseResolvers from "./courseResolvers.js";
import { getUserById } from "../../config/userFinding.js";
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
};

export default allResolvers;
