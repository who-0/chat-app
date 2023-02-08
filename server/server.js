const path = require("path"); 
require("dotenv").config({ path: path.join(__dirname, "/.env") });
const http = require("http");
const app = require("./app");
const { mongoConnect } = require("./config/mongodb");
const server = http.createServer(app);

//? require proccess ----------------------
require("./config/socket")(server);

//? ENV
const PORT = process.env.PORT || 8000;
const MONGO = process.env.MONGO_URL;

(async () => {
  await mongoConnect(MONGO);
  server.listen(PORT, (_) => {
    console.log(`Server is running...`);
    console.log(`http://localhost:${PORT}`);
  });
})();
