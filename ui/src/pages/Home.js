import {Link as RouterLink, Route, Switch} from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { NotesCard, NotesSort, NotesSearch } from '../sections/@dashboard/notes';
// mock
import POSTS from '../_mock/blog';
import {useEffect, useState} from "react";
import Note from "./Note";

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchLatestNotes().then(r =>
        setNotes(r["noteInfoList"])
    );
  }, [])

  async function fetchLatestNotes() {
    const response = await fetch("/notes-api/getallnoteinfo", {
      method: "GET",
      mode: 'cors',
    })

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

        <Grid container spacing={3}>
          {notes.map((post, index) => (
            <NotesCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
