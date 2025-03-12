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
  Mutation: {
    newUser: async (_, { name, email }) => {
      const user = await User.create({ name, email });
      return user;
    },
  },
};

export default userResolvers;
