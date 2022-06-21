import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import { Button, Paper, useTheme } from '@mui/material';

import { routes } from '../../constants';
import JoinSessionDialog from './JoinSessionDialog';

const SessionButtons = () => {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleJoinDialogOpen = () => setOpen(true);

  const handleJoinDialogClose = () => setOpen(false);

  const handleJoinDialogSubmit = (sessionId: string) =>
    router.push(`${routes.SESSION}/${sessionId}`);

  return (
    <Paper>
      <Link href={routes.NEW_SESSION} passHref>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          sx={{ margin: theme.spacing(1) }}
        >
          Start a new Session
        </Button>
      </Link>
      <Button
        color="secondary"
        size="large"
        variant="contained"
        onClick={handleJoinDialogOpen}
      >
        Join an existing Session
      </Button>
      <JoinSessionDialog
        open={open}
        onClose={handleJoinDialogClose}
        onSubmit={handleJoinDialogSubmit}
      />
    </Paper>
  );
};

export default SessionButtons;
