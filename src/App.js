import React, { Component } from 'react';
import Sidebar from './section/Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {DataStatic,StorageData} from './StaticData';
import Moment from 'react-moment';
import 'moment-timezone';
Moment.globalLocale = 'fa';
export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            app :true,
            dataUser: [localStorage.getItem('userName'),localStorage.getItem('token')],
            data:'',
        }
        this.renderPost= this.renderPost.bind(this);   
        this.renderAllPosts = this.renderAllPosts.bind(this);
        this.renderClub= this.renderClub.bind(this);   
        this.renderAllClubs = this.renderAllClubs.bind(this);
        this.renderTiket= this.renderTiket.bind(this);   
        this.renderAllTikets = this.renderAllTikets.bind(this);
    }
    componentDidMount(){
        axios.get(`${DataStatic.domainIp}/public/api/v1/home?api_token=${this.state.dataUser[1]}`,)
      .then((response)=> {
       this.setState({data: response.data})
      })
      .catch( (err)=> {
          alert("something went Wrong",err)
      });
    }
    renderPost(key) {
        return (  
            <Post post={this.state.data.posts[key]} token={this.state.dataUser[1]} key={key}/>                 
        );
      }
    renderAllPosts () {
        const postes = [];
        for (let key in this.state.data.posts) postes.push(this.renderPost(key))
        return postes;
      }
    renderClub(key) {
        return (  
            <Post post={this.state.data.club_posts[key]} token={this.state.dataUser[1]} key={key}/>                 
        );
      }
    renderAllClubs () {
        const postes = [];
        for (let key in this.state.data.club_posts) postes.push(this.renderClub(key))
        return postes;
    }
    renderTiket(key) {
        return (  
            <Tiket post={this.state.data.tickets[key]} token={this.state.dataUser[1]} key={key}/>                 
        );
    }
    renderAllTikets () {
        const postes = [];
        for (let key in this.state.data.tickets) postes.push(this.renderTiket(key))
        return postes;
    }  
  render() {
      console.log(this.state.data)
    return (
           <div className="container">
        <div className="row justify-content-center">
            <section className="main col-12 col-md-8">
                <div className="header">
                    <div className="clb-tle"></div>
                </div>
                <div className="content">
                   <div className="row justify-content-center">
                   
                 {/**********************  post  *******************/}
{this.state.data.club_posts===null || this.state.data.posts===null || this.state.data.tickets===0 ? 
<div class="col-12">
<div className="box col-md-10" style={{opacity:"0.4"}}>
<div class="col-md-10" style={{position:"absolute",top:"0",right:"0",height:"100%",zIndex:"999"}}></div>
        <div className="profile col-md-3">
             <div className="image">
             <Link to={`/profile/`}><img src="https://scontent-lga3-1.cdninstagram.com/vp/4b70294ef26ad29343596b058cf7f185/5BEBC424/t51.2885-19/s150x150/29740586_615073335495457_7747543410487066624_n.jpg" alt="noimage"/></Link>
             </div>
             <a href="">tripplus</a>
             <span href="" >2 ساعت پیش</span>
         </div>
         <div className="event col-md-9 p-0">
            <div className="image col-md-4 p-0 float-right">
            <img src="https://i.pinimg.com/236x/5d/c4/ca/5dc4ca18aef3571b8911d7bb799ed71f.jpg" alt="noimage"/>
            </div> 
            <div className="text col-md-8 float-left">
                <div className="d-flex justify-content-between align-items-center"> 
                <span className="title ">گردشگری</span>
                <span className="location">تهران</span>
                </div> 
                <Link to="" className="nclb">کوه نوردی</Link>
                <div className="txt">
                    <p>
                    {/* {this.props.details.about} */}
                    </p>
                </div>
               
            </div>
             <div className="down col-md-8">
                 <span><i className="fa fa-ticket"></i>25,000</span>   
                 {/* <span className="float-left m-0"><i className="fa fa-bookmark"></i></span>   */}
             </div>
         </div>
     </div> 
         <div class="col-md-10" style={{textAlign:"center"}}>
         <span>پستی برای شما موجود نمی باشد. شاید به این دلیل میباشد که شما دوستی ندارید</span><br/><br/>
         <span>شما می توانید با <Link to="/serach" style={{color:"#FFC107"}}>جستجو</Link> کردن دوست یا باشگاه برای خود بیابید.</span>
         </div>
         </div>
         :
         <div className="col-12">
         {this.renderAllPosts()}
         {this.renderAllClubs()}
         {this.renderAllTikets()}
         </div>
} 



                    {/* <div className="box col-md-10">
                       <div className="profile col-md-3">
                            <div className="image">
                                <a href=""><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"/></a>
                            </div>
                            <a href="">نام کاربر</a>
                            <span href="" >2 ساعت پیش</span>
                        </div>
                        <div className="event col-md-9 p-0">
                           <div className="image col-md-4 p-0 float-right"><img src="http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg" /></div> 
                           <div className="text col-md-8 float-left">
                             <div className="d-flex justify-content-between align-items-center"> 
                               <span className="title ">نام رویداد</span>
                               <a href="" className="location">کرج،جهانشهر</a>
                               </div> 
                               <a href="" className="nclb">کوه نوردی</a>
                               <div className="txt">
                                   <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p>
                               </div>
                              
                           </div>
                            <div className="down col-md-8">
                                <a href=""><i className="fa fa-comment"></i>15</a>   
                                <a href=""><i className="fa fa-thumbs-up"></i>15</a>
                                <a href="" className="float-left m-0"><i className="fa fa-bookmark"></i></a>
                            </div>
                        </div>                        
                    </div>  */}
                    </div>
                </div>
            </section>
          <Sidebar home={this.state.app}/>
        </div>
    </div>
       
    );
  }
}
class Post extends Component {
    constructor(props) {
      super(props); 
      this.state={
          active:false,
          data: [],
          cmShow:[],
          likeShow:[],
          likeButton : this.props.post.self_like, 
          likeCount:this.props.post.likes_count,
          commentCount:this.props.post.comment_count,
          isLoading:false,
      }
      this.moreSubmit= this.moreSubmit.bind(this,this.props);   
    }
    moreSubmit(){
        axios.get(`${DataStatic.domainIp}/public/api/v1/post/${this.props.post.Pid}?api_token=${this.props.token}`,)
        .then((response)=> {
         this.setState({likeShow: response.data.liked,cmShow:response.data.comments})
        })
        .catch( (err)=> {
            return(
                <div className="errorserver">
                    <span>مشکلی از سمت سرور</span>
                </div>
            )
        });
    }
    handelSendComment(){
        this.setState({isLoading:true})
        if(this.refs.comment.value.length>0){
            var querystring = require('querystring');
            axios.post(`${DataStatic.domainIp}/public/api/v1/post/comment/${this.props.post.Pid}?api_token=${localStorage.getItem('token')}`,
              querystring.stringify({
                  body: this.refs.comment.value, 
          }),
          {
            headers: { 
              "Content-Type": "application/x-www-form-urlencoded",
            }
          })
          .then((response)=> {
              this.setState({isLoading:false,commentCount:this.state.commentCount+1,cmShow:[...this.state.cmShow,{user:localStorage.getItem('userName'),body:this.refs.comment.value}]})
          })
          .catch( (err)=> {
                 alert("something went Wrong",err)
          });
        }else setTimeout(() => {
            this.setState({isLoading:false})
        },250); 
 
    }
    handelLike(){
        axios.get(`${DataStatic.domainIp}/public/api/v1/post/like/${this.props.post.Pid}?api_token=${localStorage.getItem('token')}`,)
        .then((response)=> {          
            this.setState({likeButton: !this.state.likeButton})
            if(this.state.likeButton){
                    this.setState({likeCount:this.state.likeCount+1})
            }else{
                this.setState({likeCount:this.state.likeCount-1})
            }
        })
        .catch( (err)=> {
            return(
                <div className="errorserver">
                    <span>مشکلی از سمت سرور</span>
                </div>
            )
        });
    }
      render() {
    var dateString = this.props.post.created_at.date,
        dateTimeParts = dateString.split(' '),
        timeParts = dateTimeParts[1].split(':'),
        dateParts = dateTimeParts[0].split('-'),
        date;
    var timeEdit = dateParts[0]+"-"+dateParts[1]+"-"+dateParts[2]+"T"+timeParts[0]+":"+timeParts[1]
       return (
       this.state.active? 
       <div className="box active col-md-12">
        <div className="profile col-md-2">
             <div className="image">
             <Link to={`/profile/${this.props.post.writer}`}><img src={this.props.post.writer_avatar===null ? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.avatarMedium}/${this.props.post.writer_avatar}`} alt={this.props.post.writer}/></Link>
             </div>
             <Link to={`/profile/${this.props.post.writer}`}>{this.props.post.writer}</Link>
             <span>
             <Moment fromNow>{timeEdit}</Moment>
             </span> 
             <div className="clearfix"></div>
         </div>
         <div className="event post col-md-10 p-0">
            <div className="image">
            <img src={this.props.post.media===null ? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.postOriginal}/${this.props.post.media}`} alt={this.props.post.writer} />
            </div> 
            <div className="text">
                <div className="txt">
                    <p>{this.props.post.body}</p>
                </div>
            </div>
             <div className="down col-12">
             <button className={this.state.likeButton?"active":""} onClick={this.handelLike.bind(this)}><i className="fa fa-heart"></i>{this.state.likeCount}</button>
             <button onClick={() => this.refs.comment.focus()} ><i className="fa fa-comment"></i>{this.state.commentCount}</button>
                 <Link to={`/club/${this.props.post.event_id}`} className="club">{this.props.post.event_id}</Link>
             </div>
             {this.state.cmShow===null?"":
             <div className="comment">
             <ul className="comment" style={this.state.cmShow.length>=5 ? {height:"200px",overflowY:"scroll"}:{}}>
                {this.state.cmShow.map((data,key)=>
               <li key={key}>
                <Link to={`/profile/${data.user}`}>{data.user}</Link>
                <p>{data.body}</p>
               </li>
                )}
             </ul>
             </div>
            }
             <div className="addcmmtxt" style={{marginRight: "10px",marginBottom: "5px",height: "45px",width:"auto"}}>
             <textarea ref="comment" placeholder="اضافه کردن کامنت..." maxLength="80" minLength="1"></textarea>
             {this.state.isLoading?<button><div style={{width:"25px",height:"25px"}} class="loading"></div></button>:
             <button type="button" onClick={this.handelSendComment.bind(this)}><i className="fa fa-check"></i></button>
         }
             </div>
             
         </div>
     </div>
       :
        <div className="box col-12 col-md-10">
            <div className="profile col-md-3">
             <div className="image">
             <Link to={`/profile/${this.props.post.writer}`}>
             <img src={this.props.post.writer_avatar===null ? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.avatarMedium}/${this.props.post.writer_avatar}`} alt={this.props.post.writer}/></Link>
             </div>
             <Link to={`/profile/${this.props.post.writer}`}>{this.props.post.writer}</Link>
             <span> 
             <Moment fromNow>{timeEdit}</Moment>
             </span>
             <div className="clearfix"></div>
         </div>
         <div className="event post col-md-9 p-0">
            <div className="image col-md-4 p-0 float-right">
            <img src={this.props.post.media===null ? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.postMedium}/${this.props.post.media}`} alt={this.props.post.writer} />
            </div> 
            <div className="text col-md-8 float-left">
                <div className="txt">
                    <p>{this.props.post.body}</p>
                </div>
            </div>
             <div className="down col-md-8">
                 <button className={this.state.likeButton?"active":""} onClick={this.handelLike.bind(this)}><i className="fa fa-heart"></i>{this.state.likeCount}</button>
                 <button onClick={() => this.setState({active: true},this.moreSubmit,setTimeout(()=>this.refs.comment.focus()),8500)} ><i className="fa fa-comment"></i>{this.state.commentCount}</button>   
                 <Link to={`/club/${this.props.post.event_id}`} className="club">{this.props.post.event_id}</Link>
             </div>
         </div>
        </div>
       )
    }
  }
