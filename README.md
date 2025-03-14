# Introduction

GraphQL is a query language for APIs developed by Facebook (Meta). Unlike REST, which uses multiple endpoints for different resources, GraphQL provides a single endpoint where clients can request exactly the data they need, in the structure they want.

GraphQL sits as an interface between clients and backend services, allowing it to aggregate multiple resource requests into a single query, reducing the need for multiple round-trips to the server.

HTTP, WebSockets (WS), SMTP → Protocols (define how communication happens between client and server).  
REST, GraphQL, gRPC, tRPC → Architectural styles/techniques (define how we use HTTP for communication).

## GraphQL vs REST

### Key Similarities

- Both use HTTP protocols for communication
- Both can send requests via URLs
- Both can return JSON responses in the same shape

### Key Differences

#### 1. Client Control vs Server Control

- **REST:** The API developer decides what data structure is returned from each endpoint
- **GraphQL:** The client decides the response shape by selecting only the fields they need in their query

#### 2. Resource Identification

- **REST:** Uses URLs to access resources (e.g., `/users/1`)
- **GraphQL:** Uses a schema to define available resources and their relationships

#### 3. Request Structure

- **REST:** Uses different HTTP methods (GET, POST, PUT, DELETE) on different endpoints
- **GraphQL:** Uses a single endpoint with POST requests containing queries or mutations

#### 4. Data Fetching

- **REST:** Often requires multiple requests to fetch related resources
- **GraphQL:** Can fetch multiple related resources in a single request

#### 5. Response Handling

- **REST:** Fixed response structure → **Over-fetching/Under-fetching possible** but **caching is easier** since responses are predictable
- **GraphQL:** No fixed response → **No over-fetching/under-fetching**, but **caching is harder** because responses vary per request

### Comparison of API Styles

1. **REST** (Traditional, resource-based)

   - **How it works:** Uses URLs to access resources (e.g., `/users/1`)
   - **Pros:** Simple, widely used, caching is easy
   - **Cons:** Fixed response structure, over-fetching/under-fetching of data

2. **GraphQL** (Flexible, query-based)

   - **How it works:** Clients request only the data they need
   - **Pros:** No over-fetching, flexible
   - **Cons:** More complex, caching is harder,because responses vary per request.

3. **gRPC** (Fast, binary communication)

   - **How it works:** Uses Protocol Buffers (Protobuf) instead of JSON, faster than REST
   - **Pros:** Super fast, great for microservices
   - **Cons:** Harder to debug, not browser-friendly

4. **tRPC** (Type-safe API for TypeScript)
   - **How it works:** Uses TypeScript to ensure client-server type safety
   - **Pros:** No need to write API schemas, easy for TypeScript projects
   - **Cons:** Limited to TypeScript/JavaScript

### When to Use GraphQL vs REST

#### Choose REST when:

- Building smaller applications
- Creating public-facing APIs where simplicity is key
- When HTTP caching is critical
- Your API consumers don't need flexible data fetching

#### Choose GraphQL when:

- Clients need to request specific structures of data
- Your data has many relationships between resources
- Multiple clients need different data from the same resources

With **REST**, you can achieve what **GraphQL** does, but it requires **many endpoints** for different data needs (e.g., `/user-basic`, `/user-details`). GraphQL simplifies this by allowing **one endpoint** where the client requests only the needed data.
In a REST API, the developer decides which data structures to return for each endpoint.
in GraphQL As developers, we expose all fields defined in the schema, but the client decides the response shape by selecting only the fields they need in their query.

### **GraphQL: Benefits & Drawbacks**  

#### **Benefits:**  
- **Precise Data Fetching:** Clients request only needed fields, avoiding over-fetching/under-fetching.  
- **Single Request for Multiple Resources:** Fetch complex, nested data in one API call.  
- **Strong Typing & Validation:** Schema defines data structure, catching errors early.  
- **Improved Security:** Schema restricts access, reducing accidental data leaks.  
- **Graph Data Structure:** Naturally models relationships between resources.  

#### **Drawbacks:**  
- **Tooling Requirements:** Needs specialized client/server libraries, higher setup effort than REST.  
- **Caching Difficulties:** Uses HTTP POST, limiting standard caching; custom caching needed.  
- **Complex Query Construction:** Requires specifying exact queries, unlike REST’s simple endpoints.  
- **N+1 Problem:** Can trigger excessive database requests; needs batching/caching to optimize.  

## GRAPHQL Architecture
In **GraphQL**, the client sends a query using an **HTTP POST request** to the GraphQL server. On the server, the developer defines a **schema** that decides what types of requests the client can send and what types of data it can ask for. The client’s query must match this schema. If not, there will be a **mismatch**. The schema acts like a **contract** between the client and server, saying, “You can only ask for what is listed here.”  

Each query has a **resolver** on the server. The GraphQL server can fetch data in different ways:  
- It can get data **directly from the database**.  
- It may call a **REST API**, which then gets data from a database.  
- It may call a **microservice**, which fetches data from its database.  
- It may call another **backend service**, which has its own database.  

No matter how the data is fetched, the external service sends the data back to the **GraphQL server**, which then **sends a JSON response** to the client.  

In **REST**, the client sends a request to a **URL** using methods like **GET, POST, PUT, PATCH, or DELETE**. The server receives the request, processes it, talks to the **database if needed**, and then **sends a response** back to the client. REST is **simple and direct** compared to GraphQL.

## GraphQL Core Concepts

### Schema and Types

GraphQL uses a schema to define the structure of available data. The schema acts as a contract between the client and server:

