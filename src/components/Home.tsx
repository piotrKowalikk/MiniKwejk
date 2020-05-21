import * as React from 'react'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IApplicationState } from '../redux/rootReducer';

interface IHomeComponentProps extends RouteComponentProps {
    isAuthorized: boolean;
}

interface IHomeComponentState {
}

class Home extends React.Component<IHomeComponentProps, any>{

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isAuthorized) {
            this.props.history.push('/posts');
        }
        else {
            this.props.history.push('/logIn');
        }

        return (
            <div>
                HOME LAYOUT
            </div>
        );
    }
}
export default (withRouter(Home))
