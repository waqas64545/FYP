import React,{useState,useEffect} from "react";
import  {Link, useNavigate} from 'react-router-dom';
import {showErrorMsg, showSuccessMsg} from '../helpers/message';
import { showLoading } from "../helpers/loading";
import { setAuthentication, isAuthenticated } from "../helpers/auth";
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { signin } from "../api/auth";


const Signin=()=>{

     let navigate = useNavigate();
     
     useEffect(() =>{
        if(isAuthenticated() &&  isAuthenticated().role===1){
           // console.log('Redirecting to buyer dashboard');
           
            navigate('/buyer/dashboard');
        }else if(isAuthenticated() &&  isAuthenticated().role===2){
             console.log('Redirecting to admin dashboard');
              navigate('/admin/dashboard');}
        else if(isAuthenticated() &&  isAuthenticated().role===0){
          //  console.log('Redirecting to seller dashboard');
            navigate('/seller/dashboard');
        }
     },[navigate]);



    const [formData, setFormData] = useState({
       
        email: 'waqas@gmail.com',
        password: 'abc123',
        errorMsg: false,
        loading: false,
        successMsg: false,
        
    });
    const {  email, password, errorMsg, loading,  successMsg,password2 } = formData;


    const handlerChange = (evt) => {
        // console.log(evt);
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            errorMsg: '',
        });
    };

    const handlerSubmit = (evt) => {
        evt.preventDefault();
        if ( isEmpty(email) || isEmpty(password)) {
            setFormData({
                ...formData, errorMsg: 'All fields are required'
            })
        }
        else if (!isEmail(email)) {
            setFormData({
                ...formData, errorMsg: 'Invalid Email'
            })
        }
        // else if (!equals(password, password2)) {
        //     setFormData({
        //         ...formData, errorMsg: 'Passwords do not match'
        //     })
        // }
         else {
            // setFormData({
            //     ...formData,
            //     successMsg:'validation  success',
            // });
           const {email,password}=formData;
           const data ={email,password};

           setFormData({...formData,loading:true});
            signin(data)
            .then(response =>{
                console.log('Response : ',response);
                
                setAuthentication(response.data.token, response.data.user);   //store

                if(isAuthenticated() &&  isAuthenticated().role===1){      //read
                    console.log('Redirecting to buyer dashboard');      
                   
                    navigate('/buyer/dashboard');
                } else if(isAuthenticated() &&  isAuthenticated().role===2){
                    console.log('Redirecting to admin dashboard');
                   
                    navigate('/admin/dashboard');
                }
                else{
                    console.log('Redirecting to seller dashboard');
                    navigate('/seller/dashboard');
                }


            })
            .catch(err=>{
                console.log('signin api function error:', err.response.data.errorMessage);
                setFormData({...formData,loading:false});
                setFormData({
                    ...formData, errorMsg: err.response.data.errorMessage
                })
            })
             
        }
     
    };

    const showSigninForm = () => (
        <form className="signu-form" style={{"color":"white"}} onSubmit={handlerSubmit} noValidate>
            <h1 className="text-center">Login Page</h1>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                    </div>
                    <input
                        name="email"
                        value={email}
                        type="email"
                        className="form-control"
                        placeholder="Email address"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={handlerChange}
                    />
                </div>
            
                <div className="input-group mb-3">
                <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                    </div>
                    <input
                        name="password"
                        value={password}
                        type="password"
                        className="form-control"
                        placeholder="Create password"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={handlerChange}
                    />
                </div>
            
              
            <div className="form-group">
                <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-primary btn-block">
                        Signin
                    </button>
                </div>
            </div>
            <p className="text-center text-white">
                Don't Have an account? <Link to="/signup">Register here</Link>
            </p>
        </form>
    );
    return (
        <div className="signin-container">
            
          <div className="row px-3 vh-100">
                <div className="col-md-5 mx-auto align-self-center">
                {successMsg && showSuccessMsg(successMsg)}
                    {errorMsg && showErrorMsg(errorMsg)}
                    {loading && (
                    <div className="text-center pb-4">{showLoading()}</div>)}
                    {showSigninForm()}

                    {/* <p style={{color:'white'}}>{JSON.stringify(formData)}</p>  */}
                </div>
            </div>

        </div>
    );

};
export default Signin;