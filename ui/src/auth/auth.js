import {createContext, useContext, useEffect, useRef, useState} from 'react';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    setPersistence,
    indexedDBLocalPersistence,
    onAuthStateChanged
} from "firebase/auth";
import firebaseApp from "../firebase";
import {useLocation, Navigate, useNavigate} from "react-router-dom";
import {Skeleton, Stack} from "@mui/material";

let authContext = createContext(null);
const provider = new GoogleAuthProvider();

function AuthProvider({children}) {
    let [user, setUser] = useState(null);
    let [preloaderVisible, setPreloaderVisible] = useState(true);
    const firebaseAuth = getAuth(firebaseApp);
    const location = useLocation();
    const navigate = useNavigate();

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
        navigate("/login");
    }



    const checkLogin = async () => {
         return new Promise(function (resolve, reject) {
             onAuthStateChanged(firebaseAuth, (user) => {
                 console.log("Check auth state");
                 setPreloaderVisible(false);
                 if (user) {
                     setUser(user);
                     resolve(user);
                 } else {
                     reject("User not logged in");
                 }
             });
        })
    }

    let value = {user, signIn, signOut, checkLogin, preloaderVisible};

    return <authContext.Provider value={value}> {children} </authContext.Provider>
}

function UseAuth() {
    return useContext(authContext);
}

function RequireAuth({children}) {
    let auth = UseAuth();
    let navigate = useNavigate();
    let location = useLocation();
    const [preloaderVisible, setPreloaderVisible] = useState(auth.preloaderVisible);

    useEffect(() => {
        auth.checkLogin().then(r => {
            setPreloaderVisible(false);
        }).catch(rejection => {
            setPreloaderVisible(false);
            navigate("/login");
        })
    }, []);

    return (
        <>
            {preloaderVisible ?
                <Stack>
                    <Skeleton variant="text"/>
                    <Skeleton variant="text"/>
                    <Skeleton variant="text"/>
                </Stack> : children}
        </>

    )
}

export {RequireAuth, UseAuth, AuthProvider};


