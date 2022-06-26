import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {Button} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

export default function DeleteDialog(props) {
    const close = () => {
        props.close();
    }

    const confirmDelete = () => {
        props.delete(props.entity);
        close();
    }

    return (<Dialog open={props.open}>
        <DialogTitle> Delete confirmation</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete
                this {props.entity !== "Deck" ? 'card':'deck'}?
                This action cannot be undone.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button aria-label="ConfirmDelete" onClick={confirmDelete}>Yes</Button>
            <Button aria-label="CancelDelete" onClick={close}>Cancel</Button>
        </DialogActions>
    </Dialog>)
}