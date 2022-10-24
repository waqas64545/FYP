import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Home2 from './Home2';
 import './Home.css';
import './App.css';
import { getPostByAdmin } from '../api/auth';
// import { dataDigitalBestSeller } from './data';
import imgGirl from '../assests/images/Banner1.jpg';

function App() {
  const [defaultImage, setDefaultImage] = useState({});
  const [dataDigitalBestSeller, setPostsData] = useState([]);
  const [isData, setIsData] = useState(false);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: imgGirl,
    }));
  };
  const getAdminPostsData = () => {
    try {
      getPostByAdmin()
        .then((response) => {
          console.log('Axios signup success:', response);

          if (response.data.message.length > 0) {
            setIsData(true);
            setPostsData(response.data.message);
          }
          else {
            setIsData(false);
          }


        })
        .catch((err) => {
          console.log('Axios signup error:', err);

        });
    }
    catch (err) {
      console.log('Error : ', err);
    }

  }
  useEffect(() => {
    getAdminPostsData();
  }, []);

  return (
    <div>
      
      <div className='row'   align="center">
		   <div>
			<div align="center" bgcolor="black" > <marquee scrollamount="10" onmouseover="stop()" onmouseout="start()"><h3>Latest news about PC</h3>  </marquee> </div>
		</div>
	</div>
      
    <div className="App">
      {isData === true && <>
        <Slider {...settings}>
          {dataDigitalBestSeller.map((item) => (
            <div className="card">
              <div className="card-top">
                <img
                  src={`http://localhost:5000/getAdminPostImage/${item.imageUrl}`}
                  alt={item.description}
                  onError={handleErrorImage}
                />
                <h1>{item.description}</h1>
              </div>
              {/* <div className="card-bottom">
              <h3>{item.price}</h3>
              <span className="category">{item.category}</span>
            </div> */}
            </div>
          ))}
        </Slider></>}
      <br></br>
      <div><Home2 /></div>
    </div>
    </div>

  );
}

export default App;