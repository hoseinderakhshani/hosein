import React, { Component } from 'react';
import axios from 'axios';

export default class AddPost extends Component {
  constructor (props) {
    super(props)
        this.state={
          pin : false,
          imgae: null,
          title: '',
          text : '',
         /* location : '',*/ 
        }
        /*this.renderPin= this.renderPin.bind(this);   */
        /*this.toggleClass= this.toggleClass.bind(this);   */
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       /* console.log("prve",this.state.imagePreviewUrl,"file",this.state.file)*/
      }
     /* toggleClass() {
        const currentState = this.state.pin;
        this.setState({pin: !currentState})
      }*/
      /*renderPin(){
        if(this.state.pin ===true){
          return (
          <div className="pin">
          <textarea  placeholder="موقعیت مکانی خود را وارد کنید : کرج،خانه هنرمندان" value={this.state.location} data-name="location" onChange={this.handleChange}/>
          </div>
          )
      }
      else null 
      }*/
      handleChange(event) {
        let title = event.target.getAttribute('data-name');
        let obj = {};
        obj[title] = event.target.value;
        this.setState(obj);
      }
      imageHandler= event=>{
        this.setState({image:event.target.files[0]})
      }
      handleSubmit =function(){

    
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.status == 200 && req.readyState == 4) {
                handler(req.responseText, form.elements, form);
            } else if (req.status != 200 && req.readyState == 4) {
                console.error('Ajax Request Failed');
            }
        };
    
        var prepared = new FormData(document.getElementById());
        req.open('POST', action);
        req.setRequestHeader("Cache-Control", "no-cache");
        req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        req.setRequestHeader('X-CSRF-TOKEN', O("#csrf-token")[0].getAttribute('content'));
        req.send(prepared);
    
        //prevent form submition
        return false;
      
    }
      render() {
        
        return (
          <div>
          {/*
          <section className="bgadd" style={{minHeight: window.innerHeight}}>
          <div className="add-post row">
          <div className="image col-3">
          <img src="/images/noimage.jpg"/>
          </div>
          <div className="col-"></div>
              <div class="title"><input value={this.state.title} data-name="title" onChange={this.handleChange} placeholder="عنوان..." min="5" max="25"/></div>
              <div className="text">
                  <textarea placeholder="متن خود را وارد نماید..." value={this.state.value} data-name="text" onChange={this.handleChange}/>
              </div>
              <div className="footer">
                 <div className="d-flex">
                   <span onClick={this.toggleClass}><i className="fa fa-map-marker"></i></span>
                      {this.renderPin()}
                   <label>
                      <input className="fileInput" type="file"  onChange={(e)=>this._handleImageChange(e)} />
                      <span><i className="fa fa-paperclip"></i></span>
                  </label>   
                  <ul className="image">
                      {this.renderPreview()}
                  </ul>  
                 </div> 
                  <div className="accept">
                      <button onClick={this.handleSubmit}><i className="fa fa-check"></i></button>
                      <button onClick={this.props.close}><i className="fa fa-times"></i></button>
                  </div>   
              </div>
          </div>
      </section>
          */}
          <div className="bgadd" style={{minHeight: window.innerHeight}}>
          <button onClick={this.props.close} className="close"><i className="fa fa-times"></i></button>
          <div className="box add-post row" style={{width:"85"+"%"}}>
          <div className="image col-md-5">
          {/*this.renderPreview()*/}
          <label>
              <input className="fileInput" type="file" style={{display:"none"}} onChange={this.imageHandler}/>
              <span>اضافه کردن عکس</span>
          </label>
          </div>
          <div className="txt col-md-7">
          <div className="title"><input value={this.state.title} data-name="title" onChange={this.handleChange} placeholder="عنوان..." min="5" max="25"/></div>
          <div className="text">
                <textarea placeholder="متن خود را وارد نماید..." value={this.state.value} data-name="text" onChange={this.handleChange}/>
          </div>
          <div className="footer">
          {/* <span onClick={this.toggleClass}><i className="fa fa-map-marker"></i></span> */}
          {/*this.renderPin()*/}
           <span className="accept" onClick={this.handleSubmit}>
           <i className="fa fa-check"></i> 
          </span> 
          </div>
          </div>
          </div>
          </div>


          </div>
           )
      }
    }