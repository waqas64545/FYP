import React from "react";
import { useEffect, useState, Component } from 'react';
import Sidebar from './Sidebar';
import { getCountsData } from '../api/auth';

import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
} from "recharts"

const AdminDashboard = () => {

    const [buyersCount, setbuyersCount] = useState(0);
    const [sellersCount, setsellersCount] = useState(0);
    const [postsCount, setpostsCount] = useState(0);
    const [record, setRecord] = useState([])

    var data = [];
    const getCounts = async () => {
        //     console.log("ABC")
        // console.log("Record : ", record)
        try {
            getCountsData()
                .then(response => {
                    setsellersCount(response.data.message.sellersCount);
                    setbuyersCount(response.data.message.buyersCount);
                    setpostsCount(response.data.message.postsCount);
                    updateChartData(response.data.message.sellersCount,response.data.message.buyersCount,response.data.message.postsCount );
                })

           
        }
        catch (err) {
            console.log('Error : ', err);
        }
    }
    const updateChartData=(sellercount,buyercount,postcount)=>{
        data = [
            { name: "Sellers", users: sellercount, fill: '#FFDA83' },
            { name: "Buyers", users: buyercount, fill: "#FF6565" },
            { name: "Posts", users: postcount, fill: "#57c0e8" },

        ];
        setRecord(data);
    }

    useEffect(() => {
        
        getCounts();
    }, []);

    return (
        <>

            <div className="app-sidebar">
                <div>
                    <Sidebar />
                </div>
                <div>


                    <div className="row">
                        <div className="col main pt-5 mt-3">

                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item"><a href="#">Library</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Data</li>
                                </ol>
                            </nav>


                            <div className="alert alert-warning fade collapse" role="alert" id="myAlert">
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                    <span className="sr-only">Close</span>
                                </button>
                                <strong>Data and Records</strong> Learn more about employee
                            </div>
                            <div className="row mb-3">
                                <div className="col-xl-3 col-sm-6 py-2">
                                    <div className="card bg-success text-white h-100">
                                        <div className="card-body bg-success" style={{ backgroundColor: "#57b960" }}>
                                            <div className="rotate">
                                                <i className="fa fa-user fa-4x"></i>
                                            </div>
                                            <h6 className="text-uppercase">Seller</h6>
                                            <h1 className="display-4">{sellersCount}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 py-2">
                                    <div className="card text-white bg-danger h-100">
                                        <div className="card-body bg-danger">
                                            <div className="rotate">
                                                <i className="fa fa-user fa-4x"></i>
                                            </div>
                                            <h6 className="text-uppercase">Buyer</h6>
                                            <h1 className="display-4">{buyersCount}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 py-2">
                                    <div className="card text-white bg-info h-100">
                                        <div className="card-body bg-info">
                                            <div className="rotate">
                                                <i className="fas fa-tablet-alt fa-4x"></i>
                                            </div>
                                            <h6 className="text-uppercase">Post</h6>
                                            <h1 className="display-4">{postsCount}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 py-2">
                                    <div className="card text-white bg-warning h-100">
                                        <div className="card-body">
                                            <div className="rotate">
                                                <i className="fa fa-share fa-4x"></i>
                                            </div>
                                            <h6 className="text-uppercase">Shares</h6>
                                            <h1 className="display-4">36</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="Piechart">
                                <PieChart width={400} height={400}>
                                    <Pie
                                        dataKey="users"
                                        isAnimationActive={false}
                                        data={record}
                                        cx={200}
                                        cy={200}
                                        outerRadius={160}
                                        fill="#fff"
                                        label
                                    />
                                    <Tooltip />
                                </PieChart>
                            </div>
                            </div>
                            

                        </div>
                    </div>





                </div>
                
            </div>



        </>
    )
};
export default AdminDashboard;