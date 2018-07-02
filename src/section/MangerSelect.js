import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {DataStatic,StorageData} from '../StaticData';
export default class MangerSelect extends Component {
    constructor(props) {  
      super(props); 
      this.state ={
      clean : false,
      datafoll : '',
      serachmanger:"",
      dataserach :'',
      nameData : [],
      profileData : [],
      }
      this.nameselect =this.nameselect.bind(this)
      this.handleserachmaneger =this.handleserachmaneger.bind(this)
      this.renderMangerlist= this.renderMangerlist.bind(this);   
      this.renderAllMangerlists = this.renderAllMangerlists.bind(this);   
    }
    componentDidMount(){
        axios.get(`${DataStatic.domainIp}/public/api/v1/user/${this.props.username}/followed?api_token=${this.props.token}`,)
        .then((response)=> {
          this.setState({datafoll :response.data})
        })
        .catch( (err)=> {
            alert("something went Wrong",err)
          });  
    }
     handleserachmaneger() {
      const serach = this.refs.serachmanger.value
      this.setState({serachmanger: serach})
      if(serach.length >1){
      axios.get(`${DataStatic.domainIp}/public/api/v1/user/search/${serach}`,)
        .then((response)=> {
          this.setState({dataserach: response.data})
        })
       /* .catch( (err)=> {
            console.log("something went Wrong",err)
          });  */
   }
  }
 nameselect(name,profile,isSelected) {
  let addClubUserManger = this.props.userdata;
  addClubUserManger(name,profile,isSelected);
  }
  renderMangerlist(key) {
    var newdata = this.state.dataserach.length<1 ?this.state.datafoll:this.state.dataserach
     return (               
      <Mangerlist data={newdata[key]} key={key} length={this.state.dataserach} nameselect={this.nameselect} checkManger={this.props.checkmanger}/> 
     )
  }
 renderAllMangerlists () {
        var newdata = this.state.dataserach.length<1 ?this.state.datafoll:this.state.dataserach
        const postes = [];
        for (let key in newdata) postes.push(this.renderMangerlist(key))
        return postes;
  }
      render() {
       return (
        <div className="mangerlist">
        <div className="header header mb-3">
        <div className="col-5 mx-auto">
        <div className="serachbox" onClick={()=>this.setState({clean: true})}>
        <span><i className="fa fa-search"></i></span>
        <input value={this.state.serachmanger} ref="serachmanger" placeholder="جستجو..."  onChange={this.handleserachmaneger}/>
        {this.state.clean ? <span className="close" onClick={()=>this.setState({dataserach:"",serachmanger:"",clean: false})}><i className="fa fa-times"></i></span> : null}
        </div>
        </div>
        <span className="close" onClick={this.props.close}><i className="fa fa-times"></i></span>
        </div>
        <div className="col-12">
        <div className="row">
          {this.renderAllMangerlists()}
        </div>
        </div> 
        </div> 
       )
    }
}   
class Mangerlist extends Component {
    constructor(props) {
      const dataname = props.length.length<1 ?  props.data.name:props.data.user_name
        super(props); 
        let foundItems = this.props.checkManger.filter(obj => obj.name === dataname);
        this.state ={
          usrlitbtn: foundItems.length !== 0 ? true : false,
          dataname : dataname,
          profileuser : this.props.data.avatar,
          }
        this._toggleClass= this._toggleClass.bind(this);
      }
      _toggleClass(){
        let usrlitbtn = this.state.usrlitbtn
        let btnData = this.state.dataname
        let profile = this.state.profileuser
        usrlitbtn ? this.setState({usrlitbtn: false}) :this.setState({usrlitbtn: true})
       const nameselect = this.props.nameselect
       nameselect(btnData,profile,!usrlitbtn)
      }
      render(){
          return(
            <div className="col-6" key={this.props.id}>
            <div className="userlist">
            <Link to={`/profile/${this.state.dataname}`}>
             <div className="image">
             <img src={this.props.data.avatar==null ? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.avatarMedium}/${this.props.data.avatar}`} alt={this.state.dataname}/>
             </div>
             <span className="title">{this.state.dataname}</span></Link>
             <button className={this.state.usrlitbtn ? "select slctusr" : "slctusr"} onClick={this._toggleClass}><span>انتخاب</span></button>
             </div> 
            </div>
          )
      }
}