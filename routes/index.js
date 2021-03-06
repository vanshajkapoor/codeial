const express=require('express');
const router=express.Router();
const homeController =require('../controllers/home_controller');


router.get('/',homeController.home);
router.get('/home-trending',homeController.trending);
//any further routes will be required below
router.use('/users',require('./users'));//when /user/xyz comes in it will require users.js and map to corresponding controller
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/api',require('./api'))
console.log("Router Loaded");
module.exports=router;
