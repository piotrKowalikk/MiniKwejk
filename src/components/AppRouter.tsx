import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, connect } from 'react-redux'
import NavBar from './NavBar';
import LogOut from './Authentication/LogOut';
import Home from './Home';
import { IApplicationState } from '../redux/rootReducer';
import { Footer } from './Footer';
import { PostList } from './Post/PostsList/PostList';
import CreatePost from './Post/CreatePost';
import { PostDetailsContainer } from './Post/PostDetailsContainer';
import { PostView } from './Post/Post';
import { PostListContainer } from './Post/PostsList/PostListContainer';
import { relative } from 'path';
import RegisterForm from './Cognito/Register/RegisterForm';
import { LoginPage } from './Cognito/Login/LoginPage';
import { EmailVerificationPage } from './Cognito/EmailVerification/EmailVerificationPage';
import ConfirmPage from './Cognito/Register/ConfirmPage';


class AppRouter extends React.Component<{}, undefined> {

    public render() {
        return (
            <div style={{ minHeight: "95vh", height: "100%" }}>
                <div style={{ height: "100%" }}>
                    <NavBar />
                    <Route exact path="/" component={Home} />
                    <Route path="/logIn" component={LoginPage} />
                    <Route path="/logOut" component={LogOut} />
                    <Route path="/posts" component={PostListContainer} />
                    <Route path="/createPost" component={CreatePost} />
                    <Route path="/postDetails/:id" component={PostDetailsContainer} />
                    <Route path="/register" component={RegisterForm} />
                    <Route path="/verification" component={EmailVerificationPage} />
                    <Route path="/confirm" component={ConfirmPage} />

                    {/* <Route exact path="/reset" component={PasswordResetForm} />
                    <Route exact path="/change_password" component={ChangePasswordForm} />
                    <Route exact path="/change_email" component={UpdateEmailForm} /> */}
                </div>
                <div style={{ position: "relative" }}>
                    <Footer />
                </div>
            </div>
        );
    }
}



export default (AppRouter);
