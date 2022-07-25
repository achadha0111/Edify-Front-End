import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import {styled} from '@mui/material/styles';
import {Card, Grid, Typography, CardContent, Tooltip} from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";

// ----------------------------------------------------------------------

const TitleStyle = styled(RouterLink)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  textDecoration: "none",
});

const CardActionsStyle = styled(CardActions)({
    display: 'flex',
    alignItems: 'flex-end',
});

const StyledButton = styled(Button)({
    marginLeft: 'auto'
})

// ----------------------------------------------------------------------

NotesCard.propTypes = {
  note: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function NotesCard({ note, index, deleteNote }) {
  const { noteName, lastSaved, id } = note;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const triggerDelete = () => {
      deleteNote(id);
  }

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
          <CardActionsStyle className="NotesCardAction">
              <Tooltip title="Delete note">
                  <StyledButton size="small" aria-label="DeleteNote" onClick={triggerDelete}><DeleteIcon/></StyledButton>
              </Tooltip>

          </CardActionsStyle>
        </Card>
      </Grid>
  );
}