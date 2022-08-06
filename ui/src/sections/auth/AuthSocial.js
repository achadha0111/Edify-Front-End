// material
import { Stack, Button, Divider, Typography } from '@mui/material';
// component
import Iconify from '../../components/Iconify';
import {useLocation, useNavigate} from "react-router-dom";
import {response} from "msw";
import {UseAuth} from "../../auth/Auth";
// ----------------------------------------------------------------------

export default function AuthSocial(props) {
    const auth = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // const from = location.state.from.pathName ? location.state.from.pathName : "/";
    const handleAuth = () => {
        auth.signIn().then(() => {
            navigate("/home", {replace: true});
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
