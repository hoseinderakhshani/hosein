import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SHome extends Component {
    constructor (props) {
        super(props)
    }
    render(){ 
    return (
    <div>
            <div className="notice">
            <div className="head">
              <span className="active">like</span>
              <span>follow</span>
              <span className="active">tiket</span>
            </div>
            <div className="text">
            <ul style={{display : 'block'}}>
              <li><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/><a href="">milad.akhb</a>شما رو لایک کرد</li>
              <li><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/><a href="">milad.akhb</a> شما رو لایک کرد</li>
              <li><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/><a href="">milad.akhb</a> شما رو لایک کرد</li>
              <li><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/><a href="">milad.akhb</a> شما رو لایک کرد</li>
              <li><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/><a href="">milad.akhb</a> شما رو لایک کرد</li>
              <li><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/><a href="">milad.akhb</a> شما رو لایک کرد</li>
              <li><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/><a href="">milad.akhb</a> شما رو لایک کرد</li>
              <li><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/><a href="">milad.akhb</a> شما رو لایک کرد</li>
                
            </ul>
            </div>
            </div>
            <div className="notice">
            <div className="head">
              <span>like</span>
              <span>follow</span>
              <span>tiket</span>
            </div>
            <div className="text">
            <ul style={{display : 'none'}}>
              <li><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/><a href="">milad.akhb</a> شما رو لایک کرد</li>
              <li><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/><a href="">milad.akhb</a> شما رو لایک کرد</li>
              <li><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/><a href="">milad.akhb</a> شما رو لایک کرد</li>
              <li><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/><a href="">milad.akhb</a> شما رو لایک کرد</li>
              <li><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/><a href="">milad.akhb</a> شما رو لایک کرد</li>
              <li><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/><a href="">milad.akhb</a> شما رو لایک کرد</li>
              <li><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/><a href="">milad.akhb</a> شما رو لایک کرد</li>
              <li><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/><a href="">milad.akhb</a> شما رو لایک کرد</li>
                
            </ul>
            </div>
            </div>
        </div> 
        )
    }
}
