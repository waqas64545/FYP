import React from "react";
import './App.css';
import './products.css'
import { useState, useEffect } from "react";
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';


const BuyerDashboard = () => {

  const [data, setData] = useState([]);
  const [isData, setIsData] = useState(false);
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



      //console.log(mydata.message);
      //console.log(mydata.message.length);
      if (mydata.message.length > 0) {
        setIsData(true);
        //console.log("Data : ", mydata.message)
        setData(mydata.message);
        console.log("Data : ", mydata.message);
        //setData(mydata.message);
        //setisdata(true);
      }
      else {
        setIsData(false);
        //setisdata(false);
      }




    }
    catch (error) {
      //console.log(error);
      //window.location.replace("/");
    }
  }

  useEffect(() => {



    getdata();

  }, []);
  return (

    <>
    
      <div className="back-buyer">
        {isData === true && <>
          {/* <h3 className='text-center my-3'>Posts</h3> */}
          <div className="container bg-trasparent my-4 p-3">
            <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
              {data.map((item) => {
                return (
                  <div className="col">
                    <div className="card h-100 shadow-sm">
                      <img src={`http://localhost:5000/getPostimage/${item.Postdata.image}`} class="card-img-top p-3" alt="Post data" />
                      <div className="card-body">
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
                        <a className="text-center my-4">

                          <a href="#" className="btn btn-warning">Chat Box</a>
                        </a>
                      </div>
                    </div>


                  </div>
                )
              })}
            </div></div>
        </>
        }
        {isData === false && <div className="text-center my-3"><h3>No data found</h3></div>}
      </div>
      
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
      
      {/* <footer class="page-footer font-small special-color-dark pt-4">

  <div class="container">

    <div class="row">
      <div class="col-md-6 mb-4">

        <form class="form-inline">
          <input class="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search"
            aria-label="Search"/>
          <i class="fas fa-search" aria-hidden="true"></i>
        </form>

      </div>
      <div class="col-md-6 mb-4">

        <form class="input-group">
          <input type="text" class="form-control form-control-sm" placeholder="Your email"
            aria-label="Your email" aria-describedby="basic-addon2"/>
          <div class="input-group-append">
            <button class="btn btn-sm btn-outline-white my-0" type="button">Sign up</button>
          </div>
        </form>

      </div>
    </div>

  </div>
  <div class="footer-copyright text-center py-3">© 2020 Copyright:
    <a href="/"> PC BUILDER.COM</a>
  </div>

</footer> */}


    </>
  )

};
export default BuyerDashboard;