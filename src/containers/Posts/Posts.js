import React, {Component} from 'react'
import Post from "../../components/Post/Post";
import axios from "../../axios";
import "./Posts.css"
import {Route, Switch} from "react-router";
import FullPost from "../FullPost/FullPost";

class Posts extends Component{
    state = {
        posts: []
    };

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post=>{
                    return{
                        ...post,
                        author: "Talha"
                    }
                });
                this.setState({posts: updatedPosts});
                console.log(response)
            }).catch(error => {
                console.log(error)
        })

    }

    postClickedHandler = (id) => {
        this.props.history.push({pathname: this.props.match.url +"/" + id});
    };

    render(){
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return(
                        <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            postClicked={() => this.postClickedHandler(post.id)}/>
                );

            });
        }

        return(
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost}></Route>
            </div>

    );
    }
}

export default Posts;