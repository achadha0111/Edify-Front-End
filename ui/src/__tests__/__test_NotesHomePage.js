import {customBeforeEach, render, screen, setupMockZeppelinServer} from "../setupTests";
import {waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import Home from "../pages/Home";
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import userEvent from "@testing-library/user-event";

customBeforeEach();

let notesInfo = {"noteInfoList": [
        {id: 1, lastSaved: Date.now(), noteName: "TestNote1"},
        {id: 2, lastSaved: Date.now(), noteName: "TestNote2"},
        {id: 3, lastSaved: Date.now(), noteName: "TestNote3"}]};

const deleteConfirm = {
    "message": "1",
    "success": true
}

const server = setupServer(
    rest.get('/notes-api/getallnoteinfo', (req, res, ctx) => {
        return res(ctx.json(notesInfo))
    }),

    rest.post('/notes-api/deletenote', (req, res, ctx) => {
        notesInfo = {"noteInfoList": [
                {id: 2, lastSaved: Date.now(), noteName: "TestNote2"},
                {id: 3, lastSaved: Date.now(), noteName: "TestNote3"}]};
        return (res(ctx.json(deleteConfirm)))
    })
);

beforeAll(() => server.listen());
afterAll(() => server.close())

test('it should display cards with a title and date of last update', async () => {
    render(<Home/>);

    await waitFor(() => screen.findAllByLabelText("NoteTitle"));

    const titles = screen.getAllByLabelText("NoteTitle");
    const dates = screen.getAllByLabelText("LastUpdate");
    expect(titles.length).toBeGreaterThanOrEqual(0);
    expect(dates.length).toBeGreaterThanOrEqual(0);
    titles.forEach(link => {
        expect(link).toHaveAttribute('href');
    })

});

test('clicking delete icon should remove note from homepage', async() => {
    render(<Home/>)

    await waitFor(() => screen.findAllByLabelText("NoteTitle"));

    const deleteNoteButton = screen.getAllByLabelText("DeleteNote");

    await userEvent.click(deleteNoteButton[0]);

    await waitForElementToBeRemoved(screen.queryByText('TestNote1'));

    const remainingNotes = screen.getAllByLabelText("NoteTitle");

    expect(remainingNotes.length).toBe(2);
    expect(screen.getByText(/TestNote2/)).toBeInTheDocument();
    expect(screen.getByText(/TestNote3/)).toBeInTheDocument();
});


afterEach(() => {
    jest.restoreAllMocks();
});