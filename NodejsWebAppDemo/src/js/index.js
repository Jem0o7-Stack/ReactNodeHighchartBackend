import React, { Component } from 'react';
import ReactDOM from "react-dom";
import DefaultPaginationTable from '../js/app';
import About from '../js/About';
import ImageUpload from '../../component/ImagePreview';
import { BrowserRouter, Route, HashRouter } from 'react-router-dom';
import HighChartReact from '../../component/HighChart';

ReactDOM.render(
    <BrowserRouter> 
       <div>
          <Route exact path="/" component={DefaultPaginationTable} />
          <Route path="/About" component={About} /> 
          <Route path="/ImageUpload" component={ImageUpload} />
          <Route path="/HighChartReact" component={HighChartReact} />
       </div>
    </BrowserRouter>,
    document.getElementById('container')
);