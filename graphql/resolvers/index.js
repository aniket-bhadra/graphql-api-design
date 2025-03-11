import userResolvers from "./userResolvers.js";
const allResolvers = {
  Query: {
    ...userResolvers.Query,
  },
};

export default allResolvers;
