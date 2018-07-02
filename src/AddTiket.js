import React, { Component } from 'react';
import Description from './section/Tiket/Description';
import Description2 from './section/Tiket/Description2';
import MangerRoleSelect from './section/Tiket/MangerRoleSelect';
import AddTimeline from './section/Tiket/AddTimeline';
import Axios from 'axios';
import {DataStatic} from './StaticData';
export default class AddTiket extends Component {
  constructor (props) {
    super(props)
        this.state={
          actpage: '',
          manger :[],
          role: [],
        }
        this.mangerSelectRole = this.mangerSelectRole.bind(this)
        this.togglePage = this.togglePage.bind(this);
      }
      handelclose(e){
        if(e.target=== this.refs.close){
          this.props.close("")
        }else null
      }
      togglePage(page){
        this.setState({actpage:page})
      }
      /***********start***** Metod Add****************************/
      mangerSelectRole(role,name){
        this.setState({manger:name,role:role})
      }
      /***********end****** Metod Add****************************/
      render() {
        return (
          <div className="bgadd" ref="close" style={{minHeight: window.innerHeight}} onClick={this.handelclose.bind(this)}>
          <button onClick={this.props.close} ref="funclose" className="close"><i className="fa fa-times"></i></button>
          <div className="box add-tiket row" style={{width:"80%"}}>
          {this.state.actpage==='two'? <Description togglePage={this.togglePage} parent={this}/>:null}
              {this.state.actpage===""? <Description2 togglePage={this.togglePage} parent={this}/>:null}
              {this.state.actpage==="three"? <MangerRoleSelect togglePage={this.togglePage} manger={this.props.manger} mangerSelectRoles={this.mangerSelectRole} parent={this}/>:null}
                {this.state.actpage==="four"? <AddTimeline parent={this} togglePage={this.togglePage}/>:null}
          </div>
          </div>
           )
      }
}  