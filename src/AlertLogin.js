import React, { Component } from 'react';
export default class AlertLogin extends Component {
      constructor (props) {
          super(props)
          }
      render(){
          const style={
              display :"block",
              textAlign: "center",
              color: "#f00",
          }
          return(
              <span style={style}>{this.props.alert}</span>  
          )
      }   
       // token=== localStorage.getItem('token') && userName===localStorage.getItem('userName')? <Redirect to={{pathname: '/home',state : this.state.token }}/>:""      
  }