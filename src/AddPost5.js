import React, { Component } from 'react';
import axios from 'axios';
export default class AddPost extends Component {
  constructor (props) {
    super(props)
        this.state={
          pin : false,
          file: '',
          imagePreviewUrl: '',
          title: '',
          text : '',
         /* location : '',*/ 
        }
        /*this.renderPin= this.renderPin.bind(this);   */
        /*this.toggleClass= this.toggleClass.bind(this);   */
        this.renderPreview= this.renderPreview.bind(this);
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
      _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
        reader.readAsDataURL(file)
      }
      renderPreview(){
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            return <img src={imagePreviewUrl}/>
        } else {
          null
        }
      }
      handleSubmit = event => {
        event.preventDefault();
      var querystring = require('querystring');
        axios.post(`http://localhost/payebash5.5/public/api/v1/post/create?api_token=${this.props.token}`,
            querystring.stringify({
                    body: this.state.title, 
                    media: this.state.file, 
                    event : this.state.text,
            }),
            {
              headers: { 
                "Content-Type": "application/x-www-form-urlencoded",
              }
            })
            .then((response)=> {
              if(response.data === 0){
                alert("Wrong Inputs :)");
              }else{
                console.log(response)
              }
            })
            .catch( (error)=> {
              alert("something went Wrong")
            });
       /* alert("text: "+this.state.text+"\nloc: "+ this.state.location+"\n title: "+this.state.title);
          console.log(this.state.file)*/
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
          {this.renderPreview()}
          <label>
              <input className="fileInput" type="file" style={{display:"none"}} onChange={(e)=>this._handleImageChange(e)}/>
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