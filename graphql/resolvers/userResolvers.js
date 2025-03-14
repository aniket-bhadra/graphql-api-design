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
    deleteUser: async (_, { id }) => {
      const user = await User.findByIdAndDelete(id, {
        returnDocument: "before",
      });
      const users = await User.find({});
      return users;
    },
    updateUser: async (_, { id, updatedValue }) => {
      const updateData = {}; // Create an empty object to store only provided values

      if (updatedValue?.name) updateData.name = updatedValue.name;
      if (updatedValue?.email) updateData.email = updatedValue.email;

      if (Object.keys(updateData).length === 0) {
        throw new Error("At least one field (name or email) must be provided.");
      }

      const user = await User.findByIdAndUpdate(id, updateData, { new: true });

      return user;
    },
  },
};

export default userResolvers;
