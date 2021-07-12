import firebase from 'firebase';
import 'firebase/auth';
import { createBrowserHistory } from 'history';
import Task from '../models/task';

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
  }
);

export const db = firebase.database();

export const userTasksRef = (uid: string) => db.ref(`users/${uid}/tasks`);

export const addTaskHandler = (uid: string, newTask: Task) => userTasksRef(uid).push(newTask);

export const removeTaskHandler = (uid: string, taskId: string) => {
    userTasksRef(uid).child(taskId).remove();
};

export const updateTaskHandler = (uid: string, taskId: string, newData: {[key: string]: any}) => {
    let newDataObj: {[key: string]: any} = {};
    Object.keys(newData).forEach((k) => {
        newDataObj[taskId + '/' + k] = newData[k];
    })
    userTasksRef(uid).update(newDataObj);
};

export const userCategoriesRef = (uid: string) => db.ref(`users/${uid}/categories`);

export const setCategoriesHandler = (uid: string, newCategories: string[]) => {
    userCategoriesRef(uid).set(newCategories);
}
    