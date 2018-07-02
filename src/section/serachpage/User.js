import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {DataStatic,StorageData} from '../../StaticData';
export default class UserSerach extends Component {
  constructor(props) {
    super(props); 
    this.state={
      isFollow : false,
    }
  }
  render() {
      return (
        <div className="followbox col-12">
        <div className="row">
           {this.props.data.map((data,key) =>
               <div className="col-lg-4 col-md-5" key={key}>
                <div className="userlist">
                <Link to={`/profile/${data.user_name}`}>
                <div className="image">
                 <img src={data.avatar==null ? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.avatarMedium}/${data.avatar}`} alt={data.user_name}/>
                </div>
                 <span className="title">{data.user_name}</span></Link> 
                 <button className={this.state.isFollow ? "select slctusr" : "slctusr"} onClick={this.toggleFollow}><span>انتخاب</span></button>
                 </div> 
                </div>
            )}
         </div>
        </div>
      )
}
}