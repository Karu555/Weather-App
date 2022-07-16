
import { useState, useEffect } from 'react';
import './Weather.css';
import sunny from '../Images/sunny.png';
import rainy from '../Images/rainy.png';
import cloudy from '../Images/cloudy.png';
import Pin from '../Images/pin.png';
import Search from '../Images/search.png'
import Graph from './Graph';
import LowerGraph from './LowerGraph';


// export const Weatherdata=createContext();


export const Weather = () => {
  // console.log(p.days)
  const APIKEY =  "5262a82ca11b1f015731374d38cc78d0";
  
  const [arraylist, setArraylist] = useState([]);
  const [list, setList] = useState([]);
  const [city, setCity] = useState("");

  
  // console.log(arraylist.pressure);
  // console.log(city)

  useEffect(() => {
    getlocation();
  }, [])

  const getlocation = () => { //current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(currCityWeather);
    } else {
      console.log("NS")
    }
  }


  const showPosition = (e) => { //current location
    e.preventDefault()
 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metricc`)
      .then(res => res.json())
      .then(data => getWeather(data.coord.lon, data.coord.lat))
  }

  const getWeather = (lon, lat) => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metricc`)
    .then(res => res.json())
    .then(data => show(data))
  }


  const currCityWeather = (position) => {
    let lat=position.coords.latitude;
    let lon=position.coords.longitude;

    getWeather(lon, lat);
  }
  const show = (data) => {
    setArraylist(data.daily)
    setList(data.current)
    // console.log("Current Location",data.daily)
  }

  console.log(list.humidity);
  const getLocation = (e) => {
    setCity(e.target.value);
    // showPosition()
  }

  return (
    <div className='outer-container'>
      <div className="inner-container1">
        <form onSubmit={showPosition}>
          <input className="inputBox" type="text"  placeholder='search'  onChange={getLocation} />
        </form>
        <img className="LocationImg" src= {Pin} />
        <img className="SearchImg" src= {Search} />
      </div>
      <div className="inner-container2">
        {
          arraylist?.map((e, i) => {
            return (
              <div key={i} className="Weather_8days">
                <div className='Weatherdetails'>
                  <p className="weekdays">{new Date(e.dt*1000).toLocaleString("en-US",{weekday:"long"}).slice(0,3)}</p>
                  <span className="span maxtemp">{e.temp.max.toFixed()-276}&deg;</span>
                  <span className="span mintemp">{e.temp.min.toFixed()-276}&deg;</span>
                </div>
                <div className="image_div">
                  <img className="image" src={(e.weather[0].main == "Clear") ? sunny : (e.weather[0].main == "Rain") ? rainy : cloudy} />
                  <p className='Weather_status'>{e.weather[0].main}</p>
                </div>
              </div>
            )
          })}
      </div>
      <div className='inner-container3'>
        <div className="TempInfo">
          <h1>{list.temp.toFixed()-276}°C</h1>
          <h1></h1>
        </div>
        <Graph />
        <div className="pressurehumidity">
                        <div className="pressure">
                            <p>Pressure <br />{list.pressure} hpa</p>
                        </div>
                        <div className="humidity">
                            <p>Humidity <br /> {list.humidity}%</p>
                        </div>
        </div>
        <div className="last">
                        <div className="sunrisesunset">
                            <div>
                                {/* <p className="sunrise">Sunrise <br />{ new Date(city.sys.sunrise * 1000).toLocaleTimeString()}  5:01am</p>  */}
                                <p className="sunrise"><h6>Sunrise </h6><br />{new Date(list.sunrise*1000).toLocaleString().slice(11, 15)}am</p> 
                            </div> 
                            <div>
                                {/* <p className="sunset">Sunset <br />{new Date(city.sys.sunset  * 1000).toLocaleTimeString()} 6:23am</p> */}
                                <p className="sunset">Sunset <br />{new Date(list.sunset*1000).toLocaleString().slice(11, 15)}pm</p>
                                
                            </div>
                        </div>
                    </div>
        <LowerGraph />
      </div>
    </div>
  )
}