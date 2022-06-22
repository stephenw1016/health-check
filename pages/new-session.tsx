import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import NewSessionForm from '../src/components/session/NewSessionForm';

const NewSession: NextPage = () => {
  return (
    <div className={styles.container}>
      <NewSessionForm
        categories={[]}
        selectedCategoryIds={[]}
        requestCategories={() => {}}
        saveSession={() => {}}
        setSelectedCategoryIds={() => {}}
      />
    </div>
  )
}

export default NewSession;
