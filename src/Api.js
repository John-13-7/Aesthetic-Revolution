const express = require("express");
const app = express();
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

//get users
let users = [];
fs.readFile("./src/Data/Users.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file", err);
  } else {
    users = JSON.parse(data);
  }
});

//reads current user
let current_user = "";
app.get("/Users/current", (req, res) => {
  fs.readFile("./src/Data/CurrentUser.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err);
      return res.status(500).json({ error: "Error reading file" });
    } else {
      current_user = JSON.parse(data);
    }
  });
});

//login
app.post("/Users/login", async (req, res) => {
  const { name, password } = req.body;
  const user = users.find((user) => user.name === name);
  if (!user) {
    return res.status(400).json({ error: "Invalid user or password" });
  }
  const validated = await bcrypt.compare(password, user.password);
  if (!validated) {
    return res.status(400).json({ error: "Invalid user or password" });
  }
  const token = jwt.sign({ user: user.name }, "Idk what this does tbh");
  console.log(user);

  fs.writeFile(
    "./src/Data/CurrentUser.json",
    JSON.stringify(name, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.log("Error writing the logging in file", err);
      } else {
        console.log(name, " has logged in");
      }
    }
  );
  return res.json({ success: true, token });
});

//logout
app.post("/Users/logout", async (req, res) => {
  let rewrite = "";
  fs.writeFile(
    "./src/Data/CurrentUser.json",
    JSON.stringify(rewrite, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.error("Error writing the logging out component", err);
      } else {
        console.log("user logged out");
      }
    }
  );
});

//register
app.post("/Users/register", async (req, res) => {
  const { name, password, email } = req.body;
  const input = { name, password, email };
  const hash = await bcrypt.hash(input.password, 10);
  users.push({
    name: input.name,
    password: hash,
    email: input.email,
  });

  fs.writeFile(
    "./src/Data/Users.json",
    JSON.stringify(users, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.error("Error writing to register file", err);
      } else {
        console.log("Created user: ", input.name);
      }
    }
  );
});

//return currently logged in
app.get("/Users/CurrentUser", (req, res) => {
  fs.readFile("./src/Data/CurrentUser.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error getting current user" });
    } else {
      current_user = JSON.parse(data);
      res.json(current_user);
    }
  });
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
