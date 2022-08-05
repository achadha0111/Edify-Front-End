import {createContext, useContext, useState} from 'react';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    setPersistence,
    indexedDBLocalPersistence,
    onAuthStateChanged
} from "firebase/auth";
import firebaseApp from "../firebase";
import {useLocation, Navigate} from "react-router-dom";

let authContext = createContext(null);
const provider = new GoogleAuthProvider();

function AuthProvider({children}) {
    let [user, setUser] = useState(null);
    let [preloaderVisible, setPreloaderVisible] = useState(true);
    const firebaseAuth = getAuth(firebaseApp);
    const location = useLocation();

    const signIn = async () => {
        try {
            await setPersistence(firebaseAuth, indexedDBLocalPersistence);
            const result = await signInWithPopup(firebaseAuth, provider);
            setUser(result.user);
        } catch (e) {
            const errorCode = e.code;
            const errorMessage = e.message;
            // The email of the user's account used.
            const email = e.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(e);
        }
    }

    const signOut = async () => {
        const auth = getAuth(firebaseApp);
        await auth.signOut();
    }

    let value = {user, signIn, signOut, preloaderVisible};

    onAuthStateChanged(firebaseAuth, (user) => {

        if (user) {
            setPreloaderVisible(false);
            setUser(user);
        } else {
            return <Navigate to = "/login" state={{from: location}} replace />
        }

    });

    return <authContext.Provider value={value}> {children} </authContext.Provider>
}

function UseAuth() {
    return useContext(authContext);
}

function RequireAuth({children}) {
    let auth = UseAuth();
    const location = useLocation();

    if (!auth.user) {
        return <Navigate to = "/login" state={{from: location}} replace />
    }
    return children
}

export {RequireAuth, UseAuth, AuthProvider};


