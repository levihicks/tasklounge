import React, { createContext, useState, useEffect } from 'react';
import { authObserver } from '../services/firebase';

interface User {
    uid: string;
    displayName: string;
}

export const AuthContext = createContext<User | null>(null);

export const AuthContextProvider = ({children}: {children: React.ReactNode}) =>{
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        let listener = authObserver((user: any) => {
            setCurrentUser(user);
        },
        () => setCurrentUser(null));
        return () => listener();
    });

    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    );
}
    

