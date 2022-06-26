import {render, screen} from "../setupTests";
import {waitFor} from "@testing-library/react";
import Home from "../pages/Home";
import {rest} from 'msw'
import {setupServer} from 'msw/node'

const notesInfo = {"noteInfoList": [
    {id: 1, updatedAt: "27-06-22", noteName: "TestNote1"},
    {id: 2, updatedAt: "28-06-22", noteName: "TestNote2"},
    {id: 3, updatedAt: "24-06-22", noteName: "TestNote3"}]};

const server = setupServer(
    // capture "GET /greeting" requests
    rest.get('/notes-api/getallnoteinfo', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json(notesInfo))
    }),
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



afterEach(() => {
    jest.restoreAllMocks();
});