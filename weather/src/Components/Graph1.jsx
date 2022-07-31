import React from "react";
import Chart from "react-apexcharts";
import "../App.css";
function Graph({array}) {
// console.log(array, "inside graph")
    var obj = {
      options: {
        chart: {
          zoom:{
            enabled:false
          }
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          // categories: ["","9","10","11","12","1","2","3","4","5","6","7","8","9"]
        },
        dataLabels: {
          enabled: false
        }
      },
      series: [
        {
          name: "series-1",
          data: [...array]
        }
      ],

    };
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={obj.options}
              series={obj.series}
              type="area"
              width="100%"
              align="center"
            />
          </div>
        </div>
      </div>
    );
  }


export default Graph;