class Tiket extends Component {
    constructor(props) {
      super(props); 
    }
      render() {
       return (
        <div className="box col-md-10">
        <div className="profile col-md-3">
             <div className="image">
             <Link to={`/profile/${this.props.post.writer}`}><img src={this.props.post.writer_avatar===null ? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.avatarMedium}/${this.props.post.writer_avatar}`} alt={this.props.post.writer}/></Link>
             </div>
             <a href="">نام کاربر</a>
             <span href="" >2 ساعت پیش</span>
         </div>
         <div className="event col-md-9 p-0">
            <div className="image col-md-4 p-0 float-right">
            <img src={this.props.post.avatar_id===null ? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.tiketMedium}/${this.props.post.avatar_id}`} alt="{this.props.post.writer}"/>
            </div> 
            <div className="text col-md-8 float-left">
                <div className="d-flex justify-content-between align-items-center"> 
                <span className="title "> {this.props.post.body} </span>
                <span className="location">{this.props.post.city}</span>
                </div> 
                <Link to={`/myclub/${"inja"}`} className="nclb">کوه نوردی</Link>
                <div className="txt">
                    <p>
                    {/* {this.props.details.about} */}
                    </p>
                </div>
               
            </div>
             <div className="down col-md-8">
                 <span><i className="fa fa-ticket"></i>{this.props.post.price}</span>   
                 {/* <span className="float-left m-0"><i className="fa fa-bookmark"></i></span>   */}
             </div>
         </div>
     </div> 
       )
    }
  }
