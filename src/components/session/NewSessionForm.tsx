import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import format from 'date-fns/format';
import {
  AppBar,
  Button,
  Grid,
  Paper,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';

// import CategorySelect from './CategorySelect';
import { routes } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import type { Category } from '../../types';

type Props = {
  categories: Array<Category>,
  requestCategories: any,
  saveSession: any,
  selectedCategoryIds: Array<string>,
  setSelectedCategoryIds: any,
};

const NewSessionForm = (props: Props) => {
  const {
    categories, requestCategories, saveSession,
    selectedCategoryIds, setSelectedCategoryIds,
  } = props;
  const router = useRouter();
  const theme = useTheme();
  const user = useAuth();
  const [name, setName] = useState('New Session');
  const [organization, setOrganization] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    requestCategories();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLInputElement>) => setOrganization(e.target.value);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value);

  const handleCategorySelect = (categoryIds: Array<string>) => setSelectedCategoryIds(categoryIds);

  const handleStartSession = () => {
    const sessionCategories = selectedCategoryIds.map((id) => {
      const category = categories.find(c => c.id === id);
      return { ...category, id, votes: {} };
    });

    const session = {
      id: uuidv4(),
      name,
      organization,
      date,
      categories: sessionCategories,
      createDate: format(Date.now(), 'yyyy-MM-dd'),
      createdBy: user.uid,
      categoryIndex: 0,
    };

    saveSession(session);
    router.push(`${routes.SESSION}/${session.id}`);
  };

  const commonTextFieldProps = {
    fullWidth: true,
    InputLabelProps: { shrink: true },
    margin: 'dense',
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6">Create New Session</Typography>
        </Toolbar>
      </AppBar>
      <Paper
        square
        elevation={0}
        sx={{ height: '100%', padding: theme.spacing(2) }}
      >
        <Grid
          container
          alignItems="center"
          justify="center"
          spacing={2}
          sx={{ padding: theme.spacing(2, 0) }}
        >
          <Grid item xs={12} sm={12}>
            <TextField
              {...commonTextFieldProps}
              required
              id="nameInput"
              label="Name"
              helperText="The name for your session."
              error={!name}
              value={name}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              {...commonTextFieldProps}
              id="organizationInput"
              label="Organization"
              helperText="The name of your organization."
              value={organization}
              onChange={handleOrganizationChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              {...commonTextFieldProps}
              required
              id="dateInput"
              label="Date"
              type="date"
              helperText="The date your session takes place."
              error={!date}
              value={date}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl required fullWidth margin="dense" error={!selectedCategoryIds.length}>
              <InputLabel htmlFor="categorySelect" shrink>
                Categories
              </InputLabel>
              {/*<CategorySelect*/}
              {/*  categories={categories}*/}
              {/*  selectedCategoryIds={selectedCategoryIds}*/}
              {/*  onChange={handleCategorySelect}*/}
              {/*  sx={{ maxHeight: 300, overflow: 'auto' }}*/}
              {/*/>*/}
              <FormHelperText>
                {`Select the categories that your team will vote on.
               ${selectedCategoryIds.length}/${categories.length} selected.`}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleStartSession}
              disabled={!(name && date && selectedCategoryIds.length)}
            >
              Start Session
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default NewSessionForm;
