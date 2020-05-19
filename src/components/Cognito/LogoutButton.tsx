import * as React from "react";
import * as PropTypes from 'prop-types';

interface ILogoutButton {
  onClick: any;
}
const LogoutButton = ({ onClick }) => (
  <button onClick={onClick}>Log out</button>
);

export default LogoutButton;
