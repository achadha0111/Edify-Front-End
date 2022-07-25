import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import {styled } from '@mui/material/styles';
import { Card, Grid, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

const TitleStyle = styled(RouterLink)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  textDecoration: "none",
});

// ----------------------------------------------------------------------

NotesCard.propTypes = {
  note: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function NotesCard({ note, index }) {
  const { noteName, lastSaved, id } = note;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  return (
      <Grid item xs={12} sm={latestPostLarge ? 8 : 6} md={latestPostLarge ? 4 : 3}>
        <Card>
          <CardContent>
            <Typography aria-label="LastUpdate" gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
              {fDate(lastSaved)}
            </Typography>

            <TitleStyle
                aria-label="NoteTitle"
                to={`/home/note/${id}`}
                color="inherit"
                variant="subtitle2"
                underline="hover"
                component={RouterLink}
                sx={{
                  ...(latestPostLarge && { typography: 'h5', height: 60 }),
                  ...((latestPostLarge || latestPost) && {
                    color: 'common.black',
                  }),
                }}
            >
              {noteName}
            </TitleStyle>
          </CardContent>
        </Card>
      </Grid>
  );
}