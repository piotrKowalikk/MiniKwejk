import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface ILogoutButton {
  onClick: any;
}
const LogoutButton: React.FC<ILogoutButton> = (props: ILogoutButton) => (
  <div onClick={props.onClick}>Log out</div>
);

export default LogoutButton;
