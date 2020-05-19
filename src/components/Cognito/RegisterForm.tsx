import * as React from "react";
import * as PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { registerUser } from 'react-cognito';
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

interface IRegisterForm extends RouteComponentProps {
  store: any;
};

class RegisterForm extends React.Component<IRegisterForm, any> {

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
        this.props.store.dispatch(action);
        this.props.history.push('/');
      },
      error => this.setState({ error }));
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

  render = () => (
    <form onSubmit={this.onSubmit}>
      <div>{this.state.error}</div>
      <label>
        Username
        <input placeholder="username" onChange={this.changeUsername} required />
      </label>
      <label>
        Password
        <input placeholder="password" onChange={this.changePassword} required />
      </label>
      <label>
        Email Address
        <input placeholder="email" type="email" onChange={this.changeEmail} required />
      </label>
      <button type="submit">Register</button>
    </form>
  )
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


