const express = require('express');
// const { signup } = require('../client/src/api/auth');
const router = express.Router();
const {signupValidator,signinValidator, validationResult} = require('../middleware/validator');
const {signupController,signinController,
    getUserInfo,EditUserInfo,addUserImage,addPost,getAllPost,deletePost,
    getProductDetail,updateProductDetail,getUsersCount,deleteBuyers,deleteSeller,getAllSeller,getAllBuyers} = require('../controllers/auth');

router.post('/signup', signupValidator, validationResult, signupController);
router.post('/signin', signinValidator, validationResult, signinController);
router.get('/getinfo/:email',getUserInfo);
router.put('/editsellerinfo',EditUserInfo);
router.post('/adduserimage',addUserImage);
router.post('/addPost',addPost);
router.get('/allposts/:filterby',getAllPost);
router.delete('/deletepost/:id',deletePost);
router.get('/getpost/:id',getProductDetail);
router.put('/updatepost',updateProductDetail);
router.get('/getuserscount',getUsersCount);
router.delete('/deletebuyer/:email',deleteBuyers);
router.delete('/deleteSeller/:email',deleteSeller);
router.get('/getallsellers',getAllSeller);
router.get('/getallbuyers',getAllBuyers);



module.exports = router;