// App.js

var express = require("express"),
    ejs=require("ejs"),
	passport = require("passport"),
	LocalStrategy = require("passport-local").Strategy,
	passportLocalMongoose = require("passport-local-mongoose")
const profile = require("./update");
const User = require("./model/User");
var app = express();


app.set("view engine", "ejs");
app.use(express.json());
// app.use(express.static(csspath));
// console.log(csspath);
app.use(express.urlencoded({ extended: true }));
app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public', {
	setHeaders: (res, path, stat) => {
	  res.set('X-Content-Type-Options', 'false');
	}
  }));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
	 res.render("index");

});
app.get("/profile", function (req, res) {
	  res.render("profile");
});
app.get("/index", function (req, res) {
	res.render("index");
  
});
app.get("/reservation", function (req, res) {
	res.render("reservation");
  
});
app.get("/train", function (req, res) {
	res.render("train");
});
app.get("/display", function (req, res) {
	res.render("display");
});
app.get("/signup", function (req, res) {
	res.render("signup");
});
app.get("/login1", function (req, res) {
	res.render("login1");
   // res.setHeader('Content-Type', 'text/css');
});
// Showing secret page
app.get("/reser", function (req, res) {
	res.render("reser");
});
app.get("/ViewFullStatus", function (req, res) {
	res.render("ViewFullStatus");
});

// Showing register form
app.get("/signup", function (req, res) {
	res.render("signup");
});

// Handling user signup
app.post("/signup", async (req, res) => {
	const user = await User.create({
	username: req.body.username,
	password: req.body.password
	});
	res.render("index");
//	return res.status(200).json(user);
});


//Showing login form
app.get("/login", function (req, res) {
	res.render("login");
});

//Handling user login
app.post("/login", async function(req, res){
	try {
		// check if the user exists
		const user = await User.findOne({ username: req.body.username });
		if (user) {
		//check if password matches
		const result = req.body.password === user.password;
		if (result) {
			res.render("profile");
		} else {
			res.status(400).json({ error: "password doesn't match" });
		}
		} else {
		res.status(400).json({ error: "User doesn't exist" });
		}
	} catch (error) {
		res.status(400).json({ error });
	}
});

// Handle the form submission
app.post('/register', async (req, res) => {
    let data = new profile({
      first_name:req.body.fn,
      last_name: req.body.ln,
	  email: req.body.mail1,
      dob: req.body.dob1,
      gender: req.body.gnd1,
      marital_status: req.body.mrt1,
      mobile_no: req.body.mon1,
      security_question: req.body.que1,
      answer: req.body.ans1,
	//   password:req.body.password,
	//   username:req.body.fn
    });
    const result = await data.save();
	console.log(req.body);
    console.log(result);
    res.render('profile',{data}); // Redirect to the profile page after the update
   
});

// app.post('/register', async (req, res) => {
//     let data = new User({
//       username:req.body.username,
// 	  email: req.body.mail1,
// 	  password:req.body.password
//     });
//     const result = await data.save();
// 	console.log(req.body);
//     console.log(result);
//     res.render('profile'); // Redirect to the profile page after the update
   
// });


app.post('/editprofile', async (req, res) => {
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
        res.render('profile',{data});
   
    });

//Handling user logout
app.get("/logout", function (req, res) {
	req.logout(function(err) {
		if (err) { return next(err); }
		res.redirect('/login');
	});
});


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server Has Started!");
});
