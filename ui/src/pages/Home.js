import {Link as RouterLink, Route, Switch, useNavigate} from 'react-router-dom';
// material
import {Grid, Button, Container, Stack, Typography, CircularProgress} from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { NotesCard, NotesSort, NotesSearch } from '../sections/@dashboard/notes';
// mock
import POSTS from '../_mock/blog';
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import Note from "./Note";
import firebaseApp from "../firebase";
import {styled} from "@mui/material/styles";

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------
const Progress = styled('div')({
  margin: "auto",
  marginTop: "auto"
});

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('Token')) {
      fetchLatestNotes().then(r =>
          setNotes(r["noteInfoList"])
      ).catch(err => {
        console.log(err);
        // setPreloaderVisible(false);
      }).finally(() => {
            setPreloaderVisible(false)
      });

    } else {
      navigate("/login");
    }
  }, []);

  async function fetchLatestNotes() {
    const response = await fetch("/notes-api/getallnoteinfo", {
      method: "GET",
      mode: 'cors',
    });
    return response.json();
  }

  return (
    <Page title="Notes | Home">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            My Notes
          </Typography>
          <Button variant="contained" component={RouterLink} to="/home/note" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Note
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <NotesSearch posts={POSTS} />
          <NotesSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3} alignItems="center">

          {preloaderVisible?
              <Progress className="DataFetchPreloader">
                <CircularProgress />
              </Progress > :
              notes.map((note, index) => (
                <NotesCard key={note.id} note={note} index={index} />
              ))}
        </Grid>
      </Container>
    </Page>
  );
}
