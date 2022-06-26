import {render as rtlRender, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    Link,
    Route,
    BrowserRouter as Router,
    Switch,
    useLocation, BrowserRouter,
} from 'react-router-dom';
import App from '../App';
import {HelmetProvider} from "react-helmet-async";
import Note from "../pages/Note";
import {setupServer} from "msw/node";
import {rest} from "msw";
import uid from "../utils/uid";
import Home from "../pages/Home";

const render = (ui, {route = '/'} = {}) => {
    window.history.pushState({}, 'Home page', route);

    return rtlRender(ui, {wrapper: Router});
}

const mockNote = {"note":
        {
            "blocks": [
                {
                    id: uid(),
                    noteName: "TestNote1",
                    noteType: "FlashCard",
                    data: [{question: "A", answer: "B"}]
                }
            ]
        }
};

const notesInfo = {"noteInfoList": [
        {id: 1, updatedAt: "27-06-22", noteName: "TestNote1"},
        {id: 2, updatedAt: "28-06-22", noteName: "TestNote2"},
        {id: 3, updatedAt: "24-06-22", noteName: "TestNote3"}]};

const server = setupServer(
    rest.get('/notes-api/getnote', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json(mockNote))
    }),

    rest.get('/notes-api/getallnoteinfo', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json(notesInfo))
    }),
);

beforeAll(() => server.listen());
afterAll(() => server.close())

test('navigating to new note page', () => {
    render(
        <HelmetProvider>
            <App />
        </HelmetProvider>
        );

    expect(screen.getByText(/My Notes/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/New Note/i));

    expect(screen.getByText(/New Note/i)).toBeInTheDocument();
});

// test('landing on a bad page', () => {
//     render(<App />, {route: '/something-that-does-not-match'});
//
//     expect(screen.getByText(/no match/i)).toBeInTheDocument();
// })
//
test('opening existing note', async () => {
    render(
        <HelmetProvider>
            <App />
        </HelmetProvider>
    );

    await waitFor(() => screen.findAllByLabelText("NoteTitle"));

    const titles = screen.getAllByLabelText("NoteTitle");

    await userEvent.click(titles[0]);

    await waitFor(() => screen.findByLabelText("FlashCard"));

    const flashcards = screen.getAllByRole('flashcard');

    expect(flashcards.length).toEqual(1);
});