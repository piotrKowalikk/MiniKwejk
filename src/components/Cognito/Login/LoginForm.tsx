import * as React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Login, CognitoState } from 'react-cognito';
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { innerGreyColor } from "../../../colors";

interface ILoginFormProps extends RouteComponentProps {
  onSubmit: any;
  clearCache: any;
  error: string;
  state: string;
};
export class HtmlLoginForm extends React.Component<ILoginFormProps, any> {
  submitButton = React.createRef<any>();

  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      username: props.username,
      password: '',
      isLoading: false
    };
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state.username, this.state.password);
  }

  changeUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  changePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  componentWillUnmount = () => {
    this.props.clearCache();
  }
  componentDidUpdate() {
    if (this.props.state == CognitoState.LOGGED_IN)
      this.props.history.push('posts');
    if (this.props.state == CognitoState.EMAIL_VERIFICATION_REQUIRED)
      this.props.history.push('verification');
    if (this.props.state == CognitoState.CONFIRMATION_REQUIRED)
      this.props.history.push('confirm');
  }

  render() {
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
          {this.props.error != "" &&
            <Form.Group >
              <Form.Label style={{ color: "red" }}>{this.props.error}</Form.Label>
            </Form.Group>
          }
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control required placeholder="Enter username" onChange={this.changeUsername} />
            <Form.Text style={{ color: 'red' }} >{this.state.emailError}</Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="Password" onChange={this.changePassword} />
            <Form.Text style={{ color: 'red' }} >{this.state.passwordError}</Form.Text>
            {this.state.error &&
              <Form.Text style={{ color: 'red' }} >{this.state.error}</Form.Text>
            }
          </Form.Group>
          <div>
            <Button ref={this.submitButton} disabled={this.state.isLoading} className="btn-success" type="submit">Submit</Button>
            {this.state.isLoading &&
              <div style={{ marginLeft: (-1) * (this.submitButton.current ? this.submitButton.current.offsetWidth / 2 + 6 : 0) }} className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            }
          </div>
        </Form>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return ({
    state: state.cognito.state,
    user: state.cognito.user,
    attributes: state.cognito.attributes,
    error: state.cognito.error
  });
};
export default connect(mapStateToProps, null)(withRouter(HtmlLoginForm));