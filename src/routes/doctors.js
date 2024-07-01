const express = require ('express');
var  router = express.Router();
const passport = require("passport");
var mongoose = require('mongoose');

const Dregister = require("../models/dregisters");
const Register = require("../models/registers");
const Preports = require("../models/preports");

router.get("/login", (req,res) =>{
    res.render("login");
}); 

router.post("/login", async (req,res) =>{

    try {

        const email = req.body.email;
        const password = req.body.password;

        const doctoremail = await Dregister.findOne({email:email});
        if (doctoremail.password === password) {
            
            res.status(201).render("yourReport");
            
        } else {
            res.status(400).send("Invalid login Details");
        }
        
    } catch (error) {
        res.status(400).send("Invalid Email")
    }
    
}); 



router.get("/dregister", (req,res) =>{
    res.render("dregister");
});

router.post("/dregister", async (req,res) =>{
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){

            const registerDoctor = new Dregister({

                firstName : req.body.firstname,
                lastName : req.body.lastname,
                email : req.body.email,
                phone : req.body.phone,
                password : password,
                confirmpassword : cpassword,
                gender : req.body.gender,
                speciality : req.body.speciality

            });

            const dregistered = await registerDoctor.save();
            res.status(201).render("login");

        }else{
            res.status(400).send("password not matching");
        }

    } catch (error) {
        res.status(400).send(error)
    }
});


//Search reports by first name
router.get("/searchreports",async (req,res)=>{
    const searchQuery = req.query.q; // Get the search term from the query parameter
    try {
      const results = await Preports.find({ name: { $regex: searchQuery, $options: "i" } });
      console.log(results);
      res.render("yourReport", { results });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
});
// Search reports by last name
router.get("/searchreports", async (req, res) => {
    const searchQuery = req.query.q; // Get the search term from the query parameter
    try {
        // Assuming 'lastName' is the field for last names in your database
        const results = await Preports.find({ lastName: { $regex: searchQuery, $options: "i" } });
        console.log(results);
        res.render("yourReport", { results });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/searchbystatus", async (req, res) => {
    const statusQuery = req.query.status; // Get the status search term from the query parameter
    try {
        // Search for reports where the status matches the search query
        const results = await Preports.find({
            status: { $regex: statusQuery, $options: "i" }
        });
        console.log(results);
        res.render("yourReport", { results }); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Get all patient reports
router.get("/allreports", async (req, res) => {
    try {
        const results = await Preports.find({});
        console.log(results);
        res.render("yourReport", { results }); 

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


       router.get("/yourReport", async (req, res) => {
    const searchQuery = req.query.q; // For name search
    const statusQuery = req.query.status; // For status filter

    let query = {};

    if (searchQuery) {
        query.$or = [
            { name: { $regex: searchQuery, $options: "i" } },
            { lastName: { $regex: searchQuery, $options: "i" } }
        ];
    }

    if (statusQuery) {
        query.status = { $regex: statusQuery, $options: "i" };
    }

    try {
        const results = await Preports.find(query);
        console.log(results);
        res.render("yourReport", { results });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
// Search reports by Health Problem
router.get("/searchbyhealthproblem", async (req, res) => {
    const healthProblemQuery = req.query.healthProblem; // Get the health problem search term from the query parameter

    try {
        const results = await Preports.find({
            healthProblem: { $regex: healthProblemQuery, $options: "i" }
        });
        console.log(results);
        res.render("yourReport", { results }); // Render the results to the 'yourReport' view
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Search reports by Medications
router.get("/searchbymedications", async (req, res) => {
    // Ensure medicationsQuery is a string
    const medicationsQuery = req.query.medications;

    try {
        const results = await Preports.find({
            medications: { $regex: medicationsQuery, $options: "i" }
        });
        console.log(results);
        res.render("yourReport", { results }); // Render the results to the 'yourReport' view
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;