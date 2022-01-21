import styles from "./app.module.css";
import { Header } from "../header/header";
import { WordleHelper } from "../wordle_helper/wordle_helper";
import { RootProvider } from "../context/root_context";

export const App = () => {
  return (
    <RootProvider>
      <div className={styles.app}>
        <Header />
        <WordleHelper />
      </div>
    </RootProvider>
  );
};
