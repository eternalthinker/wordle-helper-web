import React from "react";
import styles from "./word_tile_grid.module.css";
import { RootContext } from "../context/root_context";
import { Tile } from "../tile/tile";
import { WordLine } from "../reducer/root_reducer";

const WordTileLine = React.memo(
  ({ wordLine, lineIndex }: { wordLine: WordLine; lineIndex: number }) => {
    return (
      <div className={styles.wordLine}>
        {wordLine.word.map((letter, i) => (
          <Tile letter={letter} row={lineIndex} col={i} />
        ))}
      </div>
    );
  }
);

export const WordTileGrid = React.memo(() => {
  const { state } = React.useContext(RootContext);
  const { wordle } = state;

  return (
    <div className={styles.wordGrid}>
      {wordle.wordLines.map((wordLine, i) => (
        <WordTileLine wordLine={wordLine} lineIndex={i} />
      ))}
    </div>
  );
});
