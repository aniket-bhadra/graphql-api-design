import User from "../../models/userModel.js";

// graphql/schema.js
const typeDefs = `#graphql

  type User{
    _id: ID!
    name: String!
    email: String!
    password: String
    googleId: String
    role: String!
    avatar: String!
    verified: Boolean
    createdAt: String
    updatedAt: String
  }

  type Query {
    hello: String
    wow: Int
    users: [User]
  }
`;

export default typeDefs;

//basics
// export const resolvers = {
//   Query: {
//     hello: () => "Hello, World!",
//     wow: () => 25,
//     users: async () => {
//       const users = await User.find({});
//       return users;
//     },
//   },
// };
