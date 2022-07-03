import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';
import Note from "../../../pages/Note";
import convertToMath from "../../../utils/inlineMathRender";

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const TitleStyle = styled(RouterLink)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  textDecoration: "none",
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

NotesCard.propTypes = {
  note: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function NotesCard({ note, index }) {
  const { noteName, lastSaved, id } = note;
  console.log(note);
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