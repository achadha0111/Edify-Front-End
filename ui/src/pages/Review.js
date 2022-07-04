import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import {useEffect, useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';

// mock
import flashcards from '../_mock/flashcard';
import ReviewFlashCard from "../components/review-elements/ReviewFlashCard";

export default function Review() {

  const [cardsToReview, setCardsToReview] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [flashCardId, setFlashCardId] = useState("");
  const [cardsLeft, setCardsLeft] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('Token')) {
      startReviewSession(flashcards);
    } else {
      navigate("/login");
    }
  }, [flashcards]);

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
  }

  const setCardInteraction = (cardData) => {
    let cardsRemaining = [...cardsToReview];
    let currentCard = cardsRemaining.pop();
    updateDisplayCard(currentCard);
    setCardsToReview(cardsRemaining);
    if (cardsRemaining.length === 0) {
      setCardsLeft(false);
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
            <ReviewFlashCard id= {flashCardId} question={question} answer={answer} cardInteraction={setCardInteraction}/> :
            <Typography variant="p" gutterBottom aria-label="NoCardLeftMessage" className="NoCardLeftMessage">
              No more cards left for today, check back in tomorrow!
            </Typography>}

      </Container>
    </Page>
  );
}
