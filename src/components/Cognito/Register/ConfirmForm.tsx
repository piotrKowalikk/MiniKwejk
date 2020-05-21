import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { innerGreyColor } from "../../../colors";
import { Container, Form, Button } from "react-bootstrap";

interface IConfirmForm extends RouteComponentProps {
  onSubmit: any;
  onCancel: any;
  onResend: any;
  error: string;
  store: any;
};

class ConfirmForm extends React.Component<IConfirmForm, any> {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      verificationCode: '',
      isResended: false
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.verificationCode)
      .then((user) => {
        //console.log(user);
        //this.props.store.dispatch(user);
        this.props.history.push("/logIn");
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  onResend = (event) => {
    this.setState({
      isResended: true
    })
    event.preventDefault();
    this.props.onResend()
      .then((user) => {
        this.setState({ error: 'Code resent' });
      })
      .catch((error) => {
        this.setState({ error });
      });

  }

  changeVerificationCode = (event) => {
    this.setState({ verificationCode: event.target.value });
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
          {(this.state.error != "" && this.state.error != "Code resent") &&
            <Form.Group>
              <Form.Label style={{ color: "red" }}>{this.state.error}</Form.Label>
            </Form.Group>
          }
          {this.state.isResended &&
            <Form.Group>
              <Form.Label>A confirmation code has been sent to your email address</Form.Label>
            </Form.Group>
          }
          <Form.Group >
            <Form.Label>Verification Code</Form.Label>
            <Form.Control required placeholder="Enter Verification Code" onChange={this.changeVerificationCode} />
          </Form.Group>
          <div>
            <Button className="btn-success" style={{ marginRight: 5 }} type="submit">Submit</Button>
            <Button className="btn-success" disabled={this.state.isResended} onClick={this.onResend} type="button">Resend code</Button>
          </div>
        </Form>
      </Container>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    store
  }
};
export default connect(mapStateToProps, null)(withRouter(ConfirmForm));
