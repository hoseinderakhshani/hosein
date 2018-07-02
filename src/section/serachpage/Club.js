import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {DataStatic,StorageData} from '../../StaticData';
export default class ClubSerach extends Component {
  constructor(props) {
    super(props); 
  }

  render() {
    
      return (
        <div className="showclub">
        <div className="row">
        {this.props.data.map((data,key) =>
                <div className="box col-md-6" key={key}>
                <Link to={`/myClub/${data.name}`}>
                <img src={data.avatar==null ? "/images/noimage.jpg" : `${DataStatic.domainIp}/${StorageData.clubMedium}/${data.avatar}`} alt={data.name}/>
                 <span>{data.name}</span>
                 </Link>
                </div>
         )}
        </div>
        </div>
      )
}
}