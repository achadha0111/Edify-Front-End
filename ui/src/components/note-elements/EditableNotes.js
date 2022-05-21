/* This component is the parent level Notes component that manages state for a note
*  All async requests to the server for notes data will be made through here and rendering
*  will be handled through its children. */

import React from 'react';
import uid from '../../utils/uid';
import NotesBlock from "./NotesBlock";

// This block always displays on adding a new note
const initialBlock = {id: uid(), noteType: "", data: {}}

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
                            data={block.data}
                        />
                    );
                })}
            </div>
        )

    }
}

export default EditableNotes;