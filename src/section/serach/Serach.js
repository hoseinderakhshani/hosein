import React, { Component } from 'react';
import axios from 'axios';
import {DataStatic,StorageData} from '../../StaticData';

export default class Serach extends Component {
  constructor (props) {
    super(props)
    this.serachValue= this.serachValue.bind(this)
      }
      activeTab(){
        const tab = this.props.parent
        tab.state.selected===''? tab.setState({selected:"افراد"}):null
      }
      serachValue(event){
        const tab = this.props.parent
        if(tab.state.selected==="افراد" && event.length>2){
        axios.get(`${DataStatic.domainIp}/public/api/v1/user/search/${event}`,)
       .then((response)=> {
          tab.setState({userData:response.data})
    })
    .catch( (err)=> {
      tab.setState({userData:[]})
      })
    }
    else if(tab.state.selected==="باشگاه"){
      if(event.length<=0){
            null
      }else {
      axios.get(`${DataStatic.domainIp}/public/api/v1/search?key=${event}`,)
       .then((response)=> {
          tab.setState({clubData:response.data})
    })
    .catch( (err)=> {
      tab.setState({clubData:[]})
      })
    }
    }else null
      }
      render() {
        const tab = this.props.parent
        return (
          <label className="serachbox" onClick={this.activeTab.bind(this)}>
             <span><i className="fa fa-search"></i></span>
             <input placeholder="جستجو..." onChange={(event)=> this.serachValue(event.target.value)}/>
          </label>
           )
      }
    }