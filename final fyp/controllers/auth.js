const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtEpire } = require('../config/keys');
const { token } = require('morgan');
const path = require('path');
const e = require('express');
const Post = require('../models/Post');
const fs = require('fs');
const prod = require('../config/prod');
exports.signupController = async (req, res) => {
  // console.log(req.body);

  const { username, email, password, role, address, country } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errorMessage: 'Email already exists',
      });
    }

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.address = address;
    newUser.role = role;
    newUser.country = country;

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();

    res.json({
      successMessage: "Registration success. Please signin.",
    });

    //  console.log(newUser.password);

  } catch (err) {
    console.log('signupController error:', err);
    res.status(500).json({
      errorMessage: 'Server error',
    });
  }
};


exports.signinController = async (req, res) => {


  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errorMessage: 'Invalid credentials',
      });

    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMessage: 'Invalid credentials',
      });
    }

    const payload = {
      user: {
        _id: user._id,
      }
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 24000 }, (err, token) => {
      if (err) console.log('jwt error: ', err);
      const { _id, username, email, role } = user;
      console.log('tok', token);
      res.json({            //frontend token and user
        token,
        user: { _id, username, email, role }
      });
    });

  } catch (err) {
    console.log('siginController error:', err);
    res.status(500).json({
      errorMessage: 'server error',
    });
  }

};

exports.getUserInfo = async (req, res) => {
  const email = req.params.email;
  try {
    const loginUser = await User.findOne({ email: email });
    if (!loginUser) {
      console.log("Email does not exist");
      return res.status(422).json({ error: "Invalid Creadential" });
    }
    else {
      return res.status(201).json({ "userData": loginUser });
    }
  }
  catch (err) {
    console.log('Error : ', err);
  }
};

exports.EditUserInfo = async (req, res) => {


  const { username, address, country, phoneNumber, email } = req.body;

  try {
    const loginUser = await User.findOne({ email: email });
    if (!loginUser) {
      console.log("Email does not exist");
      return res.status(422).json({ error: "User not found" });
    }
    else {
      loginUser.username = username;
      loginUser.address = address;
      loginUser.country = country;
      loginUser.phoneNumber = phoneNumber;

      loginUser.save();
      //let newpath = path.join(process.cwd(), './images/userImages', image_url)
      //req.files.image.mv(newpath);

      return res.status(201).json({ message: "User profile edited successfully" });
    }
  }
  catch (err) {
    console.log('Error : ', err);
  }
  res.send("Hello")


}

exports.addUserImage = async (request, response) => {
  console.log(request.body)

  const file = request.files.image_url;
  const { email } = request.body;
  const loginUser = await User.findOne({ email: email });

  if (!loginUser) {
    console.log("Email does not exist");
    return response.status(422).json({ error: "User not found" });
  }
  else {
    var image_url = email + "_" + file.name;
    loginUser.image = image_url;
    loginUser.save();
    let newpath = path.join(process.cwd(), './images/userImages', image_url)
    request.files.image_url.mv(newpath);
    return response.status(200).json({ message: "Image uploaded successfully" })

  }

}


exports.addPost = async (req, res) => {

  const { email, description, title, price } = req.body;


  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        errorMessage: 'Buyer not exist',
      });
    }
    var image = req.files.image_url;
    var img_url = email + "_" + image.name;
    const newPost = new Post();
    newPost.selleremail = email;
    newPost.description = description;
    newPost.title = title;
    newPost.image = img_url;
    newPost.price = price;
    await newPost.save();
    let newpath = path.join(process.cwd(), './images/postImages', img_url)
    req.files.image_url.mv(newpath);
    return res.status(200).json({ message: "Post uploaded successfully" })

  } catch (err) {
    console.log("Message: ", err);
  }

}

exports.getAllPost = async (req, res) => {
  const filterBy = req.params.filterby;
  console.log("ABC");
  var posts;
  console.log("filterBy", filterBy);
  try {
    if (filterBy === "all") {
      posts = await Post.find({});
    }
    else {
      posts = await Post.find({ selleremail: filterBy });
    }
    if (!posts) {
      return res.status(400).json({
        errorMessage: 'No posts found',
      });
    }
    else {
      var postsResults = []
      for (var data in posts) {
        const seller = await User.find({ email: posts[data].selleremail });
        if (!seller) {

          console.log("Seller not found " + ' ' + posts[data].selleremail, "\n");
        }
        else {
          var postData = { "sellerData": seller, "Postdata": posts[data] }
          postsResults.push(postData)
        }
      }
      return res.status(201).json({ message: postsResults });
    }

  } catch (err) {
    console.log('Error : ', err);
  }

}

