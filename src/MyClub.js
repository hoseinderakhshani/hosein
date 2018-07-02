import React, { Component } from 'react';
import Sidebar from './section/Sidebar';
import { Link } from 'react-router-dom';
import AddPost from './AddPost';
import AddTiket from './AddTiket';
import axios from 'axios';
import {DataStatic,StorageData} from './StaticData';
export default class MyClub extends Component {
    constructor (props) {
        super(props)
        this.state = {
            club: true,
            scroll : true,
            active : false,
            token :  localStorage.getItem('token'),
            data : '',
            actselect:'',
            adminClub:'',
            postsData: '',
        }
        this.scroll=this.scroll.bind(this);
        this.renderPost= this.renderPost.bind(this);   
        this.renderAllPosts = this.renderAllPosts.bind(this);
        this.rendertiket = this.rendertiket.bind(this);
        this.renderAlltikets = this.renderAlltikets.bind(this);
        this.togglePopup=this.togglePopup.bind(this);   
    }
    componentDidMount(){
      axios.get(`${DataStatic.domainIp}/public/api/v1/event/${this.props.match.params.userid}?api_token=${this.state.token}`,)
      .then((response)=> {
       this.setState({data: response.data, adminClub:response.data.managers[0].manager_name})
        
      })
      .catch( (err)=> {
          alert("something went Wrong",err)
      });
    }
    togglePopup(select) {
        this.setState({
          actselect: select,
        });
      }
    scroll(){
        if (window.scrollY >= 180) {
          this.setState({scroll:false})
          } else {
            this.setState({scroll:true})
          }
    }
    renderPost(key) {
      let newPost = this.state.data.posts[key];
      const count = key
      return (  
          <Post post={newPost} clubname={this.state.data.club_name} counter={count} key={count}/>                 
      );
    }
     renderAllPosts () {
      const postes = [];
      for (let key in this.state.data.posts) postes.push(this.renderPost(key))
      return postes;
    }
    rendertiket(key) {
      let newTiket = this.state.data.tickets[key];
       return (  
           <Tiket tiket={newTiket} clubname={this.state.data.club_name} key={key}/>                 
       );
  }
  renderAlltikets() {
         const tikets = [];
         for (let key in this.state.data.tickets) tikets.push(this.rendertiket(key))
         return tikets;
  } 
  render() { 
    document.addEventListener("scroll", this.scroll)
    const valuation=(this.state.adminClub===this.state.data.requested_user)
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
            {this.state.active ? 
            <div className="row">
            {valuation ?<div className="post col-4" onClick={()=>this.togglePopup("addtiket")}>
                <div className="plus">
                   <span><i className="fa fa-plus"></i></span>
                </div>
             </div> :""} 
             {this.renderAlltikets()}
            </div>
            : 
                <div className="row">
                {valuation ? <div className="post col-4" onClick={()=>this.togglePopup("addpost")}>
                  <div className="plus">
                   <span><i className="fa fa-plus"></i></span>
                  </div>
                 </div> 
                 :""}
                   {this.renderAllPosts()}
                </div>
            }
         </div>
         </section>
         <Sidebar myclub={this.state.club} scroll={this.state.scroll} data={this.state.data} valuation={valuation} token={this.state.token}/>
       </div>
      </div>
      {this.state.actselect==="addpost" ? <AddPost close={()=>this.togglePopup("")} token={this.state.token} name={this.state.data.club_name}/>: null}
      {this.state.actselect==="addtiket" ? <AddTiket close={()=>this.togglePopup("")} token={this.state.token} manger={this.state.data.managers} nameClub={this.state.data.club_name}/>: null}
    </div>  
    );
  }
}
class Post extends Component {
    constructor(props) {
      super(props); 
    }
      render() {
       return (
        this.props.post.image===null ? <div className="post col-md-4">
        <div className="texts">
        <div className="txt">
        <p> 
          {this.props.post.content}
        </p>
        </div>
        <div className="bottom">
        <span><Link to={{pathname: `/post/${this.props.post.pid}-by=${this.props.clubname}`}}>بیشتر</Link></span>
        <div>
        <span><Link to={{pathname: `/post/${this.props.post.pid}-by=${this.props.clubname}`}}><i className="fa fa-comment"></i>{this.props.post.cm_numbers}</Link></span>                            
        <span><Link to={{pathname: `/post/${this.props.post.pid}-by=${this.props.clubname}`}}><i className="fa fa-heart"></i>{this.props.post.likes}</Link></span>
        </div>
        </div>
        </div>
        </div>
        : 
        <div className="post col-md-4">
        <Link to={{pathname: `/post/${this.props.post.pid}-by=${this.props.clubname}`}}>
          <div className="image">
          <img src={this.props.post.image===null? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.postMedium}/${this.props.post.image}`} alt={this.props.post.writer}/>
          </div>
          <div className="hvr">
          <span><Link to={{pathname: `/post/${this.props.post.pid}-by=${this.props.clubname}`}}><i className="fa fa-comment"></i>{this.props.post.cm_numbers}</Link></span>                            
          <span><Link to={{pathname: `/post/${this.props.post.pid}-by=${this.props.clubname}`}}><i className="fa fa-heart"></i>{this.props.post.likes}</Link></span>
          </div>
        </Link> 
        </div>
       )
    }
}
class Tiket extends Component {
    constructor(props) {
      super(props); 
      this.state ={
      }
    }
      render() {
       return (
        <div className="post ptiket col-4">
        <Link to={`/ticket/${this.props.tiket.id}${this.props.tiket.name}-by=${this.props.clubname}`}>
            <div className="image">
            <div className="title">{this.props.tiket.name}</div>
            <img src={this.props.tiket.avatar===null ? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.tiketMedium}/${this.props.tiket.avatar}`} alt={this.props.tiket.name}/>
                <span><i className="fa fa-ticket"></i></span>
            </div>
            <div className="hvr">
                <span>{this.props.tiket.price==="free"?"رایگان":this.props.tiket.price} <i className="fa fa-ticket"></i></span>
            </div>
            </Link> 
         </div> 
       )
    }
}