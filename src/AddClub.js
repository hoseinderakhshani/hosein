import React, { Component } from 'react';
import axios from 'axios';
import MangerSelect from './section/MangerSelect';
import {DataStatic,StorageData} from './StaticData';
export default class AddClub extends Component {
  constructor (props) {
    super(props)
        this.state={
          isLoading:false,
          imagePreviewUrl: '',
          imagePreviewacc:false,
          about:'',
          title: '',
          header :'',
          bio : '',
          file : '',
          addmanger:false,
          type:'',
          statelist: [],
          state:'',
          city:'',
          filter : '',
          userData : [],
          userManegr:[],
        }
        this.renderPreview= this.renderPreview.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleClass= this.toggleClass.bind(this);
        this.submitmangers= this.submitmangers.bind(this);
        this.renderManegr= this.renderManegr.bind(this);
        this.renderAllManegrs= this.renderAllManegrs.bind(this);
        this.renderStateList= this.renderStateList.bind(this);
        this.filterData= this.filterData.bind(this);
      }
      handleChange(event) {
        let title = event.target.getAttribute('data-name');
        let obj = {};
        obj[title] = event.target.value;
        if(event.target.value.length>0)
        event.target.value.length<event.target.maxLength?this.setState(obj):''
        else this.setState({[title]:''})
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
            return <div className="imgpre" onMouseOver={()=>this.setState({imagePreviewacc: true})} onClick={()=>this.setState({imagePreviewUrl: null})}>{this.state.imagePreviewacc ? <span className="close"><i className="fa fa-times"></i></span> : null }<img src={imagePreviewUrl}/></div>
        } else {
          null
        }
      }
      toggleClass() {
        const currentState = this.state.addmanger;
        this.setState({addmanger: !currentState})
      }
      submitmangers(name,profile,isSelected){
        var dataName = this.state.userData;
        var data = [];
        let myObj = {name:name,profile:profile}
        if(isSelected){
          let currentStatus = dataName.filter(obj => obj.name == myObj.name);
          if(currentStatus.length == 0){
            dataName.push(myObj)
          }else{
            return "already exists";
          }
        }
        else{
          dataName = dataName.filter(obj => obj.name != myObj.name)
        }
      this.setState({userData:dataName})
     const userNameManegr =[]
     const usrDt = this.state.userData
        for(let i=0;i<usrDt.length;i++){
          userNameManegr.push(usrDt[i].name)
        }
        this.setState({userManegr:userNameManegr})
      }
      renderManegr(key) {
         return (  
             <ShowManegr image={this.state.userData[key]} id={key} />                 
         );
    }
    renderAllManegrs() {
      const dataes = [];
      for (let key in this.state.userData) dataes.push(this.renderManegr(key))
      return dataes;
}
    renderStateList(ev){
      ev.target.style.color="#212121"
      axios.get(`${DataStatic.domainIp}/public/api/v1/state`,)
    .then((response)=> {
      var data = [...response.data];
      this.setState({statelist: data})
    })
    .catch( (err)=> {
        alert("something went Wrong",err)
      });
      const slect = this.refs.statelist.value
      this.setState({state: `${slect}`}) 
    }
    filterData(namefilter){
        this.setState({filter:namefilter})
    }
    handleSubmit = event => {
      var x=document.querySelectorAll('[required]')
      const y = document.querySelectorAll('.filter span')
      var i = 0;
      var submitt = false
      var subbit = false
      for(i==0 ;i<x.length;i++){
        if(x[i].value.length===0){
        x[i].style.border= "1px solid red"
       // x[i].style.background= "rgba(255,0,0,0.15)"
        }
        else {
          x[i].style.border= "none"
      //  x[i].style.background= "#fff"
        submitt = true
        }
      }

    if( submitt ){
      this.setState({isLoading:true})
      event.preventDefault();
      var dataclub = new FormData();
      let data = this.state;
      var querystring = require('querystring');
      dataclub.append('avatar',this.state.file,this.state.file.name)
      dataclub.append('filters', data.filter)
      dataclub.append('name',data.title)
      dataclub.append('city',data.city)
      dataclub.append('state',data.state)
      dataclub.append('type',data.type)
      dataclub.append('bio',data.bio)
      dataclub.append('about_team',data.about)
      dataclub.append('header',data.header)
      dataclub.append('managers',data.userManegr)
      axios({
        method: 'post',
        url: `${DataStatic.domainIp}/public/api/v1/event?api_token=${this.props.token}`,
        data: dataclub,
        config: { headers: {'Content-Type': 'multipart/form-data' },"processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data"
        }
    })
      .then((response)=> {
        this.setState({isLoading:false})
           this.props.close("")
           setTimeout(()=>
           window.location.reload()
          ),500
      })
      .catch( (error)=> {
        return(
          <div className="errorserver">
              <span>مشکلی از سمت سرور</span>
          </div>
        )
      });
    }else null
    }
      render() {
        return (
          <div className="bgadd" ref="close" style={{minHeight: window.innerHeight}} onClick={(e)=>e.target===this.refs.close?this.props.close(""):null}>
          <button onClick={this.props.close} className="close"><i className="fa fa-times"></i></button>
          {this.state.isLoading? <div style={{width:"50px",height:"50px"}} class="loading"></div>:
          <div className="box" style={{width:"60"+"%"}}>
              <div className="addclub" style={{padding:5}}>
                <div className="addfile">
                 <label>
                      <input className="fileInput" type="file"  accept=".jpg, .png, .jpeg, .bmp, .tif, .tiff|images/*" style={{display:"none"}} onChange={(e)=>this._handleImageChange(e)}/>
                      <span>اضافه کردن کاور</span>
                  </label>
                  {this.renderPreview()}
                </div>
                <div className="d-flex">
                <div className="title col-md-4 p-1"><input data-name="title" placeholder="نام باشگاه*" onInput={this.handleChange} required type="text" minLength="2" maxLength="35"/></div>
                <div className="title col-md-4 p-1"><input data-name="about" placeholder="شعار باشگاه" onChange={this.handleChange} type="text" minLength="2" maxLength="35"/></div>
                <div className="title col-md-4 p-1"><input data-name="header" placeholder="نمی دونم چیه تو وارد کن..." onChange={this.handleChange} type="text" minLength="2" maxLength="35"/></div>
                </div>
                <div className="bio">
                  <textarea placeholder="توضیحات باشگاه خود را وارد نمایید..."  data-name="bio" onChange={this.handleChange} type="text" minLength="2" maxLength="285"/>
                </div>
                <div className="col-12">
                <div className="row">
                <div className="title col-md-4 p-1">
                <select className="stateslct" required onClick={this.renderStateList} ref="statelist" style={{color:"#757575"}}>
                <option value="" hidden >استان*</option>
              {this.state.statelist.map((name,key) =>
                <option value={name} key={key}>{name}</option>
              )}
              </select>
              </div>
                <div className="title col-md-4 p-1"><input  data-name="city" required placeholder="شهر*"  onChange={this.handleChange} minLength="1" maxLength="80" /></div>
              <div className="title col-md-4 p-1"><input  data-name="type" required placeholder="دسته بندی*"  onChange={this.handleChange} minLength="1" maxLength="80"/></div>
                <div className="filter col-12">
                <span>فیلتر براساس* : </span>
                <div>
                <label onClick={(h)=>this.filterData("")}><input type="radio" name="filter" value="public" />عمومی</label>
                <label onClick={(h)=>this.filterData("private")}><input type="radio" name="filter" value="private" />خصوصی</label>
                <label onClick={(h)=>this.filterData("gender")}><input type="radio" name="filter" value="gender" />جنسیت</label>
                </div>
                </div>
                </div>
                </div>
                <div className="footer">
                <div className="tourmanger">
                  <span onClick={this.toggleClass} className="touricon"><i className="fa fa-users"></i></span>
                  {this.state.addmanger ? <MangerSelect close={this.toggleClass} token={this.props.token} username={this.props.username} userdata={this.submitmangers} checkmanger={this.state.userData}/>: null}
                  <ul>
                    {this.renderAllManegrs()}
                  </ul>
                </div>
                <span className="accept" onClick={this.handleSubmit}>
                 <i className="fa fa-check"></i> 
                 </span> 
                </div>
              </div>
          </div>
          }
          </div>
           )
      }
    }
class ShowManegr extends Component {
  constructor (props) {
    super(props)
  }
    render() {
      return (
        <li key={this.props.id}><img src={this.props.image.profile===null? "/images/noimage.jpg":`${DataStatic.domainIp}/${StorageData.avatarMedium}/${this.props.image.profile}`}/></li>
      )
      }
  
}