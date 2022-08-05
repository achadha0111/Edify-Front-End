import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
// material
import {
  Stack,
  Container,
  Typography,

} from '@mui/material';
// components
import Page from '../components/Page';
import ReviewFlashCard from "../components/review-elements/ReviewFlashCard";

export default function Review() {

  const [cardsToReview, setCardsToReview] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [flashCardId, setFlashCardId] = useState("");
  const [cardsLeft, setCardsLeft] = useState(false);
  const [noteName, setNoteName] = useState("");
  const [noteId, setNoteId] = useState("");

  useEffect(() => {
    fetchReviewFlashcards().then((reviewCards) => {
      startReviewSession(reviewCards["flashcardInfoList"]);
    });
  }, []);

  async function fetchReviewFlashcards() {
    const response = await fetch("/notes-api/getallflashcardinfo", {
      method: "GET",
      mode: 'cors',
    })

    return response.json();
  }

  const startReviewSession = (cards) => {
    const reviewFlashcards = [...cards];
    let currentCard = reviewFlashcards.pop();
    if (cards.length !== 0) {
      updateDisplayCard(currentCard);
      setCardsLeft(true);
    }
    setCardsToReview(reviewFlashcards);
  }

  const updateDisplayCard = (cardToShow) => {
    setQuestion(cardToShow.question);
    setAnswer(cardToShow.answer);
    setFlashCardId(cardToShow.id);
    setNoteName(cardToShow.noteNoteName);
    setNoteId(cardToShow.noteId);
  }

  const recordInteraction = (cardData) => {
    let cardsRemaining = [...cardsToReview];
    if (cardsRemaining.length === 0) {
      setCardsLeft(false);
    } else {
      let currentCard = cardsRemaining.pop();
      updateDisplayCard(currentCard);
      setCardsToReview(cardsRemaining);
    }
  };

  return (
    <Page title="Notes | Review">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Review Flashcards
          </Typography>
        </Stack>
        {cardsLeft ?
            <ReviewFlashCard id= {flashCardId}
                             noteName={noteName}
                             noteId={noteId}
                             question={question}
                             answer={answer} cardInteraction={recordInteraction}/> :
            <Typography variant="p" gutterBottom aria-label="NoCardLeftMessage" className="NoCardLeftMessage">
              No more cards left for today, check back in tomorrow!
            </Typography>}
      </Container>
    </Page>
  );
}
