import React, { Component } from 'react';
import Sidebar from './section/Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {DataStatic,StorageData} from './StaticData';
export default class Tiket extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selected:'',
            tiket: true,
            data : '',
            managers:[],
            timeline:[],
            copy:false,
            url:''
        }
    }
    componentDidMount(){
        axios.get(`${DataStatic.domainIp}/public/api/v1/event/ticket/${this.props.match.params.numbertiket}?api_token=${localStorage.getItem('token')}`,)
        .then((response)=> {
         this.setState({data: response.data,managers:response.data.managers,timeline:response.data.timeLine})
         this.setState({url:`http://localhost:3000/ticket/${this.props.match.params.numbertiket}${this.state.data.name}-by=${this.state.data.club}`})
        })
        .catch( (err)=> {
            alert("something went Wrong",err)
        });

    }
    activeTab(value){
        this.setState({
          selected:value
        });
      }
    shareTiket(event){
        var copyText = this.refs.share;
        
        // copyText.value = url
        copyText.select();
  document.execCommand("copy");
        this.setState({copy:true})
       setTimeout(()=>{
            this.setState({copy:false})
        },400)
    }
  render() {
    return (
        <div>
        <div className="container">
        <div className="row justify-content-center">
            <section className="main col-md-8">
                <div className="header">
                    <div className="advanced justify-content-between d-flex">
                      <div className="title">
                      <Link to={`/myclub/${this.state.data.club}`} style={{color:"#bdbdbd",fontSize:"0.92em"}}>{this.state.data.club}/ </Link>
                      {this.state.data.name}</div>
                      <div>
                       <span className="spasze18" onClick={this.shareTiket.bind(this)} style={{position:"relative"}}>
                       <input value={this.state.url} ref="share" id="myInput" style={{opacity: "0", position:"fixed",top:"0",left:"0"}}/>
                       <i className="fa fa-share-alt"></i>
                        {this.state.copy?<div style={{position: "absolute",top: "0px",left: "100%",padding: "5px 15px",background:"rgba(0, 0, 0, 0.77)",color: 'rgb(255, 255, 255)',fontSize: "11px",borderRadius: "4px",width:"76px"}}>کپی آدرس</div>   :null} 
                       </span> 
                       {/* <span className="spasze18"><i className="fa fa-bookmark"></i></span> */}
                      </div>
                    </div>
                </div>
                <div className="single-content">
                    <div className="box d-flex">
                        <div className="text col-12" style={{minHeight:"250px"}}>
                               <div className="txt">
                          {this.state.data.avatar!==null? null:
                          <div className="image">
                            <img src={`${DataStatic.domainIp}/${StorageData.tiketOrginal}/${this.state.data.avatar}`} />
                          </div>
                          }
                                <p>{this.state.data.body}</p>
                               </div>
                         </div>
                    </div>
                    <div className="tab">
                            <ul className="header d-flex justify-content-center">
                             <li className={this.state.selected === "" ? 'active' : ''} onClick={() => {this.activeTab('')}} > منیجر</li>
                             <li className={this.state.selected === "تام لاین" ? 'active' : ''} onClick={() => {this.activeTab('تام لاین');}}>تام لاین</li>
                            </ul> 
                            {this.state.selected === "" ? <div className="manager row" >
                            {this.state.managers.map((data,key)=>
                            <div className="box col-md-4" key={key}>
                            <Link to={`/profile/${data.name}`}>
                             <div className="image">
                             <img src={data.avatar===null ? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.avatarOriginal}/${data.avatar}`} alt={data.name}/>
                             </div>
                             <span className="title">{data.name}</span>
                             <span>{data.role}</span>
                             </Link>
                            </div>
                            )}
                            
                        </div>
                        :null}
                        {this.state.selected === "تام لاین" ? <div className="timeline" style={this.state.selected === "تام لاین" ? {} : {display : 'none' }}>
                        <ul>
                            {this.state.timeline.map((data,key)=>
                            <li key={key}>
                            <div className="list-style"></div>
                            <div className="box">
                           {data.photo===null?"": <div className="images">
                                <img src={`${DataStatic.domainIp}/${DataStatic.timelineOriginal}/${data.photo}`} alt={data.name}/>
                             </div>
                             }
                             <div className="txt">
                              <div className="time">در ساعت : {data.time}</div>
                              <div className="clearfix"></div>
                              <div className="text"><span>{data.name}</span>
                                <p>{data.text}</p>
                             </div>
                              </div>
                              <div className="clearfix"></div>
                          </div>
                            </li>
                            )}
                        </ul>
                        </div>
                       :null}     
                    </div>
                </div>
            </section>
            <Sidebar tiket={this.state.tiket} dataS={this.state.data}/>
        </div>
    </div>
    </div>  
    );
  }
}