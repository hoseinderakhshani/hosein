import React, { Component } from 'react';
export default class SClub extends Component {
    constructor (props) {
        super(props)
        this.state ={
            bio : false,
        }
    }
    render(){ 
    return (
        <div> 
        <div className="prfe-cor">
                      <span>نام باشگاه</span>
                      <span className="user">bashgah.club</span>                          
        </div>
             <div className="prfe-flw">
                <ul>
                    <li><span>213k</span>دنبال کننده</li>
                    <li><span>6k</span>پست ها</li>
                    <li><span>6k</span>تیکت ها</li>
                </ul>
             </div>
             <div className="clb-reg d-flex justify-content-between align-items-center">
                <button>دنبال کردن</button>
                <div>
                <span onClick={() => this.setState({bio: true})}><i className="fa fa-quote-left"></i><div className="tltp">Bio</div></span>
                <span onClick={() => this.setState({bio: false})}><i className="fa fa-users"></i><div className="tltp">manger</div></span>
                </div>
            </div>
             <div className="clb-manger" style={this.state.bio ? {display: 'none'} : {display: 'block'}}>
                <ul>
                  <li><img src="/images/noimage.jpg" /></li>    
                  <li><img src="/images/noimage.jpg" /></li>    
                  <li><img src="/images/noimage.jpg" /></li>    
                  <li><img src="/images/noimage.jpg" /></li>    
                  <li><img src="/images/noimage.jpg" /></li>
                  <li><img src="/images/noimage.jpg" /></li>    
                  <li><img src="/images/noimage.jpg" /></li>    
                  <li><img src="/images/noimage.jpg" /></li>    
                  <li><img src="/images/noimage.jpg" /></li>
                  <li><img src="/images/noimage.jpg" /></li>    
                  <li><img src="/images/noimage.jpg" /></li>    
                  <li><img src="/images/noimage.jpg" /></li>                                                 
                </ul>
            </div> 
            <div className="clb-des" style={this.state.bio ? {display: 'block'} : {display: 'none'}}>
              <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</p>
            </div>  
            </div>
        )
    }
}
