import userResolvers from "./userResolvers.js";
import courseResolvers from "./courseResolvers.js";
const allResolvers = {
  Query: {
    ...userResolvers.Query,
    ...courseResolvers.Query,
  },
};

export default allResolvers;
