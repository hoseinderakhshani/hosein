import React, { Component } from 'react';
import {DataStatic,StorageData} from '../../StaticData';
export default class SEditProfile extends Component {
    constructor (props) {
    super(props)
      this.state={
      }
    }
    render(){ 
    return (
        <div>
        <div className="prfe-cor">
        <div className="image">
       <img src={this.props.Sdata.avatar === null ? "/images/noimage.jpg"  : `${DataStatic.domainIp}/${StorageData.avatarMedium}/${this.props.Sdata.avatar}`}/>
        </div>
        <span>میلاد</span>
        <span className="user">{this.props.Sdata.userName}</span> 
        <div className="clearfix"></div>                           
    </div>  
    </div>
        )
    }
}
