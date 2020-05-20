import * as React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Form } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { IApplicationState } from '../redux/rootReducer';
import { IAuthorizeState } from '../redux/authorization/types/authorizationTypes';
import { connect } from 'react-redux';
import LogoutButton from './Cognito/LogoutButton';
import { CognitoState, Logout } from 'react-cognito';


export interface INavBarProps {
    state: string;
}

const NavBar = (props: INavBarProps) => {
    return (
        <Navbar className="justify-content-between" style={{ backgroundColor: "black" }}>
            <Form inline>
                {/* <Link className='btn shadow-none' style={{ color: 'white' }} to="/">Home</Link> */}
                <div className="row">
                    <Link className='btn shadow-none' style={{ color: 'white' }} to="/posts">Posts</Link>
                    {(props.state == CognitoState.LOGGED_IN || props.state == CognitoState.LOGGING_IN) &&
                        <div>
                            <Link className='btn shadow-none' style={{ color: 'white' }} to="/createPost">Create Posts</Link>
                            <Link className='btn shadow-none' style={{ color: 'white' }} to="/postDetails"> Details Posts</Link>
                        </div>
                    }
                </div>
            </Form>
            <Form inline>
                {props.state == CognitoState.LOGGED_IN &&
                    <Link className='btn shadow-none' style={{ color: 'white' }} to="/logOut"><Logout><LogoutButton onClick={() => { }}></LogoutButton></Logout></Link>
                }
                {props.state == CognitoState.LOGGED_OUT &&
                    <div>
                        <Link className='btn shadow-none' style={{ color: 'white' }} to="/logIn">Log In</Link>
                        <Link className='btn shadow-none' style={{ color: 'white' }} to="/register">Sign Up</Link>
                    </div>
                }
            </Form>
        </Navbar>
    );
}

const mapStateToProps = (store) => {
    let as = "adsad";
    return {
        state: store.cognito.state
    }
}

export default connect(
    mapStateToProps
)(NavBar);

