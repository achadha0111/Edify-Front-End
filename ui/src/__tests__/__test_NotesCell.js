import Note from "../pages/Note"
import {customBeforeEach, render, screen, setupMockZeppelinServer} from "../setupTests";
import userEvent from "@testing-library/user-event";
import blockTypes from "../utils/blockTypes";

customBeforeEach();
setupMockZeppelinServer();

function findElement(blockType, className) {
    let field = screen.getByLabelText(blockType);
    return field.getElementsByClassName(className)[0];
}

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

test("adding text to text cell updates displayed text", async () => {
    render(<Note/>);

    const textBlock = findElement(blockTypes.RichText, 'ql-editor');

    await (userEvent.type(textBlock, "This value should persist in the cell"));

    const textBoxButton = screen.getByLabelText("Insert text block");

    await userEvent.click(textBoxButton);

    expect(screen.getByText("This value should persist in the cell")).toBeInTheDocument();

});

/** This test is not straight forward to implement. CodeMirror selectors don't
 * seem to work like Quill's TODO*/
// test("adding text to code cell updates displayed text", async () => {
//
//     render(<Note/>);
//
//     const codeBoxButton = screen.getByLabelText("Insert code block");
//
//     await userEvent.click(codeBoxButton);
//
//     const codeBlock = findElement(blockTypes.Code, 'cm-content');
//
//     await userEvent.type(codeBlock, "print ('Hello world')");
//
//     const textBoxButton = screen.getByLabelText("Insert text block");
//
//     await userEvent.click(textBoxButton);
//
//     expect(screen.getByText("Hello world")).toBeInTheDocument();
//
// });

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
}, 10000);

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

}, 10000);

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

}, 10000);