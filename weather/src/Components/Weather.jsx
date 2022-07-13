import { useState, useEffect } from 'react';
import './Weather.css';
import rainy from '../Images/rainy.png';
import sunny from '../Images/sunny.png'
import Pin from '../Images/pin.png';
import cloudy from '../Images/cloudy.png';
import Search from '../Images/search.png';
import Graph from './Graph';
import Graph1 from './Graph1';


export const Weather = () => {

  const APIKEY =  "5262a82ca11b1f015731374d38cc78d0";
  const [list, setlist] = useState([]);
  const [city, setCity] = useState("");


  const getlocation = () => { //current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(currCityWeather);
    } else {
      console.log("NS")
    }
  }
  useEffect(() => {
    getlocation();
  }, []);

  const showPosition = (e) => { 
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`)
      .then(res => res.json())
      .then(data => getWeather(data.coord.lon, data.coord.lat))
      .catch(err => console.log(err))
  }

  const getWeather = (lon, lat) => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`)
    .then(res => res.json())
    .then(data => show(data))
    .catch(err => console.log(err))
  }

  const currCityWeather = (position) => {
    let lat=position.coords.latitude;
    let lon=position.coords.longitude;

    getWeather(lon, lat);
  }
  const show = (data) => {
    setlist(data.daily)
    console.log(data);
    // console.log("Current Location",data.daily)
  }

  const getLocation = (e) => {
    setCity(e.target.value);
    // showPosition()
  }

  return (
    <div className='App'>
      <div className="_flex">
        <form onSubmit={showPosition}>
          <input className="search_box" placeholder='search' type="text" onChange={getLocation} />
        </form>
        <img className="Location_img" src={Pin} />
        <img className="Search_img" src={Search} />
      </div>
      <div className="forecast">
        {
          list?.map((el, i) => {
            console.log(el.dt)
            const dateTimeStr = new Date(el.dt*1000).toLocaleString("en-US",{weekday:"long"}).slice(0,3);
            return (
              <div key={i} className="_iforecast">
                <div className='Weather_info'>
                  <p className="weekdays">{dateTimeStr}</p>
                  <span className="span">{el.temp.max.toFixed()}&deg;</span>
                  <span className="span mintemp">{el.temp.min.toFixed()}&deg;</span>
                </div>
                <div className="Weather_image">
                  <img className="image" src={(el.weather[0].main == "Clear") ? sunny : (el.weather[0].main == "Rain") ? rainy : cloudy} />
                  <p className='Weather_status'>{el.weather[0].main}</p>
                </div>
              </div>
            )
          })}
      </div>
      <div className='GraphDiv'>
        <div className="TempInfo">
          <h1>{list.temp}</h1>
        </div>
        {/* <Graph /> */}
        <div className='TempDetails'>
            
        </div>
        <div className='TempDetails1'>

        </div>
        {/* <Graph1 /> */}
      </div>
    </div>
  )
}