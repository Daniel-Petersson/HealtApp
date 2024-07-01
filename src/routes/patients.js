const express = require ('express');
var  router = express.Router();
const passport = require("passport");
var mongoose = require('mongoose');

const Register = require("../models/registers");
const Preports = require("../models/preports");
// const e = require('express');


router.get("/register", async (req,res) =>{
    res.render("register");
 });
 
 router.post("/register", async (req,res) =>{
     try {
         const password = req.body.password;
         const cpassword = req.body.confirmpassword;
 
         if(password === cpassword){
 
             const registerEmployee = new Register({
 
                 firstName : req.body.firstname,
                 lastName : req.body.lastname,
                 email : req.body.email,
                 phone : req.body.phone,
                 password : password,
                 confirmpassword : cpassword,
                 gender : req.body.gender
 
             });
 
             const registered = await registerEmployee.save();
             res.status(201).render("patientlogin");
 
         }else{
             res.status(400).send("password not matching");
         }
 
     } catch (error) {
         res.status(400).send(error)
     }
 });
 
 router.get("/patientlogin", (req,res) =>{
     res.render("patientlogin");
 });
 
 router.post("/patientlogin", async (req,res) =>{
     
     try {
 
         const email = req.body.email;
         const password = req.body.password;
 
         const useremail = await Register.findOne({email:email});
             if(useremail.password === password){
                 res.status(201).render("preports");
             }else{
                 res.status(400).send("invalid login details");
             }
 
         
     } catch (error) {
         res.status(400).send("invalid email");
     }
     
     
 });


//  router.get("/preports", async (req,res) =>{
//     res.render("preports");
//  });

// router.post("/preports", async (req, res) =>{
//         try {

//             const name = req.body.name;
//             const pname = await Register.findOne({firstname:name});
//         if (pname === firstname) {

//             const uploadReport = new Preports({

//                     name : req.body.name,
//                     healthProblem :req.body.healthProblem,
//                     medications: req.body.medications,
//                     medicalHistory : req.body.medicalHistory,
//                     otherDetails : req.body.otherDetails,

                
//             });

//             // console.log(`${name} ${healthProblem} ${medications} ${medicalHistory} ${otherDetails} `);
//             // res.send(`${name} ${healthProblem} ${medications} ${medicalHistory} ${otherDetails} `);

//             const uploadedReport = await uploadReport.save();
//             res.send(201).render("Reports Saved");
            
//         } else {
//             console.error();
//         }
            
//         } catch (error) {
//             res.status(400).send(error);
//         }

// });



router.get("/preports", async (req, res) => {
    res.render("preports");
});

router.post("/preports", async (req, res) => {

    try {
        const name = req.body.name;
        
        const pname = await Register.findOne({ firstName: name });

        if (pname) {
            const uploadReport = new Preports({
                name: req.body.name,
                healthProblem: req.body.healthProblem,
                medications: req.body.medications,
                medicalHistory: req.body.medicalHistory,
                otherDetails: req.body.otherDetails,
                status: req.body.status,
            });

            const uploadedReport = await uploadReport.save();
            //const reports = await Preports.find({});
            res.status(201).render("viewreports");


        } else {
            console.error("User not found"); // Log an error if the user is not found
            res.status(404).render("User Not Found"); // Render an appropriate view
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});


// router.get("/yourReport", async(req,res)=>{

    
//     try{
//         const reports = await Preports.find({});
//         res.render("viewreports",{reports});
//     }catch(error){
//         console.error(error);
//         res.status(500).send("internal server error");

//     }


// } );

 module.exports = router;

