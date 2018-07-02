import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import axios from 'axios';
import {DataStatic} from './StaticData';
import {checkForLogin} from './methodStatic';
import AlertLogin from './AlertLogin';
export default class LandingPage extends Component {
      constructor(){
        super();
        this.state={
          select :"login",
          token :localStorage.getItem('token'),
          username : localStorage.getItem('userName'),
        }
        this.Selection =this.Selection.bind(this)
      }
      Selection(page){
          this.setState({select:page})
      } 
      render() {
      if(this.state.token && this.state.username)
      return  <Redirect to={{pathname: '/home',state : this.state.token }}/>
      else {
        return (
         <div className="home">
         <div className="header">
         <img src="/images/fairy-glen-3840x2160-isle-of-skye-scotland-nature-4k-17766.jpg"/>
         <div className="hovr"></div>
         <div className="logo">
         <img src="/images/lodgo.png"/>
         </div>
         </div>
         <div className="container">
          <div className="row">
          {this.state.select==="login"? <Login page={this.Selection}/>:null}
          {this.state.select==="sign" ? <Sign page={this.Selection}/>:null}
          </div>
          <div className="footer" style={{marginTop:"15px"}}>
          <ul>
            <li><Link to="/">فرصت شغلی.</Link></li>
            <li><Link to="/">قوانین.</Link></li>
            <li><Link to="/">توضیحات.</Link></li>
            <li><Link to="/">api.</Link></li>
          </ul>
          <span>2018 - tripplus©</span>
          </div>
        </div>
        
         </div> 
        );
      }
    }
}
class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      userName : '',
      token: '',
      alert:null,
      alertCheck:false,
      isLoading : false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = event => {
    let value = event.target.value;
    this.setState({
      [event.target.name]: value
    });
  }
  handleSubmit = event => {
    this.setState({isLoading:true})
    event.preventDefault();
    var obj = {}
    if(this.state.email.indexOf("@")===1){
        obj["email"] = this.state.email
        obj["password"] =this.state.password
    }else if(isNaN(this.state.email)===false){
      obj["phone"] = this.state.email
      obj["password"] =this.state.password
    }else {
      obj["user_name"] = this.state.email
      obj["password"] =this.state.password
    }
    var querystring = require('querystring');
    console.log(obj)
    let pass = this.state.password;
    axios.post(`${DataStatic.domainIp}/public/api/v1/user/login`,querystring.stringify(obj),
        {
          headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
          }
        })
        .then((response)=> {
          this.setState({isLoading:false})
          if(response.data ==="wrong password"){
            this.setState({alertCheck:true,alert:"رمز عبور شما با اطلاعات وارد شده مطابقت ندارد"})
          }
          else if(response.data ==="email mpt found"){
            // const click = <a href="#">kjhk</a>
            // alert:"ایمیل وارد شده اشتباه می باشد، اگر ثبت نام نکرده اید"+click+"کنید"
            this.setState({alertCheck:true,alert:"ایمیل وارد شده اشتباه می باشد"})
          }
          else if(response.data ==="user name not found"){
            this.setState({alertCheck:true,alert:"نام کاربری وارد شده اشتباه می باشد :)"})
          }
          else if(response.data ==="phone not found"){
            this.setState({alertCheck:true,alert:"شماره تلفن وارد شده اشتباه می باشد :)"})
          }
          else{
            localStorage.setItem('userName', response.data.userName)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('avatar', response.data.avatar)
            this.setState({userName:response.data.userName,token:response.data.token})
            window.location.reload(true)
          }
        })
        .catch( (error)=> {
          alert("something went Wrong")
        });
  }
  render(){
    return(
      <div className="col-12 d-flex justify-content-md-center mt-5 row" style={{height:window.innerHeight - "250"}}>
      <div className="col-md-4">
      {this.state.alertCheck? <AlertLogin alert={this.state.alert}/>:""}
       <div className="box">
       <input type="text" name="email" value={this.state.email} onInput={this.handleChange}/><label>نام کاربری یا ایمیل </label>
       </div>
       <div className="box">
       <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/><label>رمز عبور</label>
       </div>
       <span className="forget"><Link to="/">فراموشی رمز عبور؟</Link></span>
       <div className="submit">
       <button onClick={()=>this.props.page("sign")}>ثبت نام</button>
       {this.state.isLoading? <button className="active" type="submit"><div style={{width:"15px",height:"15px"}} class="loading"></div>
       </button>
       :
       <button onClick={this.handleSubmit} className="active" type="submit">ورود</button>
    }
       </div>
       </div>
      </div>
    )
  }
}
class Sign extends Component{
  constructor(props){
    super(props)
    this.state={
      file:'',
      imagePreviewUrl:'',
      imagePreviewacc: false,
      chekEmaill: false,
    }
    this.renderPreview= this.renderPreview.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
  }
  handleChange = event => {
    let value = event.target.value;
    this.setState({
      [event.target.name]: value
    });
  }
  handleRadioChange = event => {
    let value = event.target.value;
    this.setState({gender: value});
  }
  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });}
    reader.readAsDataURL(file)
  }
  renderPreview(){
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
        return <div className="imgpre image" onMouseOver={()=>this.setState({imagePreviewacc: true})} onClick={()=>this.setState({imagePreviewUrl: null,file:""})}>{this.state.imagePreviewacc ? <span className="close"><i className="fa fa-times"></i></span> : null }<img src={imagePreviewUrl}/></div>
    } else {
      null
    }
  }
  checkEmail(ev){
      if(ev.target.value.indexOf("@")===-1 && ev.target.value.length>0){
      ev.target.parentElement.children[1].style.color="#ff0d0d" 
      ev.target.style.borderBottom="1px solid #ff0d0d"
    }
      else {ev.target.parentElement.children[1].style.color=null 
      ev.target.style.borderBottom=null
      this.setState({chekEmaill:true})
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    var pass = false
    var req = false
    var gend = false
    var mxLen = false
      var x=document.querySelectorAll('[required]')
      var i = 0;
      for(i==0 ;i<x.length;i++){
        if(x[i].value.length===0){
        x[i].style.borderBottom="1px solid #ff0d0d"
        x[i].parentElement.children[1].style.color="#ff0d0d"
        }else {
          x[i].style.borderBottom=null
          x[i].parentElement.children[1].style.color=null
          req = true
        }
      }
      if((x[1]&&x[2]).value.length>25){
        mxLen =false
      }else mxLen = true
        if(this.state.password!==this.state.password2 || this.refs.checkPass.value.length===0){
          this.refs.checkPass.parentElement.children[1].style.color="#ff0d0d"
          this.refs.checkPass.style.borderBottom="1px solid #ff0d0d"
          }
          else{  this.refs.checkPass.parentElement.children[1].style.color=null
        this.refs.checkPass.style.borderBottom=null
        pass = true
        }
        if(this.state.gender===undefined){
          this.refs.checkGend.style.color="#ff0d0d"
        }else {
        this.refs.checkGend.style.color=null
          gend=true
      }
    if(gend&&pass&&req&&this.state.chekEmaill&&mxLen){
      var datareg = new FormData();
      var querystring = require('querystring');
      datareg.append('email',this.state.email)
      datareg.append('username',this.state.username)
      datareg.append('avatar',this.state.file,this.state.file.name)
      datareg.append('password',this.state.password)
      datareg.append('gender',this.state.gender)
      datareg.append('name_header',this.state.name)
      axios({
        method: 'post',
        url: `${DataStatic.domainIp}/public/api/v1/user/create`,
        data: datareg,
        config: { headers: {'Content-Type': 'multipart/form-data' },"processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data"
        }
    })
      .then((response)=> {
        if(response.status===200){
          alert("ثبت نام موفق آمیز ")
          setTimeout(()=>{
              window.location.reload()
          },3500)
        }else {
          alert("مشکلی پیش آمده کسکم.")
        }
      })
      .catch( (error)=> {
        alert("api error")
      });
    }else null
}
    render(){
      const page = this.props.page
      return(
        <div className="col-12 d-flex justify-content-md-center mt-5 mb-5 row" style={{height:window.innerHeight - "250px"}}>
        <div className="col-md-3 col-12 reg">
         <label className="fileInput">
          <input type="file"  accept=".jpg, .png, .jpeg, .bmp, .tif, .tiff|images/*" style={{display:"none"}} onChange={(e)=>this._handleImageChange(e)}/>
          <span>عکس پروفایل</span>
         </label>
        {this.renderPreview()}
         </div>
        <div className="col-md-4 col-12">
         <div className="box">
         <input type="text" name="email" required onInput={this.handleChange} onBlur={this.checkEmail}/><label>ایمیل*</label>
         </div>
         <div className="box">
         <input type="text" name="username" required onInput={this.handleChange} maxLength="25"/><label>نام کاربری*</label>
         </div>
         <div className="box">
         <input type="text" name="name" required onInput={this.handleChange} maxLength="25"/><label>نام*</label>
         </div>
         <div className="box">
         <input type="password" name="password" required onInput={this.handleChange}/><label>رمز عبور*</label>
         </div>
         <div className="box">
         <input type="password" name="password2" ref="checkPass" onInput={this.handleChange}/><label>تکرار رمز عبور*</label>
         </div>
         <div className="box" style={{display:"block",marginTop:" 15px"}}>
         <label ref="checkGend" style={{width:"107px"}}>جنسیت*</label>
         <label onClick={this.handleRadioChange}> <input type="radio" name="gender" value="men" style={{width: "auto",marginLeft: "10px",verticalAlign:"middle"}}/>مرد</label>
         <label onClick={this.handleRadioChange}> <input type="radio" name="gender" value="female" style={{width: "auto",marginLeft: "10px",verticalAlign:"middle"}}/>زن</label>
         </div>
         <div className="submit">
         <button onClick={()=>page("login")}>ورود</button>
         <button className="active" type="submit" onClick={this.handleSubmit}>ثبت نام</button>
         </div>
         </div>
        </div>
      )
  }
}