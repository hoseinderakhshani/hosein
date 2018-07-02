import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
export default class MangerRoleSelect extends Component {
  constructor(props) {
    super(props);
    this.state={
      role :[],
      isSelect:"",
    }  
    this.renderListManger= this.renderListManger.bind(this);   
    this.renderAllListMangers = this.renderAllListMangers.bind(this); 
    this._toggleclass = this._toggleclass.bind(this); 
  }
  _toggleclass(isSelect){
    this.setState({isSelect:isSelect})
}
  renderListManger(key) {
    let data = this.props.manger[key];
     return (  
         <ListManger manger={data} id={key} toggleClass={this._toggleclass} isSelect={this.state.isSelect}/>                 
     );
 }
 renderAllListMangers() {
       const datas = [];
       for (let key in this.props.manger) datas.push(this.renderListManger(key))
       return datas;
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
         <li onClick={()=>tab("")} style={{cursor :"pointer"}}><i className="fa fa-circle"></i></li>
         <li onClick={()=>tab("two")} style={{cursor :"pointer"}}><i className="fa fa-circle"></i></li>
         <li onClick={()=>tab("three")} style={{color:"#00BCD4",cursor :"pointer"}}><i className="fa fa-circle"></i></li>
         <li><i className="fa fa-circle"></i></li>
       </ul>
       </div>
       <div className="next" onClick={()=>tab("four")}><i className="fa fa-angle-left"></i></div>
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
  }
    render() {
      const toggleClass = this.props.toggleClass
     return ( 
      <div className="slctmagr col-6" key={this.props.id}>
         <div className="image">
         <img src={this.props.manger.avatar===null? "/images/noimage.jpg" : `http://localhost/payebash5.5/storage/users/avatar/medium/${this.props.manger.avatar}`} />
        </div>
        <h4>{this.props.manger.manager_name}</h4>
        <button className="slctusr" style={this.props.isSelect==this.props.manger.manager_name ? {display:"none"}:null} onClick={()=>toggleClass(this.props.manger.manager_name)}><span>انتخاب</span></button>
        {this.props.isSelect==this.props.manger.manager_name ? <label>
          <input type="text" placeholder="نوشتن نقش"/>
          <span className="esc"><i className="fa fa-check"></i></span>
          </label>
          :null}
       </div>
     )  
}
}
