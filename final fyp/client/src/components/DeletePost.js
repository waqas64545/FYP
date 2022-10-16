
import React,{useState,useEffect} from "react";
import Sidebar from './Sidebar';
import {deletePostData} from '../api/auth'
import './DeleteSeller.css'
const DeletePosts = () => {
    const [data, setData] = useState([]);
    const [isData, setIsData] = useState(false);
    const deletePost=(id)=>{
        try {
           
          deletePostData(id)
            .then((response) => {
              console.log('Axios signup success:', response);
              window.location.reload();
            })
            .catch((err) => {
              console.log('Axios signup error:', err);
             
            });
        }
        catch (err) {
          console.log('Error : ', err);
        }
      }
    const getdata = async () => {
  
      try {
        const res = await fetch("/api/auth/allposts/all", {
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
          console.log("Data : ", mydata.message);

        }
        else {
          setIsData(false);
        }
  
      }
      catch (error) {
        console.log(error);
        
      }
    }
    useEffect(() => {
        getdata();
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

                            <div class="container-xl">
                                <div class="table-responsive">
                                    <div class="table-wrapper">
                                        <div class="table-title" style={{ "textAlign": "center" }}>
                                            <h3>Posts Management</h3>
                            
                                        </div>
                                        {isData===true&&<>
                                        <div className="container bg-trasparent my-4 p-3">
                                            <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
                                                {data.map((item) => {
                                                    return (
                                                <div className="col">
                                                    <div className="card h-100">
                                                        <img src={`http://localhost:5000/getPostimage/${item.Postdata.image}`} class="card-img-top" alt="Post data" />
                                                        <div className="card-body" >
                                                            <div className="clearfix mb-3">
                                                                <span className="float-start badge rounded-pill bg-primary">
                                                                    {item.Postdata.title}
                                                                </span>
                                                                <span className="float-end price-hp">
                                                                    {item.Postdata.price === undefined && <><p>NA</p></>} 
                                                                     {item.Postdata.price !== undefined && <><p>{item.Postdata.price}  &#8360;/unit</p></>}
                                                                </span>

                                                            </div>
                                                            <span className="float-start badge rounded-pill bg-info">
                                                                <i class="fa fa-user mx-1"></i> {item.sellerData[0].username}
                                                                
                                                            </span>
                                                            <br></br>
                                                            <h5 className="card-title">
                                                                {item.Postdata.description}
                                                            </h5>
                                                            <button type="button" className="btn btn-danger"  onClick={() =>deletePost(item.Postdata._id)}>Delete</button>
                                                        </div>
                                                    </div>


                                                </div>
                                                    )
                                                })} 
                                            </div>
                                        </div>
                                        </>}
                                        {isData===false &&<>No data Available</>}
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
};
export default DeletePosts;

