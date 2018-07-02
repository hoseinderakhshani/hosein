import React, { Component } from 'react';
export default class Description extends Component {
      constructor(props) {
        super(props); 
       }
        render() {
          const tab = this.props.tab;
         return (
          <div className="col-12">
          <div className="row p-1">
              <div className="image col-5">
              {this.props.preview} 
              <label>
              <input className="fileInput" type="file" style={{display:"none"}} onChange={this.props.uploadImage}/>
              <span>اضافه کردن عکس</span>
              </label>
              </div>
              <div className="txt col-7" className={this.props.parent.regu===""? "regu txt col-7":"txt col-7"}>
               <div className="title"><input value={this.props.parent.title} dataName="title" onChange={this.props.value} maxLength="85" placeholder="عنوان..."/></div>
               <div className="text">
                  <textarea value={this.props.parent.text} ref="text" placeholder="متن خود را وارد نماید..." dataName="text" maxLength="999999" onChange={this.props.value}/>
               </div>
              </div>
              <div className="footer col-12">
              <div className="description">اطلاعات</div>
              <div className="page">
              <ul>
                <li onClick={()=>tab("")} style={{color:"#00BCD4",cursor :"pointer"}}><i className="fa fa-circle"></i></li>
                <li><i className="fa fa-circle"></i></li>
                <li><i className="fa fa-circle"></i></li>
                <li><i className="fa fa-circle"></i></li>
              </ul>
              </div>
              <div className="next" onClick={()=>tab("two")}><i className="fa fa-angle-left"></i></div>
              </div>
             </div>
             </div>
         )
      }
}