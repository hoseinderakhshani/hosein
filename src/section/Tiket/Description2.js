import React, { Component } from 'react';
import axios from 'axios';
import {DataStatic} from '../../StaticData';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import * as moment from 'jalali-moment';
moment.locale('fa')
export default class Description extends Component {
      constructor(props) {
        super(props); 
        this.state={
          statelist: [],
          startDate:'',
          startEnd:'',
          filter:'',
        }
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.renderStateList= this.renderStateList.bind(this);
        this.handelChange = this.handelChange.bind(this)
        }
       renderStateList(ev){
        axios.get(`${DataStatic.domainIp}/public/api/v1/state`,)
      .then((response)=> {
        var data = [...response.data];
        this.setState({statelist: data})
      })
      .catch((err)=> {
        alert("something went Wrong",err)
      });
      }
      handleChangeStart(date){
        this.setState({
          startDate: date
        });
      }
      handleChangeEnd(date){
        this.setState({
          endDate: date
        });
      }
      handelChange(event){
        if(event.target.name==="state"){
          event.target.style.color = "#212121"
        }
        if(event.target.value.length>0){
         event.target.value.length<event.target.maxLength? this.setState({[event.target.name]:event.target.value}):""
         }
         else this.setState({[event.target.name]:''})
      }
      handelSubmit(){
        var regchec= []
         const x = document.querySelectorAll('.check-reg [required]')
         for(let i=0;i<x.length;i++){
           if(x[i].value.length<=0) {
            x[i].classList.add("errorcheck") 
           }
           else {
            regchec.push(i)   
           }
          }
          if(this.state.filter.length<=0){
               document.getElementById("check").style.color= "#f00"
          }else document.getElementById("check").style.color= "#212121"
          if(x.length===regchec.length && this.state.filter.length>0){
            var descriptionTwo ={filter:this.state.filter}
            for(let i=0;i<x.length;i++){
              descriptionTwo[x[i].name]=x[i].value
            }
            this.props.parent.setState({descriptionTwo:descriptionTwo})
            this.props.togglePage("three")
          } 
      }
      render() {
      return (
        <div>
        <div className="descriptiontwoo col-12 check-reg">
        <div className="row">
          <div className="col-6 mb-3">
          <label>تاریخ و ساعت شروع *</label>
          <DatePicker
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
          placeholderText="تاریخ و ساعت شروع را وارد نمایید"
          popperPlacement="auto"
          locale={moment.locale('fa')}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={5}
          dateFormat="HH:mm  -  YYYY/MM/DD"
          timeCaption="time"
          minDate={moment()}
          required="true"
          name="dateStart"
          />
          </div>
          <div className="col-6 mb-3">
          <label>تاریخ و ساعت پایان *</label>
          <DatePicker
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
          placeholderText="تاریخ و ساعت پایان را وارد نمایید"
          popperPlacement="auto"
          locale={moment.locale('fa')}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={5}
          dateFormat="HH:mm  -  YYYY/MM/DD"
          timeCaption="time"
          required="true"
          name="dateEnd"
          minDate={moment(this.state.startDate)}
          />
          </div>
          <div className="col-12 mb-3">
          <label>استان و شهر *</label>
          <div className="row">
          <div className="col-6">
          <select onClick={this.renderStateList} name="state" onChange={this.handelChange} maxLength="500" required>
          <option className="hidden" value="" hidden>استان خود را وارد نمایید..</option>
          {this.state.statelist.map((name,key) =>
            <option value={name} key={key}>{name}</option>
          )}
          </select>
          </div>
          <div className="col-6"><input type="text" placeholder="شهر خود را انتخاب کنید..." name="city" maxLength="250" onChange={this.handelChange} required/></div>
          </div>
          </div>   
          <div className="col-12 mb-3">
          <label>آدرس *</label>
          <div className="row">
          <div className="col-12"><input type="text" placeholder="آدرس دقیق خود را وارد کنید..." name="location" maxLength="800" onChange={this.handelChange} required/></div>
          </div>
          </div> 
          <div className="col-3 mb-3">
          <label>محدودیت (نفر) *</label>
          <div className="row">
          <div className="col-12"><input type="number" placeholder="10" style={{textAlign:"center"}} name="limit" min="0" maxLength="9999999" onChange={this.handelChange} required/></div>
          </div>
          </div>  
          <div className="col-6 mb-3">
          <label className="mb-3" id="check">فیلتر *</label>
          <div className="row">
          <label className="col-3"><input type="radio" name="filter" value="public" maxLength="45" onChange={this.handelChange}/>عمومی</label>
          <label className="col-3"><input type="radio" name="filter" value="men" maxLength="45" onChange={this.handelChange}/>مرد</label>
          <label className="col-4"><input type="radio" name="filter" value="request" maxLength="45" onChange={this.handelChange} />درخواستی</label>
          </div>
          </div>   
          <div className="col-3 mb-3">
          <label>قیمت (تومان) * </label>
          <div className="row">
          <div className="col-12"><input type="number" placeholder="2500" style={{textAlign:"center"}} name="price" min="0" maxLength="99999999999" onChange={this.handelChange} required/></div>
          </div>
          </div>       
        </div>
        </div>
        <div className="footer col-12">
              <div className="description">اطلاعات (2)</div>
              <div className="page">
              <ul>
                <li onClick={()=>this.props.togglePage("")} style={{cursor :"pointer"}}><i className="fa fa-circle"></i></li>
                <li onClick={()=>this.props.togglePage("two")} style={{color:"#00BCD4",cursor :"pointer"}}><i className="fa fa-circle"></i></li>
                <li><i className="fa fa-circle"></i></li>
                <li><i className="fa fa-circle"></i></li>
              </ul>
              </div>
              <button className="next" onClick={this.handelSubmit.bind(this)}><i className="fa fa-angle-left"></i></button>
            </div>
        </div>
         )
      }
}