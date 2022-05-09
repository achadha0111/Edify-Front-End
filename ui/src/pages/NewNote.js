import {styled} from "@mui/material/styles";
import { Link as RouterLink } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import ShortTextIcon from '@mui/icons-material/ShortText';
import SaveIcon from '@mui/icons-material/Save';
// @mui
import {Card, Link, Container, Typography, Stack, Button, Grid, Box, TextField} from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';

import Page from '../components/Page';
import Iconify from "../components/Iconify";
import {BlogPostCard, BlogPostsSort, NotesSearch} from "../sections/@dashboard/notes";
import POSTS from "../_mock/blog";

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(7, 5, 0, 7),
    },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

export default function NewNote() {
    const smUp = useResponsive('up', 'sm');

    const mdUp = useResponsive('up', 'md');

    return (
        <Page title="New Note">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        {/* TODO This must be editable*/}
                        <TextField id="filled-basic" label="Untitled" variant="standard" />
                    </Typography>
                    <Box>
                        <Button variant="text" component={RouterLink} to="/home/newnote">
                            <SaveIcon/>
                        </Button>
                        <Button variant="text" component={RouterLink} to="/home/newnote">
                            <ShortTextIcon/>
                        </Button>
                        <Button variant="text" component={RouterLink} to="/home/newnote">
                            <SubtitlesIcon/>
                        </Button>
                        <Button variant="text" component={RouterLink} to="/home/newnote">
                            <CodeIcon/>
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Page>
    );
}