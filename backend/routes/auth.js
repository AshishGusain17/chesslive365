// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// // const { body, validationResult } = require("express-validator");
// var jwt = require('jsonwebtoken');
// const creds = require('./../Credentials_Save.json');
// const fetchuser = require('../middleware/fetchuser');

 

// // using async await as well as promise all
// router.post("/createUser", async (req, res) => {
//     let success = false;
//     console.log('createUser end-point: req body', req.body);
//     try {
//         const user = new User({
//             userName: req.body.name,
//             email: "as@",
//             password: req.body.password,
//         });

//         mult_user_check = await User.findOne({ userName: req.body.name });
//         if (mult_user_check) {
//             console.log("user already present");
//             return res.status(400).json({ success: success, message: "user exist already" });
//         } else {
//             user
//                 .save()
//                 .then(() => {
//                     console.log("user created");
//                     const data = {id: user.id}
//                     const jwt_token = jwt.sign(data, creds.JWT_SECRET_KEY);
//                     // console.log(jwt_token);
//                     success = true;
//                     return res.json({ success:success, jwt_token: jwt_token, message: "new user created" });
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         }
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({success: success, message: "/createUser endpoint, error catch block" });
//     }
// });




// // just checking whether user present or not, not comparing password
// router.post('/login', async(req, res)=>{
//     let success = false;
//     console.log('login end-point: req body',req.body);

//     try{
//         user_Existence_Check = await User.findOne({ userName: req.body.name, password: req.body.password });
//         if (user_Existence_Check) {
//             const data = {id: user_Existence_Check.id}
//             const jwt_token = jwt.sign(data, creds.JWT_SECRET_KEY);

//             success = true;
//             return res.json({ success:success, jwt_token: jwt_token, message: "user authenticated & logged In" }); 
//         } else {
//             console.log("no such user in database");
//             return res.status(400).json({success:success, message: 'no such user in database'}) 
//         }
//     }
//     catch (err) {
//         console.log(err);
//         return res.status(500).json({success:success,  message: "/login endpoint, error catch block" });
//     }

// })



// router.post('/getUser', fetchuser, async(req, res)=>{
//     let success = false;
//     try{
//         const user = await User.findById(req.userId);
//         success = true;
//         return res.json({success:success, user: user});
//     }    
//     catch (err) {
//         console.log(err);
//         return res.status(500).json({ success:success, message: "/getUser endpoint, error catch block" });
//     }


// })
// module.exports = router;
