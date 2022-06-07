import NewNote from "../pages/NewNote"
import {render, screen} from "../setupTests";
import userEvent from "@testing-library/user-event";

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