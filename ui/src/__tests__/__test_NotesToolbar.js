import {
    screen,
    render, customBeforeEach, setupMockZeppelinServer
} from '../setupTests';
import userEvent from "@testing-library/user-event";
import Toolbar from "../components/NotesToolbar";
import Note from "../pages/Note";
import {fDateTime} from "../utils/formatTime";

/* Note: button interactions will be tested in the tests for Note */
customBeforeEach();
setupMockZeppelinServer()

function findElement(label, className) {
    return screen.getByLabelText(label).getElementsByClassName(className)[0];
}

test('render of the main toolbar', () => {
    render(
        <Toolbar lastSaved=""/>
    );

    expect(screen.getByLabelText(/Save note/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Insert text Block/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Insert flashcard/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Insert code block/i)).toBeInTheDocument();

});

test('note name can be updated', async () => {
    render(<Note/>);

    const titleBox = findElement('Title', 'MuiInput-input')

    await userEvent.type(titleBox, "New Note Title");

    await userEvent.click(screen.getByLabelText('Insert text block'));

    expect(titleBox.getAttribute("value")).toEqual("UntitledNew Note Title");
});

test('clicking save updates date', async () => {
    render(<Note/>);

    const saveButton = screen.getByLabelText('Save note');

    await userEvent.click(saveButton);

    expect(screen.getByLabelText('LastSavedDateTime')).toHaveTextContent(fDateTime(Date.now()));
})