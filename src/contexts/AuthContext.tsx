import React, { createContext, useState, useEffect } from 'react';
import { authObserver } from '../services/firebase';

interface User {
    uid: string;
    displayName: string;
}

export const AuthContext = createContext<User | null | false>(null);

export const AuthContextProvider = ({children}: {children: React.ReactNode}) =>{
    const [currentUser, setCurrentUser] = useState<User | null | false>(null);

    useEffect(() => {
        let listener = authObserver((user: any) => {
            setCurrentUser(user);
        },
        () => setCurrentUser(false));
        return () => listener();
    });

    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    );
}
    