exports.deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const postData = await Post.findOne({ _id: id });
    if (!postData) {
      return res.status(422).json({ error: "Post not found" });
    }
    else {
      const pathToFile = './images/postImages/' + postData.image;
      postData.remove({ _id: id });

      if (fs.existsSync(pathToFile)) {

        fs.unlink(pathToFile, (err) => {
          if (err) {
            console.log(err);
          }
          console.log('Image deleted');
        })
      }
      else {
        console.log("File Does not exist");
      }
      return res.status(200).json({ message: "Post deleted Successfully" })

    }
  }
  catch (err) {
    console.log('Error : ' + err);
  }
}

exports.getProductDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Post.findOne({ _id: id });
    if (!product) {
      return res.status(422).json({ error: "Product does not exist" });
    }
    else {
      return res.status(200).json({ message: product });
    }
  }
  catch (err) {
    console.log('Error : ', err);
  }
}

exports.updateProductDetail = async (req, res) => {
  const { id, price, description, title } = req.body;
  try {
    const product = await Post.findOne({ _id: id });
    if (!product) {
      return res.status(422).json({ error: "Product does not exist" });
    }
    else {
      product.title = title;
      product.description = description;
      product.price = price;
      product.save();
      return res.status(200).json({ message: "Product data updated successfully" });
    }
  }
  catch (err) {
    console.log('Error : ', err);
  }
}

exports.getUsersCount = async (req, res) => {

  try {
    buyersCount = await getBuyersCount();
    sellersCount = await getSellersCount();
    postsCount = await getPostsCount();
    var counts = {
      'buyersCount': buyersCount,
      'sellersCount': sellersCount,
      'postsCount': postsCount
    }
    return res.status(201).json({ message: counts })

  }
  catch (err) {
    return res.status(402).json({ error: err });
  }
}

getSellersCount = async () => {
  const sellers = await User.find({ role: 0 });

  return sellers.length;
}

getBuyersCount = async () => {
  const buyers = await User.find({ role: 1 });

  return buyers.length;
}

getPostsCount = async () => {
  const posts = await Post.find({});
  return posts.length;
}

exports.deleteBuyers = async (req, res) => {
  var email = req.params.email;
  try {
    const buyerData = await User.findOne({ email: email, role: 1 });
    if (!buyerData) {
      return res.status(404).json({ err: "Buyer not found" });
    }
    else {
      buyerData.delete();
      return res.status(201).json({ message: "Buyer data deleted successfully" });
    }
  }
  catch (err) {
    return res.status(402).json({ error: err });
  }
}

exports.deleteSeller = async (req, res) => {
  var email = req.params.email;

  try {
    const sellerData = await User.findOne({ email: email, role: 0 });

    if (!sellerData) {
      return res.status(404).json({ err: "Seller not found" });
    }
    else {
      await sellerPosts(email);
      await deleteSellerInfo(sellerData.image);
      sellerData.delete();
      return res.status(201).json({ message: "Seller data deleted successfully" });
    }
  }
  catch (err) {
    return res.status(422).json({ error: err });
  }
}

sellerPosts = async (email) => {
  try {
    const postsData = await Post.find({ selleremail: email });

    if (!postsData) {
      return res.status(404).json({ err: "Seller posts not found" });
    }
    else {
      
      for (let i = 0; i < postsData.length; i++) {
        deletePostByAdmin(postsData[i]._id.toJSON());
      }
    }
  }
  catch (err) {
    return res.status(402).json({ error: err });
  }
}
deletePostByAdmin = async (id) => {
  try {
    const postData = await Post.findOne({ _id: id });
    const pathToFile = './images/postImages/' + postData.image;
    postData.remove({ _id: id });

    if (fs.existsSync(pathToFile)) {

      fs.unlink(pathToFile, (err) => {
        if (err) {
          console.log(err);
        }
        console.log('Image deleted');
      })
    }
    else {
      console.log("File Does not exist");
    }
  }
  catch (err) {
    console.log('Error : ' + err);
  }
}

deleteSellerInfo=(image)=>{
  const pathToFile = './images/userImages/' +image;
    if (fs.existsSync(pathToFile)) {

      fs.unlink(pathToFile, (err) => {
        if (err) {
          console.log(err);
        }
        console.log('Image deleted');
      })
    }
    else {
      console.log("File Does not exist");
    }
}

exports.getAllSeller=async(req,res)=>{

  try
  {
    const sellers=await User.find({role:0});
    return res.status(201).json({message:sellers});
  }
  catch(err)
  {
    return res.status(422).json({error:err});
  }

}

exports.getAllBuyers=async(req,res)=>{

  try
  {
    const buyers=await User.find({role:1});
    return res.status(201).json({message:buyers});
  }
  catch(err)
  {
    return res.status(422).json({error:err});
  }

}


