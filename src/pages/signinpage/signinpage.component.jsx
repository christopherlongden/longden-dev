import React from 'react';
import SignInPageContainer from './signinpage.styles'
import SignIn from '../../components/sign-in/sign-in.component';

const SignInPage = () => {
    console.log("hello");

    return (
        <SignInPageContainer>
            <SignIn />
        </SignInPageContainer>
    )
}

export default SignInPage;