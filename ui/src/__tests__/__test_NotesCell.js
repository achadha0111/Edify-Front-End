import Note from "../pages/Note"
import {customBeforeEach, render, screen} from "../setupTests";
import userEvent from "@testing-library/user-event";
import blockTypes from "../utils/blockTypes";

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

test("adding cells between cells", async () => {
    render(<Note/>);

    const textBoxButton = screen.getByLabelText("Insert text block");

    await userEvent.click(screen.getByLabelText("Insert code block"));

    await userEvent.click(textBoxButton);

    await userEvent.click(screen.getByLabelText("Insert code block"));

    const cells = screen.getAllByRole("cell");

    expect(cells[1]).toContainHTML("quill RichTextEditor");
});

test("click delete button on text cell removes text cell", async () => {
    render(<Note/>);

    const textBoxButton = screen.getByLabelText("Insert text block");

    await userEvent.click(screen.getByLabelText("Insert code block"));

    await userEvent.click(textBoxButton);

    await userEvent.click(screen.getByLabelText("Insert code block"));

    let cells = screen.getAllByLabelText(blockTypes.RichText);

    expect(cells.length).toBe(2);

    const deleteButton = screen.getAllByLabelText("DeleteCellButton")[2];

    await userEvent.click(deleteButton);

    cells = screen.getAllByLabelText(blockTypes.RichText);

    expect(cells.length).toBe(1);

});

test("click delete button on code cell removes code cell", async () => {
    render(<Note/>);

    const codeBlockButton = screen.getByLabelText("Insert code block");

    await userEvent.click(codeBlockButton);

    let cells = screen.getAllByRole('cell', {name:/Code/i});

    expect(cells.length).toBe(1);

    const deleteButton = screen.getAllByLabelText("DeleteCellButton")[1];

    await userEvent.click(deleteButton);

    cells = screen.getAllByLabelText(blockTypes.RichText);

    expect(cells.length).toBe(1);

});