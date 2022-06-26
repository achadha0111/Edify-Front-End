import {render, screen} from "../setupTests";
import Note from "../pages/Note";
import userEvent from "@testing-library/user-event";
import {waitForElementToBeRemoved} from "@testing-library/react";

test("add and edit flashcard", async () => {
    render(<Note/>);
    const flashCardButton = screen.getByLabelText("Insert flashcard");

    await userEvent.click(flashCardButton);

    let questionField = screen.getByRole('textbox', {name:/Question/});
    const answerField = screen.getByRole('textbox', {name:/Answer/});

    await userEvent.type(questionField, "What is this website built in?");
    await userEvent.type(answerField, "React");

    await userEvent.click(screen.getByLabelText(/SaveFlashCard/));

    await waitForElementToBeRemoved(questionField);

    const flashCardCells = screen.getAllByRole('cell', {name:/FlashCard/i});

    expect(flashCardCells.length).toBe(1);
    expect(screen.getByText(/What is this website built in?/i)).toBeInTheDocument();

    let showAnswerButton = screen.getByLabelText(/ShowAnswer/);

    await userEvent.click(showAnswerButton);

    expect(screen.getByText('React')).toBeInTheDocument();

    const editFlashCardButton = screen.getByLabelText(/Edit/);

    await userEvent.click(editFlashCardButton);
    questionField = screen.getByRole('textbox', {name:/Question/});
    await userEvent.type(questionField, "Website?");

    await userEvent.click(screen.getByLabelText(/SaveFlashCard/));

    expect(flashCardCells.length).toBe(1);

    expect(screen.getByText(/Website?/)).toBeInTheDocument();

}, 10000);

test('add flashcard to same deck', async () => {
    render (<Note/>);

    const flashCardButton = screen.getByLabelText("Insert flashcard");

    await userEvent.click(flashCardButton);

    let questionField = screen.getByRole('textbox', {name:/Question/});
    const answerField = screen.getByRole('textbox', {name:/Answer/});

    await userEvent.type(questionField, "What is this website built in?");
    await userEvent.type(answerField, "React");

    await userEvent.click(screen.getByText(/Save/));
    await waitForElementToBeRemoved(screen.queryByRole('button', {name:/Save/}));

    await userEvent.click(screen.getByLabelText("Insert flashcard"));

    await userEvent.type(screen.getByRole('textbox', {name:/Question/}), "Do you like Javascript?");
    await userEvent.type(screen.getByRole('textbox', {name:/Answer/}), "No");

    await userEvent.click(screen.getByText(/Save/));
    await waitForElementToBeRemoved(screen.queryByRole('textbox', {name:/Question/}));

    const flashCardBlocks = screen.getAllByRole('cell', {name:/FlashCard/i});
    const flashcards = screen.getAllByRole('flashcard');

    // Single deck
    expect(flashCardBlocks.length).toEqual(1);

    // With two cards
    expect(flashcards.length).toEqual(2);

}, 10000);

test('add flashcard to new deck', async () => {

    render (<Note/>);

    await userEvent.click(screen.getByLabelText("Insert flashcard"));

    let questionField = screen.getByRole('textbox', {name:/Question/})
    const answerField = screen.getByRole('textbox', {name:/Answer/})

    await userEvent.type(questionField, "What is this website built in?");
    await userEvent.type(answerField, "React");

    await userEvent.click(screen.getByLabelText(/SaveFlashCard/i));
    // await waitForElementToBeRemoved(screen.queryByText(/QuestionLabel/));

    await userEvent.click(screen.getByLabelText(/Add text block/i));

    await userEvent.click(screen.getByLabelText("Insert flashcard"));

    await userEvent.type(screen.getByRole('textbox', {name:/Question/}), "Do you like Javascript?");
    await userEvent.type(screen.getByRole('textbox', {name:/Answer/}), "No");

    await userEvent.click(screen.getByLabelText(/SaveFlashCard/));
    await waitForElementToBeRemoved(screen.queryByLabelText(/QuestionInput/));

    const flashCardBlocks = screen.getAllByRole('cell', {name:/FlashCard/i});
    const flashcards = screen.getAllByRole('flashcard');

    // two decks
    expect(flashCardBlocks.length).toEqual(2);

    // With two cards in total
    expect(flashcards.length).toEqual(2);

}, 10000);

test('open flashcard delete confirmation dialog', async () => {

    render (<Note/>);

    const flashCardButton = screen.getByLabelText("Insert flashcard");

    await userEvent.click(flashCardButton);

    let questionField = screen.getByRole('textbox', {name:/Question/});
    const answerField = screen.getByRole('textbox', {name:/Answer/});

    await userEvent.type(questionField, "What is this website built in?");
    await userEvent.type(answerField, "React");

    await userEvent.click(screen.getByLabelText(/SaveFlashCard/i));
    // await waitForElementToBeRemoved(screen.queryByRole('button', {name:/Save/}));

    await userEvent.click(screen.getByLabelText('DeleteFlashCard'));

    expect(screen.getByText(/Are you sure you want to delete this card?/i)).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText("ConfirmDelete"));

    const flashcards = screen.queryAllByRole('flashcard');

    expect(flashcards.length).toEqual(0);
}, 10000);

test('open flashcard deck delete confirmation dialog', async () => {

    render (<Note/>);

    const flashCardButton = screen.getByLabelText("Insert flashcard");

    await userEvent.click(flashCardButton);

    let questionField = screen.getByRole('textbox', {name:/Question/});
    const answerField = screen.getByRole('textbox', {name:/Answer/});

    await userEvent.type(questionField, "What is this website built in?");
    await userEvent.type(answerField, "React");

    await userEvent.click(screen.getByText(/Save/));
    await waitForElementToBeRemoved(screen.queryByRole('button', {name:/Save/}));

    await userEvent.click(screen.getByRole('button', {name:'Delete deck'}));

    expect(screen.getByText(/Are you sure you want to delete this deck?/)).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText("ConfirmDelete"));

    const flashcardDeck = screen.queryAllByRole('cell', {name: /FlashCard/});

    expect(flashcardDeck.length).toBe(0);

}, 10000);