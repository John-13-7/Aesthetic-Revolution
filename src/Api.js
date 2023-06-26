const express = require("express");
const app = express();
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());

//required to load locally
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

//load users
let users = [];
fs.readFile("./src/Data/Users.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file", err);
  } else {
    users = JSON.parse(data);
  }
});

//load meals
let meals = [];
fs.readFile("./src/Data/Meals.json", "utf8", (err, data) => {
  if (err) {
    return res.status(500).json({ error: "Error reading Meals.json" });
  } else {
    meals = JSON.parse(data);
  }
});

//load exercises
let exercises = [];
fs.readFile("./src/Data/Exercises.json", "utf8", (err, data) => {
  if (err) {
    return res.status(500).json({ error: "Error reading Exercises.json" });
  } else {
    exercises = JSON.parse(data);
  }
});

//get meals
app.get("/Meals", (req, res) => {
  res.json(meals);
});

//get exercises
app.get("/Exercises", (req, res) => {
  res.json(exercises);
});

//get current user
let current_user = "";
app.get("/Users/current", (req, res) => {
  fs.readFile("./src/Data/CurrentUser.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err);
      return res.status(500).json({ error: "Error reading CurrentUser.json" });
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
  //new accounts should have all values set to zero...
  users.push({
    name: input.name,
    password: hash,
    email: input.email,
    bmr: 0,
    goals: "",
    bulkpounds: "",
    cutpounds: "",
    ismeal: false,
    foodallergies: [],
    foodtypes: "",
    istrain: false,
    trainingdays: "",
    trainingfocus: [],
    mealplan: [],
    workoutplan: [],
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

//return user that's logged in
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

//return user detail
app.get("/Users/CurrentUser/details", (req, res) => {
  const user = users.find((user) => user.name === current_user);
  console.log("user: ", user);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});

//update the users BMR
app.put("/Users/CurrentUser/BMR", (req, res) => {
  const { username, bmr } = req.body;
  let userFound = false;

  console.log("username: ", username);
  console.log("bmr: ", bmr);
  const updatedBMR = users.map((user) => {
    if (user.name === username) {
      userFound = true;
      return { ...user, bmr: bmr };
    } else {
      return user;
    }
  });

  if (userFound) {
    users = updatedBMR;
    fs.writeFile(
      "./src/Data/Users.json",
      JSON.stringify(users, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.log("Error writing the logging in file", err);
          res.status(500).send("Error updating user"); // Send a 500 status if there was an error
        } else {
          console.log(username, " has logged in");
          res.status(200).send("User updated successfully"); // Send a 200 status if everything went fine
        }
      }
    );
  } else {
    res.status(404).send("User not found"); // Send a 404 status if the user was not found
  }
});

//update the users questionaire
app.put("/Users/CurrentUser/Questionaire", (req, res) => {
  const {
    goals,
    bulkpounds,
    cutpounds,
    ismeal,
    foodallergies,
    foodtypes,
    istrain,
    trainingdays,
    trainingfocus,
    mealplan,
    workoutplan,
  } = req.body;

  //there's someone logged in
  if (current_user !== "") {
    update_user = users.find((user) => user.name === current_user);
  } else {
    return current_user;
  }

  console.log("current user", current_user);

  if (update_user) {
    update_user.goals = goals;
    update_user.bulkpounds = bulkpounds;
    update_user.cutpounds = cutpounds;
    update_user.ismeal = ismeal;
    update_user.foodallergies = foodallergies;
    update_user.foodtypes = foodtypes;
    update_user.istrain = istrain;
    update_user.trainingdays = trainingdays;
    update_user.trainingfocus = trainingfocus;
    update_user.mealplan = mealplan;
    update_user.workoutplan = workoutplan;

    fs.writeFile(
      "src/Data/Users.json",
      JSON.stringify(users, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.log("Error writing the logging in file", err);
          res.status(500).send("Error updating user"); // Send a 500 status if there was an error
        } else {
          console.log(current_user, " has updated their questionnaire"); // Updated 'username' to 'current_user' since username is not defined in this context
          res.status(200).send("User updated successfully"); // Send a 200 status if everything went fine
        }
      }
    ); // Closed the writeFile function here
  } else {
    res.status(404).send("User not found"); // Send a 404 status if the user was not found
  }
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
