import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import SessionButtons from '../src/components/session/SessionButtons';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <SessionButtons />
    </div>
  )
}

export default Home;
