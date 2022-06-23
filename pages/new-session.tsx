import type { NextPage } from 'next'

import NewSessionForm from '../src/components/session/NewSessionForm';
import { apiRoutes } from "../src/constants";
import type { Category } from '../src/types';

interface Props {
  categories: Array<Category>;
}

export const getServerSideProps = async () => {
  const res = await fetch(apiRoutes.CATEGORIES);
  const categories = await res.json();
  return { props: { categories } };
};

const NewSession: NextPage<Props> = (props) => {
  const { categories } = props;

  return (
    <NewSessionForm
      categories={categories}
      selectedCategoryIds={categories.map(c => c.id)}
      onSave={() => {}}
      onSelectCategories={() => {}}
    />
  )
}

export default NewSession;
