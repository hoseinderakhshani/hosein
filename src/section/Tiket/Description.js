import React, { Component } from 'react';
export default class Description extends Component {
      constructor(props) {
        super(props); 
        this.state={
            title:'',
            text:'',
            imagePreviewUrl:''
        }
        this.handelChange = this.handelChange.bind(this)
       }
       handelChange(event){
         if(event.target.value.length>0){
          event.target.value.length<event.target.maxLength? this.setState({[event.target.name]:event.target.value}):""
          }
          else this.setState({[event.target.name]:''})
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
            return <div className="imgpre" onMouseOver={()=>this.setState({imagePreviewacc: true})} onClick={()=>this.setState({imagePreviewUrl: null,file:''})}>{this.state.imagePreviewacc ? <span className="close"><i className="fa fa-times"></i></span> : null }<img src={imagePreviewUrl}/></div>
        } else {
          null
        }
      }
      handelSubmit(){
        var regchec= []
         const x = document.querySelectorAll('.check-reg [required]')
         for(let i=0;i<x.length;i++){
           if(x[i].value.length<=0) {
            x[i].classList.add("errorcheck") 
           }
           else {
            regchec.push(i)   
           }
          }
          if(x.length===regchec.length){
            if(this.state.file==='')
            var description ={}
            else var description ={image:this.state.file}
            for(let i=0;i<x.length;i++){
              description[x[i].name]=x[i].value
            }
            this.props.parent.setState({description})
            this.props.togglePage("two")
          } 
      }
        render() {
         return (
          <div className="col-12">
          <div className="row p-1 check-reg">
              <div className="image col-5">
              <label>
              <input className="fileInput" type="file" accept=".jpg, .png, .jpeg, .bmp, .tif, .tiff|images/*" style={{display:"none"}} onChange={(e)=>this._handleImageChange(e)}/>
              <span>اضافه کردن عکس</span>
              </label>
              {this.renderPreview()}
              </div>
              <div className="txt col-7" className="txt col-7">
               <div className="title"><input name="title" placeholder="عنوان..." value={this.state.title} onInput={this.handelChange} maxLength="45" required/></div>
               <div className="text">
                  <textarea placeholder="متن خود را وارد نماید..." name="text" maxLength="9999" value={this.state.text} onInput={this.handelChange} required/>
               </div>
              </div>
              <div className="footer col-12">
              <div className="description">اطلاعات</div>
              <div className="page">
              <ul>
                <li style={{color:"#00BCD4"}}><i className="fa fa-circle"></i></li>
                <li><i className="fa fa-circle"></i></li>
                <li><i className="fa fa-circle"></i></li>
                <li><i className="fa fa-circle"></i></li>
              </ul>
              </div>
              <button className="next" onClick={this.handelSubmit.bind(this)}><i className="fa fa-angle-left"></i></button>
              </div>
             </div>
             </div>
         )
      }
}