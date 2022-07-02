import React from 'react';
import { useRouter } from 'next/router';
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
import { generateId } from '../../utils';
import { routes } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import type { Category, Session } from '../../types';
import { setSelectedCategories } from "../../state/appSlice";

interface Props {
  categories: Array<Category>;
  onSave: any;
}

const NewSessionForm = (props: Props) => {
  const { categories, onSave } = props;
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector((state) => state.app.selectedCategories);
  const { user } = useAuth();
  const [name, setName] = React.useState<string>('New Session');
  const [organization, setOrganization] = React.useState<string>('');
  const [date, setDate] = React.useState<string>(format(new Date(), 'yyyy-MM-dd'));

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLInputElement>) => setOrganization(e.target.value);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value);

  const handleCategorySelect = (categoryIds: Array<string>) => {
    dispatch(setSelectedCategories(categoryIds));
  };

  const handleStartSession = () => {
    const categoryMap = categories.reduce((map, category) => {
      const { id } = category;
      return { ...map, [id]: category };
    }, Object.create(null));
    const sessionCategories = selectedCategories.map((id) => ({ ...categoryMap[id] }));

    const session: Session = {
      id: generateId(),
      name,
      organization,
      date,
      categories: sessionCategories,
      createDate: format(Date.now(), 'yyyy-MM-dd'),
      createdBy: user.uid,
      categoryIndex: 0,
      isComplete: false,
      votes: {},
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
            <FormControl required fullWidth margin="dense" error={!selectedCategories.length}>
              <InputLabel htmlFor="categorySelect" shrink>
                Categories
              </InputLabel>
              <CategorySelect
                categories={categories}
                selectedCategories={selectedCategories}
                onChange={handleCategorySelect}
              />
              <FormHelperText>
                {`Select the categories that your team will vote on.
               ${selectedCategories.length}/${categories.length} selected.`}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleStartSession}
              disabled={!(name && date && selectedCategories.length)}
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
