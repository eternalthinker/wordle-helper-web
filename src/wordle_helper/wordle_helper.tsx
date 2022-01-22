import React from "react";
import { WordTileGrid } from "../word_tile_grid/word_tile_grid";
import styles from "./wordle_helper.module.css";

export const WordleHelper = () => {
  return (
    <div className={styles.wordleHelper}>
      <WordTileGrid />
    </div>
  );
};
