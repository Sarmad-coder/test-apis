var express = require('express');
var router = express.Router();
const Car=require("../models/car")
let multer = require("multer")
let jsonwebtoken = require("jsonwebtoken");
const salt = 10

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let path = './public/images'
  
      cb(null, path)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage, limits: { fieldSize: 20971520 } })

router.post('/create', upload.fields([{ name: 'images', maxCount: 10 },]), async (req, res, next)=> {
  try {
    jsonwebtoken.verify(req.body.token, "hello hello hello", async (err, data) => {
        console.log(req.body.token)
        if (data) {
            // let user = users.find(user => user._id == data.meriID)
            req.user=data.id

        } else {
           return res.json({status:"error",message:"You are not logged in"})
        }
    })
    if (req.files.images) {
        if (req.body.noOfCopies<req.files.images.lenth) {
        return res.json({status:"error",message:"Your images is greater than the number of copies"})
        }
    }
    
    console.log(req.body)
    console.log( req.files.images)
    req.body.images=[];
    req.files.images.forEach((image)=>{
        req.body.images.push("http://localhost:3002/images/"+image.originalname)
    })
    console.log(req.body.images)
   
   
    let car=new Car(req.body)
    await car.save()
    res.json({status:"success",data:car.images})
    
  } catch (error) {
    console.log(error)
    res.json({ error: error})
  }
});
// router.post("/login", async (req, res) => {
//   try {
//       let user = await User.findOne({ username: req.body.username });
//       console.log(user)
//       if (user && (await bcrypt.compare(req.body.password, user.password))) {

//           jsonwebtoken.sign({
//               id: user._id
//           }, "hello hello hello",
//               {
//                   expiresIn: "1D"
//               },
//               (err, token) => {
//                   res.json(
//                       {
//                           status: "success",
//                           token,
//                       }
//                   )
//               }
//           )
         
//       } else {
//           res.json({ status: "error", data: "Invalid username or password" })
//       }
//   } catch (error) {
//       console.log(error)
//   }

// })


module.exports = router;
