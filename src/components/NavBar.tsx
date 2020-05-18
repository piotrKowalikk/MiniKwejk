import * as React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Form } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { IApplicationState } from '../redux/rootReducer';
import { IAuthorizeState } from '../redux/authorization/types/authorizationTypes';
import { connect } from 'react-redux';


export interface INavBarProps {
    isAuthorized: boolean;
}

const NavBar = (props: INavBarProps) => {
    return (
        <Navbar className="justify-content-between" style={{backgroundColor:"black"}}>
            <Form inline>
                {/* <Link className='btn shadow-none' style={{ color: 'white' }} to="/">Home</Link> */}
                {props.isAuthorized &&
                    <div>
                        <Link className='btn shadow-none' style={{ color: 'white' }} to="/posts">Posts</Link>
                        <Link className='btn shadow-none' style={{ color: 'white' }} to="/createPost">Create Posts</Link>
                        <Link className='btn shadow-none' style={{ color: 'white' }} to="/postDetails"> Details Posts</Link>
                    </div>
                }
            </Form>
            <Form inline>
                {props.isAuthorized &&
                    <Link className='btn shadow-none' style={{ color: 'white' }} to="/logOut">Log Out</Link>
                }
                {!props.isAuthorized &&
                <Link className='btn shadow-none' style={{ color: 'white' }} to="/logIn">Log In</Link>
                }
            </Form>
        </Navbar>
    );
}

const mapStateToProps = ({ authorize }: IApplicationState) => {
    var authorize: IAuthorizeState = authorize;
    return {
        isAuthorized: authorize.isAuthorized
    }
}

export default connect(
    mapStateToProps
)(NavBar);

