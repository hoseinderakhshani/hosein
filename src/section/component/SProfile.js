import React, { Component } from 'react';
import Showfllow from '../Showfollow';
import {Link, Redirect } from 'react-router-dom';
import {DataStatic,StorageData} from '../../StaticData';
import {FollowUser} from '../../methodStatic';
export default class SProfile extends Component {
    constructor (props) {
        super(props);
        this.state= {
            isfollow : false,
            follow : this.props.data.allData.login_user_follow_this_account,
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
    render(){ 
        console.log(this.props.data.allData.username)
    return (
        <div>
         <div className="prfe-cor">
                   <div className="image">
                  <img src={this.props.data.allData.avatar === null ? "/images/noimage.jpg"  : `${DataStatic.domainIp}/${StorageData.avatarMedium}/${this.props.data.allData.avatar}`}/>
                   </div>
                  <span>{this.props.data.allData.name_header}</span>
                  <span className="user">{this.props.data.allData.username}</span> 
                  <div className="prfe-bio">
                    <ul>
                        <li>{this.props.data.allData.bio}</li> 
                    </ul>
                    </div> 
                   <div className="clearfix"></div>                           
               </div>        
               <div className="prfe-flw">
                    <ul>
                        <li onClick={()=>this.togglePopup(this.props.data.allData.followers_number,"followers")}><span>{this.props.data.allData.followers_number} </span>دوست شده</li>
                        <li onClick={()=>this.togglePopup(this.props.data.allData.following_number,"following")}><span>{this.props.data.allData.following_number}</span>دوست شدگان</li>
                        <li onClick={()=>this.togglePopup(this.props.data.allData.following_clubs_number,"clubs")}><span>{this.props.data.allData.following_clubs_number}</span>باشگاه</li>
                    </ul>
                 </div>
                <div className="clb-reg d-flex justify-content-between align-items-center"> 
                {this.props.data.checkkUser? <div>
                    <Link to={`/editprofile/${this.props.data.allData.username}`}><button style={{background: "none",color: "#FFC107"}}>ویرایش</button> </Link>
                <span className="signout" onClick={(ev)=>{
                localStorage.removeItem("token")
                localStorage.removeItem("userName")
                window.location.reload()
                }
                }><i class="fa fa-sign-out"></i></span> 
                </div>
                :
                <button style={this.props.data.allData.login_user_follow_this_account? {background: "none",color:"rgb(255, 193, 7)"}:null} onClick={()=>FollowUser(DataStatic.domainIp,this.props.data.allData.username,this.props.token)}>{this.props.data.allData.login_user_follow_this_account?"دوست":"درخواست دوستی"}</button>
                } 
                </div>
                {this.state.isfollow==="followers" ? <Showfllow close={()=>this.togglePopup(this.props.data.allData.followers_number,'')} aaf={`${DataStatic.domainIp}/public/api/v1/user/${this.props.data.allData.username}/followed?api_token=${this.props.token}&limit=20&skip=0`} token={this.props.token}/> : null}
                {this.state.isfollow==="following" ? <Showfllow close={()=>this.togglePopup(this.props.data.allData.following_number,'')} aaf={`${DataStatic.domainIp}/public/api/v1/user/${this.props.data.allData.username}/followers?api_token=${this.props.token}`} token={this.props.token}/> : null}
                {this.state.isfollow==="clubs" ? <Showfllow close={()=>this.togglePopup(this.props.data.allData.following_clubs_number,'')} aaf={`${DataStatic.domainIp}/public/api/v1/user/${this.props.data.allData.username}/followed?api_token=${this.props.token}`} token={this.props.token}/> : null}
                </div>
        )
    }
}
