const express=require('express');
const router=express.Router();
const homeController =require('../controllers/home_controller');


router.get('/',homeController.home);
//any further routes will be required below
router.use('/users',require('./users'));//when /user/xyz comes in it will require users.js and map to corresponding controller
console.log("Router Loaded");
module.exports=router;
