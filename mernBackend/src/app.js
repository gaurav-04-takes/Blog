const express = require("express");
const app = express();
require("./db/conn");
const Registeration = require("./models/registor");

const hbs = require("hbs");
const path = require("path");
const { log } = require("console");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path)); //-----> this for static path

const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs"); // ----> to tell node that we are now using hbs
app.set("views", views_path); //  ----> to tell node that location of view is change
hbs.registerPartials(partials_path); //----> to register partials

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/registration", (req, res) => {
  res.render("registration");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/registration", async (req, res) => {
  try {
    const passsword = req.body.password;
    const cPassword = req.body.confirmPassword;
    if (passsword === cPassword) {
      const registor = new Registeration({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      });

      const registerd = await registor.save();
      res.status(201).render("index");
    } else {
      res.send("password not match");
    }
  } catch (error) {
    res.status(404).send("DB issue");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // Destructure email and password from request body
    const user = await Registeration.findOne({ email }); // Find user by email
    console.log(user);

    // Check if user exists and password matches
    if (user && user.password == password) {
      console.log("User found");
      res.status(200).render("index");
    } else {
      res.status(401).send("Invalid credentials"); // Send unauthorized status for invalid login
    }
  } catch (error) {
    console.log(`Error in fetching data: ${error}`);
    res.status(500).send("Internal Server Error"); // Send internal server error for unexpected issues
  }
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
