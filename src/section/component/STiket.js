import React, { Component } from 'react';
export default class STiket extends Component {
    constructor (props) {
    super(props)
      this.state={
          reg : props.data.members!==undefined && props.data.members.includes(props.userName)? true : false ,
      }
    }
    render(){ 
        console.log(this.state.reg)
    return (
        <div>

        <div className="sgl-data">
            <span>{this.props.data.state},{this.props.data.city}</span>
            <label>شروع رویداد : <span>{this.props.data.date}</span></label>
            <label>پایان رویداد : <span>{this.props.data.end_date}</span></label>    
            <label>ظرفیت : <span>{this.props.data.limit} / {this.props.data.members_number} نفر</span></label>    
        </div> 
        <div className="clb-reg d-flex justify-content-between align-items-center">
                <button style={this.state.reg ? {background: "none",color:"rgb(255, 193, 7)"}:null}>{this.state.reg? "فاکتور":"ثبت در خواست"}</button>
                <div>
                <span>{this.props.data.price}</span><span>ت</span>
                </div>
            </div>
        </div>
        )
    }
}
