import React from "react";
import './Home.css';
// import './App.css';
import Picture1 from '../assests/images1/Picture1.png';
import cart from '../assests/images/cart.png';
import menu from '../assests/images/menu.png';
 import Gaming from '../assests/images1/Gaming-Computer-PNG-Image.png';
 import prebuilts from '../assests/images1/prebuilts.png';
import parts from '../assests/images1/parts.png';
import Graphic from '../assests/images1/Graphic-Card-PNG-Picture.png';
import ti from '../assests/images1/1070ti.png';
import GIGA from '../assests/images1/390.png';
import trident from '../assests/images1/trident.png';
import processor from '../assests/images1/processor.png';
import tii from '../assests/images1/1070ti.png';
 import GIGAA from '../assests/images1/390.png';
 import tridentt from '../assests/images1/trident.png';
import processorr from '../assests/images1/processor.png';
import custom from '../assests/images1/custom-pc.png';
import user from '../assests/images/user-1.png';
import userr from '../assests/images/user-1.png';
import Intel from '../assests/images1/Intel-logo.png';
import MSI from '../assests/images1/MSI-Logo.png';
 import Nvidia from '../assests/images1/Nvidia_logo.svg.png';
 import Redragon from '../assests/images1/Redragon-Logo-.png';
import Ryzen from '../assests/images1/Ryzen-Logo.wine.png';
import play from '../assests/images/play-store.png';
import app from '../assests/images/app-store.png';
import Picturee from '../assests/images1/Picture1.png';
class  Home2 extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <div className="container">
            <div className="navbar">
              <div className="logo">
                <img src={Picture1} width="400px" alt="" />
              </div>
              {/* <nav>
                <ul id="MenuItems">
                  <li>
                    <a href=""></a>Home
                  </li>
                  <li>
                    <a href=""></a>Products
                  </li>
                  <li>
                    <a href=""></a>About
                  </li>
                  <li>
                    <a href=""></a>Contact
                  </li>
                  <li>
                    <a href=""></a>Account
                  </li>
                </ul>
              </nav> */}
              <img
                src={cart}
                width="30px"
                height="30px"
                alt=""
              />
              <img
                src={menu}
                className="menu-icon"
                onclick="menutoggle()"
              />
            </div>
            <div className="row">
              <div className="col-2">
                <h1><i><b>PC builder</b></i></h1>
                <p><i>
                  <b>Explore the world of gaming</b>
                  </i>
                </p>
                <p>Custom building - Buy/sell</p>

                <a href="/signup" className="btn">
                  Explore now &#8594;
                </a>
              </div>
              <div className="col-2">
                <img
                  src={Gaming}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div className="categories">
          <div className="small-container">
            <div className="row">
              <div className="col-3">
                <img src={prebuilts} width="600px" alt="" />
                <h2>Pre-Builts</h2>
              </div>
              <div className="col-3">
                <img src={parts} alt="" />
                <h2>Parts and accessories</h2>
              </div>
              <div className="col-3">
                <img
                  src={Graphic}
                  alt=""
                />
                <h2>Graphics cards</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="small-container">
          <h2 className="title">Featured products</h2>
          <div className="row">
            <div className="col-4">
              <img src={ti} alt="" />
              <h3>GTX 1070ti</h3>
              <h2>450.00 $</h2>
            </div>
            <div className="col-4">
              <img src={GIGA} alt="" />
              <h3>GIGABYTE z390</h3>
              <h2>250.00 $</h2>
            </div>
            <div className="col-4">
              <img src={trident} alt="" />
              <h3>Trident Z 16gb</h3>
              <h2>150.00 $</h2>
            </div>
            <div className="col-4">
              <img src={processor} alt="" />
              <h3>i7-10700k processor</h3>
              <h2>400.00 $</h2>
            </div>
          </div>
          <h2 className="title">Latest product</h2>
          <div className="row">
            <div className="col-4">
              <img src={tii} alt="" />
              <h3>GTX 1070ti</h3>
              <h2>450.00 $</h2>
            </div>
            <div className="col-4">
              <img src={GIGAA} alt="" />
              <h3>GIGABYTE z390</h3>
              <h2>250.00 $</h2>
            </div>
            <div className="col-4">
              <img src={tridentt} alt="" />
              <h3>Trident Z 16gb</h3>
              <h2>150.00 $</h2>
            </div>
            <div className="col-4">
              <img src={processorr} alt="" />
              <h3>i7-10700k processor</h3>
              <h2>400.00 $</h2>
            </div>
          </div>
        </div>

        <div className="offer">
          <div className="small-container">
            <div className="row">
              <div className="col-2">
                <img src={custom} alt="offer-img" />
              </div>
              <div className="col-2">
                <h3><b>Custom Building</b></h3>
                <p>
                  You can custom build the pc according to your preferences{" "}
                 
                </p>
                <a href="" className="btn">
                  Let's build &#8594;
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="testimonial">
          <div className="small-container">
            <h2 className="title">News section</h2>
            <div className="row">
              <div className="col-3">
                <h2>
                  Nvidia just launched the new graphic card check it out in this
                  link
                  <br />
                  http://nvidia.com
                </h2>
                <img src={user} alt="" />
                <h3>Admin</h3>
              </div>

              <div className="col-3">
                <h2>
                  Nvidia just launched the new graphic card check it out in this
                  link
                  <br />
                  http://nvidia.com
                </h2>
                <img src={userr} alt="" />
                <h3>admin</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="brands">
          <div className="small-container">
            <div className="row">
              <div className="col-5">
                <img src={Intel} alt="" />
              </div>
              <div className="col-5">
                <img src={MSI} alt="" />
              </div>
              <div className="col-5">
                <img src={Nvidia} alt="" />
              </div>
              <div className="col-5">
                <img src={Redragon} alt="" />
              </div>
              <div className="col-5">
                <img src={Ryzen} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="footer-col-1">
                <h3>Download our app</h3>
                <p>download for mac and win</p>
                <div className="app-logo">
                  <img src={play} alt="" />
                  <img src={app} alt="" />
                </div>
              </div>
              <div className="footer-col-2">
                <img src={Picturee} alt="" />
                <p>Our purpose is to bfibibfjui bbaionva sdgdsgsgsgsg</p>
              </div>
              <div className="footer-col-3">
                <h3>Useful links</h3>
                <ul>
                  <li>Coupons</li>
                  <li>Blog post</li>
                  <li>return policy</li>
                  <li>join affliate</li>
                </ul>
              </div>
              <div className="footer-col-4">
                <h3>Follow us</h3>
                <ul>
                  <li>Facebook</li>
                  <li>Twitter</li>
                  <li>insta</li>
                  <li>youtube</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home2;