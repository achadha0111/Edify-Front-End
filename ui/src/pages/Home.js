import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Grid, Button, Container, Stack, Typography, CircularProgress} from '@mui/material';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { NotesCard, NotesSort } from '../sections/@dashboard/notes';
import {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import {UseAuth} from "../auth/Auth";
import {MakeRequest} from "../api/apiRequest";

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
  const auth = UseAuth();

  useEffect(() => {
    if (auth.user) {
      fetchLatestNotes().then(r =>
          setNotes(r["noteInfoList"])
      ).catch(err => {
        // TODO Add proper error handling
        console.log(err);
      }).finally(() => {
        setPreloaderVisible(false)
      });
    }
  });

  async function fetchLatestNotes() {
    const notes =  await MakeRequest("GET", "/notes-api/getallnoteinfo", auth);
    return notes;
  }

  async function deleteNote(id) {
   await MakeRequest("POST", "/notes-api/deletenote?id="+id, auth)
    .then(_ => {
      const remainingNotes = [...notes];
      const index = remainingNotes.map(notes => notes.id).indexOf(id);
      remainingNotes.splice(index, 1);
      setNotes(remainingNotes);
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <Page title="Notes | Home">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            My Notes
          </Typography>
          <Button variant="contained" component={RouterLink} to="/note" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Note
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          {/*<NotesSearch posts={POSTS} />*/}
          <NotesSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3} alignItems="center">
          {preloaderVisible?
              <Progress className="DataFetchPreloader">
                <CircularProgress />
              </Progress > :
              notes.map((note, index) => (
                <NotesCard key={note.id} note={note} index={index} deleteNote={deleteNote}/>
              ))}
        </Grid>
      </Container>
    </Page>
  );
}
