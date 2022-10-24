
import './App.css';
import './products.css'
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { getUserData,deletePostData } from "../api/auth";
import image from "../download.png";
import { addUserImage, editUserData, addPost } from "../api/auth";
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import isEmpty from 'validator/lib/isEmpty';
import Footer from './Footer';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

const SellerDashboard = () => {

  const [userName, setUserName] = useState();
  const [userAddress, setUserAddress] = useState();
  const [userCountry, setUserCountry] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPhoneNumber, setUserPhoneNumber] = useState();
  const [userImage, setUserImage] = useState();
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [isUserImage, setIsUserImage] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [Picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [isAddPost, setIsAddPost] = useState(false);
  const [data, setData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [userFormData, setFormData] = useState({
    successMsg: false,
    errorMsg: false,
    loading: false,
  });
  const[price,setPrice]=useState();

  const [postFormData, setPostFormData] = useState({

    postErrorMsg: false,

  });

  const { successMsg, errorMsg, loading } = userFormData;
  const { postErrorMsg } = postFormData;
  const getdata = async () => {
    const data = localStorage.getItem("user");
    const data1 = JSON.parse(data);

    try {
      getUserData(data1.email)
        .then(response => {
          setUserName(response.data.userData.username);
          setUserAddress(response.data.userData.address);
          setUserCountry(response.data.userData.country);
          setUserEmail(response.data.userData.email);
          getPostsdata(response.data.userData.email);
          if (response.data.userData.phoneNumber === undefined) {
            setIsPhoneNumber(false);
          }
          else {
            setUserPhoneNumber(response.data.userData.phoneNumber);
            setIsPhoneNumber(true);
          }

          if (response.data.userData.image === undefined || response.data.userData.image === null) {

            setIsUserImage(false);
          }
          else {
            setUserImage(response.data.userData.image);
            setIsUserImage(true);
           
          }
        })
    }
    catch (err) {
      console.log('Error : ', err);
    }

  }


  const checkImageData = () => {
    var check = false;
    if (Picture === null || Picture === undefined) {

      setFormData({
        ...userFormData, errorMsg: 'Please upload image'
      })
      console.log('Please upload image');
      check = false;
    }
    else {
      var fileextension = Picture.name.split(".").pop();

      if (Picture.size > 10485760) {
        setFormData({
          ...userFormData, errorMsg: 'Please upload file having size less than 10 MB'
        })
        console.log('Error : ', 'Please upload file having size less than 10 MB')
      }
      else if (fileextension !== "png" && fileextension !== "jpg" && fileextension !== "jpeg" && fileextension !== "gif") {
        setFormData({
          ...userFormData, errorMsg: 'Please upload image of png/jpg/jpeg/gif format'
        })
        console.log("Error : ", 'Please upload image of png/jpg/jpeg/gif format')
      }
      else {
        check = true;
        setFormData({
          ...userFormData, errorMsg: null
        })
      }
    }
    return check;
  }
  const addUserProfileImage = async () => {


    if (checkImageData() == true) {

      const formdata = new FormData();
      formdata.append("email", userEmail);
      formdata.append("image_url", Picture);

      try {
        addUserImage(formdata)
          .then((response) => {
            console.log('Axios signup success:', response);
            window.location.reload();
          })
          .catch((err) => {
            console.log('Axios signup error:', err);
            setFormData({ ...userFormData, loading: false, errorMsg: err.response.data.errorMessage });
          });

      }
      catch (err) {
        console.log('Error : ', err);
      }

    }

  }
  const verifyDescriptionAndTitle = () => {
    var check = true;
    if (isEmpty(description) || isEmpty(title)||isEmpty(price)) {
      check = false;
      setPostFormData({
        ...postFormData, postErrorMsg: 'Please fill all required details of post'
      })
      console.log("Please fill all required details of post");
    }

    else if (description.length < 10 || title.length < 5) {
      check = false;
      setPostFormData({
        ...postFormData, postErrorMsg: 'Description length must be greater than 10 and title must be greater than 5'
      })
      console.log("Description length must be greater than 10 and title must be greater than 5");
    }
    else if(price==0)
    {
      check = false;
      setPostFormData({
        ...postFormData, postErrorMsg: `Price can't be equal to 0`
      })
      console.log(`Price can't be equal to 0`);
    }
    else if(price<0)
    {
      check = false;
      setPostFormData({
        ...postFormData, postErrorMsg: `Price can't be negative`
      })
      console.log(`Price can't be negative`);
    }
    else {
      setPostFormData({
        ...postFormData, postErrorMsg: null
      })
    }
    return check;
  }

  const checkPostImageData = () => {
    var check = false;
    if (postImage === null || postImage === undefined) {
      setPostFormData({
        ...postFormData, postErrorMsg: 'Please upload image'
      })
      check = false;
    }
    else {
      var fileextension = postImage.name.split(".").pop();

      if (postImage.size > 10485760) {
        setPostFormData({
          ...postFormData, postErrorMsg: 'Please upload file having size less than 10 MB'
        })
        console.log('Error : ', 'Please upload file having size less than 10 MB', postImage)

      }
      else if (fileextension !== "png" && fileextension !== "jpg" && fileextension !== "jpeg" && fileextension !== "gif") {

        setPostFormData({
          ...postFormData, postErrorMsg: 'Please upload image of png/jpg/jpeg/gif format'
        })
        console.log("Error : ", 'Please upload image of png/jpg/jpeg/gif format')

      }
      else {
        check = true;
        setPostFormData({
          ...postFormData, postErrorMsg: null
        })
      }
    }
    return check;
  }

  const getPostsdata = async (email) => {

    try {
      const res = await fetch("/api/auth/allposts/"+email, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"

      });
      const mydata = await res.json();
      if (mydata.message.length > 0) {
        setIsData(true);
        setData(mydata.message);
      }
      else {
        setIsData(false);
      }
    }
    catch (error) {
      console.log('Error:'+error);

    }
  }


  const submitPost = (e) => {
    e.preventDefault();
    if (verifyDescriptionAndTitle() === true && checkPostImageData() === true) {
      const formdata = new FormData();
      formdata.append("email", userEmail);
      formdata.append("image_url", postImage);
      formdata.append("description", description);
      formdata.append("price",price);
      formdata.append("title", title);
      try {
        addPost(formdata)
          .then((response) => {
            console.log('Axios signup success:', response);
            window.location.reload();
          })
          .catch((err) => {
            console.log('Axios signup error:', err);
            setFormData({ ...userFormData, loading: false, errorMsg: err.response.data.errorMessage });
          });
      }
      catch (err) {
        console.log('Error : ', err);
      }
    }

  }

  const deletePost=(id)=>{
    try {
      deletePostData(id)
        .then((response) => {
          console.log('Axios signup success:', response);
          window.location.reload();
        })
        .catch((err) => {
          console.log('Axios signup error:', err);
          setFormData({ ...userFormData, loading: false, errorMsg: err.response.data.errorMessage });
        });
    }
    catch (err) {
      console.log('Error : ', err);
    }
  }

  
  useEffect(() => {
    getdata();



  }, [Picture]);

  return (
    <>
    <div className='back'>
    <div className='container myprofilecontainer'>
      <br></br>
      <h3 className='text-center'>My Profile</h3>
      <div className='mainbody'>


        <div className="row gutters-sm">

          <div className="col-lg-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  {isUserImage === true && <>
                    <img src={`http://localhost:5000/getuserimage/${userImage}`} alt="Profile Pic" className=" cprofilepic" width="150" />
                  </>}
                  {isUserImage === false && <>
                    <img src={image} alt="Profile Pic" className=" cprofilepic" width="150" />
                  </>}



                  <div className="mt-3">
                    <h4>{userName}</h4>

                  </div>

                  <button type="button" className='btn btn-primary' onClick={event => setIsClicked(!isClicked)}>Upload Image</button>
                  {isClicked === true && <>

                    <input className="form-control" type="file" accept='.png, .jpg, .jpeg, .gif' id="inputformFile" name="image" style={{ "margin-top": "380px", "width": "400px", "margin-left": " 3%", "margin-right": "3%" }} onChange={(e) => setPicture(e.target.files[0])} />
                    <button type="button" className='btn btn-success' style={{ "margin-top": "80px" }} onClick={addUserProfileImage}>Save Image</button>

                  </>}
                  <br />
                  <br />

                  {errorMsg && showErrorMsg(errorMsg)}
                  <br />


                </div>
              </div>
            </div>
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                  <span className="text-secondary">https://bootdey.com</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                  <span className="text-secondary">bootdey</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                  <span className="text-secondary">@bootdey</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                  <span className="text-secondary">bootdey</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                  <span className="text-secondary">bootdey</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="col-lg-8">
            <div className="card mb-3 myprofilecard">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-lg-6 text-secondary">
                    {userName}
                  </div>
                </div>
                <hr style={{ "color": "silver", "border": "1px solid" }} />
                <div className="row">
                  <div className="col-lg-6">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-lg-6 text-secondary">
                    {userEmail}
                  </div>
                </div>
                <hr style={{ "color": "silver", "border": "1px solid" }} />
                <div className="row">
                  <div className="col-lg-6">
                    <h6 className="mb-0">Address</h6>
                  </div>
                  <div className="col-lg-6 text-secondary">
                    {userAddress}
                  </div>
                </div>
                <hr style={{ "color": "silver", "border": "1px solid" }} />
                <div className="row">
                  <div className="col-lg-6">
                    <h6 className="mb-0">Country</h6>
                  </div>
                  <div className="col-lg-6 text-secondary">
                    {userCountry}
                  </div>
                </div>
                <hr style={{ "color": "silver", "border": "1px solid" }} />
                {isPhoneNumber === true && <>
                  <div className="row">
                    <div className="col-lg-6">
                      <h6 className="mb-0">Phone Number</h6>
                    </div>
                    <div className="col-lg-6 text-secondary">
                      {userPhoneNumber}
                    </div>
                  </div>
                  <hr style={{ "color": "silver", "border": "1px solid" }} />
                </>}


                <div className='row'>
                  <div className='col'>
                    <Link to='/editInfo' className='btn btn-info btnprofileedit'>Edit Information <i className='far fa-edit'></i></Link>

                  </div>

                </div>


              </div>
            </div>

            <div className='text-center'>
              <button type="button" className='btn btn-danger' onClick={event => setIsAddPost(!isAddPost)}>Add a post</button>
            </div>

            <br />
            {isAddPost === true && <>
              <div className="card mb-3 myprofilecard">
                <div className="card-body">


                  <form className="signu-form" style={{ "color": "white" }} noValidate>

                    {postErrorMsg && setPostFormData(postErrorMsg)}
                    <h4 style={{ "color": "black", "margin": "0px 200px" }} className="text-center">Add a post</h4>

                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Title</span>
                      </div>
                      <input
                        name="title"
                        value={title}
                        type="text"
                        className="form-control"
                        placeholder="Post title"

                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Price</span>
                      </div>
                      <input
                        name="price"
                        value={price}
                        type="number"
                        className="form-control"
                        placeholder="Product price"
                        aria-label="price"
                        aria-describedby="basic-addon1"
                        min="0"
                        onChange={(event) => setPrice(event.target.value)}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Description</span>
                      </div>
                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="description" placeholder='Product description'
                        value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                    </div>
                    <div className="input-group mb-3">

                      <input className="form-control" type="file" accept='.png, .jpg, .jpeg, .gif' id="inputformFile" name="image" onChange={(event) => setPostImage(event.target.files[0])} />


                    </div>
                    <br /><button type='button' className='btn btn-success' onClick={submitPost}>Add Post</button>
                  </form>


                </div>




              </div>
            </>}
          </div>


        </div>
        {isData === true && <>
        
        <div className='bor' align="center" bgcolor="black" > <marquee scrollamount="10" onmouseover="stop()" onmouseout="start()"><h3>UPLOADED PRODUCTS HERE</h3>  </marquee> </div>

        <div className="container bg-trasparent my-4 p-3">
          <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
            {data.map((item) => {
              return (
                <div className="col">
                  <div className="card h-100 shadow-sm">
                    <img src={`http://localhost:5000/getPostimage/${item.Postdata.image}`}  class="card-img-top p-3" alt="Post data"  />
                    <div className="card-body">
                      <div className="clearfix mb-3">
                        <span className="float-start badge rounded-pill bg-primary">
                          { item.Postdata.title}
                        </span>
                        <span className="float-end price-hp">
                        {item.Postdata.price===undefined&&<><p>NA</p></>}
                        {item.Postdata.price!==undefined&&<><p>{item.Postdata.price}  &#8360;/unit</p></>}
                        </span>

                      </div>
                      
                      <span className="float-start badge rounded-pill bg-info">
                      <i class="fa fa-user mx-1"></i> {item.sellerData[0].username}
                      </span>
                      
                  <br></br>    
                  <h5 className="card-title">
                     {item.Postdata.description}
                      </h5>
                      <div className="text-center my-4 ">
                        
                        <a href="#" className="btn btn-warning">Chat Box</a>
                        <br/><br/>
                        <a className='col my-2'><Link to={"/editproduct/"+item.Postdata._id} className='btn btn-secondary' >Edit</Link></a>
                        <br/><br/>
                        <a className='col my-2'><a  className='btn btn-danger btn-small' onClick={() =>deletePost (item.Postdata._id)}>Delete</a></a>
                      </div>
                    </div>
                  </div>


                </div>
              )
            })}
 </div>

        </div>
      </>}
      {isData === false && <><div className='bor' align="center" bgcolor="black" > <marquee scrollamount="10" onmouseover="stop()" onmouseout="start()"><h3>PRODUCTS NOT AVAILABLE</h3>  </marquee> </div></>}
<br></br>
      </div>
           

      </div>
      </div>
{/* <footer className="page-footer font-small special-color-dark pt-4">

  <div className="container">

    <div className="row">
      <div className="col-md-6 mb-4">

        <form className="form-inline">
          <input className="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search"
            aria-label="Search"/>
          <i className="fas fa-search" aria-hidden="true"></i>
        </form>

      </div>
      <div class="col-md-6 mb-4">

        <form className="input-group">
          <input type="text" className="form-control form-control-sm" placeholder="Your email"
            aria-label="Your email" aria-describedby="basic-addon2"/>
          <div className="input-group-append">
            <button className="btn btn-sm btn-outline-white my-0" type="button">Sign up</button>
          </div>
        </form>

      </div>
    </div>

  </div>
  <div className="footer-copyright text-center py-3">© 2020 Copyright:
    <a href="/"> PC BUILDER.COM</a>
  </div>

</footer> */}
 <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span >Get connected with us on social networks:</span>
        </div>

        <div>
        <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='google' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='github' />
            </MDBBtn>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5' >
          <MDBRow className='mt-3' >
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4' >
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Company name
              </h6>
              <p>
                <b>PC Builder Team </b>
                <br></br>
                
                Waqas Manzoor
                <br></br>
                Arslan Ahmad
                <br></br>
                Haris Mehmood
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Tools</h6>
              <p>
                <a href='#!' className='text-reset'>
                  MongoDB
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Express
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Node
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Faislabad, NY 10012, Pk
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 92 301-9834002
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
        © 2021 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          PCBuilder.com
        </a>
      </div>
      
    </MDBFooter>

    </>
  )


};
export default SellerDashboard;