import React, { Component } from 'react';
import axios from 'axios';
export default class AddTimeline extends Component {
  constructor(props) {
    super(props); 
    this.state={
      count: 0,
    }
  }
  addBoxTimeline(data) {
    var addtimeline = new FormData();
    this.setState({ count: this.state.count + 1 })
    console.log(data)
  /*  const date = []
    date = {date : data.date,time: data.time}
    var querystring = require('querystring');
    addtimeline.append('name',data.title)
    addtimeline.append('text',data.text)
    addtimeline.append('ticketid',this.state.count)
    addtimeline.append('time',date)
    addtimeline.append('club',this.props.nameClub)
    addtimeline.append('photo',data.file,data.file.name)
    axios({
      method: 'post',
      url: `http://localhost/payebash5.5/public/api/v1/event/addtimeline?api_token=${this.props.token}`,
      data: addtimeline,
      config: { headers: {'Content-Type': 'multipart/form-data' },"processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data"
      }
  })
    .then((response)=> {
      console.log(response)  
      if(response.data === 0){
               
      }else{
        alert("ok")
        console.log(response)
        console.log(this.props.name)
      }
    })
    .catch( (error)=> {
      alert("api error")
    }); */
  }
  get boxTimeline(){
    const elements = [];
    for(let i=0; i <= this.state.count; ++i){
      elements.push(<BoxTimeline parent={this.addBoxTimeline.bind(this)} key={i} token={this.props.token}/>)
    }
    return elements;
}
  render() {
      const tab = this.props.tab;
      return (
      <div className="col-12 p-1">
      <div className="addtimeline col-12">
      <div className="row" refs="addtimeline" id="addtimelines">
      {this.boxTimeline}
      <div className="col-md-4">
       <div className="plus" style={{opacity:"0.8"}}>
       <span onClick={this.addBoxTimeline.bind(this)} ><i className="fa fa-plus"></i></span>
       </div>
      </div>
      </div>
 </div>
  <div className="footer col-12">
  <div className="description">جدول زمانی
  </div>
  <div className="page">
  <ul>
    <li onClick={()=>tab("")} style={{cursor :"pointer"}}><i className="fa fa-circle"></i></li>
    <li onClick={()=>tab("two")} style={{cursor :"pointer"}}><i className="fa fa-circle"></i></li>
    <li onClick={()=>tab("three")} style={{cursor :"pointer"}}><i className="fa fa-circle"></i></li>
    <li onClick={()=>tab("four")} style={{color:"#00BCD4",cursor :"pointer"}}><i className="fa fa-circle"></i></li>
  </ul>
  </div>
  <span className="accept"  onClick={()=>tab("")}>
    <i className="fa fa-check"></i> 
   </span>
  </div>
  </div>
     )
  }
}
class BoxTimeline extends Component {
  constructor(props) {
    super(props); 
    this.state={
      imagePreviewUrl: '',
    }
    this.renderPreview= this.renderPreview.bind(this);
    this.handleChange= this.handleChange.bind(this);
  }
  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });                                                                                                         }
    reader.readAsDataURL(file)
  }
  renderPreview(){
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
        return <div><img src={imagePreviewUrl} /><span className="close" onClick={()=>this.setState({imagePreviewUrl:null,file:null})}><i class="fa fa-times"></i></span></div>
    } else {
      null
    }
  }
  handleChange(event) {
    let title = event.target.getAttribute('data-name');
    let obj = {};
    obj[title] = event.target.value;
    if(event.target.value>0 && event.target.value<event.target.maxLength){
      this.setState(obj);
    }else null
  }
    render() {
      
     return (
       <div className="col-md-4 mt-3 mb-3">
       <div className="image">
       <label>
         <input type="file" style={{display:"none"}} onChange={(e)=>this._handleImageChange(e)}/>
         <span>عکس خود را وارد نمایید.</span>
       </label>
       {this.renderPreview()}
       </div>
       <div className="layout"> <input data-name="title" type="text" placeholder="عنوان" onInput={this.handleChange} maxLength="30"/></div>
       <div className="layout"> <textarea data-name="text" placeholder="توضیحات خود را وارد کنید..." onInput={this.handleChange} maxLength="150"></textarea></div>
       <div className="layout"><label>تاریخ : </label><input data-name="date" type="date" onInput={this.handleChange}/></div>
       <div className="layout"><label>ساعت : </label><input data-name="time" type="time" onInput={this.handleChange}/></div>
       </div>
     )
  }
}   