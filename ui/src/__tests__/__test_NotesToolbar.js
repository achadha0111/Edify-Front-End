import {
    screen,
    render,
} from '../setupTests';
import userEvent from "@testing-library/user-event";
import Toolbar from "../components/NotesToolbar";

/* Note: button interactions will be tested in the tests for Note */

test('render of the main toolbar', () => {
    render(
        <Toolbar/>
    );

    expect(screen.getByLabelText(/Save note/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Add text Block/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Insert flashcard/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Insert code block/i)).toBeInTheDocument();

});

test('note name can be updated', async () => {
    const updateNoteName = (notename) => {
        return null
    }

    render(
        <Toolbar updateNoteName={updateNoteName}/>
    );

    await userEvent.type(screen.getByLabelText(/Title/i), "New Note Title");

    expect(screen.getByDisplayValue(/New Note Title/i)).toBeInTheDocument();
})