import React, { Component } from 'react';
import axios from 'axios';
import {DataStatic} from './StaticData';
export default class AddPost extends Component {
  constructor (props) {
    super(props)
        this.state={
          pin : false,
          imagePreviewUrl: '',
          file : '',
          text :'',
          isLoading:false,
          imagePreviewacc:true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.renderPreview= this.renderPreview.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
        let title = event.target.getAttribute('data-name');
        let obj = {};
        obj[title] = event.target.value;
        // this.state[title] = event.target.value;
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
          });}
        reader.readAsDataURL(file)
      }
      renderPreview(){
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          return  <div className="imgpre" onMouseOver={()=>this.setState({imagePreviewacc: true})} onClick={()=>this.setState({imagePreviewUrl: null})}>{this.state.imagePreviewacc ? <span className="close"><i className="fa fa-times"></i></span> : null }<img src={imagePreviewUrl}/></div>
        } else {
          null
        }
      }
      handleSubmit = event => {
        this.setState({isLoading:true})
        event.preventDefault();
        var datapost = new FormData();
        let data = this.state;
        var querystring = require('querystring');
        datapost.append('body',this.state.text)
        datapost.append('media',this.state.file,this.state.file.name)
        this.props.name!==undefined?datapost.append("club",this.props.name):null
        axios({
          method: 'post',
          url: `${DataStatic.domainIp}/public/api/v1/post/create?api_token=${this.props.token}`,
          data: datapost,
          config: { headers: {'Content-Type': 'multipart/form-data' },"processData": false,
          "contentType": false,
          "mimeType": "multipart/form-data"
          }
      })
        .then((response)=> {
           this.setState({isLoading:false})
           this.props.close("")
           setTimeout(()=>
           window.location.reload()
          ),500
        })
        .catch( (error)=> {
          return(
            <div className="errorserver">
                <span>مشکلی از سمت سرور</span>
            </div>
          )
        });
  }
  handelclose(e){
    if(e.target=== this.refs.close){
       this.props.close("")
    }else null
   }
      render() {
       
        return (
          <div className="bgadd" ref="close" style={{minHeight: window.innerHeight}} onClick={this.handelclose.bind(this)}>
          <button onClick={this.props.close} className="close"><i className="fa fa-times"></i></button>
          {this.state.isLoading? <div style={{width:"50px",height:"50px"}} class="loading"></div>:<div className="box add-post row" style={{width:"85"+"%"}}>
          <div className="addfile col-md-5 p-0" style={{height:"auto",marginBottom:0}}>
                 <label>
                      <input className="fileInput" type="file"  accept=".jpg, .png, .jpeg, .bmp, .tif, .tiff|images/*" style={{display:"none"}} onChange={(e)=>this._handleImageChange(e)}/>
                      <span>اضافه کردن کاور</span>
                  </label>
                  {this.renderPreview()}
                </div>
          <div className="txt col-md-7">
          <div className="text">
          <textarea placeholder="توضیحات باشگاه خود را وارد نمایید..." value={this.state.text} data-name="text"  onChange={this.handleChange}/>
          </div>
          <div className="footer">
           <span className="accept" onClick={this.handleSubmit}>
           <i className="fa fa-check"></i> 
          </span> 
          </div>
          </div>
          </div>}
          </div>

           )
      }
    }