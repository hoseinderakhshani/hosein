import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.min.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/react-datepicker.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Login from './Login';
import App from './App';
import SerachPage from './SerachPage';
import MyProfile from './MyProfile';
import Profile from './Profile';
import MyClub from './MyClub';
import Club from './Club';
import Tiket from './Tiket';
import SinglePost from './section/SinglePost';
import EditProfile from './EditProfile';
import Error from './404';

const routes = (
    <Router>
        <Switch>
            <Route exact name="Login" path="/" component={Login} />
            <Route exact path="/home" component={App} />
            <Route path="/Serach" component={SerachPage} />
            <Route path={`/post/:id-by=:user2`} component={SinglePost} />
            <Route path={`/profile/:id`} component={Profile} />
            <Route path={`/myprofile/:user2`} component={MyProfile} />
            <Route path="/club/:id" component={Club} />
            <Route path="/ticket/:numbertiket:nametiket-by=:club" component={Tiket} />
            <Route path={`/myclub/:userid`} component={MyClub} />
            <Route path={`/editprofile/:user`} component={EditProfile} />
            <Redirect to="/home" component={Error}/>
        </Switch>
    </Router>
);

ReactDOM.render(routes, document.getElementById('root'));
