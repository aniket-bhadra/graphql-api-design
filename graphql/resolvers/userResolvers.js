import User from "../../models/userModel.js";

const userResolvers = {
  Query: {
    hello: () => "Hello, World!",
    wow: () => ({
      email: "some@email.com",
      id: 25555,
    }),
    users: async () => {
      const users = await User.find({});
      return users;
    },
  },
};

export default userResolvers;
