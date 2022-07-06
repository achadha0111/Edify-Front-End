import {
    screen,
    render, customBeforeEach,
} from '../setupTests';
import userEvent from "@testing-library/user-event";
import Toolbar from "../components/NotesToolbar";

/* Note: button interactions will be tested in the tests for Note */
customBeforeEach();

test('render of the main toolbar', () => {
    render(
        <Toolbar lastSaved=""/>
    );

    expect(screen.getByLabelText(/Save note/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Insert text Block/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Insert flashcard/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Insert code block/i)).toBeInTheDocument();

});

// TODO This test is removed until a better strategy can be thought of
// test('note name can be updated', async () => {
//     let noteName = "Untitled";
//
//     const updateNoteName = (receivedName) => {
//         noteName = receivedName;
//     }
//
//     render(
//         <Toolbar noteName={noteName} updateNoteName={updateNoteName}/>
//     );
//
//     await userEvent.type(screen.getByLabelText(/Title/i), "New Note Title");
//
//     expect(screen.getByText(/New Note Title/i)).toBeInTheDocument();
// });