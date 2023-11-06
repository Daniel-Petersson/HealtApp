const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");

app.use(session({
    secret: "your-secret-key",
    resave : false,
    saveUninitialized:false,
})
);




const Dregister = require("./models/dregisters");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
//const partials_path = path.join(__dirname,"../templates/partials/navbar.hbs")




var patientRouter = require('./routes/patients');
var doctorRouter = require('./routes/doctors');




app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
//hbs.registerPartials('navbar',partials_path);

app.use(patientRouter);
app.use(doctorRouter);


app.get("/", (req,res) =>{
    res.render("home")
});

app.get("/home", (req,res) =>{
    res.render("home")
});









app.listen(port, () =>{
    console.log(`server running on port ${port}`);
})

module.exports = app;