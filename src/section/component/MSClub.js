import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Showfllow from '../Showfollow';
import {DataStatic,StorageData} from '../../StaticData';
export default class MSClub extends Component {
    constructor (props) {
        super(props)
        this.state ={
            bio : false,
            isfollow :'',
            MangerShow:false,
            isSubscrib: this.props.data.is_subscriber,
        }
        this.renderManegr =this.renderManegr.bind(this)
        this.renderAllManegrs =this.renderAllManegrs.bind(this)
        this.togglePopup= this.togglePopup.bind(this)
    }
    togglePopup(number,name) {
        if(number !== 0 && this.props.valuation===true){
        this.setState({
          isfollow: name
        });
    }
}
    renderManegr(key) {
        if(key<11){
        return (  
            <Manger data={this.props.data.managers[key]} key={key}/>         
        );
    }
   }
  renderAllManegrs() {
     const dataes = [];
     for (let key in this.props.data.managers){ dataes.push(this.renderManegr(key))
    }
     return dataes
        }
    isSubscrib(){
        axios.get(`${DataStatic.domainIp}/public/api/v1/event/${this.props.data.club_name}/subscribe?api_token=${this.props.token}`,)
        .then((response)=> {
         this.setState({isSubscrib: !this.state.isSubscrib})
        })
        .catch( (err)=> {
            alert("something went Wrong",err)
        });
    }
    render(){ 
    return (
        <div> 
          {this.state.isfollow==="followers" ? <Showfllow close={()=>this.togglePopup(this.props.data.followers_number,'')} aaf={`${DataStatic.domainIp}/public/api/v1/event/${this.props.data.club_name}/followers?api_token=${this.props.token}`}/> : null}  
        <div className="prfe-cor">
                      <span>{this.props.data.club_name}</span>
                      <span className="user">{this.props.data.header}</span>                          
        </div>
             <div className="prfe-flw">
                <ul>
                    <li onClick={()=>this.togglePopup(this.props.data.followers,"followers")} style={this.props.valuation? null:{cursor:"default"}}><span>{this.props.data.followers} </span>دنبال شده</li>
                    <li style={{cursor:"default"}}><span>{this.props.data.ticket_numbers} </span>تیکت فعال</li>
                </ul>
             </div>
             <div className="clb-reg d-flex justify-content-between align-items-center">
             {this.props.valuation?
             <button style={{background:"none",color:"#FFC107"}}>ویرایش</button>
             :
             <button onClick={this.isSubscrib.bind(this)} style={this.state.isSubscrib ?{background: "none",color: "#FFC107"}:{background: "#FFC107",color: "#FFF"}}>{this.state.isSubscrib?"دنبال نکردن":"دنبال کردن"}</button>
             }
                <div>
                <span style={this.state.bio? {color:"#00BCD4"}:null} onClick={() => this.setState({bio: true})}><i className="fa fa-quote-left"></i><div className="tltp">Bio</div></span>
                <span style={this.state.bio? null:{color:"#00BCD4"}} onClick={() => this.setState({bio: false})}><i className="fa fa-users"></i><div className="tltp">manger</div></span>
                </div>
            </div>
             <div className="clb-manger" style={this.state.bio ? {display: 'none'} : {display: 'block'}}>
                <ul>
                {this.renderAllManegrs()} 
                {this.renderAllManegrs().length>=11 ? 
                <li key={this.props.id}>
                <span onClick={()=>this.setState({MangerShow:true})}><i class="fa fa-ellipsis-h"></i></span>
                </li>
                :null}                                       
                </ul>
            </div> 
            <div className="clb-des" style={this.state.bio ? {display: 'block'} : {display: 'none'}}>
            <p>{this.props.data.bio} </p>
            </div>
            {this.state.MangerShow?
                    <div className="bgadd bgmngr" ref="close" onClick={(e)=>e.target===this.refs.close? this.setState({MangerShow:false}):null}>
                    <button onClick={()=>this.setState({MangerShow:false})} className="close"><i className="fa fa-times"></i></button>
                    <div className="col-6" style={{height:window.innerHeight,padding:"15px 0"}}>
                     <div className="showmanger">
                     {this.props.data.managers.map((data,key) =>
                     <div className="col-12">
                        <div className="userlist">
                        <Link to={`/profile/${data.manager_name}`}>
                          <div className="image">
                        <img src={data.avatar==null ? "/images/noimage.jpg" : `${DataStatic.domainName}/${StorageData.avatarMedium}/${data.avatar}`} alt={data.name}/>
                        </div>
                        <span className="title">{data.manager_name}</span></Link> 
                        <button className={this.state.isFollow ? "select slctusr" : "slctusr"} onClick={this.toggleFollow}><span>انتخاب</span></button>
                        </div>
                     </div>
                     )}
                     </div>
                    </div>
                    </div>
                    : null}
            </div>
        )
    }
}
class Manger extends Component{
    constructor (props) {
        super(props)
    }
        render(){ 
            return (
                <li key={this.props.id}>
                <Link to={`/profile/${this.props.data.manager_name}`}>
                <img src={this.props.data.avatar===null? "/images/noimage.jpg":`${DataStatic.domainIp}/${StorageData.avatarMedium}/${this.props.data.avatar}`} alt={this.props.data.manager_name}/>
                </Link>
                </li>  
            )
        }
}