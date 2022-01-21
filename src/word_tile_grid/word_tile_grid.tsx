import React from "react";
import styles from "./word_tile_grid.module.css";
import { RootContext } from "../context/root_context";
import { Tile } from "../tile/tile";
import { Word } from "../reducer/root_reducer";

const WordLine = React.memo(({ word }: { word: Word }) => {
  return (
    <div className={styles.wordLine}>
      {word.map((letter) => (
        <Tile letter={letter} />
      ))}
    </div>
  );
});

export const WordTileGrid = React.memo(() => {
  const { state } = React.useContext(RootContext);
  const { words } = state;

  return (
    <div className={styles.wordGrid}>
      {words.map((word) => (
        <WordLine word={word} />
      ))}
    </div>
  );
});
