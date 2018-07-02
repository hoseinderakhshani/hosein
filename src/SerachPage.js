import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Serach from './section/serach/Serach'; 
import UserSerach from './section/serachpage/User'; 
import ClubSerach from './section/serachpage/Club'; 
import {DataStatic} from './StaticData';
export default class SerachPage extends Component {
    constructor (props) {
        super(props)
          this.state = {
            username : localStorage.getItem('userName'),
            token : localStorage.getItem('token'),
            selected:'',
            userData:[],
            clubData:[],
        }
      }
  render() { 
    
    return (
        <div>
          <div className="container">
          <div className="row">
          <div className="serachpage">
            <div className="head">
            <div className="col p-0"><Link to={`/profile/${this.state.username}`} className="user" ><i className="fa fa-user"></i></Link></div>
            <Serach parent={this}/>
                 <div className="col p-0"><h1 className="logo"><Link to="/home">Tripplus</Link></h1></div>
            </div>
            <div className="item">
              <span className={this.state.selected === "افراد" ? 'active' : ''} onClick={()=>this.setState({selected:"افراد"})}>افراد</span>
              <span className={this.state.selected === "باشگاه" ? 'active' : ''} onClick={()=>this.setState({selected:"باشگاه"})}>باشگاه</span>
            </div>
        {this.state.selected === ""? "کاربر یافت نشد":""}    
        {this.state.selected === "افراد" ? <UserSerach data={this.state.userData}/>:null}
        {this.state.selected === "باشگاه" ?  <ClubSerach data={this.state.clubData}/>:null}
          </div>
          </div>
          </div>
          </div>
     
    );
  }
}
