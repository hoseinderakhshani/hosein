import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './section/Sidebar';
import AddPost from './AddPost';
import AddClub from './AddClub';
import SinglePost from './section/SinglePost';
import axios from 'axios';
import {DataStatic,StorageData} from './StaticData';
export default class MyProfile extends Component {
    constructor (props) {
        super(props)
        this.state = {
            active : false,
            profile: true,
            token :  localStorage.getItem('token'),
            data : '',
            actselect:'',
        }
       this.renderPost= this.renderPost.bind(this);   
       this.renderAllPosts = this.renderAllPosts.bind(this);
       this.renderclub= this.renderclub.bind(this);   
       this.renderAllclubs = this.renderAllclubs.bind(this);
       this.togglePopup=this.togglePopup.bind(this);
    }
    componentDidMount(){
        axios.get(`${DataStatic.domainIp}/public/api/v1/user/self?api_token=${this.state.token}`,)
        .then((response)=> {
         this.setState({data: response.data})
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
   renderPost(key) {
       let newPost = this.state.data.posts[key];
        return (  
            <Post post={newPost} key={key} username={this.state.data.username}/>                 
        );
    }
    renderAllPosts () {
          const postes = [];
          for (let key in this.state.data.posts) postes.push(this.renderPost(key))
          return postes;
    }
    renderclub(key) {
        let newClub = this.state.data.clubs[key];
         return (  
             <Club club={newClub} key={key}/>                 
         );
    }
    renderAllclubs() {
           const clubs = [];
           for (let key in this.state.data.clubs) clubs.push(this.renderclub(key))
           return clubs;
    }  
  render() {
    return (
      <div>
        <div className="container">
        <div className="row justify-content-center">
            <section className="main col-md-8">
             <div className="header">
              <div className="clb-tle">            
                <span onClick={() => this.setState({active: false})} style={this.state.active ? {} : {color:'#0097A7',borderTop:'2px solid #0097A7'}}>پست</span>
                <span onClick={() => this.setState({active: true})} style={this.state.active ? {color:'#0097A7',borderTop:'2px solid #0097A7'} : {}}>کلوپ</span>
                </div>
            </div>
                  <div className="post-main col-md-12 p-0" style={this.state.active ? {display:'none'} : {display:'block'}}>
                    <div className="row">
                        <div className="post col-md-4" onClick={()=>this.togglePopup("addpost")}>
                           <div className="plus">
                           <span><i className="fa fa-plus"></i></span>
                           </div>
                         </div>
                            {this.renderAllPosts()}
                    </div>                    
                   
                </div> 
                  <div className="cloob-main col-md-12 p-0" style={this.state.active ? {display:'block'} : {display:'none'}}>
                   <div className="row">
                   <div className="post cloob col-12" onClick={()=>this.togglePopup("addclub")}>
                       <div className="plus">
                             <span><i className="fa fa-plus"></i></span>
                           </div> 
                    </div>
                    {this.renderAllclubs()}
                   </div>
                  </div>
            </section>
            <Sidebar Myprfle={this.state.profile} data={this.state.data} token={this.state.token}/>
        </div>
        
    </div>  
    {this.state.actselect==="addpost" ? <AddPost close={()=>this.togglePopup("")} token={this.state.token}/>: null}
    {this.state.actselect==="addclub" ? <AddClub close={()=>this.togglePopup("")} token={this.state.token} username={this.props.match.params.user2} />: null}
    {/*this.state.addclub ? <AddClub close={this.togglePopup.bind(this)}/>: null*/}
    </div>
    );
  }
}
class Post extends Component {
    constructor(props) {
      super(props); 
      this.state ={
        datasinglepost : {
          data: this.props.post.id
        }
      }
    }
      render() {
       return (
       this.props.post.photo===null ? <div className="post col-md-4">
       <div className="texts">
       <div className="txt">
       <p> 
         {this.props.post.body}
       </p>
       </div>
      <div className="bottom">
       <span><Link to={{pathname: `/post/${this.props.post.id}-by=${this.props.username}`}}>بیشتر</Link></span>
       <div>
       <span><Link to={{pathname: `/post/${this.props.post.id}-by=${this.props.username}`}}><i className="fa fa-comment"></i>{this.props.post.comments}</Link></span>                            
       <span><Link to={{pathname: `/post/${this.props.post.id}-by=${this.props.username}`}}><i className="fa fa-heart"></i>{this.props.post.likes}</Link></span>
       </div>
       </div>
       </div>
     </div>
     : 
       <div className="post col-md-4">
         <div className="image">
         <img src={this.props.post.photo===null? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.postMedium}/${this.props.post.photo}`} />
         </div>
         <div className="texts ipni">
       <div className="txt">
       <p> 
         {this.props.post.body}
       </p>
       </div>
      <div className="bottom">
       <span><Link to={{pathname: `/post/${this.props.post.id}-by=${this.props.username}`}}>بیشتر</Link></span>
       <div>
       <span><Link to={{pathname: `/post/${this.props.post.id}-by=${this.props.username}`}}><i className="fa fa-comment"></i>{this.props.post.comments}</Link></span>                            
       <span><Link to={{pathname: `/post/${this.props.post.id}-by=${this.props.username}`}}><i className="fa fa-heart"></i>{this.props.post.likes}</Link></span>
       </div>
       </div>
       </div>
     </div>
       )
    }
}
class Club extends Component {
    constructor(props) {
      super(props); 
    }
      render() {
       return (
       <div className="post cloob col-12">
             <Link to={`/myclub/${this.props.club.club_name}`}>
            <div className="image">
            <img src={this.props.club.avatar===null? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.clubOriginal}/${this.props.club.avatar}`}/>
            </div>
            <div className="hvr">
            <span>{this.props.club.club_name}</span>
            </div>
            </Link>
            </div>
       )
    }
  }