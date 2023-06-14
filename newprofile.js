// App.js
// const { response } = require("express");
var express = require("express"),
    ejs=require("ejs"),
	/* mongoose = require("mongoose"), */
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
    // bp=require("body-parser"),
	passportLocalMongoose = require("passport-local-mongoose");
const profile = require("./profile");
    
// const profile=require("./profile");
var app = express();
app.use(express.json());
// app.use(bp.urlencoded({extended:true}));
/* mongoose.connect("mongodb://127.0.0.1:27017/LoginFormPractice",{useNewUrlParser:true})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err)); */

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));


//=====================
// ROUTES
//=====================
app.get("/", function(req,res){
    res.render("demform");
});
app.get("/demform", function(req,res){
    res.render("demform");
});
app.get("/demoform",function(req,res){
    res.render("demoform")
});
app.get("/newprofile",function(req,res){
    res.render("newprofile");
});
// app.get('/update', (req, res) => {
//     // res.send('Update endpoint is working');
//     let data={}
//     res.render("demoform",{data});
// });

app.post('/editprofile', async (req, res) => {
    console.log(req.body);
     const data = new profile({
      first_name:req.body.fn,
      last_name: req.body.ln,
      dob: req.body.dob1,
	  email: req.body.mail1,
      gender: req.body.gnd1,
      marital_status: req.body.mrt1,
      mobile_no: req.body.mon1,
      security_question: req.body.que1,
      answer: req.body.ans1
    });
    const result = await data.save();
    console.log(result);
    console.log("kljlkjhkjhk"+data);
    res.render('demoform',{data}); // Redirect to the profile page after the update
});
// update Profile

app.post('/update', async (req, res) => {
    const profile1 = await profile.findOneAndUpdate(
        { email:req.body.mail1 },
        { 
            $set: {
                first_name: req.body.fn,
                last_name: req.body.ln,
                dob: req.body.dob1,
                gender: req.body.gnd1,
                marital_status: req.body.mrt1,
                mobile_no: req.body.mon1,
                security_question: req.body.que1,
                answer: req.body.ans1
            }
        });
        let data=profile1;
        // let data= await profile.findOne({email:req.body.mail1});
        console.log(data);
        res.render('demoform',{data})
        // (err, profile1) => {
        // if (err) 
        // {
        // console.error(err);
        // res.status(500).send('Error updating profile');
        // }
        // else 
        // {
        //  const data = profile1;
        // console.log('Profile updated successfully');
        // res.render('demoform',{data});
        // }
        // }
        // );
        // });
    });
        var port = process.env.PORT || 3000;
        app.listen(port, function () {
            console.log("Server Has Started!");
        });
