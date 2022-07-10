import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Weather.css';

export const Weather = () => {
    return(
        <div className="Weather">
        <div className='inner-container'>
        <h1>Weather App</h1>
        <div>
          <input type="text" placeholder='Search' className='search-container' />
          <button className="button">Search</button>
        </div>
        <div className='Daily-conatiner'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className='last-container'>
          <div className='last1'>35°C</div>
          <div className="graph1"></div>
          <div className="pressurehumidity">
            <div className="pressure">
                <p>Pressure <br /> 1001 hpa</p> 
            </div>
            <div className="humidity">
                <p>Humidity <br /> 52 %</p>
            </div>
          </div>
          <div className="last">
            <div className="sunrisesunset">
                <div>
                    <p className="sunrise">Sunrise <br /> 5:01am</p>
                </div>
                <div>
                    <p className="sunset">Sunset <br /> 6:23am</p>
                </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    )
}



