// 
import React from "react";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div class="header">
          <div class="container">
            <div class="navbar">
              <div class="logo">
                <img src="src/assets/images1/Picture1.png" width="400px" alt="" />
              </div>
              <nav>
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
              </nav>
              <img
                src="assets/images/cart.png"
                width="30px"
                height="30px"
                alt=""
              />
              <img
                src="assests/images/menu.png"
                class="menu-icon"
                onclick="menutoggle()"
              />
            </div>
            <div class="row">
              <div class="col-2">
                <h1>PC builder</h1>
                <h2>
                  Explore the world of gaming <br />
                </h2>
                <p>Custom building - Buy/sell</p>

                <a href="" class="btn">
                  Explore now &#8594;
                </a>
              </div>
              <div class="col-2">
                <img
                  src="assests/images1/Gaming-Computer-PNG-Image.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div class="categories">
          <div class="small-container">
            <div class="row">
              <div class="col-3">
                <img src="assests/images1/prebuilts.png" width="600px" alt="" />
                <h2>Pre-Builts</h2>
              </div>
              <div class="col-3">
                <img src="assests/images1/parts.png" alt="" />
                <h2>Parts and accessories</h2>
              </div>
              <div class="col-3">
                <img
                  src="assests/images1/Graphic-Card-PNG-Picture.png"
                  alt=""
                />
                <h2>Graphics cards</h2>
              </div>
            </div>
          </div>
        </div>

        <div class="small-container">
          <h2 class="title">Featured products</h2>
          <div class="row">
            <div class="col-4">
              <img src="assests/images1/1070ti.png" alt="" />
              <h3>GTX 1070ti</h3>
              <h2>450.00 $</h2>
            </div>
            <div class="col-4">
              <img src="assests/images1/390.png" alt="" />
              <h3>GIGABYTE z390</h3>
              <h2>250.00 $</h2>
            </div>
            <div class="col-4">
              <img src="assests/images1/trident.png" alt="" />
              <h3>Trident Z 16gb</h3>
              <h2>150.00 $</h2>
            </div>
            <div class="col-4">
              <img src="assests/images1/processor.png" alt="" />
              <h3>i7-10700k processor</h3>
              <h2>400.00 $</h2>
            </div>
          </div>
          <h2 class="title">Latest product</h2>
          <div class="row">
            <div class="col-4">
              <img src="assests/images1/1070ti.png" alt="" />
              <h3>GTX 1070ti</h3>
              <h2>450.00 $</h2>
            </div>
            <div class="col-4">
              <img src="assests/images1/390.png" alt="" />
              <h3>GIGABYTE z390</h3>
              <h2>250.00 $</h2>
            </div>
            <div class="col-4">
              <img src="assests/images1/trident.png" alt="" />
              <h3>Trident Z 16gb</h3>
              <h2>150.00 $</h2>
            </div>
            <div class="col-4">
              <img src="assests/images1/processor.png" alt="" />
              <h3>i7-10700k processor</h3>
              <h2>400.00 $</h2>
            </div>
          </div>
        </div>

        <div class="offer">
          <div class="small-container">
            <div class="row">
              <div class="col-2">
                <img src="assests/images1/custom-pc.png" alt="offer-img" />
              </div>
              <div class="col-2">
                <h1>Custom Building</h1>
                <h3>
                  You can custom build the pc according to your preferences{" "}
                  <br />
                </h3>
                <a href="" class="btn">
                  Let's build &#8594;
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="testimonial">
          <div class="small-container">
            <h2 class="title">News section</h2>
            <div class="row">
              <div class="col-3">
                <h2>
                  Nvidia just launched the new graphic card check it out in this
                  link
                  <br />
                  http://nvidia.com
                </h2>
                <img src="assests/images/user-1.png" alt="" />
                <h3>Admin</h3>
              </div>

              <div class="col-3">
                <h2>
                  Nvidia just launched the new graphic card check it out in this
                  link
                  <br />
                  http://nvidia.com
                </h2>
                <img src="assests/images/user-1.png" alt="" />
                <h3>admin</h3>
              </div>
            </div>
          </div>
        </div>

        <div class="brands">
          <div class="small-container">
            <div class="row">
              <div class="col-5">
                <img src="assests/images1/Intel-logo.png" alt="" />
              </div>
              <div class="col-5">
                <img src="assests/images1/MSI-Logo.png" alt="" />
              </div>
              <div class="col-5">
                <img src="assests/images1/Nvidia_logo.svg.png" alt="" />
              </div>
              <div class="col-5">
                <img src="assests/images1/Redragon-Logo-.png" alt="" />
              </div>
              <div class="col-5">
                <img src="assests/images1/Ryzen-Logo.wine.png" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          <div class="container">
            <div class="row">
              <div class="footer-col-1">
                <h3>Download our app</h3>
                <p>download for mac and win</p>
                <div class="app-logo">
                  <img src="assests/images/play-store.png" alt="" />
                  <img src="assests/images/app-store.png" alt="" />
                </div>
              </div>
              <div class="footer-col-2">
                <img src="assests/images1/Picture1.png" alt="" />
                <p>Our purpose is to bfibibfjui bbaionva sdgdsgsgsgsg</p>
              </div>
              <div class="footer-col-3">
                <h3>Useful links</h3>
                <ul>
                  <li>Coupons</li>
                  <li>Blog post</li>
                  <li>return policy</li>
                  <li>join affliate</li>
                </ul>
              </div>
              <div class="footer-col-4">
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

export default Home;