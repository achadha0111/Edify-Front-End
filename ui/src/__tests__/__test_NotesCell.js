import Note from "../pages/Note"
import {customBeforeEach, render, screen} from "../setupTests";
import userEvent from "@testing-library/user-event";

customBeforeEach();

test("displaying startup page with initial block", () => {
    render(<Note/>);

    const cells = screen.getAllByRole('cell', {name:/RichText/i});

    expect(cells.length).toBe(1);
});

test("clicking text button adds a text block", async () => {
    render(<Note/>);

    const textBoxButton = screen.getByLabelText("Insert text block");

    await userEvent.click(textBoxButton);

    const cells = screen.getAllByRole('cell', {name:/RichText/i});

    expect(cells.length).toBe(2);
});

test("clicking code button adds a code cell", async () => {
    render(<Note/>);

    const codeBlockButton = screen.getByLabelText("Insert code block");

    await userEvent.click(codeBlockButton);

    const codeCell = screen.getAllByRole('cell', {name:/Code/i});

    expect(codeCell.length).toBe(1);
});

test("click delete button on text cell removes text cell", async () => {
    render(<Note/>);

    const textBoxButton = screen.getByLabelText("Insert text block");

    await userEvent.click(textBoxButton);

    let cells = screen.getAllByRole('cell', {name:/RichText/i});

    expect(cells.length).toBe(2);

    const deleteButton = screen.getAllByLabelText("DeleteCellButton")[1];

    await userEvent.click(deleteButton);

    cells = screen.getAllByRole('cell', {name:/RichText/i});

    expect(cells.length).toBe(1);

});

test("click delete button on code cell removes code cell", async () => {
    render(<Note/>);

    const textBoxButton = screen.getByLabelText("Insert code block");

    await userEvent.click(textBoxButton);

    let cells = screen.getAllByRole('cell', {name:/Code/i});

    expect(cells.length).toBe(1);

    const deleteButton = screen.getAllByLabelText("DeleteCellButton")[1];

    await userEvent.click(deleteButton);

    cells = screen.getAllByRole('cell');

    expect(cells.length).toBe(1);

});