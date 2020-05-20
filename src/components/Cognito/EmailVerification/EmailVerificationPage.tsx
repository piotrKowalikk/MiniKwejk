import * as React from "react";
import { EmailVerification } from "react-cognito";
import EmailVerificationForm from "./EmailVerificationForm";

export const EmailVerificationPage = () => (
    <div>
        <p>You must verify your email address.  Please check your email for a code</p>
        <EmailVerification>
            <EmailVerificationForm onSubmit={() => { }} onCancel={() => { }} error={"email error"} />
        </EmailVerification>
    </div>
);
