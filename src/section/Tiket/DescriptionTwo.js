import React, { Component } from 'react';
import axios from 'axios';
import {DataStatic} from '../../StaticData';
import DatePicker from 'react-datepicker';
import moment from 'moment-jalaali'

export default class DescriptionTwo extends Component {
      constructor(props) {
        super(props); 
        this.state={
          statelist: [],
          filter:'',
        }
        this.handelChangeDate = this.handelChangeDate.bind(this);
        this.renderStateList= this.renderStateList.bind(this);
        this.handelChange = this.handelChange.bind(this)
        }
       renderStateList(){
        axios.get(`${DataStatic.domainIp}/public/api/v1/state`,)
      .then((response)=> {
        var data = [...response.data];
        this.setState({statelist: data})
      })
      .catch((err)=> {
        alert("something went Wrong",err)
      });
      }
      handelChangeDate(ev){
        const name={};
        name[ev.target.name]=ev.target.value
        this.setState(name);
        ev.target.style.color = "#212121"
        ev.target.style.borderBottom = "1px solid #bdbdbd"
        if(ev.target.value.length===ev.target.maxLength){
         if(ev.target.name==="EDateYear"|| ev.target.name==="SDateYear") ev.target.blur()
          else ev.target.nextElementSibling.focus()
        }
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
          var dateStart=parseInt(this.state.SDateYear)+"/"+parseInt(this.state.SDateMonth)+"/"+parseInt(this.state.SDateDay)+" "+parseInt(this.state.STimeHour)+":"+parseInt(this.state.STimeMin)+":00"
          var dateEnd=parseInt(this.state.EDateYear)+"/"+parseInt(this.state.EDateMonth)+"/"+parseInt(this.state.EDateDay)+" "+parseInt(this.state.ETimeHour)+":"+parseInt(this.state.ETimeMin)+":00"
          const x = document.querySelectorAll('.check-reg [required]')
          var trALl =0;
          for(let i=0;x.length-1>=i;i++){
             if(x[i].value.length===0) {
             x[i].style.borderBottom = "1px solid #f00"
             x[i].style.color = "#f00"
           }else{
            x[i].style.borderBottom = "1px solid #bdbdbd"
           x[i].style.color = "#212121"
           const name ={};
           name[x[i].name]= x[i].value
           this.props.parent.setState(name)
           this.props.parent.setState({dateStart:dateStart,dateEnd:dateEnd})
           trALl= trALl+1
          }
        }
          if(this.state.filter.length<=0){
            document.getElementById("check").style.color = "#f00";
          }else {
            document.getElementById("check").style.color = "#212121";
            this.props.parent.setState({filter:this.state.filter})
            trALl= trALl+1
          }
          console.log("mb"+trALl)
          if(trALl===16){
            this.props.togglePage("three")
          }else null

      }
      render() { 
      return (
        <div>
        <div className="descriptiontwoo col-12 check-reg">
        <div className="row">
          <div className="col-6 mb-3 time">
          <label>تاریخ و ساعت شروع *</label>
          <input placeholder="00" type="number" min="0" max="59" name="STimeMin" onChange={this.handelChangeDate} maxLength="2" required /> : <input placeholder="24" type="number" min="0" max="24" name="STimeHour" maxLength="2" onChange={this.handelChangeDate} required />
          <input placeholder="5" type="number" min="1" max="31" name="SDateDay" maxLength="2" onChange={this.handelChangeDate} required /> / <input placeholder="07" type="number" min="1" max="12" name="SDateMonth" maxLength="2" onChange={this.handelChangeDate} required /> / <input placeholder="1397" type="number" min="1397" max="9999" name="SDateYear" maxLength="4" onChange={this.handelChangeDate} required />
          </div>
          <div className="col-6 mb-3 time">
          <label>تاریخ و ساعت پایان *</label>
          <input placeholder="00" type="number" min="0" max="59" name="ETimeMin" maxLength="2" onChange={this.handelChangeDate} required /> : <input placeholder="24" type="number" min="0" max="24" name="ETimeHour" maxLength="2" onChange={this.handelChangeDate} required />
          <input placeholder="15" type="number" min="1" max="31" name="EDateDay" maxLength="2" onChange={this.handelChangeDate} required /> / <input placeholder="08" type="number" min="1" max="12" name="EDateMonth" maxLength="2" onChange={this.handelChangeDate} required /> / <input placeholder="1397" type="number" min="1397" max="9999" name="EDateYear" maxLength="4" onChange={this.handelChangeDate} required />
          </div>
          <div className="col-12 mb-3">
          <label>استان و شهر *</label>
          <div className="row">
          <div className="col-6">
          <select onClick={this.renderStateList} name="state" onChange={this.handelChange} maxLength="500" required>
          <option className="hidden"  hidden>استان خود را وارد نمایید..</option>
          {this.state.statelist.map((name,key) =>
            <option value={name} key={key}>{name}</option>
          )}
          </select>
          </div>
          <div className="col-6"><input type="text" placeholder="شهر خود را انتخاب کنید..." name="city" maxLength="250" onChange={this.handelChange} required /></div>
          </div>
          </div>   
          <div className="col-12 mb-3">
          <label>آدرس *</label>
          <div className="row">
          <div className="col-12"><input type="text" placeholder="آدرس دقیق خود را وارد کنید..." name="location" maxLength="800" onChange={this.handelChange} required /></div>
          </div>
          </div> 
          <div className="col-3 mb-3">
          <label>محدودیت (نفر) *</label>
          <div className="row">
          <div className="col-12"><input type="number" placeholder="10" style={{textAlign:"center"}} name="limit" min="0" maxLength="9999999" onChange={this.handelChange} required /></div>
          </div>
          </div>  
          <div className="col-6 mb-3">
          <label className="mb-3" id="check">فیلتر *</label>
          <div className="row">
          <label className="col-3"><input type="radio" name="filter" value="public" maxLength="45" onChange={this.handelChange} />عمومی</label>
          <label className="col-3"><input type="radio" name="filter" value="men" maxLength="45" onChange={this.handelChange} />مرد</label>
          <label className="col-4"><input type="radio" name="filter" value="request" maxLength="45" onChange={this.handelChange} />درخواستی</label>
          </div>
          </div>   
          <div className="col-3 mb-3">
          <label>قیمت (تومان) * </label>
          <div className="row">
          <div className="col-12"><input type="number" placeholder="2500" style={{textAlign:"center"}} name="price" min="0" maxLength="99999999999" onChange={this.handelChange} required /></div>
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