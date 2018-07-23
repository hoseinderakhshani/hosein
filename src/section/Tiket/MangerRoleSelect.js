import React, { Component } from 'react';
import {DataStatic,StorageData} from '../../StaticData';
import axios from 'axios';
export default class MangerRoleSelect extends Component {
  constructor(props) {
    super(props);
    this.state={
      role :[],
      roleName :[],
      rolemanger : [],
      isLoading:false
    }
    this.mangerSelectRole= this.mangerSelectRole.bind(this);   
    this.renderListManger= this.renderListManger.bind(this);   
    this.renderAllListMangers = this.renderAllListMangers.bind(this); 
  }
  mangerSelectRole(role,name){
   if(this.state.rolemanger.indexOf(name)=== -1) {
    if(role.length !==0){
      this.state.rolemanger.push(name)
      this.state.roleName.push(role)
    }else null
  }else {
    var positionManger = this.state.rolemanger.indexOf(name)
    if(role.length !==0){
       this.state.roleName[positionManger] = role
      // this.setState(roleName[positionManger] = role)
    }else{
      this.state.rolemanger.splice(positionManger,1)
      this.state.roleName.splice(positionManger,1)
    }
   }
   this.props.mangerSelectRoles(this.state.roleName,this.state.rolemanger)
  }
  renderListManger(key) {
    let data = this.props.manger[key];
     return (  
         <ListManger manger={data} key={key} mangerSelectRole={this.mangerSelectRole}/>                 
     );
 }
 renderAllListMangers() {
       const datas = [];
       for (let key in this.props.manger) datas.push(this.renderListManger(key))
       return datas;
 }
 handelsubmit(){
   this.setState({isLoading:true})
   console.log(this.props.parent.state)
   var dataTiket = new FormData();
   let data = this.props.parent.state
   dataTiket.append('date',data.dateStart)
   dataTiket.append('name', data.description.title)
   dataTiket.append('body',data.description.text)
   dataTiket.append('state',data.state)
   dataTiket.append('city',data.city)
   dataTiket.append('address',data.location)
  dataTiket.append('price',data.price)
  dataTiket.append('filter',data.filter)
  dataTiket.append('limit',data.limit)
  dataTiket.append('managers',data.manger)
  dataTiket.append('manager_role',data.role)
  dataTiket.append('end_date',data.dateEnd)
  data.description.image===undefined?null:dataTiket.append('avatar',data.description.image)
 axios({
    method: 'post',
    url: `${DataStatic.domainIp}/public/api/v1/event/addticket/${this.props.parent.props.nameClub}?api_token=${this.props.parent.props.token}`,
    data: dataTiket,
    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' },"processData": false,
    "contentType": false,
    "mimeType": "application/x-www-form-urlencoded"
    }
})
  .then((response)=> {
    this.setState({isLoading:false})
    if(response.data==="not enought inputs"){
      alert("مقادیر وارد شده اشتباه میباشد")
    }
    else{
    this.props.parent.setState({idTiket:response.data,minDate:data.descriptionTwo.dateStart,maxDate:data.descriptionTwo.dateEnd})
    this.state.isLoading?null:this.props.togglePage("four")
    }
  })
  .catch( (error)=> {
    return(
      <div className="errorserver">
          <span>مشکلی از سمت سرور</span>
      </div>
    )
  });
 }
    render() {
      const tab = this.props.tab;
     return (
      <div className="col-12">
      <div className="row p-1">
         {this.renderAllListMangers()}
       <div className="footer col-12">
       <div className="description">انتخاب منیجر</div>
       <div className="page">
       <ul>
         <li onClick={()=>this.props.togglePage("")} style={{cursor :"pointer"}}><i className="fa fa-circle"></i></li>
         <li onClick={()=>this.props.togglePage("two")} style={{cursor :"pointer"}}><i className="fa fa-circle"></i></li>
         <li onClick={()=>this.props.togglePage("three")} style={{color:"#00BCD4",cursor :"pointer"}}><i className="fa fa-circle"></i></li>
         <li><i className="fa fa-circle"></i></li>
       </ul>
       </div>
     <button className="next" onClick={this.handelsubmit.bind(this)}>{this.state.isLoading?<div style={{width:"25px",height:"25px"}} className="loading"></div>:<i className="fa fa-angle-left"></i>}</button>
       </div>
      </div>
      </div>
     )
  }
}    
class ListManger extends Component {
  constructor(props) {
    super(props);
    this.state={
      usrlitbtn: false,
    }
    this._toggleClass = this._toggleClass.bind(this);
  }
  _toggleClass(){
    this.setState({usrlitbtn: true})
    const mangerSelectRole = this.props.mangerSelectRole
    mangerSelectRole(this.refs.role.value,this.props.manger.manager_name) 
  }
    render() {
     return ( 
      <div className="slctmagr col-6" key={this.props.id}>
         <div className="image">
         <img src={this.props.manger.avatar===null? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.avatarMedium}/${this.props.manger.avatar}`} alt={this.props.manger.manager_name}/>
        </div>
        <h4>{this.props.manger.manager_name}</h4>
        <button className={this.state.selectManger ? "select slctusr": "slctusr"} style={this.state.usrlitbtn ? {display:"none"}:null} onClick={this._toggleClass}><span>انتخاب</span></button>
         <label style={this.state.usrlitbtn ? {display:"block"}:{display:"none"}}>
          <input type="text" placeholder="نوشتن نقش" ref="role"/>
          <span onClick={this._toggleClass} className="esc"><i className="fa fa-check"></i></span>
          </label>
       </div>
     )  
}
}
