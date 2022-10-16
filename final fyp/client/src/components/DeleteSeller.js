
import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import './DeleteSeller.css'
import { getSellersData,deleteSellersData } from '../api/auth'

const DeleteSeller = () => {
    const [isFound, setisFound] = useState(false);
    const [sellerData, setSellerData] = useState([]);
    const deleteSellerBtn=(email)=>
    {  
        try {
            deleteSellersData(email)
                .then(response => {
                    window.location.reload();
                })
        }
        catch (err) {
            console.log('Error : ', err);
        }

    }
    const getData = () => {
        setisFound(false);

        try {
            getSellersData()
                .then(response => {
                    console.log("Data :", response.data.message);

                    if (response.data.message.length > 0) {
                        setisFound(true);
                        setSellerData(response.data.message);
                    }



                })
        }
        catch (err) {
            console.log('Error : ', err);
        }


    }

    useEffect(() => {
        getData();
    }, []);
    return (
        <>

            <div className="app-sidebar">
                <div>
                    <Sidebar />
                </div>

                <div>
                    
                    <div style={{ "marginLeft": "180px" }}>
                        <div style={{ "textAlign": "center" }}>

                        {isFound===true&&<>
                            <div class="container-xl">
                                <div class="table-responsive">
                                    <div class="table-wrapper">
                                        <div class="table-title" style={{ "textAlign": "center" }}>
                                            <h3>Seller Management</h3>
                                            {/* <div class="row" >
                                                <div class="col-sm-5">
                                                    <h2>Seller <b>Management</b></h2>
                                                </div>
                                               
                                            </div> */}
                                        </div>
                                        <table class="table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sellerData.map((item, index) => {
                                                    return (

                                                        <tr>
                                                            <td>{index+1}</td>
                                                            {item.image!==null && item.image!==undefined &&<>
                                                            <td><a href="#"><img src={`http://localhost:5000/getuserimage/${item.image}`} style={{"width":"30px","height":"30px"}} class="avatar" alt="Avatar" />{item.username}</a></td>
                                                            </>}
                                                            {item.image===null || item.image===undefined &&<>
                                                            <td><a href="#"><img src={`https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png`} style={{"width":"20px"}} class="avatar" alt="Avatar" />{item.username}</a></td>
                                                            </>}
                                                            <td>{item.email}</td>
                                                            <td>Seller</td>
                                                            <td><span class="status text-success">&bull;</span> Active</td>
                                                            <td>
                                                                <button className="btn btn-danger" onClick={() =>deleteSellerBtn(item.email)}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                            </>}
                            {isFound===false&&<>No data Available</>}

                        </div>
                    </div>
                   
                   
                </div>
                

            </div>


        </>
    )
};
export default DeleteSeller;