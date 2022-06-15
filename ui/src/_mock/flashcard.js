import {faker} from "@faker-js/faker";

const FLASHCARD_QUESTIONS = [
    "What's the counterpart of an electron called?",
    "What's the quadratic formula?",
    "What command in pandas loads a csv dataframe?",
    "_____ must be used in place of inheritance in React",
    "How many microns in a cm?",
    "What's the fermi level?",
    "What symbol is used for a quantum NOT gate?"
];

const FLASHCARD_ANSWERS = [
    "Hole",
    "$x=\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$",
    "pandas.read_csv",
    "Composition",
    "10000",
    "Highest energy level occupied by an electron at 0K",
    "X/CNOT"
];

const DECK_NAME = "TEST DECK";

const NOTE_NAME = "TEST NOTE";

const flashcards = [...Array(7)].map((_, index) => ({
    id: faker.datatype.uuid(),
    question: FLASHCARD_QUESTIONS[index],
    answer: FLASHCARD_ANSWERS[index],
    deck_name: DECK_NAME,
    note_name: NOTE_NAME
}));


export default flashcards;