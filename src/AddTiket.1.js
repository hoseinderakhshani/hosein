import React, { Component } from 'react';
import Description from './section/Tiket/Description';
import Description2 from './section/Tiket/Description2';
import MangerRoleSelect from './section/Tiket/MangerRoleSelect';
import AddTimeline from './section/Tiket/AddTimeline';
import Axios from 'axios';
import {DataStatic} from './StaticData';
export default class AddTiket extends Component {
  constructor (props) {
    super(props)
        this.state={
          imagePreviewUrl: '',
          actpage:'',
          manger :[],
          role: [],
          errors: [],
          price: "چطوری ایرانی؟"
        }
        this._handleImageChange = this._handleImageChange.bind(this);
        this.renderPreview= this.renderPreview.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.togglepage = this.togglepage.bind(this);
        this.numberSeprate= this.numberSeprate.bind(this);
        this.mangerSelectRole= this.mangerSelectRole.bind(this);
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
            return <img src={imagePreviewUrl} alt="preview" />
        } else {
          null
        }
      }
      handleChange(event) {
        let title = event.target.getAttribute('dataName');
        let obj = {};
        obj[title] = event.target.value;
        let objdel = {};
        objdel[title] = "";
        if(event.target.getAttribute("dataName")==="state"){
          event.target.style.color="#212121";
        }
        if(event.target.value.length>0 && event.target.value.length<event.target.maxLength){
          this.setState(obj);
        }
        else if(event.target.value.length<=0){
          this.setState(objdel);
        }else null
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
    numberSeprate(ev) {
      let evArray = ev.split('');
      let reGeneratedArray = [];
        if(ev.length%3 ==0){
          console.log("if called")
          for(let i = 0; i < (ev.length+(ev.length/3)-1);i++){
            if(i%3 == 0& i!=0){
              reGeneratedArray.push(',')
            }else{
              reGeneratedArray.push(evArray[i-(ev.length/3)-1])
            }
          }
        }else{
        }
      }
      mangerSelectRole(role,name){
        this.setState({manger:name,role:role})
      }
      handelclose(e){
        if(e.target=== this.refs.close){
          this.props.close("")
        }else null
    }
    togglepage(page) {
      if(this.state.actpage===""){
        if(this.state.title!==undefined && this.state.text!==undefined){
          if(this.state.title.length>0 &&this.state.text.length>0){
            this.setState({
              actpage: page,
            });
          }
        }
        else this.setState({regu:""})
      }
      if(this.state.actpage==="two"){
        let {dateStart,timeStart,dateEnd,timeEnd,state,city,location,limit,filter,price}= this.state
        let x = {dateStart,timeStart,dateEnd,timeEnd,state,city,location,limit,filter,price}
        var val = []
        for (let key in x) {
          val.push(x[key])
        }
        var check =[]
        val.forEach((ev)=> {
          if(ev!==undefined && ev.length>0){
              check.push("ok")
          }
      })
      if(check.length===20){
        this.setState({
          actpage: page,
        });
      }else {
        for(let key in x){
          if(x[key]===undefined || x[key].length<0){
            this.state.errors.includes(key)? "": this.state.errors.push(key)
          }else {
            const xyy = this.state.errors.indexOf(key)
            delete this.state.errors[xyy]
          } 
      }
      }
    }
    
      if(this.state.actpage==="three"){
        var datatiket = new FormData();
        
       /* datatiket.append('body',this.state.text)
        datatiket.append('media',this.state.file,this.state.file.name)*/
       /* axios({
          method: 'post',
          url: `${DataStatic.domainIp}/public/api/v1/post/create?api_token=${this.props.token}`,
          data: datapost,
          config: { headers: {'Content-Type': 'multipart/form-data' },"processData": false,
          "contentType": false,
          "mimeType": "multipart/form-data"
          }
      })
        .then((response)=> {
          if(response.data === 0){
            alert("bikhiyal")            
          }else{
            alert("ok")
            console.log(response)
            console.log(this.props.name)
          }
        })
        .catch( (error)=> {
          alert("api error")
        });*/
      }
    }
      render() {
        return (
          <div className="bgadd" ref="close" style={{minHeight: window.innerHeight}} onClick={this.handelclose.bind(this)}>
          <button onClick={this.props.close} ref="funclose" className="close"><i className="fa fa-times"></i></button>
          <div className="box add-tiket row" style={{width:"80%"}}>
          {this.state.actpage===""? <Description parent={this.state} value={this.handleChange} uploadImage={this._handleImageChange} preview={this.renderPreview()} tab={this.togglepage}/>:null}
              {this.state.actpage==="two"? <Description2 parent={this.state} value={this.handleChange} tab={this.togglepage} handleChangeStart={this.handleChangeStart} handleChangeEnd={this.handleChangeEnd}/>:null}
              {this.state.actpage==="three"? <MangerRoleSelect tab={(this.togglepage)} manger={this.props.manger} mangerSelectRoles={this.mangerSelectRole}/>:null}
                {this.state.actpage==="four"? <AddTimeline tab={this.togglepage} token={this.props.token} clubName={this.props.nameClub}/>:null}
          </div>
          <div className="title"></div>
          </div>
           )
      }
}  