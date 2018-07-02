import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Serach from '../section/serach/Serach'; 
import {DataStatic,StorageData} from '../StaticData';
export default class Showfllow extends Component {
    constructor (props) {
        super(props)
        this.state={
            datas : [],
            filterdatas: [],
            isFollow:false
        }
        this.userSerach = this.userSerach.bind(this)
        this.renderUser= this.renderUser.bind(this);  
        this.renderAllusers=this.renderAllusers.bind(this)
    }
    componentDidMount(){
        axios.get(this.props.aaf,
        )
        .then((response)=> {
            this.setState({filterdatas :response.data , datas :response.data})
        })
        .catch( (err)=> {
            alert("something went Wrong",err)
          });    
    }
    userSerach(name){
        const dataes = this.state.datas;
        const filterName = dataes.filter(obj => obj.name.indexOf(name) !== -1 )
        this.setState({filterdatas :filterName})
    }
    renderUser(key) {
        return (  
            <User data={this.state.filterdatas[key]} token={this.props.token} key={key}/>                 
        );
   }
   renderAllusers() {
          const userData = [];
          for (let key in this.state.filterdatas) userData.push(this.renderUser(key))
          return userData;
   }
    render(){ 
    return (
        <div className="followshow" style={{height : window.innerHeight}}>
        <div className="followbox">
            <div className="col-12">
             <div className="row">
             <div className="header col-12">
             <div className="col-4 mx-auto">
                 <Serach getNameSerach={this.userSerach}/>
             </div>
             <span className="close" onClick={this.props.close}><i className="fa fa-times"></i></span>
              </div>
             {/* {this.state.filterdatas.map((data,key) =>
                <div className="col-lg-4 col-md-5" key={key}>
                {this.setState({})}
                <div className="userlist">
                <Link to={`/profile/${data.name}`}>
                <div className="image">
                 <img src={data.avatar==null ? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.avatarMedium}/${data.avatar}`} alt={data.name}/>
                </div>
                 <span className="title">{data.name}</span></Link> 
                 <button className={this.state.isFollow ? "select slctusr" : "slctusr"} onClick={this.toggleFollow}><span>دنبال کردن</span></button>
                 </div> 
                </div>
              )} */}
              {this.renderAllusers()}
            </div>
          </div>
        </div>
        </div>
        )
    }
}
class User extends Component{
    constructor (props) {
        super(props)
        this.state={
            isFollow: this.props.data.is_followed_by_login_user,
            isLoading:false,
        }
        this.toggleFollow = this.toggleFollow.bind(this)
    }
    toggleFollow(){
        this.setState({isLoading:true})
        axios.get(`${DataStatic.domainIp}/public/api/v1/user/follow/${this.props.data.name}?api_token=${this.props.token}`,
        )
        .then((response)=> {
          this.setState({isFollow : !this.state.isFollow,isLoading:false})
        })
        .catch( (err)=> {
            alert("something went Wrong",err)
          });  
    }
    render(){
        return(
            <div className="col-lg-4 col-md-5">
            <div className="userlist">
            <Link to={`/profile/${this.props.data.name}`}>
            <div className="image">
             <img src={this.props.data.avatar==null ? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.avatarMedium}/${this.props.data.avatar}`} alt={this.props.data.name}/>
            </div>
             <span className="title">{this.props.data.name}</span></Link> 
             {this.props.data.name===localStorage.getItem("userName")?"":  <button className={this.state.isFollow ? "slctusr select" : "slctusr"} onClick={this.toggleFollow}>{this.state.isLoading? <div style={{width:"20px",height:"20px",margin:"5px 30px",borderColor:"#fff"}} class="loading"></div>:<span>{this.state.isFollow? "دوست": "درخواست دوستی"}</span>}</button>}
            
             </div> 
            </div>
        )
    }
}
