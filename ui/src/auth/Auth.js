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
import {Box, Container, Skeleton, Stack} from "@mui/material";
import {authContext} from "./AuthContext";
const provider = new GoogleAuthProvider();



function AuthProvider({children}) {
    let [user, setUser] = useState(null);
    let [preloaderVisible, setPreloaderVisible] = useState(true);
    const firebaseAuth = getAuth(firebaseApp);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state ? location.state.from.pathname : "/"

    async function fetchIdToken() {
        return new Promise((resolve, reject) => {
            firebaseAuth.currentUser.getIdToken().then(idToken => {
                resolve(idToken);
            }).catch(err => {
                reject(err);
            })
        })
    }

    const signIn = async () => {
        try {
            await setPersistence(firebaseAuth, indexedDBLocalPersistence);
            const result = await signInWithPopup(firebaseAuth, provider);
            setUser(result.user);
            fetchIdToken().then(idToken => {
                 fetch("/notes-api/signon", {
                    method: 'POST',
                    mode: 'cors',
                     headers: {
                         'Content-Type': 'application/json',
                         'Authorization': idToken
                     }
                }).then(_ => {
                     navigate(from, {replace: true});
                 });
            }).catch(err => {
                console.log(err);
                navigate("/login");
            });
        } catch (e) {
            const errorCode = e.code;
            const errorMessage = e.message;
            console.log(e)
            // The email of the user's account used.
            // const email = e.customData.email;
            // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(e);
        }
    }

    const signOut = async () => {
        const auth = getAuth(firebaseApp);
        await auth.signOut();
        setUser(null);
        navigate("/login");
    }



    const checkLogin = async () => {
         return new Promise(function (resolve, reject) {
             onAuthStateChanged(firebaseAuth, (user) => {
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

    let value = {user, signIn, signOut, checkLogin, preloaderVisible, fetchIdToken};

    return <authContext.Provider value={value}> {children} </authContext.Provider>
}

function UseAuth() {
    return useContext(authContext);
}

function LoginPreloader() {
    return <Container>
        <Box justifyContent="center"
             alignItems="center">
            <Skeleton variant="text" height={118}/>
            <Skeleton variant="text" height={118}/>
            <Skeleton variant="text" height={118}/>
        </Box></Container>;
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
            navigate("/login", {state: {from: location}});
        })
    }, []);

    return (
        <>
            {(preloaderVisible) ?
                <LoginPreloader/> : children}

        </>
    )
}

export {RequireAuth, UseAuth, AuthProvider};


