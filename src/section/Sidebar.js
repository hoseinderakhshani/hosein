import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SProfile from './../section/component/SProfile';
import SClub from './../section/component/SClub';
import STiket from './../section/component/STiket';
import MSClub from './../section/component/MSClub';
import MSProfile from './../section/component/MSProfile';
import SHome from './../section/component/SHome';
import SEditProfile from './../section/component/SEditProfile';
export default class Sidebar extends Component {
    constructor (props) {
        super(props)
        this.state={
            username : localStorage.getItem('userName'), 
        }
    }
    render(){ 
    return (
        <section className="sidebar-left col-md-3 col-12 row ">  
        <div className="sidebar" style={this.props.scroll ? {position:"relative",minHeight:window.innerHeight - "190"}:{position:"fixed",minHeight:window.innerHeight}}>
         <div className="sgl-logo">
            <Link onClick={this.forceUpdate} to={`/profile/${this.state.username}`} className="user"><i className="fa fa-user"></i></Link>
                 <h1><Link to="/home">Tripplus</Link></h1>
                <span><Link to="/serach"><i className="fa fa-search"></i></Link>
                </span>
            </div> 
            {this.props.home ? <SHome /> : null}
            {this.props.Myprfle ? <MSProfile data={this.props.data} token={this.props.token}/> : null}
            {this.props.prfle ? <SProfile data={this.props.data} token={this.props.token}/> : null}
           {this.props.myclub ?  <MSClub  data={this.props.data} valuation={this.props.valuation} token={this.props.token}/> :null }
           {this.props.tiket ?  <STiket data={this.props.dataS} userName={this.state.username}/> :null }
           {this.props.edprof ?  <SEditProfile Sdata={this.props.Sdata}/> :null }
                <div className="footer" style={{marginTop:"15px"}}>
                <ul>
                  <li><a href="">خانه.</a></li> 
                  <li><a href="">شغل.</a></li> 
                  <li><a href="">قوانین.</a></li> 
                  <li><a href="">توضیحات.</a></li> 
                  <li><a href="">آموزش.</a></li> 
                  <li><a href="">خدمات.</a></li> 
                  <li><a href="">api.</a></li> 
                  <li><a href="">زبان.</a></li> 
                  <li><a href="">بلاگ.</a></li> 
                </ul>
                <span> TOOTIBA - 2018©</span>
                </div>
            </div>
        </section>
        )
    }
}
