import NewNote from "../pages/NewNote"
import {render, screen} from "../setupTests";
import userEvent from "@testing-library/user-event";
import {queryByRole, waitForElementToBeRemoved, within} from "@testing-library/react";

/* TODO Tests to Add:
*   1. Test adding blocks between blocks
*   2. DONE flashcard being added to new deck
*   3. DONE flashcard being added to existing deck
*   4. DONE Test flashcard being edited
*   5. DONE flashcard delete
*   6. DONE deck delete
*   7. Test block delete  */

test("displaying startup page with initial block", () => {
    render(<NewNote/>);

    const cells = screen.getAllByRole('cell', {name:/RichText/i});

    expect(cells.length).toBe(1);
});

test("clicking text button adds a text block", async () => {
    render(<NewNote/>);

    const textBoxButton = screen.getByLabelText("Add text block");

    await userEvent.click(textBoxButton);

    const cells = screen.getAllByRole('cell', {name:/RichText/i});

    expect(cells.length).toBe(2);
});

test("clicking code button adds a code cell", async () => {
    render(<NewNote/>);

    const codeBlockButton = screen.getByLabelText("Insert code block");

    await userEvent.click(codeBlockButton);

    const codeCell = screen.getAllByRole('cell', {name:/Code/i});

    expect(codeCell.length).toBe(1);
});

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


test('delete flashcard and delete flashcard deck', async () => {
    render (<NewNote/>);

    const flashCardButton = screen.getByLabelText("Insert flashcard");

    await userEvent.click(flashCardButton);

    let questionField = screen.getByRole('textbox', {name:/Question/});
    const answerField = screen.getByRole('textbox', {name:/Answer/});

    await userEvent.type(questionField, "What is this website built in?");
    await userEvent.type(answerField, "React");

    let saveFlashCardButton = screen.getByRole('button', {name:/Save/});

    await userEvent.click(saveFlashCardButton);
    await waitForElementToBeRemoved(questionField);

    const deleteFlashCardButton = screen.getByRole('button', {name: /DeleteFlashCard/i});

    await userEvent.click(deleteFlashCardButton);

    expect(screen.queryByRole('flashcard')).not.toBeInTheDocument();
    let flashCardCells = screen.getAllByRole('cell', {name:/FlashCard/i});

    expect(flashCardCells.length).toEqual(1);

    const deleteDeckButton = screen.getByRole('button', {name: /Delete deck/i});

    await userEvent.click(deleteDeckButton);

    flashCardCells = screen.queryAllByRole('cell', {name:/FlashCard/i});

    expect(flashCardCells.length).toEqual(0);

}, 6000);

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

// test('open flashcard delete confirmation dialog', async () => {
//
//     render (<NewNote/>);
//
//     const flashCardButton = screen.getByLabelText("Insert flashcard");
//
//     await userEvent.click(flashCardButton);
//
//     let questionField = screen.getByRole('textbox', {name:/Question/});
//     const answerField = screen.getByRole('textbox', {name:/Answer/});
//
//     await userEvent.type(questionField, "What is this website built in?");
//     await userEvent.type(answerField, "React");
//
//     await userEvent.click(screen.getByRole('button', {name:/Save/}));
//     await waitForElementToBeRemoved(screen.queryByRole('button', {name:/Save/}));
//
//     await userEvent.click(screen.getByRole('button', {name:'Delete'}));
//
//     expect(screen.getByText(/Are you sure you want to delete this card?/i)).toBeInTheDocument();
//
//     await userEvent.click(screen.getByRole('button', {name: 'Yes'}));
//
//     const flashcards = screen.getAllByRole('flashcard');
//
//     expect(flashcards.length).toEqual(0);
// }, 10000);
//
// test('open flashcard deck delete confirmation dialog', async () => {
//
//     render (<NewNote/>);
//
//     const flashCardButton = screen.getByLabelText("Insert flashcard");
//
//     await userEvent.click(flashCardButton);
//
//     let questionField = screen.getByRole('textbox', {name:/Question/});
//     const answerField = screen.getByRole('textbox', {name:/Answer/});
//
//     await userEvent.type(questionField, "What is this website built in?");
//     await userEvent.type(answerField, "React");
//
//     await userEvent.click(screen.getByRole('button', {name:/Save/}));
//     await waitForElementToBeRemoved(screen.queryByRole('button', {name:/Save/}));
//
//     await userEvent.click(screen.getByRole('button', {name:'Delete deck'}));
//
//     expect(screen.getByText(/Are you sure you want to delete this deck?/)).toBeInTheDocument();
//
//     await userEvent.click(screen.getByRole('button', {name: 'Yes'}));
//
//     const flashcardDeck = screen.getAllByRole('cell', {name: /FlashCard/});
//
//     expect(flashcardDeck.length).toEqual(0);
//
// }, 10000);