let mogoose = require("mongoose")

let subCategorySchema = mogoose.Schema({
  
  carModel: {
    type: String,
  },
  city: String,
  phone:String,
  price:String,
  images:Array,
  user:{
    type: mogoose.Schema.Types.ObjectId, 
    ref: "user"
  }
  
})
let SubCatagory = mogoose.model("car", subCategorySchema)
module.exports = SubCatagory;
