var express = require('express');
var router = express.Router();
const User=require("../models/user")
const bcrypt = require('bcrypt')
let jsonwebtoken = require("jsonwebtoken");
const salt = 10

/* GET users listing. */
router.post('/create', async (req, res, next)=> {
  try {
    req.body.password=await bcrypt.hash(req.body.password,salt)
    let user=new User(req.body)
    await user.save()
    res.json({status:"success"})
    
  } catch (error) {
    console.log(error)
    res.json({ error: error})
  }
});
router.post("/login", async (req, res) => {
  try {
      let user = await User.findOne({ username: req.body.username });
      console.log(user)
      if (user && (await bcrypt.compare(req.body.password, user.password))) {

          jsonwebtoken.sign({
              id: user._id
          }, "hello hello hello",
              {
                  expiresIn: "1D"
              },
              (err, token) => {
                  res.json(
                      {
                          status: "success",
                          token,
                      }
                  )
              }
          )
         
      } else {
          res.json({ status: "error", data: "Invalid username or password" })
      }
  } catch (error) {
      console.log(error)
  }

})


module.exports = router;