```graphql
type Book {
  id: ID
  title: String
  authors: [Author]
}

type Author {
  id: ID
  name: String
  books: [Book]
}
```

In GraphQL, you always send a POST request with a body containing information about what data you want to retrieve or modify.

### GraphQL Operations

There are three main operations in GraphQL:

1. **Queries** - For reading data

   - Examples: Fetching all posts or a single post
   - Similar to GET requests in REST

2. **Mutations** - For writing data

   - Examples: Creating, updating, or deleting resources
   - Similar to POST, PUT, DELETE in REST

3. **Subscriptions** - For listening to changes in real-time
   - Example: Chat applications or live polling
   - Uses WebSockets in the background
   - No direct equivalent in standard REST

Example of a typical Query definition:

```graphql
type Query {
  hello: String
  wow: Testing
  users: [User]
  courses: [Course]
  course(id: ID!): Course
}
```

This defines how many queries we can execute:

- If we execute "hello," the corresponding "hello" resolver starts executing
- If we mention "wow" in the client, the corresponding "wow" resolver will execute
- Each query has its own resolver function
- Some resolvers take arguments (e.g., course(id: ID!)), while others do not (hello, wow, users, courses)
- Even if a resolver doesn't take arguments, it still exists as a function to return the corresponding data

### Type Definitions (!-notation)

In GraphQL schema, the exclamation mark `!` indicates non-nullable fields. Here's what different notations mean:

```
[String]   → ✅ null, ✅ [null, "Lesson 2"], ✅ ["Lesson 1", "Lesson 2"]
[String]!  → ❌ null, ✅ [null, "Lesson 2"], ✅ ["Lesson 1", "Lesson 2"]
[String!]  → ✅ null, ❌ [null, "Lesson 2"], ✅ ["Lesson 1", "Lesson 2"]
[String!]! → ❌ null, ❌ [null, "Lesson 2"], ✅ ["Lesson 1", "Lesson 2"]
```

## Resolvers

### Basic Resolver Concepts

In GraphQL, whatever data structure we define in the schema for a particular query, if that query's resolver omits one of the fields and the client requests that omitted field, it will return null. But if that field is defined as non-nullable and the resolver does not provide it, querying that field on the client side will result in an error.

If the resolver provides extra fields that are not defined in the schema, those fields will not be accessible to the client, since the client can only access fields defined inside the schema.

If there is a Course document that has an instructor field linked to the User model and we define instructor as a User type in the schema but do not populate it in the resolver, when we try to access instructor's fields (e.g., name), we will get an error because the instructor is not populated.

If we fetch a course document without populating the instructor, we won't get an error when querying other course fields. The error only occurs when we try to access instructor's fields, as they are not available due to the missing population.

### Resolver Chaining

With each query, a **resolver** is attached. Some resolvers take arguments, while others don't, but every query has a resolver that **gets executed when the query is run on the client**.

Along with queries, we can also attach resolvers to specific fields of **custom types**. For example, we can define a resolver for the **Course** type's `instructor` field.

- If only the `course` **title** is queried, **only one resolver runs**: the `course` query resolver.
- The `instructor` field resolver runs **only if the instructor field is queried on the client**.

This means that whatever the instructor resolver returns becomes the value of the instructor field in the response.

Execution flow when querying **instructor**:

1. The `course` query resolver runs first and fetches the course document.
2. Then, the `instructor` resolver runs, where **`parent`** is the **Course document** from the `course` query.
3. The `instructor` resolver fetches the **User** data linked to that course.

So, resolvers **cascade** based on the fields being queried.

#### Simple TypeDefs Schema Example

```graphql
type User {
  id: ID!
  name: String!
}

type Course {
  id: ID!
  title: String!
  instructor: User!
}

type Query {
  course(id: ID!): Course
}
```

This schema helps you remember the concept easily:

- **Query `course(id: ID!)`** → Runs only the `course` query resolver.
- **Query `course(id: ID!) { title }`** → Runs only the `course` resolver.
- **Query `course(id: ID!) { instructor { name } }`** → Runs **both resolvers** (`course` query resolver first, then `instructor` field resolver).

#### Resolvers Example

```javascript
const courses = [
  { id: "1", title: "GraphQL Basics", instructor: "101" },
  { id: "2", title: "Advanced GraphQL", instructor: "102" },
];

const users = [
  { id: "101", name: "Alice" },
  { id: "102", name: "Bob" },
];

const resolvers = {
  Query: {
    course: (parent, args) => {
      console.log("Inside course query resolver");
      return courses.find((course) => course.id === args.id);
    },
  },
  Course: {
    instructor: (parent) => {
      console.log("Inside instructor field resolver", parent);
      return users.find((user) => user.id === parent.instructor);
    },
  },
};

export default resolvers;
```

#### The `parent` Parameter

**Answer 1: What does `parent` contain in the resolver attached to `course` query?**

- In the **query resolver (`course` query)**, `parent` is always **empty (`undefined`)** because **no resolver ran before it**.
- `parent` only has a value when a **previous resolver** has already executed and passed data forward.

**Answer 2: How does cascading work, and how is it like `next()` in REST?**

- When querying **`course { instructor { name } }`**, two resolvers run:
  1. **First**, `course` resolver runs and returns the course object.
  2. **Then**, `instructor` resolver runs, where `parent` contains the **course object returned from the previous resolver**.
- This is similar to `next()` in REST, where one function passes data to the next.

**Normally, GraphQL does this automatically**, so we don't need to manually call the next resolver.

**Key Takeaways:**

