import firebase from 'firebase';
import 'firebase/auth';
import { createBrowserHistory } from 'history';

let firebaseConfig = {
    apiKey: 'AIzaSyD5AFcKYIhJwxsujiHamKfZ0NxJgc0s16M',
    authDomain: 'tasklounge.firebaseapp.com',
    databaseURL: 'https://tasklounge-default-rtdb.firebaseio.com',
    projectId: 'tasklounge',
    storageBucket: 'tasklounge.appspot.com',
    messagingSenderId: '130398443109',
    appId: '1:130398443109:web:6efecf7659120b67d2588c'
};

if(firebase.apps.length === 0)
    firebase.initializeApp(firebaseConfig);

export const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => {
            createBrowserHistory().goBack();
            return false;
        }
    }
};

export const auth = firebase.auth();

export const signOutHandler = () => auth.signOut();

export const authObserver = (success: (user: firebase.User) => void, failure: () => void) => 
  auth.onAuthStateChanged((user) => {
      if(user) success(user);
      else failure();
  });
