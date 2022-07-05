import {customBeforeEach, render, screen} from "../setupTests";
import Review from "../pages/Review";
import userEvent from "@testing-library/user-event";
import {waitForElementToBeRemoved} from "@testing-library/react";

customBeforeEach();

test('carrying out a flashcard review', async () => {
    render(<Review/>);
    for (let cardIndex = 0; cardIndex <=5; cardIndex++) {
        let showAnswerButton = screen.getByLabelText("DisplayAnswer");
        await userEvent.click(showAnswerButton);
        expect(screen.getByLabelText("RecordRemember")).toBeInTheDocument();
        let recordRecallButton = screen.getByLabelText("RecordRemember");
        await userEvent.click(recordRecallButton);
    }
})

test('displaying end of review message', async () => {
    render(<Review/>);
    for (let cardIndex = 0; cardIndex <6; cardIndex++) {
        let showAnswerButton = screen.getByLabelText("DisplayAnswer");
        await userEvent.click(showAnswerButton);
        let recordRecallButton = screen.getByLabelText("RecordRemember");
        await userEvent.click(recordRecallButton);
    }
    expect(screen.getByLabelText("NoCardLeftMessage")).toBeInTheDocument();
})