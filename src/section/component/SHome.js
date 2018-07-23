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
          <div class="notification">
          <div class="box">
          <div class="image">
          <img src="/images/noimage.jpg" alt="noimage"/>
          </div>
          <span>میلاد شما را دنبال کرد.</span>
          </div>
          <div class="box">
          <div class="image">
          <img src="/images/noimage.jpg" alt="noimage"/>
          </div>
          <span>میلاد شما را دنبال کرد.</span>
          </div>
          <div class="box">
          <div class="image">
          <img src="/images/noimage.jpg" alt="noimage"/>
          </div>
          <span>میلاد شما را دنبال کرد.</span>
          </div>
          <div class="box">
          <div class="image">
          <img src="/images/noimage.jpg" alt="noimage"/>
          </div>
          <span>میلاد شما را دنبال کرد.</span>
          </div>
          </div>
        </div> 
        )
    }
}
