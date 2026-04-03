module.exports = {
  name: "MERN Stack",
  slug: "mern",
  description: "Full-stack web development with MongoDB, Express, React, and Node.js",
  levels: [
    // ─── BEGINNER ───────────────────────────────────────────────
    {
      level: "beginner",
      sections: [
        {
          title: "JavaScript Foundations",
          description: "Core JavaScript concepts every MERN developer must know",
          order: 1,
          topics: [
            {
              title: "Variables, Types & Operators",
              order: 1,
              subtopics: [
                { title: "let, const, var scoping", order: 1, resources: [{ title: "MDN: let", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let", type: "documentation" }] },
                { title: "Primitive vs Reference types", order: 2, resources: [{ title: "JavaScript.info: Data types", url: "https://javascript.info/types", type: "article" }] },
                { title: "Type coercion & equality", order: 3, resources: [{ title: "You Don't Know JS: Types & Coercion", url: "https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/types-grammar/README.md", type: "article" }] },
              ],
            },
            {
              title: "Functions & Scope",
              order: 2,
              subtopics: [
                { title: "Function declarations vs expressions", order: 1, resources: [{ title: "MDN: Functions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions", type: "documentation" }] },
                { title: "Arrow functions", order: 2, resources: [{ title: "JavaScript.info: Arrow functions", url: "https://javascript.info/arrow-functions-basics", type: "article" }] },
                { title: "Closures", order: 3, resources: [{ title: "MDN: Closures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures", type: "documentation" }] },
                { title: "Hoisting", order: 4, resources: [{ title: "MDN: Hoisting", url: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting", type: "documentation" }] },
              ],
            },
            {
              title: "Arrays & Objects",
              order: 3,
              subtopics: [
                { title: "Array methods (map, filter, reduce, forEach)", order: 1, resources: [{ title: "JavaScript.info: Array methods", url: "https://javascript.info/array-methods", type: "article" }] },
                { title: "Object destructuring & spread", order: 2, resources: [{ title: "MDN: Destructuring", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment", type: "documentation" }] },
                { title: "JSON basics", order: 3, resources: [{ title: "MDN: Working with JSON", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON", type: "documentation" }] },
              ],
            },
            {
              title: "Async JavaScript",
              order: 4,
              subtopics: [
                { title: "Callbacks & the event loop", order: 1, resources: [{ title: "Philip Roberts: What the heck is the event loop?", url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ", type: "video" }] },
                { title: "Promises", order: 2, resources: [{ title: "JavaScript.info: Promises", url: "https://javascript.info/promise-basics", type: "article" }] },
                { title: "async/await", order: 3, resources: [{ title: "MDN: async function", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function", type: "documentation" }] },
                { title: "Error handling in async code", order: 4, resources: [{ title: "JavaScript.info: Error handling with promises", url: "https://javascript.info/promise-error-handling", type: "article" }] },
              ],
            },
          ],
          test: {
            title: "JavaScript Foundations Test",
            questions: [
              { question: "What is the output of: typeof null?", options: ["'null'", "'undefined'", "'object'", "'boolean'"], correctAnswer: 2 },
              { question: "Which keyword declares a block-scoped variable?", options: ["var", "let", "both var and let", "none of the above"], correctAnswer: 1 },
              { question: "What does Array.prototype.reduce() return?", options: ["A new array", "A single accumulated value", "undefined", "The original array"], correctAnswer: 1 },
              { question: "What is a closure?", options: ["A function that has no return", "A function bundled with its lexical scope", "A method to close a connection", "A type of loop"], correctAnswer: 1 },
              { question: "What does 'await' do?", options: ["Creates a new thread", "Pauses execution until the promise settles", "Cancels a promise", "Makes a function synchronous"], correctAnswer: 1 },
              { question: "Which is NOT a primitive type in JavaScript?", options: ["string", "number", "array", "boolean"], correctAnswer: 2 },
              { question: "What does the spread operator (...) do with objects?", options: ["Deep clones the object", "Creates a shallow copy", "Deletes the object", "Freezes the object"], correctAnswer: 1 },
              { question: "Arrow functions differ from regular functions because they:", options: ["Cannot take parameters", "Don't have their own 'this'", "Are always async", "Must return a value"], correctAnswer: 1 },
              { question: "What is hoisting?", options: ["Moving variables to global scope", "Moving declarations to the top of their scope", "Deleting unused variables", "Optimizing code at runtime"], correctAnswer: 1 },
              { question: "Promise.all() resolves when:", options: ["Any promise resolves", "The first promise resolves", "All promises resolve", "The last promise resolves"], correctAnswer: 2 },
            ],
          },
        },
        {
          title: "Node.js & Express Basics",
          description: "Server-side JavaScript and building REST APIs",
          order: 2,
          topics: [
            {
              title: "Node.js Fundamentals",
              order: 1,
              subtopics: [
                { title: "What is Node.js & how V8 works", order: 1, resources: [{ title: "Node.js Official: About", url: "https://nodejs.org/en/about", type: "documentation" }] },
                { title: "Modules (CommonJS & ES Modules)", order: 2, resources: [{ title: "Node.js: Modules", url: "https://nodejs.org/api/modules.html", type: "documentation" }] },
                { title: "npm & package.json", order: 3, resources: [{ title: "npm docs: package.json", url: "https://docs.npmjs.com/cli/v10/configuring-npm/package-json", type: "documentation" }] },
                { title: "File system & path modules", order: 4, resources: [{ title: "Node.js: fs module", url: "https://nodejs.org/api/fs.html", type: "documentation" }] },
              ],
            },
            {
              title: "Express.js",
              order: 2,
              subtopics: [
                { title: "Routing & HTTP methods", order: 1, resources: [{ title: "Express: Routing", url: "https://expressjs.com/en/guide/routing.html", type: "documentation" }] },
                { title: "Middleware concept & flow", order: 2, resources: [{ title: "Express: Using middleware", url: "https://expressjs.com/en/guide/using-middleware.html", type: "documentation" }] },
                { title: "Request & response objects", order: 3, resources: [{ title: "Express: req and res", url: "https://expressjs.com/en/4x/api.html#req", type: "documentation" }] },
                { title: "Error handling middleware", order: 4, resources: [{ title: "Express: Error handling", url: "https://expressjs.com/en/guide/error-handling.html", type: "documentation" }] },
              ],
            },
            {
              title: "REST API Design",
              order: 3,
              subtopics: [
                { title: "RESTful conventions & HTTP status codes", order: 1, resources: [{ title: "REST API Tutorial", url: "https://restfulapi.net/", type: "article" }] },
                { title: "Request body parsing & validation", order: 2, resources: [{ title: "Express: express.json()", url: "https://expressjs.com/en/api.html#express.json", type: "documentation" }] },
                { title: "Building a CRUD API", order: 3, resources: [{ title: "MDN: Express Tutorial", url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs", type: "article" }] },
              ],
            },
          ],
          test: {
            title: "Node.js & Express Test",
            questions: [
              { question: "Node.js is primarily used for:", options: ["Browser scripting", "Server-side development", "Mobile apps only", "CSS preprocessing"], correctAnswer: 1 },
              { question: "Which module system is native to Node.js?", options: ["AMD", "CommonJS", "UMD", "SystemJS"], correctAnswer: 1 },
              { question: "Express middleware functions receive which arguments?", options: ["(req, res)", "(req, res, next)", "(err, req)", "(data, callback)"], correctAnswer: 1 },
              { question: "Which HTTP method is typically used to update a resource?", options: ["GET", "POST", "PUT", "DELETE"], correctAnswer: 2 },
              { question: "What status code indicates 'resource created'?", options: ["200", "201", "204", "301"], correctAnswer: 1 },
              { question: "app.use() in Express is used to:", options: ["Define a GET route", "Mount middleware", "Start the server", "Close connections"], correctAnswer: 1 },
              { question: "What does express.json() middleware do?", options: ["Sends JSON responses", "Parses incoming JSON request bodies", "Validates JSON schema", "Minifies JSON"], correctAnswer: 1 },
              { question: "Which is the correct way to read a file asynchronously in Node?", options: ["fs.readFile()", "fs.read()", "fs.open()", "fs.load()"], correctAnswer: 0 },
              { question: "In package.json, 'devDependencies' are:", options: ["Always installed", "Only installed in development", "Only for testing", "Deprecated"], correctAnswer: 1 },
              { question: "Which status code means 'Not Found'?", options: ["400", "401", "403", "404"], correctAnswer: 3 },
            ],
          },
        },
        {
          title: "MongoDB & Mongoose",
          description: "NoSQL database fundamentals and ODM",
          order: 3,
          topics: [
            {
              title: "MongoDB Basics",
              order: 1,
              subtopics: [
                { title: "Documents, collections, databases", order: 1, resources: [{ title: "MongoDB Manual: Introduction", url: "https://www.mongodb.com/docs/manual/introduction/", type: "documentation" }] },
                { title: "CRUD operations", order: 2, resources: [{ title: "MongoDB Manual: CRUD", url: "https://www.mongodb.com/docs/manual/crud/", type: "documentation" }] },
                { title: "Query operators ($gt, $in, $regex, etc.)", order: 3, resources: [{ title: "MongoDB: Query Operators", url: "https://www.mongodb.com/docs/manual/reference/operator/query/", type: "documentation" }] },
              ],
            },
            {
              title: "Mongoose ODM",
              order: 2,
              subtopics: [
                { title: "Schemas & models", order: 1, resources: [{ title: "Mongoose: Getting Started", url: "https://mongoosejs.com/docs/index.html", type: "documentation" }] },
                { title: "Validation & middleware (pre/post hooks)", order: 2, resources: [{ title: "Mongoose: Validation", url: "https://mongoosejs.com/docs/validation.html", type: "documentation" }] },
                { title: "Querying with Mongoose", order: 3, resources: [{ title: "Mongoose: Queries", url: "https://mongoosejs.com/docs/queries.html", type: "documentation" }] },
                { title: "Population (references between documents)", order: 4, resources: [{ title: "Mongoose: Populate", url: "https://mongoosejs.com/docs/populate.html", type: "documentation" }] },
              ],
            },
          ],
          test: {
            title: "MongoDB & Mongoose Test",
            questions: [
              { question: "MongoDB stores data as:", options: ["Tables and rows", "BSON documents", "XML files", "Key-value pairs only"], correctAnswer: 1 },
              { question: "In Mongoose, a Schema defines:", options: ["The database connection", "The shape of documents in a collection", "The server port", "The API routes"], correctAnswer: 1 },
              { question: "Which Mongoose method finds one document and updates it?", options: ["findAndModify()", "findOneAndUpdate()", "updateFirst()", "findUpdate()"], correctAnswer: 1 },
              { question: "What does Mongoose populate() do?", options: ["Creates new documents", "Replaces ObjectId references with actual documents", "Deletes empty fields", "Indexes a collection"], correctAnswer: 1 },
              { question: "Which MongoDB operator matches values greater than a specified value?", options: ["$gt", "$gte", "$more", "$above"], correctAnswer: 0 },
              { question: "A Mongoose pre('save') hook runs:", options: ["After saving", "Before saving", "When deleting", "On every query"], correctAnswer: 1 },
              { question: "MongoDB is a:", options: ["Relational database", "Graph database", "Document-oriented NoSQL database", "Column-family database"], correctAnswer: 2 },
              { question: "In MongoDB, an _id field is:", options: ["Optional", "Automatically created if not provided", "Always a string", "Only for relational data"], correctAnswer: 1 },
              { question: "Which method removes a document in Mongoose?", options: ["remove()", "deleteOne()", "Both A and B", "drop()"], correctAnswer: 2 },
              { question: "Mongoose Schema types include:", options: ["String, Number, Date, Buffer, Boolean, ObjectId, Array", "Only String and Number", "int, float, char, varchar", "text, blob, integer"], correctAnswer: 0 },
            ],
          },
        },
        {
          title: "React Fundamentals",
          description: "Component-based UI development with React",
          order: 4,
          topics: [
            {
              title: "React Core Concepts",
              order: 1,
              subtopics: [
                { title: "JSX & rendering", order: 1, resources: [{ title: "React: Describing the UI", url: "https://react.dev/learn/describing-the-ui", type: "documentation" }] },
                { title: "Components & props", order: 2, resources: [{ title: "React: Your First Component", url: "https://react.dev/learn/your-first-component", type: "documentation" }] },
                { title: "State with useState", order: 3, resources: [{ title: "React: State: A Component's Memory", url: "https://react.dev/learn/state-a-components-memory", type: "documentation" }] },
                { title: "Event handling", order: 4, resources: [{ title: "React: Responding to Events", url: "https://react.dev/learn/responding-to-events", type: "documentation" }] },
              ],
            },
            {
              title: "React Hooks",
              order: 2,
              subtopics: [
                { title: "useEffect for side effects", order: 1, resources: [{ title: "React: Synchronizing with Effects", url: "https://react.dev/learn/synchronizing-with-effects", type: "documentation" }] },
                { title: "Conditional rendering & lists", order: 2, resources: [{ title: "React: Conditional Rendering", url: "https://react.dev/learn/conditional-rendering", type: "documentation" }] },
                { title: "Forms & controlled components", order: 3, resources: [{ title: "React: Reacting to Input with State", url: "https://react.dev/learn/reacting-to-input-with-state", type: "documentation" }] },
              ],
            },
          ],
          test: {
            title: "React Fundamentals Test",
            questions: [
              { question: "JSX is:", options: ["A new programming language", "A syntax extension for JavaScript", "A CSS framework", "A database query language"], correctAnswer: 1 },
              { question: "React components must return:", options: ["A string", "A single JSX element (or fragment)", "An array", "An object"], correctAnswer: 1 },
              { question: "useState returns:", options: ["A value", "A setter function", "An array with [value, setter]", "An object"], correctAnswer: 2 },
              { question: "useEffect with an empty dependency array runs:", options: ["On every render", "Only on mount", "Only on unmount", "Never"], correctAnswer: 1 },
              { question: "Props in React are:", options: ["Mutable", "Read-only", "Only strings", "Global variables"], correctAnswer: 1 },
              { question: "What triggers a re-render in React?", options: ["Changing a local variable", "Calling setState", "Modifying the DOM directly", "Importing a module"], correctAnswer: 1 },
              { question: "A controlled component is one where:", options: ["React controls the DOM", "Form data is handled by the DOM", "Form data is handled by React state", "The component cannot re-render"], correctAnswer: 2 },
              { question: "Which hook is used for side effects?", options: ["useState", "useEffect", "useRef", "useMemo"], correctAnswer: 1 },
              { question: "To render a list in React, you typically use:", options: ["for loop in JSX", "array.map() returning JSX", "document.createElement()", "innerHTML"], correctAnswer: 1 },
              { question: "Keys in React lists help React:", options: ["Style elements", "Identify which items have changed", "Sort elements", "Filter elements"], correctAnswer: 1 },
            ],
          },
        },
      ],
    },

    // ─── INTERMEDIATE ───────────────────────────────────────────
    {
      level: "intermediate",
      sections: [
        {
          title: "Advanced React Patterns",
          description: "Production React: state management, routing, performance",
          order: 1,
          topics: [
            {
              title: "State Management",
              order: 1,
              subtopics: [
                { title: "useReducer for complex state", order: 1, resources: [{ title: "React: Extracting State Logic into a Reducer", url: "https://react.dev/learn/extracting-state-logic-into-a-reducer", type: "documentation" }] },
                { title: "Context API for global state", order: 2, resources: [{ title: "React: Passing Data Deeply with Context", url: "https://react.dev/learn/passing-data-deeply-with-context", type: "documentation" }] },
                { title: "Zustand / Redux Toolkit", order: 3, resources: [{ title: "Zustand GitHub", url: "https://github.com/pmndrs/zustand", type: "documentation" }] },
              ],
            },
            {
              title: "React Router & Next.js",
              order: 2,
              subtopics: [
                { title: "Client-side routing with React Router", order: 1, resources: [{ title: "React Router: Tutorial", url: "https://reactrouter.com/en/main/start/tutorial", type: "documentation" }] },
                { title: "Next.js App Router fundamentals", order: 2, resources: [{ title: "Next.js: Routing Fundamentals", url: "https://nextjs.org/docs/app/building-your-application/routing", type: "documentation" }] },
                { title: "Server vs Client components", order: 3, resources: [{ title: "Next.js: Server Components", url: "https://nextjs.org/docs/app/building-your-application/rendering/server-components", type: "documentation" }] },
              ],
            },
            {
              title: "Performance Optimization",
              order: 3,
              subtopics: [
                { title: "React.memo, useMemo, useCallback", order: 1, resources: [{ title: "React: Referencing Values with Refs", url: "https://react.dev/reference/react/useMemo", type: "documentation" }] },
                { title: "Code splitting & lazy loading", order: 2, resources: [{ title: "React: Lazy", url: "https://react.dev/reference/react/lazy", type: "documentation" }] },
              ],
            },
          ],
          test: {
            title: "Advanced React Patterns Test",
            questions: [
              { question: "useReducer is preferable to useState when:", options: ["State is a single boolean", "State logic is complex with multiple sub-values", "You only need to read state", "Component has no children"], correctAnswer: 1 },
              { question: "React Context is best for:", options: ["High-frequency updates", "Low-frequency, widely-shared state", "Local component state", "Animations"], correctAnswer: 1 },
              { question: "In Next.js App Router, components are server components by default. To make one a client component you:", options: ["Add 'use server'", "Add 'use client'", "Export it as default", "Wrap it in Suspense"], correctAnswer: 1 },
              { question: "React.memo does:", options: ["Memoizes a value", "Prevents re-render if props haven't changed", "Creates a ref", "Defers a render"], correctAnswer: 1 },
              { question: "useMemo is used to:", options: ["Memoize a callback function", "Memoize an expensive computed value", "Create a ref", "Handle side effects"], correctAnswer: 1 },
              { question: "Which library is a lightweight alternative to Redux?", options: ["MobX", "Zustand", "RxJS", "Immer"], correctAnswer: 1 },
              { question: "React.lazy() is used for:", options: ["Lazy state updates", "Code splitting components", "Debouncing events", "Lazy validation"], correctAnswer: 1 },
              { question: "In Next.js, which file defines the root layout?", options: ["page.js", "layout.js", "template.js", "route.js"], correctAnswer: 1 },
              { question: "useCallback memoizes:", options: ["A JSX element", "A function reference", "A CSS class", "A DOM node"], correctAnswer: 1 },
              { question: "Redux Toolkit's createSlice provides:", options: ["Only actions", "Only reducers", "Actions, reducers, and initial state in one place", "Middleware only"], correctAnswer: 2 },
            ],
          },
        },
        {
          title: "Production Backend",
          description: "Authentication, security, and production Node.js patterns",
          order: 2,
          topics: [
            {
              title: "Authentication & Authorization",
              order: 1,
              subtopics: [
                { title: "JWT access + refresh token flow", order: 1, resources: [{ title: "Auth0: JWT Introduction", url: "https://jwt.io/introduction", type: "article" }] },
                { title: "Password hashing with bcrypt", order: 2, resources: [{ title: "OWASP: Password Storage", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html", type: "article" }] },
                { title: "Role-based access control (RBAC)", order: 3, resources: [{ title: "Auth0: RBAC", url: "https://auth0.com/docs/manage-users/access-control/rbac", type: "article" }] },
              ],
            },
            {
              title: "API Security",
              order: 2,
              subtopics: [
                { title: "Input validation with Zod/Joi", order: 1, resources: [{ title: "Zod Documentation", url: "https://zod.dev/", type: "documentation" }] },
                { title: "Rate limiting", order: 2, resources: [{ title: "express-rate-limit", url: "https://github.com/express-rate-limit/express-rate-limit", type: "documentation" }] },
                { title: "Helmet.js & CORS", order: 3, resources: [{ title: "Helmet.js", url: "https://helmetjs.github.io/", type: "documentation" }] },
                { title: "Environment variables & secrets management", order: 4, resources: [{ title: "12factor.net: Config", url: "https://12factor.net/config", type: "article" }] },
              ],
            },
            {
              title: "Advanced MongoDB",
              order: 3,
              subtopics: [
                { title: "Indexing strategies", order: 1, resources: [{ title: "MongoDB: Indexes", url: "https://www.mongodb.com/docs/manual/indexes/", type: "documentation" }] },
                { title: "Aggregation pipeline", order: 2, resources: [{ title: "MongoDB: Aggregation", url: "https://www.mongodb.com/docs/manual/aggregation/", type: "documentation" }] },
                { title: "Transactions", order: 3, resources: [{ title: "MongoDB: Transactions", url: "https://www.mongodb.com/docs/manual/core/transactions/", type: "documentation" }] },
              ],
            },
          ],
          test: {
            title: "Production Backend Test",
            questions: [
              { question: "A refresh token is used to:", options: ["Authenticate the user initially", "Get a new access token without re-login", "Encrypt passwords", "Validate email"], correctAnswer: 1 },
              { question: "bcrypt salting prevents:", options: ["SQL injection", "Rainbow table attacks", "CSRF attacks", "XSS attacks"], correctAnswer: 1 },
              { question: "Rate limiting protects against:", options: ["SQL injection", "Brute force and DDoS", "XSS", "CSRF"], correctAnswer: 1 },
              { question: "Helmet.js sets:", options: ["Database indexes", "HTTP security headers", "Rate limits", "Authentication tokens"], correctAnswer: 1 },
              { question: "Which MongoDB feature ensures multi-document atomicity?", options: ["Indexes", "Sharding", "Transactions", "Replication"], correctAnswer: 2 },
              { question: "CORS headers control:", options: ["Database access", "Which origins can call your API", "Server memory", "File uploads"], correctAnswer: 1 },
              { question: "Zod is used for:", options: ["Database queries", "Runtime type validation", "CSS styling", "Routing"], correctAnswer: 1 },
              { question: "MongoDB compound indexes can support queries that match:", options: ["Any field in any order", "A prefix of the index fields", "Only all fields", "Only the last field"], correctAnswer: 1 },
              { question: "JWTs should NOT contain:", options: ["User ID", "Expiration time", "Sensitive data like passwords", "Issued-at timestamp"], correctAnswer: 2 },
              { question: "Environment variables should be used for:", options: ["CSS values", "Secrets and configuration that varies by environment", "HTML templates", "JavaScript logic"], correctAnswer: 1 },
            ],
          },
        },
        {
          title: "Full-Stack Integration",
          description: "Connecting React frontend to Express backend end-to-end",
          order: 3,
          topics: [
            {
              title: "API Integration",
              order: 1,
              subtopics: [
                { title: "Fetch API & Axios patterns", order: 1, resources: [{ title: "MDN: Using Fetch", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch", type: "documentation" }] },
                { title: "React Query / TanStack Query for data fetching", order: 2, resources: [{ title: "TanStack Query: Overview", url: "https://tanstack.com/query/latest/docs/react/overview", type: "documentation" }] },
                { title: "Error handling & loading states", order: 3, resources: [{ title: "React: Displaying loading & error states", url: "https://react.dev/reference/react/Suspense", type: "documentation" }] },
              ],
            },
            {
              title: "Deployment",
              order: 2,
              subtopics: [
                { title: "Building for production", order: 1, resources: [{ title: "Vite: Building for Production", url: "https://vitejs.dev/guide/build.html", type: "documentation" }] },
                { title: "Docker basics for MERN", order: 2, resources: [{ title: "Docker: Getting Started", url: "https://docs.docker.com/get-started/", type: "documentation" }] },
                { title: "CI/CD fundamentals", order: 3, resources: [{ title: "GitHub Actions: Quickstart", url: "https://docs.github.com/en/actions/quickstart", type: "documentation" }] },
              ],
            },
          ],
          test: {
            title: "Full-Stack Integration Test",
            questions: [
              { question: "React Query's main benefit is:", options: ["CSS styling", "Server state management with caching", "Database queries", "Routing"], correctAnswer: 1 },
              { question: "Which HTTP header sends a JWT in API requests?", options: ["Content-Type", "Authorization: Bearer <token>", "X-API-Key", "Cookie"], correctAnswer: 1 },
              { question: "A Dockerfile's CMD instruction:", options: ["Builds the image", "Specifies the default command to run", "Copies files", "Sets environment variables"], correctAnswer: 1 },
              { question: "In CI/CD, the 'CI' stands for:", options: ["Code Integration", "Continuous Integration", "Complete Installation", "Code Inspection"], correctAnswer: 1 },
              { question: "CORS errors occur on the:", options: ["Server", "Client (browser)", "Database", "DNS server"], correctAnswer: 1 },
              { question: "React Query's 'staleTime' controls:", options: ["When to delete cache", "How long data is considered fresh", "Request timeout", "Retry delay"], correctAnswer: 1 },
              { question: "Docker Compose is used to:", options: ["Build a single container", "Orchestrate multi-container apps", "Write Dockerfiles", "Deploy to production"], correctAnswer: 1 },
              { question: "An interceptor in Axios is used to:", options: ["Cancel requests", "Transform requests/responses globally", "Create WebSocket connections", "Parse HTML"], correctAnswer: 1 },
              { question: "The purpose of a reverse proxy (like nginx) is:", options: ["Write backend code", "Route requests to backend services", "Compile JavaScript", "Manage databases"], correctAnswer: 1 },
              { question: "Environment variables in Next.js prefixed with NEXT_PUBLIC_ are:", options: ["Server-only", "Exposed to the browser", "Encrypted", "Ignored"], correctAnswer: 1 },
            ],
          },
        },
      ],
    },

    // ─── ADVANCED ───────────────────────────────────────────────
    {
      level: "advanced",
      sections: [
        {
          title: "System Design for MERN",
          description: "Architecture, scaling, and production patterns",
          order: 1,
          topics: [
            {
              title: "Architecture Patterns",
              order: 1,
              subtopics: [
                { title: "Monolith vs Microservices trade-offs", order: 1, resources: [{ title: "Martin Fowler: Microservices", url: "https://martinfowler.com/articles/microservices.html", type: "article" }] },
                { title: "Event-driven architecture with message queues", order: 2, resources: [{ title: "RabbitMQ: Tutorials", url: "https://www.rabbitmq.com/tutorials", type: "documentation" }] },
                { title: "Caching strategies (Redis)", order: 3, resources: [{ title: "Redis: Documentation", url: "https://redis.io/docs/", type: "documentation" }] },
              ],
            },
            {
              title: "Database at Scale",
              order: 2,
              subtopics: [
                { title: "Schema design patterns (embedding vs referencing)", order: 1, resources: [{ title: "MongoDB: Data Model Design", url: "https://www.mongodb.com/docs/manual/core/data-model-design/", type: "documentation" }] },
                { title: "Sharding & replication", order: 2, resources: [{ title: "MongoDB: Sharding", url: "https://www.mongodb.com/docs/manual/sharding/", type: "documentation" }] },
                { title: "Query performance & explain plans", order: 3, resources: [{ title: "MongoDB: Explain Results", url: "https://www.mongodb.com/docs/manual/reference/explain-results/", type: "documentation" }] },
              ],
            },
            {
              title: "Advanced Frontend Architecture",
              order: 3,
              subtopics: [
                { title: "Micro-frontends", order: 1, resources: [{ title: "Martin Fowler: Micro Frontends", url: "https://martinfowler.com/articles/micro-frontends.html", type: "article" }] },
                { title: "Server-Side Rendering vs Static Generation vs ISR", order: 2, resources: [{ title: "Next.js: Rendering", url: "https://nextjs.org/docs/app/building-your-application/rendering", type: "documentation" }] },
                { title: "Web performance optimization (Core Web Vitals)", order: 3, resources: [{ title: "web.dev: Core Web Vitals", url: "https://web.dev/articles/vitals", type: "article" }] },
              ],
            },
          ],
          test: {
            title: "System Design for MERN Test",
            questions: [
              { question: "When should you choose microservices over a monolith?", options: ["Always, for any project", "When teams need independent deployment", "For small personal projects", "When you have a single developer"], correctAnswer: 1 },
              { question: "Redis is commonly used as:", options: ["A primary database", "An in-memory cache and message broker", "A file storage system", "A CSS preprocessor"], correctAnswer: 1 },
              { question: "MongoDB sharding distributes data across:", options: ["Collections", "Multiple servers", "Indexes", "Schemas"], correctAnswer: 1 },
              { question: "ISR in Next.js stands for:", options: ["Internal Server Routing", "Incremental Static Regeneration", "Instant State Rehydration", "Inline Script Rendering"], correctAnswer: 1 },
              { question: "The CAP theorem states that a distributed system can guarantee at most:", options: ["1 of 3 properties", "2 of 3 properties", "All 3 properties", "None"], correctAnswer: 1 },
              { question: "A message queue helps with:", options: ["CSS rendering", "Decoupling services and handling async workloads", "Compiling TypeScript", "Managing DNS"], correctAnswer: 1 },
              { question: "Core Web Vitals include:", options: ["LCP, FID, CLS", "HTML, CSS, JS", "GET, POST, PUT", "RAM, CPU, Disk"], correctAnswer: 0 },
              { question: "Embedding vs referencing in MongoDB: embed when:", options: ["Data is frequently accessed together", "Data changes independently", "Documents would exceed 16MB", "You need transactions"], correctAnswer: 0 },
              { question: "A reverse proxy like Nginx helps with:", options: ["Writing React code", "Load balancing and SSL termination", "MongoDB queries", "Package management"], correctAnswer: 1 },
              { question: "The purpose of database indexing is to:", options: ["Increase storage", "Speed up read queries at the cost of write overhead", "Encrypt data", "Compress documents"], correctAnswer: 1 },
            ],
          },
        },
        {
          title: "Testing & DevOps",
          description: "Production readiness: testing, monitoring, deployment",
          order: 2,
          topics: [
            {
              title: "Testing",
              order: 1,
              subtopics: [
                { title: "Unit testing with Jest", order: 1, resources: [{ title: "Jest: Getting Started", url: "https://jestjs.io/docs/getting-started", type: "documentation" }] },
                { title: "Integration testing for APIs (Supertest)", order: 2, resources: [{ title: "Supertest GitHub", url: "https://github.com/ladjs/supertest", type: "documentation" }] },
                { title: "React component testing with Testing Library", order: 3, resources: [{ title: "Testing Library: React", url: "https://testing-library.com/docs/react-testing-library/intro/", type: "documentation" }] },
                { title: "E2E testing with Playwright/Cypress", order: 4, resources: [{ title: "Playwright: Getting Started", url: "https://playwright.dev/docs/intro", type: "documentation" }] },
              ],
            },
            {
              title: "DevOps & Monitoring",
              order: 2,
              subtopics: [
                { title: "Docker multi-stage builds", order: 1, resources: [{ title: "Docker: Multi-stage builds", url: "https://docs.docker.com/build/building/multi-stage/", type: "documentation" }] },
                { title: "Kubernetes basics", order: 2, resources: [{ title: "Kubernetes: Tutorials", url: "https://kubernetes.io/docs/tutorials/", type: "documentation" }] },
                { title: "Logging & monitoring (ELK, Prometheus)", order: 3, resources: [{ title: "Elastic: Getting Started", url: "https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html", type: "documentation" }] },
                { title: "APM & error tracking (Sentry)", order: 4, resources: [{ title: "Sentry: Node.js", url: "https://docs.sentry.io/platforms/node/", type: "documentation" }] },
              ],
            },
          ],
          test: {
            title: "Testing & DevOps Test",
            questions: [
              { question: "Unit tests should be:", options: ["Slow and comprehensive", "Fast, isolated, and deterministic", "Run only in production", "Written after deployment"], correctAnswer: 1 },
              { question: "Supertest is used for:", options: ["UI testing", "HTTP assertion testing of Express apps", "Database testing", "CSS testing"], correctAnswer: 1 },
              { question: "React Testing Library encourages testing:", options: ["Implementation details", "User-visible behavior", "Component internals", "CSS classes"], correctAnswer: 1 },
              { question: "Docker multi-stage builds help:", options: ["Speed up development", "Reduce final image size", "Add more dependencies", "Run multiple containers"], correctAnswer: 1 },
              { question: "Kubernetes is used for:", options: ["Writing code", "Container orchestration", "Database management only", "Frontend build tools"], correctAnswer: 1 },
              { question: "Sentry is a tool for:", options: ["Container orchestration", "Error tracking and APM", "Code formatting", "Package management"], correctAnswer: 1 },
              { question: "E2E tests verify:", options: ["Individual functions", "Complete user flows through the app", "Only API endpoints", "Only database queries"], correctAnswer: 1 },
              { question: "In the testing pyramid, which type should you have the most of?", options: ["E2E tests", "Integration tests", "Unit tests", "Manual tests"], correctAnswer: 2 },
              { question: "Prometheus is used for:", options: ["Log aggregation", "Metrics collection and alerting", "Code deployment", "DNS management"], correctAnswer: 1 },
              { question: "A health check endpoint is used to:", options: ["Test user authentication", "Verify the service is running", "Run database migrations", "Generate API docs"], correctAnswer: 1 },
            ],
          },
        },
      ],
    },
  ],
};
