import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../helpers/auth';
 import Bot from './logo1.jpeg';

const Header = () => {
let navigate = useNavigate();
const handleLogout = evt =>{
    logout();
    navigate('/signin');

}
    // () => {
//         navigate('/signin');
//    }   });
// };


    //view
    const showNavigation = () => (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand" ><img src={Bot} width="80" height="50" /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    {/*<ul className="navbar-nav me-auto mb-2 mb-lg-0">*/}
                    <ul className="navbar-nav ms-auto">
                        {!isAuthenticated() && (
                            <Fragment>
                                <li className="nav-item">
                                    <Link to='/' className="nav-link active" aria-current="page" >Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/signup' className="nav-link"  >Signup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/signin' className="nav-link">Signin</Link>
                                </li>
                            </Fragment>

                        )}

                        {isAuthenticated() && isAuthenticated().role === 0 && (
                            <Fragment>
                                <li className="nav-item">
                                    <Link to='/seller/dashboard' className="nav-link" >Seller Store</Link>
                                </li>

                            </Fragment>

                        )}


                        {isAuthenticated() && isAuthenticated().role === 1 && (
                            <Fragment>
                                <li className="nav-item">
                                    <Link to='/buyer/dashboard' className="nav-link" > Buyer Store</Link>
                                </li>

                            </Fragment>

                        )}
                        
                         
                         {isAuthenticated() && (
                            <Fragment>
                                <li className="nav-item">
                                    <button 
                                  
                                    className="btn btn-link text-secondary text-decoration-none"
                                    onClick={handleLogout}
                                     >Logout</button>
                                </li>

                            </Fragment>

                        )}








                    </ul>

                </div>
            </div>
        </nav>

    );

    //render
    return (<header id='header'>{showNavigation()}</header>

    );



};
export default Header;