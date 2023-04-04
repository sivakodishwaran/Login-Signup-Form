const express = require("express");
const path = require("path");
const app = express();
const LogInCollection = require("./mongo");
const port = process.env.PORT || 3000;
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);


app.set("view engine", "hbs");
app.set("views", tempelatePath);
app.use(express.static(publicPath));
// app.set('view engine', 'hbs');
// app.set('views', 'C:\Users\jayaprakash.s\Desktop\Login-Signup-Form-main\src\templates');


app.get("/", (req, res) => {
  res.render("signup");
});

app.get("/signup", (req, res) => {
    res.render("signup");
  });
  
app.get("/login", (req, res) => {
    res.render("login");
  });



app.post("/signup", async (req, res) => {
  try {
    const checking = await LogInCollection.findOne({
      name: req.body.name,
      password: req.body.password,
    });

    if (checking) {
      res.send("User details already exist");
    } else {
      const data = new LogInCollection({
        name: req.body.name,
        password: req.body.password,
      });

      await data.save();

    }
  } catch {
    res.send("Wrong input");
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await LogInCollection.findOne({ name: req.body.name });

    if (!check) {
      res.send("User not found");
    } else if (check.password === req.body.password) {
      res.render("", { name: req.body.name });
    } else {
      res.send("Incorrect password");
    }
  } catch {
    res.send("Error in fetching data");
  }
});

app.listen(port, () => {
  console.log("Port connected");
});
