import React from 'react';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';
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

import CategorySelect from './CategorySelect';
import { routes } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import type { Category } from '../../types';

interface Props {
  categories: Array<Category>;
  selectedCategoryIds: Array<string>;
  onSave: any;
  onSelectCategories: any;
}

const NewSessionForm = (props: Props) => {
  const {
    categories, onSave,
    selectedCategoryIds, onSelectCategories,
  } = props;
  const router = useRouter();
  const theme = useTheme();
  const { user } = useAuth();
  const [name, setName] = React.useState<string>('New Session');
  const [organization, setOrganization] = React.useState<string>('');
  const [date, setDate] = React.useState<string>(format(new Date(), 'yyyy-MM-dd'));

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLInputElement>) => setOrganization(e.target.value);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value);

  const handleCategorySelect = (categoryIds: Array<string>) => onSelectCategories(categoryIds);

  const handleStartSession = () => {
    const sessionCategories = selectedCategoryIds.map((id) => {
      const category = categories.find(c => c.id === id);
      return { ...category, id, votes: {} };
    });

    const session = {
      id: v4(),
      name,
      organization,
      date,
      categories: sessionCategories,
      createDate: format(Date.now(), 'yyyy-MM-dd'),
      createdBy: user.uid,
      categoryIndex: 0,
    };

    onSave(session);
    router.push(`${routes.SESSION}/${session.id}`);
  };

  const commonTextFieldProps = {
    fullWidth: true,
    InputLabelProps: { shrink: true },
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
              <CategorySelect
                categories={categories}
                selectedCategoryIds={selectedCategoryIds}
                onChange={handleCategorySelect}
              />
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
