import * as React from "react";
import * as PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { registerUser, CognitoState } from 'react-cognito';
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { innerGreyColor } from "../../../colors";

interface IRegisterForm extends RouteComponentProps {
  store: any;
};

class RegisterForm extends React.Component<IRegisterForm, any> {
  submitButton = React.createRef<any>();

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      username: '',
      password: '',
      email: '',
    };
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  onSubmit = (event) => {
    const state = this.props.store;
    const userPool = state.cognito.userPool;
    const config = state.cognito.config;
    event.preventDefault();
    registerUser(userPool, config, this.state.username, this.state.password, {
      email: this.state.email,
    }).then(
      (action) => {
        this.props.history.push('/logIn');
        this.props.store.dispatch(action);
      },
      error => this.setState({ error }));
  }

  componentDidUpdate() {
    if (this.props.store.cognito.state == CognitoState.LOGGED_IN)
      this.props.history.push('posts');
    if (this.props.store.cognito.state == CognitoState.EMAIL_VERIFICATION_REQUIRED)
      this.props.history.push('verification');
    if (this.props.store.cognito.state == CognitoState.CONFIRMATION_REQUIRED)
      this.props.history.push('confirm');
  }

  changeUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  changePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  changeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  render = () => {
    const style: React.CSSProperties = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      width: '30em',
      padding: '20px',
      marginTop: '-9em',
      marginLeft: '-15em',
      border: ' 1px solid #ccc',
      'backgroundColor': innerGreyColor,
      color: "white"
    }

    const buttonProgress: React.CSSProperties = {
      top: '50%',
      left: '50%',
    }
    return (
      <Container >
        <Form style={style} onSubmit={this.onSubmit}>
          {this.state.error != "" &&
            <Form.Group>
              <Form.Label style={{ color: "red" }}>{this.state.error}</Form.Label>
            </Form.Group>
          }
          <Form.Group >
            <Form.Label>Username</Form.Label>
            <Form.Control required placeholder="Enter username" onChange={this.changeUsername} />
            <Form.Text style={{ color: 'red' }} >{this.state.emailError}</Form.Text>
          </Form.Group>
          <Form.Group >
            <Form.Label>Email address</Form.Label>
            <Form.Control required placeholder="Enter email" type="email" onChange={this.changeEmail} />
          </Form.Group>
          <Form.Group >
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="Password" onChange={this.changePassword} />
            <Form.Text style={{ color: 'red' }} >{this.state.passwordError}</Form.Text>
            {this.state.error &&
              <Form.Text style={{ color: 'red' }} >{this.state.error}</Form.Text>
            }
          </Form.Group>
          <div>
            <Button ref={this.submitButton} disabled={this.state.isLoading} className="btn-success" type="submit">Register</Button>
          </div>
        </Form>
      </Container>
    );
    // <form onSubmit={this.onSubmit}>
    //   <div>{this.state.error}</div>
    //   <label>
    //     Username
    //     <input placeholder="username" onChange={this.changeUsername} required />
    //   </label>
    //   <label>
    //     Password
    //     <input placeholder="password" onChange={this.changePassword} required />
    //   </label>
    //   <label>
    //     Email Address
    //     <input placeholder="email" type="email" onChange={this.changeEmail} required />
    //   </label>
    //   <button type="submit">Register</button>
    // </form>

  }
}


const mapStateToProps = (store) => {
  return {
    store
  }
}

export default connect(
  mapStateToProps,
  null
)(withRouter(RegisterForm));


