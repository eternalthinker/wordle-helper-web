import { SuggestedWords } from "../suggested_words/suggested_words";
import { VirtualKeyboard } from "../virtual_keyboard/virtual_keyboard";
import { WordTileGrid } from "../word_tile_grid/word_tile_grid";
import styles from "./wordle_helper.module.css";

export const WordleHelper = () => {
  return (
    <div className={styles.wordleHelper}>
      <div className={styles.mainContainer}>
        <WordTileGrid />
        <div className={styles.divider} />
        <SuggestedWords />
      </div>
      <VirtualKeyboard />
    </div>
  );
};
