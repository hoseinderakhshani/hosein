import React, { Component } from 'react';
import Sidebar from './section/Sidebar';
import {Redirect} from 'react-router-dom';
import {DataStatic,StorageData} from './StaticData';
export default class EditProfile extends Component {
      constructor(){
        super();
        this.state={
          edprof:true,
          sData:{
          userName: localStorage.getItem('userName'),
          avatar : localStorage.getItem('avatar'),
          token : localStorage.getItem('token')
          }
        }
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
           return <div class="avatar"><img  src={imagePreviewUrl}/></div>
        } else {
          return <div class="avatar"><img src={this.state.sData.avatar === null ? "/images/noimage.jpg"  : `${DataStatic.domainIp}/${StorageData.avatarMedium}/${this.state.sData.avatar}`}/></div>
        }
      }
      handleChange(event){
          const obj = {}
          obj[event.target.name] = event.target.value
          this.setState(obj)
      }
      handelSubmit(){

      }
      render() {
        if(this.props.match.params.user===this.state.sData.userName)
        return(
          <div className="container">
          <div className="row justify-content-center">
              <section className="main col-md-8 col-12 row justify-content-center">
                <div className="col-8 editprofile">
                <div className="col-12 mb-3">
                <label className="fileInput">
                <input type="file"  accept=".jpg, .png, .jpeg, .bmp, .tif, .tiff|images/*" style={{display:"none"}} onChange={(e)=>this._handleImageChange(e)}/>
                {this.renderPreview()}
                <span style={{color:"#3897f0",cursor:"pointer"}}>ویرایش عکس</span>
                </label>
                </div>
                <div className="col-12 mb-3 d-flex">
                <label>
                  نام کاربری
                  </label>
                <input type="text" name="username" value={this.state.sData.userName} onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="col-12 mb-3 d-flex">
                <label>
                  نام 
                  </label> 
                <input type="text" name="name" value="میلاد" onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="col-12 mb-3 d-flex">
                <label>
                  ایمیل 
                  </label>
                <input type="text" name="email" value="a@c.com" onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="col-12 mb-3 d-flex">
                <label>
                  تلفن همراه 
                </label>
                <input type="text" name="phone" value="" onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="col-12 mb-3 d-flex">
                <label>
                   جنسیت 
                </label>
                <label>
                  مرد
                <input className="col" type="radio" name="gender" value="male"  onChange={this.handleChange.bind(this)}/>
                </label>
                <label>
                  زن
                <input className="col" type="radio" name="gender" value="female"  onChange={this.handleChange.bind(this)}/>
                </label>
                </div>
                <div className="col-12 mb-3 d-flex">
                <label>
                   رمز عبور 
                </label>
                <input type="password" name="password" onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="col-12 mb-3 d-flex">
                <label>
                    تکرار رمز عبور 
                </label>
                <input type="password" name="passwordtwo" onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="col-12 mb-3 d-flex justify-content-end">
                 <button type="button" onClick={this.handelSubmit.bind(this)}>ویرایش</button>
                </div>
                </div>
              </section>
              <Sidebar edprof={this.state.edprof} Sdata={this.state.sData}/>
          </div>
      </div>  
        )
      else return <Redirect to="/home"/>
      }   
}