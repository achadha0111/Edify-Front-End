import {render, screen} from "../setupTests";
import NewNote from "../pages/NewNote";
import userEvent from "@testing-library/user-event";
import {waitForElementToBeRemoved} from "@testing-library/react";

test("add and edit flashcard", async () => {
    render(<NewNote/>);
    const flashCardButton = screen.getByLabelText("Insert flashcard");

    await userEvent.click(flashCardButton);

    let questionField = screen.getByRole('textbox', {name:/Question/});
    const answerField = screen.getByRole('textbox', {name:/Answer/});

    await userEvent.type(questionField, "What is this website built in?");
    await userEvent.type(answerField, "React");

    let saveFlashCardButton = screen.getByRole('button', {name:/Save/});

    await userEvent.click(saveFlashCardButton);
    await waitForElementToBeRemoved(questionField);

    const flashCardCells = screen.getAllByRole('cell', {name:/FlashCard/i});

    expect(flashCardCells.length).toBe(1);
    expect(screen.getByText(/What is this website built in?/i)).toBeInTheDocument();

    let showAnswerButton = screen.getByRole('button', {name:/Show Answer/});

    await userEvent.click(showAnswerButton);

    expect(screen.getByText('React')).toBeInTheDocument();

    const editFlashCardButton = screen.getByRole('button', {name:/Edit/});

    await userEvent.click(editFlashCardButton);
    questionField = screen.getByRole('textbox', {name:/Question/});
    await userEvent.type(questionField, "Website?");

    saveFlashCardButton = screen.getByRole('button', {name:/Save/});

    await userEvent.click(saveFlashCardButton);
    await waitForElementToBeRemoved(saveFlashCardButton);

    expect(flashCardCells.length).toBe(1);

    expect(screen.getByText(/Website?/i)).toBeInTheDocument();

}, 10000);

test('add flashcard to same deck', async () => {
    render (<NewNote/>);

    const flashCardButton = screen.getByLabelText("Insert flashcard");

    await userEvent.click(flashCardButton);

    let questionField = screen.getByRole('textbox', {name:/Question/});
    const answerField = screen.getByRole('textbox', {name:/Answer/});

    await userEvent.type(questionField, "What is this website built in?");
    await userEvent.type(answerField, "React");

    await userEvent.click(screen.getByRole('button', {name:/Save/}));
    await waitForElementToBeRemoved(screen.queryByRole('button', {name:/Save/}));

    await userEvent.click(screen.getByLabelText("Insert flashcard"));

    await userEvent.type(screen.getByRole('textbox', {name:/Question/}), "Do you like Javascript?");
    await userEvent.type(screen.getByRole('textbox', {name:/Answer/}), "No");

    await userEvent.click(screen.queryByRole('button', {name:/Save/}));
    await waitForElementToBeRemoved(screen.queryByRole('textbox', {name:/Question/}));

    const flashCardBlocks = screen.getAllByRole('cell', {name:/FlashCard/i});
    const flashcards = screen.getAllByRole('flashcard');

    // Single deck
    expect(flashCardBlocks.length).toEqual(1);

    // With two cards
    expect(flashcards.length).toEqual(2);

}, 10000);

test('add flashcard to new deck', async () => {

    render (<NewNote/>);

    const flashCardButton = screen.getByLabelText("Insert flashcard");

    await userEvent.click(flashCardButton);

    let questionField = screen.getByRole('textbox', {name:/Question/});
    const answerField = screen.getByRole('textbox', {name:/Answer/});

    await userEvent.type(questionField, "What is this website built in?");
    await userEvent.type(answerField, "React");

    await userEvent.click(screen.getByRole('button', {name:/Save/}));
    await waitForElementToBeRemoved(screen.queryByRole('button', {name:/Save/}));

    await userEvent.click(screen.getByLabelText(/Add text block/i));

    await userEvent.click(screen.getByLabelText("Insert flashcard"));

    await userEvent.type(screen.getByRole('textbox', {name:/Question/}), "Do you like Javascript?");
    await userEvent.type(screen.getByRole('textbox', {name:/Answer/}), "No");

    await userEvent.click(screen.queryByRole('button', {name:/Save/}));
    await waitForElementToBeRemoved(screen.queryByRole('textbox', {name:/Question/}));

    const flashCardBlocks = screen.getAllByRole('cell', {name:/FlashCard/i});
    const flashcards = screen.getAllByRole('flashcard');

    // two decks
    expect(flashCardBlocks.length).toEqual(2);

    // With two cards
    expect(flashcards.length).toEqual(2);

}, 10000);

test('open flashcard delete confirmation dialog', async () => {

    render (<NewNote/>);

    const flashCardButton = screen.getByLabelText("Insert flashcard");

    await userEvent.click(flashCardButton);

    let questionField = screen.getByRole('textbox', {name:/Question/});
    const answerField = screen.getByRole('textbox', {name:/Answer/});

    await userEvent.type(questionField, "What is this website built in?");
    await userEvent.type(answerField, "React");

    await userEvent.click(screen.getByRole('button', {name:/Save/}));
    await waitForElementToBeRemoved(screen.queryByRole('button', {name:/Save/}));

    await userEvent.click(screen.getByRole('button', {name:'DeleteFlashCard'}));

    expect(screen.getByText(/Are you sure you want to delete this card?/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', {name: 'Yes'}));

    const flashcards = screen.queryAllByRole('flashcard');

    expect(flashcards.length).toEqual(0);
}, 10000);

test('open flashcard deck delete confirmation dialog', async () => {

    render (<NewNote/>);

    const flashCardButton = screen.getByLabelText("Insert flashcard");

    await userEvent.click(flashCardButton);

    let questionField = screen.getByRole('textbox', {name:/Question/});
    const answerField = screen.getByRole('textbox', {name:/Answer/});

    await userEvent.type(questionField, "What is this website built in?");
    await userEvent.type(answerField, "React");

    await userEvent.click(screen.getByRole('button', {name:/Save/}));
    await waitForElementToBeRemoved(screen.queryByRole('button', {name:/Save/}));

    await userEvent.click(screen.getByRole('button', {name:'Delete deck'}));

    expect(screen.getByText(/Are you sure you want to delete this deck?/)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', {name: 'Yes'}));

    const flashcardDeck = screen.queryAllByRole('cell', {name: /FlashCard/});

    expect(flashcardDeck.length).toBe(0);

}, 10000);