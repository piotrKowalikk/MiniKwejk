import * as React from "react";
import { Confirm, CognitoState } from "react-cognito";
import ConfirmForm from "./ConfirmForm";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

interface IConfirmPageProps extends RouteComponentProps {
    state: any;
}
const ConfirmPage: React.FC<IConfirmPageProps> = (props: IConfirmPageProps) => {
    React.useEffect(() => {
        if (props.state == CognitoState.LOGGED_IN)
            props.history.push('posts');
        if (props.state == CognitoState.LOGGED_OUT)
            props.history.push('logIn');
    });
    return (
        <div>
            <Confirm>
                <ConfirmForm onSubmit={() => { }} error="confirm err" onCancel={() => { }} onResend={() => { }} />
            </Confirm>
        </div>);

};
const mapStateToProps = (store) => {
    let asda = "asdasda";
    return { state: store.cognito.state };
};

export default connect(mapStateToProps, null)(withRouter(ConfirmPage));