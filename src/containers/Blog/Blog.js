import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from '../Posts/Posts'
//import NewPost from '../NewPost/NewPost'
import asyncComponent from '../../hoc/asyncComp'

const asyncNewPost = asyncComponent( ()=> {
    return import('../NewPost/NewPost')
});

class Blog extends Component {

    state = {
      auth: true
    };

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/posts"
                                         exact
                                         activeClassName="my-active"
                                         activeStyle={{
                                             color: '#fa923f',
                                             textDecoration: 'underline'
                                         }}>Home</NavLink>
                                <NavLink to={{
                                    pathname: 'new-post',
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>

                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={asyncNewPost}></Route> : null}
                    <Route path="/posts" component={Posts}></Route>
                    <Route render={()=> <p>Page Not Found!</p>}></Route>
                    {/*<Redirect to="/posts" from="/"></Redirect>*/}
                </Switch>


            </div>
        );
    }
}

export default Blog;