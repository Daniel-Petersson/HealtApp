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

            res.status(201).render("searchreports");
            
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

// router.get("/searchreports", (req,res)=>{
//     res.render("searchreports");
// })

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


       

module.exports = router;