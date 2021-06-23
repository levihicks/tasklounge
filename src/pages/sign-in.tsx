import React from 'react';
import styled from 'styled-components';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Card from '../components/UI/Card';
import { auth, uiConfig } from '../services/firebase';

const StyledSignIn = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 50%;
`;

const SignInHeading = styled.div`
    font-size: ${props => props.theme.fontSizes.large};
    font-weight: bold;
`;

const SignIn = () => {
    return (
        <StyledSignIn>
                <Card styleProps={{ textAlign: 'center', marginBottom: '50px' }}>
                    <SignInHeading>Sign In</SignInHeading>
                </Card>
                <StyledFirebaseAuth firebaseAuth={auth} uiConfig={uiConfig} />
        </StyledSignIn>
    )
}

export default SignIn;