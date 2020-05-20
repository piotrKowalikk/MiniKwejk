
import * as React from 'react';
import { Login } from 'react-cognito';
import HtmlLoginForm from './LoginForm';

export const LoginPage: React.FC<any> = (props) => {
    return (
        <Login>
            <HtmlLoginForm clearCache={() => { }} onSubmit={() => { }} />
        </Login>
    )
}