- For query resolvers (Query.xyz) → parent is empty (because it's the first resolver).
- For field resolvers (Type.field) → parent contains the parent object (because it's passed from the previous resolver).
- parent is only useful when attaching resolvers to custom type fields.
- If we just query normally (without custom field resolvers), parent is redundant.
- 🚀 In short: parent is useful only when resolving nested fields in custom types!

#### Complex Resolver Chaining Example

```javascript
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
```

How It Works:

- If you query multiple courses (courses query), parent will be an array of course objects.
- When the client requests the instructor field, GraphQL runs Course.instructor resolver for each course individually.
- So, if there are 10 courses, the instructor resolver runs 10 times, each time resolving the instructor for one course.

Key Takeaway:

- It doesn't run once for the entire array; instead, it executes separately for each course document
- It depends on parent:
  - If parent is a single object (e.g., when querying a single course using course(id: ID!)), the resolver runs once for that course.
  - If parent is an array of objects (e.g., when querying multiple courses using courses), the resolver runs separately for each course in the array.

- so, parent is whatever the previous resolver returns.

- In a query resolver, parent is undefined (since no resolver ran before it).
- In a field-level resolver, parent is the value returned by the query resolver (or another parent resolver).
### The N+1 Problem

Let's consider a scenario where we have two collections: books and authors.

#### REST Approach

To get a list of books with their author details using REST:

1. Make a GET request to `/books` to retrieve all books
2. For each book, make a GET request to `/authors/{authorId}` to get the author details
3. Combine the data on the client side

This results in N+1 requests (1 request for books + N requests for each author).

```
GET /books                 → Returns: [{ id: 1, title: "Two States", authorId: 101 }, ...]
GET /authors/101           → Returns: { id: 101, name: "Chetan Bhagat", ... }
... (repeat for each book's author)
```

Alternatively, you could create a custom endpoint that returns books with populated author data, but this requires creating specific endpoints for each use case.

#### GraphQL Approach

With GraphQL, you make a single request specifying exactly what you need:

```graphql
query {
  books {
    id
    title
    author {
      id
      name
    }
  }
}
```

This returns exactly the data you requested in a single round-trip:

```json
{
  "data": {
    "books": [
      {
        "id": "1",
        "title": "Two States",
        "author": {
          "id": "101",
          "name": "Chetan Bhagat"
        }
      },
      ...
    ]
  }
}
```

However, without optimization, this can lead to many separate database queries. This illustrates precisely why the N+1 query problem exists in GraphQL:

1. 1 query fetches all users.
2. N separate queries fetch courses for each user.
3. M separate queries fetch instructors for each course.

### another N+1 problem

### More Advanced Resolver Concepts

#### 🔥 GraphQL Resolver Chaining - Summary Notes

1. How Resolvers Work in a Chain?

   - A **query resolver runs first**.
   - If a field inside the query result has its **own resolver**, it runs **only when queried**.
   - This creates a **chain of resolver executions**.

2. Resolver Execution Flow (Example: `users → courses → instructor`)
   If the client queries:

   ```graphql
   {
     users {
       name
       courses {
         title
         instructor {
           name
         }
       }
     }
   }
   ```

   **Step-by-step execution:**
   1️⃣ **`users` resolver runs** → Returns an array of users.
   2️⃣ **`courses` resolver runs for each user** → Fetches courses for that user.
   3️⃣ **`instructor` resolver runs for each course** → Fetches the instructor for that course.

3. Final Answer (🔥)
   ✅ **`users` resolver → `parent = undefined`**
   ✅ **`courses` resolver → `parent = single user object`**
   ✅ **`instructor` resolver → `parent = single course object`**

4. Important Rule (Must Remember! 🚀)
   If you attach a resolver to a **field inside a custom type**, and `parent` is **an array of objects**, then that resolver will run **separately for each item** instead of running once for the whole array.

### Simple Example of Resolver Chaining

```graphql
type User {
  id: ID!
  name: String!
  courses: [Course]
}

type Course {
  id: ID!
  title: String!
  instructor: User!
}

type Query {
  users: [User]
}
```

```javascript
const users = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
];

const courses = [
  { id: "101", title: "GraphQL Basics", instructor: "1" },
  { id: "102", title: "Advanced GraphQL", instructor: "2" },
];

const resolvers = {
  Query: {
    users: () => users, // Step 1: Fetch users
  },
  User: {
    courses: (parent) => {
      console.log("Inside User → Courses Resolver", parent);
      return courses.filter((course) => course.instructor === parent.id); // Step 2: Fetch courses for each user
    },
  },
  Course: {
    instructor: (parent) => {
      console.log("Inside Course → Instructor Resolver", parent);
      return users.find((user) => user.id === parent.instructor); // Step 3: Fetch instructor of each course
    },
  },
};

export default resolvers;
```

#### How This Creates Resolver Chaining

If the client queries:

```graphql
{
  users {
    name
    courses {
      title
      instructor {
        name
      }
    }
  }
}
```

**Execution Flow:**
1️⃣ `users` resolver runs → returns users.
2️⃣ `courses` resolver runs **for each user** → returns courses of that user.
3️⃣ `instructor` resolver runs **for each course** → returns the instructor of that course.

**🚀 Key Takeaway:**

- Each resolver runs **only when its field is queried**.
- `parent` is **whatever the previous resolver returned**.
- If `parent` is **an array**, the field resolver runs **separately for each item**.

#### Flow Details:

Yes, **all users are fetched at once**, but **courses and instructors are fetched one by one per user**.

**🚀 Correct Flow Explanation:**
1️⃣ **All users are fetched at once** → Because `users` query resolver does `() => users`, it **returns the full users array immediately**.
2️⃣ **For each user, courses are fetched separately** → Since `courses` resolver runs **for each user individually**, it filters courses for **one user at a time**.
3️⃣ **For each course, instructor is fetched separately** → Since `instructor` resolver runs **for each course individually**, it finds the instructor for **one course at a time**.

**🔥 Important Clarification:**

- **Users are fetched once** (in bulk).
- **Courses are fetched one user at a time** (looping over users).
- **Instructors are fetched one course at a time** (looping over courses).

**Final Order of Execution (Step-by-Step)**
✅ **Fetch all users (once)**.
✅ **For User 1 → Fetch their courses (one by one) → Fetch each course's instructor**.
✅ **For User 2 → Fetch their courses (one by one) → Fetch each course's instructor**.
✅ **Repeat for other users**.

SO,

Suppose I need users, so the **users resolver runs** and gets me users.

Now, if I want:

```graphql
users {
  courses {
    id
  }
}
```

In this case, the `courses` field has its **own resolver**, where we manually **search for that particular user’s enrolled courses** by calling `Course.find({ userId })`.

- We get `userId` from this resolver’s **parent**.
- This resolver **runs for all users**, to find the courses enrolled by each user.
- **We have to do this manually**, because GraphQL **just calls the resolver when the user queries it** and **passes the user as `parent`**.

---

Now, if the user wants:

```graphql
users {
  courses {
    id
    instructor {
      name
    }
  }
}
```

In this case, I want **instructor names**.

- **First**, the `users` resolver runs and fetches all users.
- **Then**, the `courses` resolver runs and fetches all courses for each user.
  - We do this using `parent` → `Course.find({ userId: parent.id })`.
  - This **runs for all users**, so we **have to fetch manually**.
- **Then**, the `instructor` resolver runs.
  - Here also, we **manually** fetch `User.find({ _id: parent.instructorId })`.
  - Here, `parent` means **each course**, and this gets us **all the instructor details**.
- This entire operation is **done manually** by us.
- **GraphQL only calls resolvers in a chain and provides the previous resolver's result as `parent`**.

 but Without optimization, this can lead to many separate database queries,This illustrates precisely why the N+1 query problem exists in GraphQL and why patterns like DataLoader are often implemented in production applications - to batch these individual fetch operations for better performance

1 query fetches all users.
N separate queries fetch courses for each user.
M separate queries fetch instructors for each course.

Simple Solution: Use DataLoader

### DataLoader

#### What is DataLoader?
DataLoader is a library created by Facebook to solve the N+1 query problem in GraphQL by batching and caching database requests.

#### Where Does DataLoader Come From?

It is an external Node.js library that you install separately. It works outside of GraphQL but is commonly used in GraphQL resolvers to reduce redundant database queries.

#### Benefits:

- ✅ Batches multiple database requests into one query.
- ✅ Caches results to avoid duplicate queries.

#### Without DataLoader (N+1 Problem)

- Fetch 1 user → N separate queries for courses → M separate queries for instructors
- Too many queries → Slow performance

#### With DataLoader (Optimized)

- Fetch 1 user → Batch fetch all courses in 1 query → Batch fetch all instructors in 1 query
- Fewer queries → Faster performance 🚀

#### Why Use DataLoader?

- Reduces database load ✅
- Prevents duplicate queries ✅
- Faster response times ✅

#### Example Implementation:

```javascript
import DataLoader from "dataloader";
import Course from "./models/courseModel.js";
import User from "./models/userModel.js";

// Batch function to fetch courses for multiple users at once
const courseLoader = new DataLoader(async (userIds) => {
  const courses = await Course.find({ instructor: { $in: userIds } });
  return userIds.map((id) =>
    courses.filter((course) => course.instructor.toString() === id)
  );
});

// Batch function to fetch instructors for multiple courses at once
const instructorLoader = new DataLoader(async (courseIds) => {
  const users = await User.find({ _id: { $in: courseIds } });
  return courseIds.map((id) =>
    users.find((user) => user._id.toString() === id)
  );
});

const resolvers = {
  Query: {
    users: () => User.find(), // Fetch all users at once
  },
  User: {
    courses: (parent) => courseLoader.load(parent.id), // Batch fetch courses
  },
  Course: {
    instructor: (parent) => instructorLoader.load(parent.instructor), // Batch fetch instructors
  },
};

export default resolvers;
```

#### What is DataLoader Doing?

- ✅ It waits for all loop iterations to finish.
- ✅ Then, it collects all load(id) requests.
- ✅ After that, it runs a single batch function with all collected IDs.
- ✅ Finally, it returns the correct data to each request.
- ✅ First, fetch all courses in one query ($in: userIds).
- ✅ Then, use .map() to loop over each user and .filter() to get only their courses.
- ✅ Finally, return an array where each user gets the correct list of courses.

---

### **📌 Difference Between GraphQL and Mongoose `populate()`**

- In `populate()`, we just **provide the field to populate**, and **Mongoose automatically fetches the related data behind the scenes**.
- But in GraphQL, we **have to manually fetch related data from the database** and return it.
- **GraphQL only calls resolvers in a chain and passes `parent`, but it does not fetch anything for us**.

---

### **📌 GraphQL Schema vs Mongoose Schema**

- **In the GraphQL schema**, we **must define relationships** between `User` and `Course`.
- **In the database (Mongoose Schema), we must also define the same relationship**.
- Even if we **don’t use `populate()`**, we **still need to define relationships** in both GraphQL and Mongoose **for everything to work properly**.

---

### **📌 GraphQL’s Biggest Advantage & Disadvantage**

✅ **Biggest Advantage:** Users can **decide exactly what they want** in a single query.  
❌ **Biggest Disadvantage:** Since users can query **any nested data**, GraphQL **may cause too many database queries (N+1 problem)**.

- **GraphQL executes resolvers in a chain**, which means **it may hit the database repeatedly**.
- If GraphQL is **not optimized**, it can **potentially crash the database** due to excessive queries.
- **That is why GraphQL should always be implemented in an optimized way** (e.g., using **DataLoader** to batch database requests).

---

💡 **Final Takeaway:** GraphQL **does not fetch data**—it **only calls resolvers in a chain and provides `parent` from the previous resolver**. We **must fetch data manually**, and if not optimized, GraphQL can cause serious database performance issues. 🚀

#### General Rule: Nested Field Resolvers in GraphQL

- If you **query a nested field** and that field **has its own resolver**, the **main (parent) resolver will always run first**, even if you don't request any other fields from it.
- This happens because the nested field resolver **needs the parent object** to work, and the parent object is provided by the main resolver.
- GraphQL **resolves data in order**: first, it runs the **main query resolver**, then it executes the **resolver for the nested field**.
- Even if the client **only requests the nested field**, the main resolver **must execute first** to pass its result as `parent` to the nested field resolver.
- **In short:** GraphQL **never skips the main resolver** when resolving a nested field with its own resolver. 🚀

#### Where You Can Attach Resolvers (Final Summary 🚀)

You can attach resolvers to:
✔ Queries (Query: { users: ... })
✔ Mutations (Mutation: { createUser: ... })
✔ Custom Type Fields (User: { courses: ... })
✔ Subscriptions (for real-time updates)
✔ Interface & Union Types (to resolve correct type)
✔ Enums (for custom values)

This gives full control over how GraphQL handles data! 🚀

#### Context in Apollo Server

Context is like a global variable that is available in all resolvers.
You set context when creating the Apollo Server, and all resolvers can access it.
Modifying context inside a resolver (context.name = "Jon") won't persist across resolvers because context is created fresh for each request.

To Persist Changes to context:

```javascript
let globalContext = {}; // Stores persistent data

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { ...globalContext }; // Passes stored context to resolvers
  },
});

const courseResolvers = {
  Query: {
    course: (parent, args, context) => {
      globalContext.name = "Jon"; // Updates global context
      return { id: args.id, name: globalContext.name };
    },
  },
};
```

This works but is not thread-safe (issues in multi-user environments).
Use Redis or a database for a real persistent solution.

#### Handling Errors in Resolvers

Example Schema and Resolver:

```graphql
updateUser(id:ID!, updatedValue:UpdateUserInput!):User
```

```javascript
updateUser: async (_, { id, updatedValue }) => {
  const updateData = {}; // Create an empty object to store only provided values

  if (updatedValue?.name) updateData.name = updatedValue.name;
  if (updatedValue?.email) updateData.email = updatedValue.email;

  if (Object.keys(updateData).length === 0) {
    throw new Error("At least one field (name or email) must be provided.");
  }

  const user = await User.findByIdAndUpdate(id, updateData, { new: true });

  return user;
};
```

If an error occurs (like missing name and email), GraphQL won't return a string.
Instead, it throws an error response inside the "errors" field.

✅ If the update succeeds, GraphQL returns User.
✅ If an error occurs, GraphQL automatically sends an error response without needing a string return type.

## GraphQL Clients

### Apollo Client

#### 🟢 `useQuery` (Fetching Data)

- **Returns:** `{ data, loading, error, refetch }`
- **Takes:** `query, variables, options (onCompleted, onError, etc.)`
- **Updates:** Automatically **when the component mounts** or when `refetch()` is called.
- **Pass Variables:**
  ```js
  const { data, refetch } = useQuery(getUser, { variables: { id: "123" } }); //if variable exist
  refetch({ id: "456" });
  const { data, refetch } = useQuery(getUsers); //if no variable
  refetch();
  ```

#### 🔴 `useMutation` (Modifying Data)

- **Returns:** `[mutateFunction, { data, loading, error }]`
- **Takes:** `mutation, variables, options (onCompleted, onError, update, refetchQueries)`
- **Updates:** **Only when triggered** (unlike `useQuery`, it does not run automatically).
- **Pass Variables (2 Ways):**
  1️⃣ **Inside `mutateFunction` (if trigger exists)**
  ```js
  const [addUser] = useMutation(addUser);
  addUser({ variables: { name: "John", email: "john@example.com" } });
  ```
  2️⃣ **Inside `useMutation` (default variables)**
  ```js
  const [addUser] = useMutation(addUser, {
    variables: { name: "John", email: "john@example.com" },
  });
  ```

#### 🔄 After a Mutation (Create, Update, Delete)

- **2 Ways to Update UI After Mutation:**

1️⃣ **Using `update` (Modify Cache Directly)**

```js
const [deleteUserMutation] = useMutation(deleteUser, {
  update(cache, { data: { deleteUser } }) {
    const { users } = cache.readQuery({ query: getUsers });
    cache.writeQuery({
      query: getUsers,
      data: { users: users.filter((user) => user._id !== deleteUser._id) },
    });
  },
});
```

✅ **Efficient, no extra server request.**
❌ **Must manually handle cache updates.**

2️⃣ **Using `refetch` (Re-fetch Data from Server)**

- **Option 1: Call `refetch()` inside `onCompleted`**
  ```js
  const { refetch } = useQuery(getUsers);
  const [updateUserMutation] = useMutation(updateUser, {
    onCompleted: () => refetch(),
  });
  ```
- **Option 2: Use `refetchQueries` in Mutation**
  ```js
  const [updateUserMutation] = useMutation(updateUser, {
    refetchQueries: [{ query: getUsers }, { query: getUser }],
  });
  ```
  ✅ **Always fetches fresh data from the server.**
  ❌ **Extra server request (less efficient).**

#### Example of Using useMutation Smartly

```javascript
export default function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={deleteProject}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
}
```

#### Variable Naming in Mutations

```javascript
export const deleteUser = gql`
  mutation deleteUser($ids: ID!) {
    deleteUser(id: $ids) {
      _id
    }
  }
`;
```

- Left side (id) → Backend resolver expects this name.
- Right side ($ids) → Frontend variable to be passed inside useMutation.

The GraphQL variable ($ids) must match the variable in useMutation.
The resolver parameter (id) must match what the backend function expects. 🚀

#### 🚀 Remember:

- `useQuery` **runs on mount** and **when refetch is called**.
- `useMutation` **only runs when triggered**.
- **Pass variables in 2 ways:**
  - Inside **trigger function** (if it exists).
  - Inside **`useMutation`** (default variables).
- **After mutation, update the UI manually** (**cache update or refetch**).

### Cache Management

#### Operation Names and Caching

1️⃣ **What is an operation name?**
When you write a GraphQL query, you can give it a name.
Example:

```graphql
query GetUser {
  user(id: "1") {
    id
    name
  }
}
```

Here, `GetUser` is the **operation name**.

2️⃣ **What happens if you use different operation names for the same data?**
Example:

```graphql
query GetUser {
  user(id: "1") {
    id
    name
  }
}
```

vs.

```graphql
query FetchUser {
  user(id: "1") {
    id
    name
  }
}
```

Even though both queries fetch the **same user**, Apollo treats them as **different** because the names (`GetUser` vs. `FetchUser`) are different.
So, Apollo **makes a new network request** instead of using cached data, even if it's already present in the cache.

3️⃣ **What happens if you use the same operation name?**
Example:

```graphql
query GetUser {
  user(id: "1") {
    id
    name
  }
}
```

If this query runs **again**, Apollo **returns the cached data** instead of fetching from the server.

When you fetch all posts, Apollo stores them in the cache by ID.
If you later fetch a single post, Apollo first checks the cache using the post's ID, no matter the query name.
If the post is found in the cache, Apollo returns it from the cache (no network request).
If the post is NOT in the cache, Apollo makes a new network request.
Query name only affects caching if you fetch the same post using different queries.

#### Final Summary:

✅ **Same operation name + same data = Uses cache (no network request)**
❌ **Different operation name + same data = New network request**

#### Cache Updates After Mutations

Apollo's cache can be updated **automatically by Apollo** or **manually by developers**.



#### 🚀 When Does Apollo Automatically Update the Cache?
- Suppose we have an **array of posts** (`[Post]`) or **an array of users** (`[User]`).  
- If a **mutation returns an object with the same `__typename` and ID that already exists in the cache**, Apollo **automatically updates the cache**.  
- The component will **re-render automatically** if it depends on that data.  

✅ **Example (Auto-update works)**  
- If we **update a post** and the response contains `{ __typename: "Post", id: "123" }`, Apollo updates it because it **already exists** in the cache.  
- When a **post is liked**, and the server returns the updated post, **all queries containing that post update automatically**.  

#### **❌ When Does Apollo NOT Automatically Update the Cache?**  
1️⃣ **Creating a New Post:**  
   - When we **create a new post**, it returns `{ __typename: "Post", id: "456" }`.  
   - The **type is the same** (`Post`), but **the ID is new**, so Apollo **does not auto-update**.  
   - **Solution:** We must manually update the cache using `writeQuery()`.  

2️⃣ **Deleting a Post:**  
   - Even if the **server returns the deleted post**, Apollo **does not remove it automatically**.  
   - Why? Because **Apollo sees the same `__typename` and ID** and assumes **nothing changed**.  
   - If the **server returns an updated `posts` array**, Apollo **still does not update** because the array itself **has no ID**—only the objects inside it do.  
   - **Solution:** We must manually update the cache.  

#### **🚀 Auto Update Happens When:**
- The server response contains **the same `__typename` + `id`** as an object **already in the cache**.  
- Apollo automatically replaces the old object with the new one.  
- If the same object appears in **multiple queries**, Apollo updates it **everywhere**.  

✅ **Example:**  
- A **post is liked** in `SinglePost`, and the server sends `{ __typename: "Post", id: "123", likes: [...] }`.  
- Apollo updates the post in **all queries where it appears**, even in `getPosts`.  

#### **❌ When Manual Cache Update is Needed**
- If the mutation **adds a new object** (e.g., `createPost`).  
- If the mutation **removes an object** (e.g., `deletePost`).  
- If the **server returns an updated array**, but the array itself **has no unique ID**.  

### **🛠️ How to Manually Update the Cache?**

1️⃣ **`readQuery()` + `writeQuery()`**

```js
const [deletePost] = useMutation(DELETE_POST, {
  update(cache, { data: { deletePost } }) {
    // Read existing posts from cache
    const { posts } = cache.readQuery({ query: GET_POSTS });

    // Write updated posts back to cache after filtering out the deleted post
    cache.writeQuery({
      query: GET_POSTS,
      data: { posts: posts.filter((post) => post.id !== deletePost.id) },
    });
  },
});
```

2️⃣ **`cache.modify()`**

```js
const [deletePost] = useMutation(DELETE_POST, {
  update(cache, { data: { deletePost } }) {
    cache.modify({
      fields: {
        posts(existingPosts, { readField }) {
          return existingPosts.filter(
            (post) => readField("id", post) !== deletePost.id
          );
        },
      },
    });
  },
});
```

🚀 **Key Rule:**

- **Auto-update only works when the response has the same `__typename` + ID as an object already in cache.**
- **If you want Apollo to automatically update the cache after a mutation, you must request the id from the client in the mutation response. If an object with the same id and `__typename` already exists in the Apollo cache, it will be updated automatically.**
- **Creating & deleting need manual cache updates** (`writeQuery()` or `cache.modify()`).
- **When Apollo updates an object, it updates it across all queries that include it.**


## Advanced Topics

### When to Use Standalone Apollo Server vs. GraphQL with Express
Use GraphQL with Express if you need REST + GraphQL together.Want middleware like authentication, logging, or rate-limiting.
Use Standalone Apollo for a pure GraphQL backend.

however, GraphQL can be used directly with Express using express-graphql, which is lightweight and simple.
Apollo Server adds extra features like caching, subscriptions, and better tooling, making it ideal for production apps.
In production, Apollo Client (frontend) + Apollo Server (backend) is recommended because it provides better performance, error handling, and real-time capabilities. 🚀

### Graphql auto handles error for us
suppose,

schema is--
updateUser(id:ID!, updatedValue:UpdateUserInput!):User

resolver is-
updateUser: async (\_, { id, updatedValue }) => {
const updateData = {}; // Create an empty object to store only provided values

      if (updatedValue?.name) updateData.name = updatedValue.name;
      if (updatedValue?.email) updateData.email = updatedValue.email;

      if (Object.keys(updateData).length === 0) {
        throw new Error("At least one field (name or email) must be provided.");
      }

      const user = await User.findByIdAndUpdate(id, updateData, { new: true });

      return user;
    },

    here If an error occurs (like missing name and email), GraphQL won't return a string.

Instead, it throws an error response inside the "errors" field.
so,

✅ If the update succeeds, GraphQL returns User.
✅ If an error occurs, GraphQL automatically sends an error response without needing a string return type.

💡 No schema change needed! GraphQL handles errors for you. 🚀

### merge function

writeQuery() replaces the entire field, so Apollo warns that old data might be lost.
To avoid issues, Apollo asks for a merge function to define how old and new data should combine.
Whatever merge returns becomes the new cache data.
Without merge, Apollo may refetch data to prevent missing fields.
🚀 In short: Apollo wants merge to avoid unnecessary refetching and ensure safe cache updates!

that is why put this--inmain js-

const cache = new InMemoryCache({
typePolicies: {
Query: {
fields: {
users: {
merge(existing = [], incoming) {
return incoming; // Replace old data safely
},
},
},
},
},
});

export const apolloClient = new ApolloClient({
cache,
uri: import.meta.env.VITE_GRAPHQL_SERVER,
});

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
);
Apollo wants you to define explicitly what should happen when updates occur, which is why you added that code.
The merge function tells Apollo specifically how to handle cache updates for the "users" field. Without this explicit definition, Apollo would have to make assumptions about how to handle the data, which could lead to unnecessary refetching or unexpected behavior.
By adding return incoming, you're clearly instructing Apollo to replace the old data with the new data when updates happen, which prevents any ambiguity in how the cache should be managed.

### Authentication and Authorization

Authentication can be implemented using context in Apollo Server:

```javascript
// Create Apollo Server with context for auth
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Get the auth token from the headers
    const token = req.headers.authorization || "";

    // Verify the token and extract user data
    let user = null;
    if (token) {
      try {
        user = jwt.verify(token.replace("Bearer ", ""), "SECRET_KEY");
      } catch (error) {
        console.error("Invalid token");
      }
    }

    // Return the user in context
    return { user };
  },
});

// Example of an authenticated resolver
const resolvers = {
  Query: {
    privateData: (_, __, context) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError("You must be logged in");
      }

      // Check if user has required role
      if (context.user.role !== "ADMIN") {
        throw new ForbiddenError("Not authorized");
      }

      return "This is private data";
    },
  },
};
```

## Subscription Support
### **GraphQL Subscriptions & PubSub – Complete Summary**  

#### **1. What is PubSub?**  
- **PubSub is an in-memory event system** → It only works **inside the same server** (not for client-server communication).  
- When you **publish an event** (`pubsub.publish`), only **subscribers inside that same server** receive it.  
- **Clients will NOT get notified** unless WebSockets (or polling) are used.  
- **PubSub does not work across multiple servers** → If you have a separate **payment server**, it will NOT receive events from the main server.  

#### **How to Make It Work Across Servers?**  
- Use **Redis PubSub** instead of in-memory PubSub.  
- Use **Kafka, RabbitMQ, or another message broker** to send events between servers.  
🚀 **So, PubSub alone is only useful for internal server events, not for distributed systems or client notifications!**  

#### **2. Apollo Handles WebSockets Automatically**  
- **Apollo Server enables WebSockets for subscriptions** **by default**.  
- No need for manual `ws` setup unless scaling across multiple servers.  


##### **🚀 Server (Apollo + WebSockets)**
```js
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

// HTTP connection (for Queries & Mutations)
const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

// WebSocket connection (for Subscriptions)
const wsLink = new GraphQLWsLink(createClient({ url: "ws://localhost:4000/graphql" }));

// Choose WebSockets for subscriptions, HTTP for everything else
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

// Create Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;

```


##### **🚀 Server (Apollo + WebSockets)**
```js
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

// HTTP connection (for Queries & Mutations)
const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

// WebSocket connection (for Subscriptions)
const wsLink = new GraphQLWsLink(createClient({ url: "ws://localhost:4000/graphql" }));

// Choose WebSockets for subscriptions, HTTP for everything else
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

// Create Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;

```

##### **🚀 Client (Apollo + WebSockets)**
```js
// index.js
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

// HTTP connection (for Queries & Mutations)
const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

// WebSocket connection (for Subscriptions)
const wsLink = new GraphQLWsLink(createClient({ url: "ws://localhost:4000/graphql" }));

// Choose WebSockets for subscriptions, HTTP for everything else
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

// Create Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;

// +

import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import App from "./App";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// app.js
import { useSubscription, gql } from "@apollo/client";

const SUBSCRIBE_MESSAGES = gql`
  subscription { messageAdded { text } }
`;

const App = () => {
  const { data } = useSubscription(SUBSCRIBE_MESSAGES);
  
  return <h1>New Message: {data?.messageAdded.text}</h1>;
};

export default App;

```
1. Does Apollo Server use WebSockets automatically?
✅ Yes! Apollo Server automatically enables WebSockets for subscriptions on the same port as the HTTP GraphQL server.

2. Are WebSockets and HTTP listening on the same port?
✅ Yes! Both WebSockets (for subscriptions) and HTTP (for queries/mutations) share the same port (4000 in this case).

Queries & Mutations use HTTP (http://localhost:4000/graphql).
Subscriptions use WebSockets (ws://localhost:4000/graphql).
3. Does the Apollo Client need to connect to different ports for subscriptions?
✅ No! The same GraphQL endpoint (http://localhost:4000/graphql) handles everything.

Queries & Mutations use Apollo Client’s HTTP link.
Subscriptions use WebSockets link (ws://localhost:4000/graphql).

4️⃣ ✅ Final Summary
Apollo Server automatically enables WebSockets & HTTP on the same port (4000).
Apollo Client must use split() to switch between HTTP & WebSockets.
Subscriptions use WebSockets (ws://), while queries/mutations use HTTP (http://).
No need for separate WebSocket servers unless scaling beyond one server.
🚀 This setup fully supports Queries, Mutations & Subscriptions with Apollo Client & Server!
only In-memory PubSub setup (without WebSockets) exclusively worked inside the same server and did not notify clients in real-time.

#### **4. Key Takeaways**
- **PubSub is only for internal event handling**, not client-server communication.  
- **WebSockets enable real-time client updates** (Apollo uses them by default).  
- **Apollo Server manages everything automatically**—no need for manual `ws` setup unless scaling.  

💡 **This setup works instantly** for a single server. 🚀



### Custom Scalars and Directives

GraphQL can be extended with custom scalar types and directives:

```javascript
import { GraphQLScalarType, Kind } from "graphql";

const typeDefs = gql`
  scalar Date

  directive @auth(requires: Role = USER) on FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
    GUEST
  }

  type User {
    id: ID!
    name: String!
    registeredAt: Date!
    adminData: String @auth(requires: ADMIN)
  }
`;

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize(value) {
      return value.getTime(); // Convert Date to timestamp
    },
    parseValue(value) {
      return new Date(value); // Convert timestamp to Date
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10)); // Parse AST
      }
      return null;
    },
  }),
};
```

### Error Handling Best Practices

```javascript
import {
  ApolloError,
  UserInputError,
  ForbiddenError,
} from "apollo-server-express";

const resolvers = {
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        // Validate input
        if (!input.email.includes("@")) {
          throw new UserInputError("Invalid email format", {
            field: "email",
          });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email: input.email });
        if (existingUser) {
          throw new ApolloError("User already exists", "USER_EXISTS", {
            email: input.email,
          });
        }

        // Create user
        const user = new User(input);
        await user.save();
        return user;
      } catch (error) {
        // Log errors and rethrow
        console.error("Error creating user:", error);

        // Pass through Apollo errors
        if (error instanceof ApolloError) {
          throw error;
        }

        // Wrap other errors
        throw new ApolloError("Failed to create user", "INTERNAL_ERROR");
      }
    },
  },
};
```

### Performance Optimization

Beyond DataLoader, there are other strategies for optimizing GraphQL performance:

1. **Query Complexity Analysis:**

   - Limit the complexity of queries to prevent expensive operations
   - Implement depth limiting to prevent deeply nested queries

2. **Caching Strategies:**

   - Implement HTTP caching
   - Use persistent caching with Redis or Memcached
   - Consider Apollo Server's cache control directives

3. **Field-Level Permissions:**

   - Restrict access to certain fields based on user roles
   - Implement field-level authorization in resolvers

4. **Pagination:**
   - Implement cursor-based pagination for large collections
   - Use the `relay` connection pattern for consistent pagination

```graphql
type Query {
  posts(first: Int, after: String): PostConnection!
}

type PostConnection {
  edges: [PostEdge!]!
  pageInfo: PageInfo!
}

type PostEdge {
  node: Post!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}
```

### Federation and Microservices

For larger applications, GraphQL can be split into multiple services using Apollo Federation:

```javascript
// User Service
const userTypeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
  }

  extend type Query {
    user(id: ID!): User
    users: [User!]!
  }
`;

// Course Service
const courseTypeDefs = gql`
  type Course @key(fields: "id") {
    id: ID!
    title: String!
    instructor: User! @external
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    courses: [Course!]!
  }

  extend type Query {
    course(id: ID!): Course
    courses: [Course!]!
  }
`;
```

This approach allows different teams to manage different parts of the graph independently while presenting a unified API to clients.
