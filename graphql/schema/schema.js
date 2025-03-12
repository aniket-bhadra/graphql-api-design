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

  type Course {
    _id: ID!
    title: String!
    description: String!
    instructor: User!
    ratingsAverage: Int!
    ratingsQuantity: Int!
    price: Int!
    category: String!
    subCategory: String!
    level: String!
    language: String!
    whatYouWillLearn: [String!]!
    requirements: [String!]!
    targetAudience: [String!]!
    isPublished: Boolean!
    isFree: Boolean!
    isApproved: Boolean!
    isRejected: Boolean!
    isFeatured: Boolean!
    isTrending: Boolean!
    isBestseller: Boolean!
    coverImage: String!
    previewVideo: String!
    students: [String!]!
    createdAt: String!
    updatedAt: String!
  }

# This defines how many queries we can execute. In the client, if we execute "hello," the corresponding "hello" resolver starts executing.  
#  If we mention "wow" in the client, the corresponding "wow" resolver will execute.  
# So, here is a list of queries that shows the available queries. In the client, we call them, and the respective resolver starts executing.  
# That resolver should return what is defined here in the schema. This way, we have to expose all the fields defined inside the schema,  
#  and then the user decides what the response structure should be by selecting the fields from these exposed fields.


# so,

# - This is the list of queries available to execute.  
# - Each query has its own resolver function.  
# - The resolver function returns the specific data type mentioned in the schema.  
# - Some resolvers take arguments (e.g., course(id: ID!)), while others do not (hello, wow, users, courses).  
# - Even if a resolver doesn’t take arguments, it still exists as a function to return the corresponding data.  
# - In this case, the course query requires an id argument to fetch a specific course, while courses returns all courses.  

# So **every query has a resolver function**, but not all resolvers require arguments.

  type Query {
    hello: String
    wow: Int
    users: [User]
    courses: [Course]
    course(id: ID!): Course
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
