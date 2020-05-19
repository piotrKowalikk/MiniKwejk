import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, connect } from 'react-redux'
import NavBar from './NavBar';
import LogIn from './Authentication/LogIn';
import LogOut from './Authentication/LogOut';
import Home from './Home';
import { IApplicationState } from '../redux/rootReducer';
import { IAuthorizeState } from '../redux/authorization/types/authorizationTypes';
import { Footer } from './Footer';
import { PostList } from './Post/PostList';
import { CreatePost } from './Post/CreatePost';
import { PostDetailsContainer } from './Post/PostDetailsContainer';
import { PostView } from './Post/Post';
import { PostListContainer } from './Post/PostListContainer';
import { relative } from 'path';
import RegisterForm from './Cognito/RegisterForm';
import PasswordResetForm from './Cognito/PasswordResetForm';
import ChangePasswordForm from './Cognito/ChangePasswordForm';
import Dashboard from './Cognito/Dashboard';
import UpdateEmailForm from './Cognito/UpdateEmailForm';

class AppRouter extends React.Component<{}, undefined> {

    public render() {
        return (
            <div style={{ minHeight: "95vh", height: "100%" }}>
                <div style={{ height: "100%" }}>
                    <NavBar />
                    <Route exact path="/" component={Home} />
                    <Route path="/logIn" component={LogIn} />
                    <Route path="/logOut" component={LogOut} />
                    <Route path="/posts" component={PostListContainer} />
                    <Route path="/createPost" component={CreatePost} />
                    <Route path="/postDetails/:id" component={PostDetailsContainer} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/register" component={RegisterForm} />
                    <Route exact path="/reset" component={PasswordResetForm} />
                    <Route exact path="/change_password" component={ChangePasswordForm} />
                    <Route exact path="/change_email" component={UpdateEmailForm} />
                </div>
                <div style={{ position: "relative" }}>
                    <Footer />
                </div>
            </div>
        );
    } 
}

const mapStateToProps = ({ users, authorize }: IApplicationState) => {
    return {
        isLoading: users.isLoading,
        error: users.errorMessage,
        data: users.users,
        isAuthorized: authorize.isAuthorized
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadToken: () => {
        sessionStorage.setItem('jwtToken', '');

    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppRouter);
