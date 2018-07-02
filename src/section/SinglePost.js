import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {DataStatic,StorageData} from '../StaticData';
import {CommentAt} from '../methodStatic';
export default class SinglePost extends Component {
    constructor (props) {
        super(props)
        this.state={
           data : "",
           sendComment: false,
           fullcomment: false,
           isLoading:"show",
           commentAll:[],
           likeShow: false,
           likeCount:0,
           cmCount :0,
        }
    }
    componentDidMount(){
        axios.get(`${DataStatic.domainIp}/public/api/v1/post/${this.props.match.params.id}?api_token=${localStorage.getItem('token')}`,)
        .then((response)=> {
         this.setState({data: response.data,isLoading:'',commentAll:response.data.comments,likeShow:response.data.user_like,likeCount:response.data.likes_count})
        })
        .catch( (err)=> {
            alert("something went Wrong",err)
          });
    }
    handelclose(e){
        if(e.target=== this.refs.close){
            window.history.back();
        }else null
    }
    handelSendComment(){
        this.setState({isLoading:"cm"})
        var querystring = require('querystring');
        axios.post(`${DataStatic.domainIp}/public/api/v1/post/comment/${this.props.match.params.id}}?api_token=${localStorage.getItem('token')}`,
        querystring.stringify({
            body: this.refs.comment.value, 
    }),
    {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
      }
    })
    .then((response)=> {
        console.log(response)
        this.setState({isLoading:'',cmCount:this.state.cmCount+1,commentAll:[{user: localStorage.getItem('userName'),user_avatar: "1526550023.1526279672.photo_2018-04-07_11-42-47.jpg", body: this.refs.comment.value},...this.state.commentAll]})
    })
    .catch( (err)=> {
           alert("something went Wrong",err)
    });
    }
    render(){ 
      function goBack() {
            window.history.back();
        }
    return (
        <div className="bgadd" ref="close" style={{minHeight: window.innerHeight}} onClick={this.handelclose.bind(this)}>
        <button onClick={()=>goBack()} className="close"><i className="fa fa-times"></i></button>
        {this.state.isLoading==="show"?<div style={{width:"45px",height:"45px"}} class="loading"></div>:
        <div className={this.state.data.media===null? "box col-6 singlepost":"box col-12 singlepost" } >
        <div className="row">
        {this.state.data.media!==null?
        <div className="col-md-6 image">
        <img className="img" src={this.state.data.media!==null?`${DataStatic.domainIp}/${StorageData.postOriginal}/${this.state.data.media}` :"/images/noimage.jpg"}/>
        </div>
        :null}
        <div className={this.state.data.media===null?"col-md-12 post":"col-md-6 post"}>
        <div className="header">
         <div className="image">
        <Link to={`/profile/${this.state.data.writer}`}>
        <img className="img" src={this.state.data.writer_avatar===null? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.avatarMedium}/${this.state.data.writer_avatar}`}/>
        </Link>
        </div>
        <span><Link to={`/profile/${this.state.data.writer}`}>{this.state.data.writer}</Link></span>
        {this.state.data.club!==null?<span className="clubName"><Link to={`/myclub/${this.state.data.club}`}>{this.state.data.club}</Link></span>:null}
        </div>
        <div className="clearfix"></div>
        {this.state.fullcomment ? null :<div className="text" style={this.state.data.comments===null ? {height:"calc(100% - 105px)"}:null}>
        {/* <p>{this.state.data.body.includes('@')? CommentAt(this.state.data.body):this.state.data.body}</p>  */}
        <p>{this.state.data.body}</p> 
        </div>
        }
        <div className={this.state.fullcomment?"comment active":"comment"} style={this.state.data.comments!==null ? null:{height:"auto"}}>
     <ul className={this.state.fullcomment ? "fuact" :null}>
          {this.state.commentAll!==null?  this.state.commentAll.map((data,key)=>
                    <li key={key}>
                    <Link to={`/profile/${data.user}`}>
                    <div className="image"><img src={data.user_avatar===null? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.avatarMedium}/${data.user_avatar}`}/></div>
                    <span>{data.user}</span>
                    </Link>
                    <p>{data.body}</p> 
                    <div className="clearfix"></div>
                    </li>
            )
           :null }
       </ul>
       {this.state.fullcomment ? <span onClick={()=>this.setState({fullcomment:false})} style={{color:"#bdbdbd",cursor:"pointer"}}><i className="fa fa-times"></i></span> : this.state.data.comments_count===0? <span style={{color:"#bdbdbd"}}>کامنتی موجود نمی باشد.</span>:<span ><a className="more" onClick={()=>this.setState({fullcomment:true})}>نظرات بیشتر ({this.state.data.comments_count+this.state.cmCount})</a></span> }
      </div> 
      <div className="footer">
          <div className="addcmmtxt">
              <textarea placeholder="اضافه کردن کامنت..." ref="comment" onInput={()=>this.refs.comment.value.length>=1 && this.refs.comment.value.length<=80 ?this.setState({sendComment:true}):this.setState({sendComment:false})} maxLength="80" minLength="1"></textarea>
        {this.state.sendComment? <button onClick={this.handelSendComment.bind(this)} type="button" ref="sendComment">{this.state.isLoading==="cm"?<div style={{width:"25px",height:"25px"}} class="loading"></div>:<i className="fa fa-check"></i>}</button> :null} 
          </div>
          <div className="like">
          <span>{this.state.likeCount}</span>
          <button type="button" onClick={()=>axios.get(`${DataStatic.domainIp}/public/api/v1/post/like/${this.props.match.params.id}?api_token=${localStorage.getItem('token')}`,)
            .then((response)=> {
                this.setState({likeShow:!this.state.likeShow})
                this.state.likeShow? this.setState({likeCount: this.state.likeCount+1}):this.setState({likeCount:this.state.likeCount-1})
                })
            .catch( (err)=> {
            alert("something went Wrong",err)
            })}
            className={this.state.likeShow ? "active":""}><i className="fa fa-heart"></i></button>
          </div>
      </div>
        </div>
        </div>
        </div>
        }
        </div>
        )
    }
}
