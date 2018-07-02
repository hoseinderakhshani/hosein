import React, { Component } from 'react';
import axios from 'axios';
export default class AddClub extends Component {
  constructor (props) {
    super(props)
        this.state={
          about:'',
          title: 'egdgdgd',
          bio : '',
          image: null,
          addmanger:false,
          usrlitbtn: false,
          type:'',
          state:'',
          city:''
        }
        this.renderPreview= this.renderPreview.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleClass= this.toggleClass.bind(this);
        this._toggleClass= this._toggleClass.bind(this);
      }
      handleChange(event) {
        let title = event.target.getAttribute('data-name');
        let obj = {};
        obj[title] = event.target.value;
        // this.state[title] = event.target.value;
        this.setState(obj);
      }
      imageHandler= event=>{
        this.setState({image:event.target.files[0]})
      }
      
      handleSubmit = event => {
        event.preventDefault();
        let data = this.state;
        const imgf = new FormData;
        imgf.append('avatar',data.image,data.image.name)
        var querystring = require('querystring');
        axios.post(`http://localhost/payebash5.5/public/api/v1/event?api_token=${this.props.token}`,
        querystring.stringify({
          filters : 'private',
          name: data.title, 
          city: data.city,
          state: data.state,
          type: data.type,
          bio: data.bio,
          about_team: data.about,
          header : 'hichi',
        }),
        {
          headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
          }
        })
        .then((response)=> {
          if(response.data === 0){
            alert("bikhiyal")
            
          }else{
            alert("ok")
            console.log(response)
          }
        })
        .catch( (error)=> {
          alert("api error")
        });
  }
      toggleClass() {
        const currentState = this.state.addmanger;
        this.setState({addmanger: !currentState})
        
      }
      _toggleClass(){
        const currentState = this.state.usrlitbtn;
        this.setState({usrlitbtn: !currentState})
      }
      renderPreview(){
        if (this.state.image !==null) {
          return <div class="imgpre"><img src={this.state.image.name}/></div>
      } else {
        null
      }
      }
      render() {
        return (
          <div className="bgadd" style={{minHeight: window.innerHeight}} >
          <button onClick={this.props.close} className="close"><i className="fa fa-times"></i></button>
          <div className="box" style={{width:"60"+"%"}}>
              <div className="addclub" style={{padding:5}}>
                <div className="cover">
                 <label>
                      <input className="fileInput" type="file" style={{display:"none"}} onChange={this.imageHandler}/>
                      <span>اضافه کردن کاور</span>
                  </label>
                  {this.renderPreview()}
                </div>
                <div className="d-flex">
                <div className="title col-6 p-0"><input value={this.state.about} data-name="about" placeholder="نام کاربری باشگاه..."  onChange={this.handleChange}/></div>
                <div className="title col-6 p-0"><input value={this.state.title} data-name="title" placeholder="نام باشگاه"  onChange={this.handleChange}/></div>
                </div>
                <div className="bio">
                  <textarea placeholder="توضیحات باشگاه خود را وارد نمایید..." value={this.state.bio} data-name="bio"  onChange={this.handleChange}/>
                </div>
                <div className="col-12">
                <div className="row">
                <div className="title col-4 p-0"><input value={this.state.type} data-name="type" placeholder="دسته بندی را وارد نمایید..."  onChange={this.handleChange}/></div>
                <div className="title col-4 p-0"><input value={this.state.state} data-name="state" placeholder="استان خود را وارد نمایید..."  onChange={this.handleChange}/></div>
                <div className="title col-4 p-0"><input value={this.state.city} data-name="city" placeholder="شهر را وارد نمایید..."  onChange={this.handleChange}/></div>
                </div>
                </div>
                <div className="footer">
                <div className="tourmanger">
                  <span onClick={this.toggleClass} className="touricon"><i className="fa fa-users"></i></span>
                  {this.state.addmanger ? 
                  <div className="mangerlist">
                  <div className="header header mb-3">
                  <div class="col-5 mx-auto">
                  <div class="serachbox">
                  <span><i class="fa fa-search"></i></span>
                  <input type="text" name="serachfollow" placeholder="جستجو..." value=""/>
                  </div>
                  </div>
                  <span class="close" onClick={this.toggleClass}><i class="fa fa-times"></i></span>
                  </div>
                  <div className="col-12">
                  <div className="row">
                  <div className="col-6">
                  <div className="userlist">
                   <div className="image">
                   <img src="/images/noimage.jpg"/>
                   </div>
                   <span className="title">نام کاربر</span>
                   <button className={this.state.usrlitbtn ? "select slctusr" : "slctusr"} onClick={this._toggleClass}><span>انتخاب</span></button>
                   </div> 
                  </div>
                  <div className="col-6">
                  <div className="userlist">
                   <div className="image">
                   <img src="/images/noimage.jpg"/>
                   </div>
                   <span className="title">نام کاربر</span>
                   <button className={this.state.usrlitbtn ? "select slctusr" : "slctusr"} onClick={this._toggleClass}><span>انتخاب</span></button>
                   </div> 
                  </div>
                  <div className="col-6">
                  <div className="userlist">
                   <div className="image">
                   <img src="/images/noimage.jpg"/>
                   </div>
                   <span className="title">نام کاربر</span>
                   <button className={this.state.usrlitbtn ? "select slctusr" : "slctusr"} onClick={this._toggleClass}><span>انتخاب</span></button>
                   </div> 
                  </div>
                  <div className="col-6">
                  <div className="userlist">
                   <div className="image">
                   <img src="/images/noimage.jpg"/>
                   </div>
                   <span className="title">نام کاربر</span>
                   <button className={this.state.usrlitbtn ? "select slctusr" : "slctusr"} onClick={this._toggleClass}><span>انتخاب</span></button>
                   </div> 
                  </div>
                  </div>
                  </div> 
                  </div> 
                  : null
                  }
                  <ul>
                    <li><img src="/images/noimage.jpg"/></li>
                    <li><img src="/images/noimage.jpg"/></li>
                    <li><img src="/images/noimage.jpg"/></li>
                    <li><img src="/images/noimage.jpg"/></li>
                  </ul>
                </div>
                <span className="accept" onClick={this.handleSubmit}>
           <i className="fa fa-check"></i> 
          </span> 
                </div>
              </div>
          </div>
          </div>
           )
      }
    }