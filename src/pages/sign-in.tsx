import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Card from '../components/UI/Card';
import { auth } from '../services/firebase';
import { createBrowserHistory } from 'history';
import { useAppDispatch } from '../hooks/typedReduxHooks';
import { setTasksInitialized } from '../store/tasksSlice';


const StyledSignIn = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 50%;

    @media(max-width: 767px) {
        margin: auto;
        margin-top: 70px; 
    }
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
    let dispatch = useAppDispatch();

    let uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => {
                createBrowserHistory().goBack();
                dispatch(setTasksInitialized(false));
                return false;
            }
        }
    };

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