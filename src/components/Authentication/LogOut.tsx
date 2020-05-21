import * as React from 'react'
import { Form, Container } from 'react-bootstrap'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IApplicationState } from '../../redux/rootReducer';
import { innerGreyColor } from '../../colors';

interface ILogOutProps extends RouteComponentProps {
}

interface ILogOutState {
}

class LogOut extends React.Component<ILogOutProps, ILogOutState>{

    constructor(props) {
        super(props);
    }

    render() {
        const style: React.CSSProperties = {
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '30em',
            padding: '20px',
            marginTop: '-9em', /*set to a negative number 1/2 of your height*/
            marginLeft: '-15em', /*set to a negative number 1/2 of your width*/
            border: ' 1px solid #ccc',
            backgroundColor: innerGreyColor,
            color: "white"
        }

        return (
            <Container >
                <Form style={style}>
                    <Form.Group style={{ textAlign: "center" }}>
                        <Form.Label >You have successfully logged out.</Form.Label>
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}

export default (LogOut);