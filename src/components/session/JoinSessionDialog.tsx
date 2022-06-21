import React, {SyntheticEvent, useState} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

type Props = {
  open: boolean,
  onClose: Function,
  onSubmit: Function,
};

const JoinSessionDialog = (props: Props) => {
  const { open, onClose, onSubmit } = props;
  const [joinId, setJoinId] = useState<string>('');

  const handleJoinIdChange = (e: SyntheticEvent) => setJoinId(e.target.value);

  const handleSubmit = () => onSubmit(joinId);

  return (
    <Dialog
      aria-labelledby="join-session-dialog-title"
      open={open}
      onClose={onClose}
    >
      <DialogTitle id="join-session-dialog-title">
        Join an existing Session
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the unique ID of the session you would like to join.
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          label="Session ID"
          type="text"
          value={joinId}
          onChange={handleJoinIdChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Join</Button>
      </DialogActions>
    </Dialog>
  );
};

export default JoinSessionDialog;
