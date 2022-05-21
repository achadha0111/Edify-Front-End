import React from 'react';
import uid from '../../utils/uid';
import NotesBlock from "./NotesBlock";

// This block always displays on adding a new note
const initialBlock = {id: uid(), noteType: ""}

class EditableNotes extends React.component {
    constructor(props) {
        super(props);
        // Function declarations

        // State
        this.state = {
            blocks: [initialBlock],
            blockInFocusRef: '',
            blockInFocusId: '',
        }
    }

    render () {
        return (
            <div className="Note">
                {this.state.blocks.map((block, key) => {
                    return (
                        <NotesBlock
                            key={key}
                            id={block.id}
                            noteType={block.noteType}
                        />
                    );
                })}
            </div>
        )

    }
}

export default EditableNotes;