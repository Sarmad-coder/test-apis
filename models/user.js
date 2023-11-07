let mogoose = require("mongoose")

let userSchema = mogoose.Schema({
  
  email: { type: String, 
    default: '', 
    required: [true, "Email is required"],
    unique: [true, "This email already exists"],
  },
  password: { type: String, default: ''},
  
});

let User = mogoose.model("user", userSchema)
module.exports = User;
