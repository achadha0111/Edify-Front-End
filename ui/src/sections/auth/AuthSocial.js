// material
import { Stack, Button, Divider, Typography } from '@mui/material';
// component
import Iconify from '../../components/Iconify';
import {GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged} from "firebase/auth";
import firebaseApp from "../../firebase";
import {useNavigate} from "react-router-dom";
import {response} from "msw";
// ----------------------------------------------------------------------
const provider = new GoogleAuthProvider();

export default function AuthSocial(props) {
    const auth = getAuth(firebaseApp);
    const navigate = useNavigate();
    const handleAuth = () => {
        signInWithPopup(auth, provider).then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                sessionStorage.setItem('Token', token);
                sessionStorage.setItem('User Name', user.displayName);
                navigate("/home/app");
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleAuth}>
          <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon="bxl:microsoft" color="#000" width={22} height={22} />
        </Button>

      </Stack>
    </>
  );
}
