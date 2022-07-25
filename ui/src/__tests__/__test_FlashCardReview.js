import {customBeforeEach, render, screen} from "../setupTests";
import Review from "../pages/Review";
import userEvent from "@testing-library/user-event";
import {waitFor} from "@testing-library/react";
import {setupServer} from "msw/node";
import {rest} from "msw";

customBeforeEach();

const flashcardInfo = {"flashcardInfoList": [
        {id: 1, question: "What's the capital of Switzerland?", answer: "Bern", noteId: 1, noteNoteName: "My Note"},
        {id: 2, question: "When was graphene isolated?", answer: "2003", noteId: 2, noteNoteName: "My Note"},
        {id: 3, question: "When did India become independent?", answer: "1957", noteId: 3, noteNoteName: "My Note"}]
};

const server = setupServer(
    rest.get("/notes-api/getallflashcardinfo", (req, res, ctx) => {
        return res(ctx.json(flashcardInfo))
    }),
);

beforeAll(() => server.listen());
afterAll(() => server.close())

test('carrying out a flashcard review', async () => {
    render(<Review/>);

    await waitFor(() => screen.findByLabelText("DisplayAnswer"));

    for (let cardIndex = 0; cardIndex <2; cardIndex++) {
        let showAnswerButton = screen.getByLabelText("DisplayAnswer");
        await userEvent.click(showAnswerButton);
        expect(screen.getByLabelText("RecordRemember")).toBeInTheDocument();
        let recordRecallButton = screen.getByLabelText("RecordRemember");
        await userEvent.click(recordRecallButton);
    }
});

test('displaying end of review message', async () => {
    render(<Review/>);

    await waitFor(() => screen.findAllByLabelText("DisplayAnswer"));

    for (let cardIndex = 0; cardIndex <=2; cardIndex++) {
        let showAnswerButton = screen.getByLabelText("DisplayAnswer");
        await userEvent.click(showAnswerButton);
        let recordRecallButton = screen.getByLabelText("RecordRemember");
        await userEvent.click(recordRecallButton);
    }
    expect(screen.getByLabelText("NoCardLeftMessage")).toBeInTheDocument();
});

afterEach(() => {
    jest.restoreAllMocks();
});