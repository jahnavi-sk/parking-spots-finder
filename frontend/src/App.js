

//rv frontend


// import React from 'react';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function App(){
  


  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [userCoords, setUserCoords] = useState({ latitude: null, longitude: null });
  const [endCoords, setEndCoords] = useState({ latitude: null, longitude: null });

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoords({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Error getting user coordinates:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }, []);
  

    function speakText(text) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    }


    const anotherToggle=()=>{
      var element = document.getElementById("generic-text-7-uaop2qh3oN");
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
    }


    const toggelClass= ()=>{
      var element = document.getElementById("collapse1_7");
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
    }

    const [data, setData] = useState({
      // Initialize your data state here
    });
    const [directions, setDirections] = useState([]);
  
    const clicked = async (e) => {
      e.preventDefault();
    
      try {
        if (coords.latitude && coords.longitude) {
          const response = await fetch(`http://localhost:3001/parking/nearby?lat=${coords.latitude}&lng=${coords.longitude}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
              // Add any other headers if needed
            },
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch nearby parking');
          }
    
          const responseData = await response.json();
          console.log("successful!", responseData);
    
          // Extract latitude and longitude from each object in the response array
          const extractedCoords = responseData.map(parkingSpot => ({
            latitude: parkingSpot.location.lat,
            longitude: parkingSpot.location.lng
          }));
    
          // Log only the latitude and longitude
          extractedCoords.forEach(spot => {
            console.log(`Latitude: ${spot.latitude}, Longitude: ${spot.longitude}`);
          });
    
          // Store the extracted coordinates in state
          setData(extractedCoords);
    
          // Fetch directions for each parking spot
          const allDirections = await Promise.all(
            extractedCoords.map(async (spot) => {
              const startCoords = `${coords.latitude},${coords.longitude}`;
              const endCoords = `${spot.latitude},${spot.longitude}`;
              console.log(startCoords)
              console.log(endCoords)
              try {
                const directionsResponse = await fetch(`http://localhost:3001/directions?start=${startCoords}&end=${endCoords}`);
                const directionsData = await directionsResponse.json();
                console.log("Directions for parking spot:", directionsData);
                return directionsData;
              } catch (error) {
                console.error('Error fetching directions:', error);
                return [];
              }
            })
          );
        // Store all directions in state
          setDirections(allDirections);

        } else {
          console.error('User coordinates are not available.');
        }
      } catch (error) {
        console.error('Error fetching nearby parking:', error);
      }
    };

    const containerStyle = {
      width: '100%',
      height: '400px'
  };
  
  const center = {
      lat: 40.73061,
      lng: -73.935242
  };
    
    return (
      <html>
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="generator" content="Mobirise v5.9.13, a.mobirise.com" />
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
          <link rel="shortcut icon" href="assets/images/photo-1573710459621-bb101783ca0f.jpeg" type="image/x-icon" />
          <meta name="description" content="Find nearby parking lots and get directions to park your vehicles hassle-free." />
          <title>Find Parking Now</title>

        
          <link rel="stylesheet" href="https://r.mobirisesite.com/397446/assets/web/assets/mobirise-icons2/mobirise2.css?rnd=1713529916305" />
          <link rel="stylesheet" href="https://r.mobirisesite.com/397446/assets/bootstrap/css/bootstrap.min.css?rnd=1713529916305" />
          <link rel="stylesheet" href="https://r.mobirisesite.com/397446/assets/bootstrap/css/bootstrap-grid.min.css?rnd=1713529916305" />
          <link rel="stylesheet" href="https://r.mobirisesite.com/397446/assets/bootstrap/css/bootstrap-reboot.min.css?rnd=1713529916305" />
          <link rel="stylesheet" href="https://r.mobirisesite.com/397446/assets/dropdown/css/style.css?rnd=1713529916305" />
          <link rel="stylesheet" href="https://r.mobirisesite.com/397446/assets/socicon/css/styles.css?rnd=1713529916305" />
          <link rel="stylesheet" href="https://r.mobirisesite.com/397446/assets/theme/css/style.css?rnd=1713529916305" />
          <link rel="preload" href="https://fonts.googleapis.com/css2?family=Onest:wght@400;700&display=swap&display=swap" as="style" onoad="this.onload=null;this.rel='stylesheet'" />
          <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Onest:wght@400;700&display=swap&display=swap" /></noscript>
          <link rel="stylesheet" href="https://r.mobirisesite.com/397446/assets/css/mbr-additional.css?rnd=1713529916305" type="text/css" />
        </head>

        
        
        <div>
        <section data-bs-version="5.1" className="menu menu2 cid-uaop2qgXBi" once="menu" id="menu-5-uaop2qgXBi">
          <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
            <div className="container">
              <div className="navbar-brand">
                <span className="navbar-logo">
                  
                </span>
                <span className="navbar-caption-wrap"><a className="navbar-caption text-black display-4" href="https://mobiri.se">FindMyLot</a></span>
              </div>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-bs-toggle="collapse" data-target="#navbarSupportedContent" data-bs-target="#navbarSupportedContent" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <div className="hamburger">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true"><li className="nav-item">
                    <a className="nav-link link text-black display-4" onClick={anotherToggle} aria-expanded="false">Directions</a>
                  </li></ul>
                <div className="navbar-buttons mbr-section-btn"><a className="btn btn-primary display-4" >Get Directions</a></div>
              </div>
            </div>
          </nav>
        </section>

        <section data-bs-version="5.1" className="header18 cid-uaop2qhxV7 mbr-fullscreen" id="hero-15-uaop2qhxV7">
      <ReactPlayer
        url='https://www.youtube.com/watch?v=Iw_48YlMC48'
        playing={true}
        loop={true}
        muted={true}
        controls={false}
        width='100%'
        height='100%'
        style={{ position: 'absolute', top: 0, left: 0 }}/>
 <div className="mbr-overlay" style={{ opacity: '0.5', backgroundColor: 'rgb(0, 0, 0)' }} />
 <div className="container-fluid">
    <div className="row">
      <div className="content-wrap col-12 col-md-12">
        <h1 className="mbr-section-title mbr-fonts-style mbr-white mb-4 display-1">
          <strong>Park Easy</strong>
        </h1>
        <p className="mbr-fonts-style mbr-text mbr-white mb-4 display-7">
          FindMyLot - Your Ultimate Destination for Hassle-Free Parking Solutions. Say Goodbye to Parking Woes!
        </p>
        <div className="mbr-section-btn">
          <a className="btn btn-white-outline display-7" onClick={clicked}>Get Directions</a>
        </div>
      </div>
    </div>
 </div>
</section>



        <section data-bs-version="5.1" className="article9 cid-uaop2qhqzn" id="about-us-9-uaop2qhqzn">
          <div className="container">
            <div className="row justify-content-center">
              <div className="card col-md-12 col-lg-10">
                <div className="p-6 text-2xl card-wrapper bg-sky-500 ">
                  <p className="fw-bold fs-1 ">Directions to the nearest parking spot are:</p>
                  <div className='pt-5 fs-2'>
                  {directions.map((directionSet, index) => (
            <div key={index}>
              <div>
              {Array.isArray(directionSet) && directionSet.map((instruction, i) => {
  // Execute speakText for each instruction with a delay
  setTimeout(() => speakText(instruction), i * 7000);
  return <p key={i}>{instruction}</p>;
})}
              </div>  
            </div>
          ))}
                  </div>
                

                </div>
              </div>
            </div>
          </div>
        </section>
        

        

  <section data-bs-version="5.1" className="article07 cid-uaop2qh3oN" id="generic-text-7-uaop2qh3oN">
          <div className="container">
            <div className="row justify-content-center">
              <div className="card col-md-12 col-lg-10">
                <div className="card-wrapper">
                  
                  <div className="row card-box align-left">
                    
                  <MapContainer style={containerStyle} center={center} zoom={12}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {userCoords.latitude && userCoords.longitude && (
          <Marker position={[userCoords.latitude, userCoords.longitude]} />
        )}
        <Marker position={[endCoords.latitude, endCoords.longitude]} />

                {/* {directions && <Polyline positions={directions} />} */}
            </MapContainer>
                    
              
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section data-bs-version="5.1" className="list1 cid-uaop2qipWx" id="faq-1-uaop2qipWx">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-12 col-lg-10 m-auto">
                <div className="content">
                  <div className="row justify-content-center mb-5">
                    <div className="col-12 content-head">
                      <div className="mbr-section-head">
                        <h4 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                          <strong>Got Questions? We Have Answers!</strong>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div id="bootstrap-accordion_7" className="panel-group accordionStyles accordion" role="tablist" aria-multiselectable="true">
                  <div className="card">
  <div className="card-header" role="tab" id="headingOne">
    <a role="button" className="panel-title collapsed">
      <h6 className="panel-title-edit mbr-semibold mbr-fonts-style mb-0 display-5">How does it work?</h6>
      <span onClick={toggelClass} className="sign mbr-iconfont mobi-mbri-arrow-down" />
    </a>
  </div>
  <div id="collapse1_7" style={{display:'none'}}>
    <div className="panel-body">
      <p className="mbr-fonts-style panel-text display-7">FindMyLot uses cutting-edge technology to locate the nearest parking spots for your convenience. Just a few clicks and you're all set to park like a pro!</p>
    </div>
  </div>
</div>

                    
                   
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        


        <section data-bs-version="5.1" className="article07 cid-uaop2qh3oN" id="generic-text-7-uaop2qh3oN">
          <div className="container">
            <div className="row justify-content-center">
              <div className="card col-md-12 col-lg-10">
                <div className="card-wrapper">
                  <h3 className="card-title mbr-fonts-style mbr-white mt-3 mb-4 display-2">
                    <strong>FindMyLot - Your Parking Savior</strong>
                  </h3>
                  <div className="row card-box align-left">
                    <div className="item features-without-image col-12">
                      <div className="item-wrapper">
                        <p className="mbr-text mbr-fonts-style display-7">Welcome to FindMyLot, your ultimate destination for hassle-free parking solutions! Say goodbye to circling the block endlessly in search of a spot.</p>
                      </div>
                    </div>
                    <div className="item features-without-image col-12">
                      <div className="item-wrapper">
                        <p className="mbr-text mbr-fonts-style display-7">Our innovative platform is designed to swiftly locate the nearest parking lot for your precious vehicle. No more stress, just smooth parking experiences at your fingertips.</p>
                      </div>
                    </div>
                    <div className="item features-without-image col-12">
                      <div className="item-wrapper">
                        <p className="mbr-text mbr-fonts-style display-7">Click the button below to embark on a journey towards stress-free parking adventures!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        





        <section data-bs-version="5.1" className="social4 cid-uaop2qiH4O" id="follow-us-1-uaop2qiH4O">
          <div className="container">
            <div className="media-container-row">
              <div className="col-12">
                <h3 className="mbr-section-title align-center mb-5 mbr-fonts-style display-2">
                  <strong>Stay Connected</strong>
                </h3>
                <div className="social-list align-center">
                  <a className="iconfont-wrapper bg-facebook m-2 " target="_blank">
                    <span className="socicon-facebook socicon" />
                  </a>
                  <a className="iconfont-wrapper bg-twitter m-2" target="_blank">
                    <span className="socicon-twitter socicon" />
                  </a>
                  <a className="iconfont-wrapper bg-instagram m-2" target="_blank">
                    <span className="socicon-instagram socicon" />
                  </a>
                  <a className="iconfont-wrapper bg-tiktok m-2" href target="_blank">
                    <span className="socicon-tiktok socicon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section data-bs-version="5.1" className="contacts01 cid-uaop2qjvOU" id="contacts-1-uaop2qjvOU">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 content-head">
                <div className="mbr-section-head mb-5">
                  <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                    <strong>Contact Us</strong>
                  </h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="item features-without-image col-12 col-md-6 active">
                <div className="item-wrapper">
                  <div className="text-wrapper">
                    <h6 className="card-title mbr-fonts-style mb-3 display-5">
                      <strong>Phone</strong>
                    </h6>
                    <p className="mbr-text mbr-fonts-style display-7">
                      <a href="tel:123-456-7890" className="text-black">123-456-7890</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="item features-without-image col-12 col-md-6">
                <div className="item-wrapper">
                  <div className="text-wrapper">
                    <h6 className="card-title mbr-fonts-style mb-3 display-5">
                      <strong>Email</strong>
                    </h6>
                    <p className="mbr-text mbr-fonts-style display-7">
                      <a href="mailto:info@findmylot.com" className="text-black">info@findmylot.com</a>
                    </p>
                  </div>
                </div>
              </div>
              
              
            </div>
          </div>
        </section>
        <section data-bs-version="5.1" className="footer3 cid-uaop2qjNV9" once="footers" id="footer-6-uaop2qjNV9">
          <div className="container">
            <div className="row">
              <div className="row-links">
                <ul className="header-menu">
                  <li className="header-menu-item mbr-fonts-style display-5">
                    <a href="#" className="text-white">About</a>
                  </li><li className="header-menu-item mbr-fonts-style display-5">
                    <a href="#" className="text-white">FAQ</a>
                  </li><li className="header-menu-item mbr-fonts-style display-5">
                    <a href="#" className="text-white">Blog</a>
                  </li><li className="header-menu-item mbr-fonts-style display-5">
                    <a href="#" className="text-white">Partners</a>
                  </li></ul>
              </div>
              <div className="col-12 mt-4">
                <p className="mbr-fonts-style copyright display-7">© 2024 FindMyLot. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    ;
  
  
  </html>
);

}