import User from "../../models/userModel.js";

const userResolvers = {
  Query: {
    hello: () => "Hello, World!",
    wow: () => 25,
    users: async () => {
      const users = await User.find({});
      return users;
    },
  },
};

export default userResolvers;
