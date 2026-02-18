const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require("method-override");
const User = require("./init/userDataBase.js");

app.set("view engine", "views");
app.set("views", path.join(__dirname, "views"));
app.use(methodoverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/kalyani");
}

main().then(() => {
  console.log("connection success");
});

app.listen(8080, () => {
  console.log("server is listening");
});

// const getLocation = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(success, error);
//   } else {
//     alert("Your browser is out of fashion. There is no geo location!");
//   }

//   function success(position) {
//     var latitude = position.coords.latitude;
//     var longitude = position.coords.longitude;
//     console.log(
//       `Your latitude is ${latitude} and your longitude is ${longitude}`,
//     );
//     return (latitude, longitude);
//   }

//   function error() {
//     alert("Can't detect your location. Try again later.");
//   }
// };

// console.log(getLocation());

app.get("/", (req, res) => {
  res.send("root");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});
let user;
app.post("/auth", async (req, res) => {
  let { email, pass } = req.body;
  console.log(email, pass);
  user = await User.findOne({ email: email });
  len = user.complaints.length;
  console.log(len);
  if (user.paswd == pass) {
    // res.send("auth");
    res.render("userdash.ejs", { user, len });
  } else {
    res.send("wrong");
  }
});
