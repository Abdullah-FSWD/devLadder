const app = require("./src/app");
const connectDB = require("./src/config/db");
const { port } = require("./src/config/env");

async function start() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start();
