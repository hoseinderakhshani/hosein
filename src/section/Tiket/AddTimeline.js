import React, { Component } from 'react';
import axios from 'axios';
import {DataStatic} from '../../StaticData';
import DatePicker from 'react-datepicker';
import * as moment from 'jalali-moment';
moment.locale('fa')
export default class AddTimeline extends Component {
  constructor(props) {
    super(props); 
    this.state={
      count:0,
      timelineData:[],
      isLoading:false,
    }
  }
  get boxTimeline(){
    let showBox= [];
    for(var i=0;i<=this.state.count;i++){
       showBox.push(<BoxTimeline count={i} parent={this}/>) 
    }
    return showBox
  }
  addBoxTimeline(){
    if(this.state.timelineData.length!==0){
      const x = this.state.timelineData
      if(x[this.state.count]!==undefined)
        if(x[this.state.count].title&&x[this.state.count].text&&x[this.state.count].date&&x[this.state.count].time){
          this.setState({count:this.state.count+1})
        }else alert("فیلد های مورد نیاز پر شود")
        else alert("فیلد های مورد نیاز پر شود")
      }else alert("فیلد مورد نیاز پر شود")
  }
  sendData(){
    // console.log(this.state.timelineData)
    var timelineData=this.state.timelineData;
      if(timelineData.length>0){
        for(let i=0;i<timelineData.length;i++){
          this.setState({isLoading:true})
            var addTimeline = new FormData();
                addTimeline.append('type',"club")
                addTimeline.append('name', timelineData[i].title)
                addTimeline.append('text',timelineData[i].text)
                addTimeline.append('time',timelineData[i].time)
                addTimeline.append('ticketid',"5")
                addTimeline.append('club',"افرود")
                timelineData[i].file===undefined?null:addTimeline.append('photo',timelineData[i].file,timelineData[i].file.name)
                axios({
                  method: 'post',
                  url: `${DataStatic.domainIp}/public/api/v1/event/addtimeline?api_token=${this.props.parent.props.token}`,
                  data: addTimeline,
                  config: { headers: {'Content-Type': 'multipart/form-data' },"processData": false,
                  "contentType": false,
                  "mimeType": "multipart/form-data"
                  }
              })
                .then((response)=> {
                  this.setState({isLoading:false})
                })
                .catch( (error)=> {
                  return(
                    <div className="errorserver">
                        <span>مشکلی از سمت سرور</span>
                    </div>
                  )
                });      
          }
      }else alert("حداقل یک جدول زمانی ایجاد نمایید.")
  }
  render() {
      return (
      <div className="col-12 p-1">
      <div className="addtimeline col-12">
      <div className="row" style={{height: window.innerHeight- 140,overflowY:this.state.count<3?"auto":"scroll"}}>
      {this.boxTimeline}
      <div className="col-md-4">
       <div className="plus" style={{opacity:"0.8",height: window.innerHeight- 140}}
        onClick={this.addBoxTimeline.bind(this)}
        >
       <span><i className="fa fa-plus"></i></span>
       </div>
      </div>
      </div>
 </div>
  <div className="footer col-12">
  <div className="description">جدول زمانی
  </div>
  <div className="page">
  <ul>
    <li onClick={()=>this.props.togglePage("")} style={{cursor :"pointer"}}><i className="fa fa-circle"></i></li>
    <li onClick={()=>this.props.togglePage("two")} style={{cursor :"pointer"}}><i className="fa fa-circle"></i></li>
    <li onClick={()=>this.props.togglePage("three")} style={{cursor :"pointer"}}><i className="fa fa-circle"></i></li>
    <li onClick={()=>this.props.togglePage("four")} style={{color:"#00BCD4",cursor :"pointer"}}><i className="fa fa-circle"></i></li>
  </ul>
  </div>
  <button onClick={this.sendData.bind(this)} className="next" style={{fontSize:" 1.42em"}}>{this.state.isLoading?<div style={{width:"25px",height:"25px"}} className="loading"></div>:<i className="fa fa-check"></i>}</button>
  </div>
  </div>
     )
  }
}
class BoxTimeline extends Component {
  constructor(props) {
    super(props); 
    this.state={
      title:'',
      text:'',
      imagePreviewUrl:'',
      file:'',
      date:"",
      time:'',
      timelineData:[],
    }
    this.handelChange = this.handelChange.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
  }
  handleChangeDate(date){
      this.setState({date})
  }
  handleChangeTime(time){
    this.setState({time})
}
  handelChange(event){
      if(event.target.value.length>0){
        const valdat = {}
        valdat[event.target.name] = event.target.value
      event.target.value.length<event.target.maxLength? this.setState(valdat):""
      }
      else this.setState({[event.target.name]:''})
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
          return <div className="imgpre" onMouseOver={()=>this.setState({imagePreviewacc: true})} onClick={()=>this.setState({imagePreviewUrl: null,file:''})}>{this.state.imagePreviewacc ? <span className="close"><i className="fa fa-times"></i></span> : null }<img src={imagePreviewUrl}/></div>
      } else {
        null
      }
    }
    handelClick(){
      const x = this.props.parent
      x.state.timelineData[this.props.count] = this.state 
      //  x.setState({timelineData:[...x.state.timelineData,this.state]})
    }
    render() {
      const clickStyle = {
        border : "none",
        background : "none",
        color:"#bdbdbd",
      }
      const vthis = this.props.parent
     return (
       <div className="col-md-4 mt-3 mb-3">
       <div className="image">
       <label>
         <input type="file" type="file" accept=".jpg, .png, .jpeg, .bmp, .tif, .tiff|images/*" style={{display:"none"}} onChange={(e)=>this._handleImageChange(e)}/>
         <span>عکس خود را وارد نمایید.</span>
       </label>
       {this.renderPreview()}
       </div>
       <div className="layout"> <input name="title" type="text" placeholder="عنوان*" value={this.state.title} onInput={this.handelChange} maxLength="30"/></div>
       <div className="layout"> <textarea name="text" placeholder="توضیخات مورد نیاز را واردنمایید *" value={this.state.text} onInput={this.handelChange} maxLength="150"></textarea></div>
       <div className="layout">
       <DatePicker
        selected={this.state.date}
        onChange={this.handleChangeDate}
        minDate={moment(vthis.props.parent.state.minDate)}
        maxDate={moment(vthis.props.parent.state.maxDate)}
        placeholderText="در روز"
        popperPlacement="auto"
        locale={moment.locale('fa')}
    />
        </div>
       <div className="layout" className="layout" style={{width:"calc(100% - 15px)",display:"inline-block"}}> <DatePicker
        selected={this.state.time}
        onChange={this.handleChangeTime}
        showTimeSelect
        showTimeSelectOnly
        placeholderText="در ساعت"
        timeIntervals={5}
        timeFormat="HH:mm"
        dateFormat="HH:mm"
        timeCaption="Time"
    /></div>
        <div className="layout" style={{width:"auto",display:"inline-block"}}>
        <button onClick={this.handelClick.bind(this)} style={clickStyle}><i className="fa fa-check"></i></button>
        </div>
       </div>
     )
  }
}   

{/********************
 <div className="layout">
       <DatePicker
          selected={this.state.date}
          onChange={this.handelChangeDate}
          selectsStart
          date={moment().locale('fa')}
          minDate={moment(vthis.state.count<9?vthis.props.parent.state.minDate:vthis.props.parent.state.maxDate)}
          locale="fa"
          fixedHeight
          placeholderText="در تاریخ*"
          dateFormat="YYYY-MM-DD"
          required="true"
          name="date"
          popperPlacement="auto"
          />
          </div>
          <div className="layout" style={{width:"calc(100% - 15px)",display:"inline-block"}}><DatePicker
          selected={this.state.time}
          onChange={this.handelChangeTime}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="mm:ss"
          timeCaption="Time"
/>
        </div>
****************************/}