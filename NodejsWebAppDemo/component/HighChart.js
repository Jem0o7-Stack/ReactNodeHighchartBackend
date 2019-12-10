import React, { Component } from "react";
import Highcharts from 'highcharts';
import $ from 'jquery';
import { setInterval, setTimeout } from "timers";

const gasname = [];
const gaspercentage = [];

class HighChartReact extends React.Component {

    constructor(props) {

        super(props);
        //this.state = {               
        //}

        this.highChartsRender = this.highChartsRender.bind(this);
        this.getGraphData = this.getGraphData.bind(this);
       
    }

    componentDidMount() {
       
         this.getGraphData();
       //  this.highChartsRender();
         setTimeout(() => this.highChartsRender(),100); 
    }
   
    getGraphData() {
        
        var url = "http://localhost:1337/GetGraphValues";
         $.ajax({
            url: url,
             method: 'POST',
            success: function (data) {                
               
                for (var i = 0; i < data.length; i++) {
                    gasname.push(data[i].gasName);
                    gaspercentage.push(data[i].gasPercentage);
                }
               
            }
        });
       
    }  

    highChartsRender() {
        //alert();
        Highcharts.chart({
            chart: {
                type: 'bar',
                renderTo: 'atmospheric-composition'
            },
            yAxis: {
                tickInterval: 10
            },

            credits: {
                enabled: false
            },
            title: {
                verticalAlign: 'middle',
                floating: true,
                text: 'Earth\'s Atmospheric Composition',
                style: {
                    fontSize: '10px',
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        format: '{point.name}: {point.percentage:.1f} %'
                    },
                    innerSize: '70%'
                }
            },
            
           // series: this.state.series
           series: [{
                name: 'Gases',
                data: [
                    {
                        name:gasname[2],
                        y: parseFloat(gaspercentage[2]),
                        color: '#819FF7'
                    },
                    {
                        name:gasname[1],
                        y: parseFloat(gaspercentage[1]),
                        color: '#FFBF00'
                    },
                    {
                        name:gasname[0],
                        y: parseFloat(gaspercentage[0]),
                        color: '#f5b7b1'
                    }
                    ,
                    {
                        name: gasname[3],
                        y: parseFloat(gaspercentage[3]),
                        color: '#a3e4d7'
                    },
                    {
                        name: gasname[4],
                        y: parseFloat(gaspercentage[4]),
                        color: '#aed6f1'
                    }
                ]
            }]
        });
    }
   
    render() {
       
        return (
            <div id="atmospheric-composition">
            </div>
        );
    }
}
export default HighChartReact

// ....... HighChart implement........
//https://scriptverse.academy/tutorials/reactjs-highcharts.html