/*

 <div className={this.state.active ? "box active col-md-12" : "box col-12 col-md-10"}>
        <div className={this.state.active ? "profile col-md-2" : "profile col-md-3"}>
             <div className="image">
             <Link to={`/profile/${this.props.post.writer}`}><img src={this.props.post.writer_avatar===null ? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.avatarMedium}/${this.props.post.writer_avatar}`} alt={this.props.post.writer}/></Link>
             </div>
             <Link to={`/profile/${this.props.post.writer}`}>{this.props.post.writer}</Link>
             <span href="" >2 ساعت پیش</span>
             <div className="clearfix"></div>
         </div>
         <div className={this.state.active ? "event col-md-10 p-0" : "event col-md-9 p-0"}>
            <div className={this.state.active ? "image" : "image col-md-4 p-0 float-right"}>
            <img src={this.props.post.media===null ? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.postOriginal}/${this.props.post.media}`} alt={this.props.post.writer} />
            </div> 
            <div className={this.state.active ? "text" : "text col-md-8 float-left"}>
                <div className="txt">
                    <p>{this.props.post.body}</p>
                </div>
            </div>
             <div className={this.state.active ? "down col-12" : "down col-md-8"}>
                 <a onClick={() => this.setState({active: true})} ><i className="fa fa-comment"></i>15</a>   
                 <a href="" ><i className="fa fa-thumbs-up"></i>23</a>
                 <Link to={`/club/${this.props.post.event_id}`} className="club">{this.props.post.event_id}</Link>
             </div>
             <ul className="comment" style={this.state.active ? {display:'block'} : {display:'none'}}>
                <li>
                 <a href="">milad_akhb</a>
                  <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p>
                  <ul><li>
                  <a href="">milad_akhb</a>
                  <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p>
                  </li> 
                  </ul>
                 </li>
                 <li>
                 <a href="">milad_akhb</a>
                  <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p>
                  <ul><li>
                  <a href="">milad_akhb</a>
                  <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p>
                  </li> 
                  </ul>
                 </li>  
             </ul>
         </div>
     </div>

*/

