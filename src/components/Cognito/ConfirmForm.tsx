import * as React from "react";
import * as PropTypes from 'prop-types';

interface IConfirmForm {
  onSubmit: any;
  onCancel: any;
  onResend: any;
  error: string;
};

class ConfirmForm extends React.Component<IConfirmForm, any> {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      verificationCode: '',
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.verificationCode)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  onResend = (event) => {
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

  render = () => (
    <form onSubmit={this.onSubmit}>
      <div>{this.state.error}</div>
      <label>
        Verification Code
        <input placeholder="code" onChange={this.changeVerificationCode} required />
      </label>
      <button type="submit">Submit</button>
      <button type="button" onClick={this.onResend}>Resend code</button>
      <button type="button" onClick={this.props.onCancel}>Cancel</button>

    </form>
  )
}

export default ConfirmForm;
