import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';
import Showfllow from '../Showfollow';
import {DataStatic,StorageData} from '../../StaticData';
export default class SProfile extends Component {
    constructor (props) {      
        super(props);
        this.state= {
            isfollow : '',
        }
        this.togglePopup= this.togglePopup.bind(this)
    }
    togglePopup(number,name) {
        if(number !== 0){
        this.setState({
          isfollow: name
        });
    }
      }
      LogOut() {  
      <Redirect  push to="/"/>
    }
    render(){ 
    return (
        <div>
         <div className="prfe-cor">
                   <div className="image">
                  <img src={this.props.data.avatar === "no image" ? "/images/noimage.jpg"  : `${DataStatic.domainIp}/${StorageData.avatarMedium}/${this.props.data.avatar}`} alt={this.props.data.name_header}/>
                  <span className="logout" onClick={this.LogOut.bind(this)}><img src="/images/logout.png" alt="logout"/></span>
                   </div>
                  <span>{this.props.data.name_header}</span>
                  <span className="user">{this.props.data.username}</span> 
                  <div className="prfe-bio">
                    <ul>
                        <li>{this.props.data.bio}</li> 
                    </ul>
                    </div> 
                   <div className="clearfix"></div>                           
               </div>        
               <div className="prfe-flw">
                    <ul>
                        <li onClick={()=>this.togglePopup(this.props.data.followers_number,"followers")}><span>{this.props.data.followers_number} </span>دنبال شده</li>
                        <li onClick={()=>this.togglePopup(this.props.data.following_number,"following")}><span>{this.props.data.following_number}</span>دنبال کننده</li>
                        <li onClick={()=>this.togglePopup(this.props.data.following_clubs_number,"clubs")}><span>{this.props.data.following_clubs_number}</span>باشگاه</li>
                    </ul>
                 </div>
                <div className="clb-reg d-flex justify-content-between align-items-center"> 
                <button style={{background: "none",color: "#FFC107"}}>ویرایش</button>   
                </div>
                {this.state.isfollow==="followers" ? <Showfllow close={()=>this.togglePopup(this.props.data.followers_number,'')} aaf={`${DataStatic.domainIp}/public/api/v1/user/${this.props.data.username}/followed?api_token=${this.props.token}`}/> : null}
                {this.state.isfollow==="following" ? <Showfllow close={()=>this.togglePopup(this.props.data.following_number,'')} aaf={`${DataStatic.domainIp}/public/api/v1/user/${this.props.data.username}/followers?api_token=${this.props.token}`}/> : null}
                {this.state.isfollow==="clubs" ? <Showfllow close={()=>this.togglePopup(this.props.data.following_clubs_number,'')} aaf={`${DataStatic.domainIp}/public/api/v1/user/${this.props.data.username}/followed?api_token=${this.props.token}`}/> : null}
                </div>
        )
    }
}
