import styles from './app.module.css';
import { Header } from '../header/header.tsx';
import { WordleHelper } from '../wordle_helper/wordle_helper.tsx';

export const App = () => {
  return (
    <div className={styles.app}>
      <Header/>
      <WordleHelper/>
    </div>
  );
}
