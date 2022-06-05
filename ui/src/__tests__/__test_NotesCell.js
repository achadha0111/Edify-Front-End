import NewNote from "../pages/NewNote"
import {render, screen} from "../setupTests";
import userEvent from "@testing-library/user-event";

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