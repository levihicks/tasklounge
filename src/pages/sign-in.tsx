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

const StyledCard = styled(Card)`
    text-align: center;
    margin-bottom: 50px;
`;

const SignIn = () => {
    return (
        <StyledSignIn>
            <StyledCard>
                <SignInHeading>Sign In</SignInHeading>
            </StyledCard>
            <StyledFirebaseAuth firebaseAuth={auth} uiConfig={uiConfig} />
        </StyledSignIn>
    )
}

export default SignIn;