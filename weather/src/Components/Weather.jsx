
import { useState, useEffect } from 'react';
import './Weather.css';
import rainy from '../Images/rainy.png';
import sunny from '../Images/sunny.png'
import Pin from '../Images/pin.png';
import cloudy from '../Images/cloudy.png';
import Search from '../Images/search.png';
import Graph1 from './Graph1';
import Graph2 from './Graph2';


export const Weather = () => {

  const APIKEY =  "5262a82ca11b1f015731374d38cc78d0";
  const [arraylist, setarraylist] = useState([]);
  const [list, setList] = useState([]);
  const [city, setCity] = useState("");



  const showPosition = (e) => { 
    e.preventDefault()
  
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
    setarraylist(data.daily)
    console.log(data);
    setList(data.current)

  }

  console.log(list);
  const getLocation = (e) => {
    setCity(e.target.value);
  }

  
  const getlocation = () => { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(currCityWeather);
    } else {
      console.log("NS")
    }
  }


  useEffect(() => {
    getlocation();
  }, []);

  return (
    <div className='outer-container'>
      <div className="inner-container1">
        <form onSubmit={showPosition}>
          <input className="inputBox" type="text" placeholder='search'  onChange={getLocation} />
        </form>
        <img className="LocationImg" src={Pin} />
        <img className="SearchImg" src={Search} />
      </div>
      <div className="inner-container2">
        {
          arraylist?.map((e, i) => {
            console.log(e.dt)
            const dateTimeStr = new Date(e.dt*1000).toLocaleString("en-US",{weekday:"long"}).slice(0,3);
            return (
              <div key={i} className="Weather_8days">
                <div className='Weatherdetails'>
                  <p className="weekdays">{dateTimeStr}</p>
                  <span className="span maxtemp">{e.temp.max.toFixed()}&deg;</span>
                  <span className="span mintemp">{e.temp.min.toFixed()}&deg;</span>
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
          <span className='temp1'>{list.temp}°C</span>
          <span><img className="tempimg" src={cloudy} alt="" /></span>
  

        </div>
        <Graph1 />
        <div className="pressurehumidity">
                        <div className="pressure">
                            <p className='p1'><a>Pressure</a> <br />{list.pressure} hpa</p>
                        </div>
                        <div className="humidity">
                            <p className='p1'><a>Humidity</a> <br /> {list.humidity}%</p>
                        </div>
        </div>
        <div className="last">
                        <div className="sunrisesunset">
                            <div>
                                {/* <p className="sunrise">Sunrise <br />{ new Date(city.sys.sunrise * 1000).toLocaleTimeString()}  5:01am</p>  */}
                                <p className="sunrise"> <a>Sunrise</a> <br />{new Date(list.sunrise*1000).toLocaleString().slice(11, 15)}am</p> 
                            </div> 
                            <div>
                                {/* <p className="sunset">Sunset <br />{new Date(city.sys.sunset  * 1000).toLocaleTimeString()} 6:23am</p> */}
                                <p className="sunset"><a>Sunset</a> <br />{new Date(list.sunset*1000).toLocaleString().slice(11, 15)}pm</p>
                                
                            </div>
                        </div>
                    </div>
        <Graph2 />
      </div>
    </div>
  )
}

