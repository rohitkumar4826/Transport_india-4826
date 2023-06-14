const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/LoginFormPractice",{
    useNewUrlParser:true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
const passportLocalMongoose = require('passport-local-mongoose');
var profileSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    dob: String,
    email: String,
    gender: String,
    marital_status: String,
    mobile_no: String,
    security_question: String,
    answer: String
  });
module.exports=mongoose.model("Profile",profileSchema)