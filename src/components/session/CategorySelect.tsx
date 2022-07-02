import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';

import type { Category } from '../../types';

interface Props {
  categories: Array<Category>;
  onChange: Function;
  selectedCategories: Array<string>;
}

const CategorySelect = (props: Props) => {
  const { categories, onChange, selectedCategories } = props;
  const theme = useTheme();

  const handleCategoryToggle = (id: string) => () => {
    const currentIndex = selectedCategories.indexOf(id);
    const newSelectedCategories = [...selectedCategories];

    if (currentIndex === -1) {
      newSelectedCategories.push(id);
    } else {
      newSelectedCategories.splice(currentIndex, 1);
    }

    onChange(newSelectedCategories);
  };

  const handleSelectAll = () => onChange(categories.map(category => category.id));

  const handleDeselectAll = () => onChange([]);

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="secondary"
          onClick={handleSelectAll}
          size="small"
          variant="outlined"
          sx={{ margin: theme.spacing(0, 0.5) }}
        >
          Select All
        </Button>
        <Button
          color="secondary"
          onClick={handleDeselectAll}
          size="small"
          variant="outlined"
          sx={{ margin: theme.spacing(0, 0.5) }}
        >
          Deselect All
        </Button>
      </Box>
      <List
        component="ul"
        id="categorySelect"
        disablePadding
        sx={{
          height: 300,
          overflow: 'auto',
          margin: `${theme.spacing(2)}px 0`,
          maxHeight: 300,
        }}
      >
        {categories.map(({ id, title }) => {
          const labelId = `category-select-label-${id}`;
          return (
            <ListItem
              component="li"
              key={id}
              button
              dense
              divider
              onClick={handleCategoryToggle(id)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedCategories.includes(id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={title} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default CategorySelect;
