import React, { Component } from 'react';
import axios from 'axios';
import {DataStatic} from '../../StaticData';
export default class Description extends Component {
      constructor(props) {
        super(props); 
        this.state={
          statelist: [],
        }
        this.renderStateList= this.renderStateList.bind(this);
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
    render() {
      const tab = this.props.tab;
      const errors = this.props.parent.errors;
      return (
        <div>
        <div className="descriptiontwoo col-12">
        <div className="row">
          <div className="col-6 mb-3">
          <label>تاریخ و ساعت شروع <span>*</span></label>
          <div className="row">
          <div className="col-9"><input type="date"  dataName="dateStart" className={errors.includes('dateStart') ? 'error' : ''} onChange={this.props.value} maxLength="11"/></div>
          <div className="col-3"><input type="time" dataName="timeStart" className={errors.includes('timeStart') ? 'error' : ''} onChange={this.props.value} maxLength="11"/></div>
          </div>
          </div>
          <div className="col-6 mb-3">
          <label>تاریخ و ساعت پایان <span>*</span></label>
          <div className="row">
          <div className="col-9"><input type="date" dataName="dateEnd" className={errors.includes('dateEnd') ? 'error' : ''} onChange={this.props.value} maxLength="11"/></div>
          <div className="col-3"><input type="time" dataName="timeEnd" className={errors.includes('timeEnd') ? 'error' : ''} onChange={this.props.value} maxLength="11"/></div>
          </div>
          </div>
          <div className="col-12 mb-3">
          <label>استان و شهر<span>*</span></label>
          <div className="row">
          <div className="col-6">
          <select onClick={this.renderStateList} dataName="state" className={errors.includes('state') ? 'error' : ''} onChange={this.props.value} maxLength="99">
          <option className="hidden" value="" hidden>استان خود را وارد نمایید..</option>
          {this.state.statelist.map((name,key) =>
            <option value={name} key={key}>{name}</option>
          )}
          </select>
          </div>
          <div className="col-6"><input type="text" placeholder="شهر خود را انتخاب کنید..."  dataName="city" className={errors.includes('city') ? 'error' : ''} onChange={this.props.value} maxLength="85"/></div>
          </div>
          </div>   
          <div className="col-12 mb-3">
          <label>آدرس<span>*</span></label>
          <div className="row">
          <div className="col-12"><input type="text" placeholder="آدرس دقیق خود را وارد کنید..." dataName="location" className={errors.includes('location') ? 'error' : ''} onChange={this.props.value} maxLength="140"/></div>
          </div>
          </div> 
          <div className="col-3 mb-3">
          <label>محدودیت (نفر)<span>*</span></label>
          <div className="row">
          <div className="col-12"><input type="number" placeholder="تعداد افرادی که می توانن شرکت کنن..." style={{textAlign:"center"}} dataName="limit" className={errors.includes('limit') ? 'error' : ''} onChange={this.props.value} maxLength="9999"/></div>
          </div>
          </div>  
          <div className="col-6 mb-3">
          <label className={errors.includes('filter') ? 'error mb-3' : 'mb-3'}>فیلتر<span>*</span></label>
          <div className="row">
          <label className="col-3"><input onChange={this.props.value} dataName="filter" type="radio" name="filter" value="public" maxLength="9999"/>عمومی</label>
          <label className="col-3"><input onChange={this.props.value} dataName="filter" type="radio" name="filter" value="men" maxLength="9999"/>مرد</label>
          <label className="col-4"><input onChange={this.props.value} dataName="filter" type="radio" name="filter" value="request" maxLength="9999"/>درخواستی</label>
          </div>
          </div>   
          <div className="col-3 mb-3">
          <label>قیمت (تومان)<span>*</span></label>
          <div className="row">
          <div className="col-12"><input type="number" placeholder="چند خودتو میفروشی" style={{textAlign:"center"}} dataName="price" className={errors.includes('price') ? 'error' : ''} onInput={this.props.value} maxLength="999999999999999999999"/></div>
          </div>
          </div>       
        </div>
        </div>
        <div className="footer col-12">
              <div className="description">اطلاعات (2)</div>
              <div className="page">
              <ul>
                <li onClick={()=>tab("")}><i className="fa fa-circle"></i></li>
                <li onClick={()=>tab("two")} style={{color:"#00BCD4",cursor :"pointer"}}><i className="fa fa-circle"></i></li>
                <li><i className="fa fa-circle"></i></li>
                <li><i className="fa fa-circle"></i></li>
              </ul>
              </div>
              <div className="next" onClick={()=>tab("three")}><i className="fa fa-angle-left"></i></div>
            </div>
        </div>
         )
      }
}
 /*<label className="col-6">
             <span>شروع :</span>
             <input type="date"/>
             <input type="time" placeholder="Time"/>
           </label>
           <label className="col-6">
             <span>پایان :</span>
             <input type="date"/>
             <input type="time" placeholder="Time"/>
           </label>
           <label className="col-6">استان :
          <select onClick={this.renderStateList} ref="statelist">
          <option className="hidden" value="" hidden>استان خود را وارد نمایید..</option>
          {this.state.statelist.map((name,key) =>
            <option value={name} >{name}</option>
          )}
          </select>
          </label>
          <label className="col-6">شهر :
          <input type="text" placeholder="شهر خود را وارد نمایید..." value={this.props.data.city} dataName="city" onChange={this.props.value}/>
          </label>
          <label className="col-12">آدرس :
          <input type="text" placeholder="آدرس خود را وارد نمایید..." value={this.props.data.location} dataName="location" onChange={this.props.value}/>
          </label>
          <label className="col-3">محدودیت (نفر) :
          <input type="number" value={this.props.data.limit} dataName="limit" onChange={this.props.value} style={{textAlign:"center",margin:"0"}}/>
          </label>
          <label className="col-5">فیلتر :
          <label onClick={()=>filterTiket("public")}><input type="radio" name="filter" value="public"/>عمومی</label>
          <label onClick={()=>filterTiket("men")}><input type="radio" name="filter" value="men"/>مرد</label>
          <label onClick={()=>filterTiket("request")}><input type="radio" name="filter" value="request"/>درخواستی</label>
          </label>
          <label className="col-4">قیمت (تومان) :
            <input type="number" onInput={this.numberSeprate} style={{textAlign:"center",margin:"0"}}/>
          </label>
          <div className="footer col-12">
              <div className="description">اطلاعات (2)</div>
              <div className="page">
              <ul>
                <li onClick={()=>tab("")}><i className="fa fa-circle"></i></li>
                <li onClick={()=>tab("two")} style={{color:"#00BCD4",cursor :"pointer"}}><i className="fa fa-circle"></i></li>
                <li><i className="fa fa-circle"></i></li>
                <li><i className="fa fa-circle"></i></li>
              </ul>
              </div>
              <div className="next" onClick={()=>tab("three")}><i className="fa fa-angle-left"></i></div>
            </div>*/
        