
import React,{useState,useEffect} from "react";
import Sidebar from './Sidebar';
import './DeleteSeller.css'
import {getBuyersData,deleteBuyersData} from '../api/auth'
const DeleteBuyers = () => {
    const [isFound, setisFound] = useState(false);
    const [buyersData, setBuyersData] = useState([]);
    const getData = () => {
        setisFound(false);

        try {
            getBuyersData()
                .then(response => {
                    console.log("Data :", response.data.message);

                    if (response.data.message.length > 0) {
                        setisFound(true);
                        setBuyersData(response.data.message);
                    }



                })
        }
        catch (err) {
            console.log('Error : ', err);
        }


    }
    const deleteBuyerBtn=(email)=>{
        try {
            deleteBuyersData(email)
                .then(response => {
                    window.location.reload();
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
                                        <div class="table-title" style={{"textAlign":"center"}}>
                                            <h3>Buyer Management</h3>
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
                                            {buyersData.map((item, index) => {
                                                    return (
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td><a href="#"> {item.username}</a></td>
                                                    <td>{item.email}</td>
                                                    <td>Buyer</td>
                                                    <td><span class="status text-success">&bull;</span> Active</td>
                                                    <td>
                                                     <button className="btn btn-danger" onClick={() =>deleteBuyerBtn(item.email)}>Delete</button>
                                                    </td>
                                                </tr>
                                                    )})}
                                               
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
export default DeleteBuyers;

