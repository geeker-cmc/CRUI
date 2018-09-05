import { HashRouter, Route, Switch, Redirect, withRouter, Link, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';

import Button from './pages/Button';


export default class Router extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return <HashRouter>
                <div class="container">
                    <div class="menu-warpper">
                        <ul>
                            <li>
                                <Link to="/button">button</Link>
                            </li>
                        </ul>
                    </div>
                    <div class="content">
                            {/* <Route exact path="/" ></Route> */}
                            <Route path="/button" component={Button}></Route>
                            {/* 3333333 */}
                    </div>
                </div>
        </HashRouter>
    }
}
