require("dotenv").config();
const express = require("express"),
const express = require("express-session")
const massive = require("massive");
  userCtrl = require("./controllers/user"),
  postCtrl = require("./controllers/posts");

const { CONNECTION_STRING, SERVER_PORT } = process.env;

const app = express();

app.use(express.json());
// app.use();

//Auth Endpoints
app.post("/api/auth/register", userCtrl.register);
app.post("/api/auth/login", userCtrl.login);
app.get("/api/auth/me", userCtrl.getUser);
app.post("/api/auth/logout", userCtrl.logout);

//Post Endpoints
app.get("/api/posts", postCtrl.readPosts);
app.post("/api/post", postCtrl.createPost);
app.get("/api/post/:id", postCtrl.readPost);
app.delete("/api/post/:id", postCtrl.deletePost);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
}).then((dbInstance) => {
  app.set("db", dbInstance);
  console.log("DB Ready Nya~");
  app.listen(SERVER_PORT, () =>
    console.log(`Running on ${SERVER_PORT} Master Nya~`)
  );
});
