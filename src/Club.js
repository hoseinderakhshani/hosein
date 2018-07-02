import React, { Component } from 'react';
import Sidebar from './section/Sidebar';
import { Link } from 'react-router-dom';
import {DataStatic,StorageData} from './StaticData';
export default class Club extends Component {
    constructor (props) {
        super(props)
        this.state = {
            club: true,
            scroll : true,
            active : false,
            data : '',
        }
        this.scroll=this.scroll.bind(this);
        this.renderPost= this.renderPost.bind(this);   
        this.renderAllPosts = this.renderAllPosts.bind(this);
    }
    scroll(){
        if (window.scrollY >= 185) {
          this.setState({scroll:false})
          } else {
            this.setState({scroll:true})
          }
    }
    renderPost(key) {
        let newPost = this.state.data[key];
         return (  
             <Post post={newPost} id={key}/>                 
         );
    }
     renderAllPosts () {
           const postes = [];
           for (let key in this.state.data.posts) postes.push(this.renderPost(key))
           return postes;
    }
  render() { 
    document.addEventListener("scroll", this.scroll)
    return (
        <div>
          
        <div className="clb-head col-md-12">
        <div className="image" ref="height">
          <div className="hvmr d-flex align-items-center justify-content-center"></div>
          <img src={this.state.data.avatar===null ? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.clubOriginal}/${this.state.data.avatar}`} alt={this.state.data.club_name}/>
        </div>
      </div>
      <div className="container">
       <div className="row justify-content-center">
        <section className="main col-md-8">
          <div className="header">
          <div className="clb-tle">            
                <span onClick={() => this.setState({active: false})} style={this.state.active ? {} : {color:'#0097A7',borderTop:'2px solid #0097A7'}}>پست</span>
                <span onClick={() => this.setState({active: true})} style={this.state.active ? {color:'#0097A7',borderTop:'2px solid #0097A7'} : {}}>تیکت</span>
                </div>
          </div>
          <div className="clb-post">
            <div className="row">
                {this.state.active ? /*this.renderTiket()*/null : this.renderPost()} 
             </div>
         </div>
         </section>
         <Sidebar club={this.state.club} scroll={this.state.scroll}/>
       </div>
      </div>
    </div>  
    );
  }
}
class Post extends Component {
    constructor(props) {
      super(props); 
      this.state ={
      }
    }
      render() {
       return (
        <div className="post col-4">
        <a href="">
         <div className="image">
             <img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg" alt=""/>
             <span><i className="fa fa-pencil"></i></span>
         </div>
         <div className="hvr">
           <span><i className="fa fa-comment"></i> 35</span>                            
           <span><i className="fa fa-heart"></i> 10</span>
         </div>
        </a> 
     </div>
       )
    }
}
/*class Tiket extends Component {
    constructor(props) {
      super(props); 
      this.state ={
      }
    }
      render() {
       return (
        <div className="post col-4">
        <Link to="/tiket">
            <div className="image">
                <img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg" alt=""/>
                <span><i className="fa fa-ticket"></i></span>
            </div>
            <div className="hvr">
                <span>25000 <i className="fa fa-ticket"></i></span>
            </div>
            </Link> 
         </div> 
       )
    }
}*/