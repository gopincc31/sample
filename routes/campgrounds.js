
const express=require('express');
const router=express.Router();
const catchAsync=require('../utils/catchAsync');
const campgrounds=require('../controllers/campgrounds')
const {isLoggedIn,isAuthor,validateCampground}=require('../middleware');
const ExpressError= require('../utils/ExpressError');
const Campground = require('../models/campground');
const  multer=require('multer');
const {storage}=require('../cloudinary');
const  upload=multer({storage});



router.route('/')
   .get(catchAsync(campgrounds.index))
   .post(isLoggedIn,upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));
//   .post(upload.array('image'),(req,res)=>{
//    console.log(req.body,req.files);
//    res.send("it's work");
// })

router.get('/new',isLoggedIn,campgrounds.renderNewForm)

router.route('/:id')
      .get(catchAsync(campgrounds.showCampground))
      .delete(isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampground))
      .put(isLoggedIn,upload.array('image'),validateCampground,isAuthor,catchAsync(campgrounds.updatedCampground));

router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm));


module.exports=router;