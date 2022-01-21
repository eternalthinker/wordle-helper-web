import React from "react";
import { Letter } from "../reducer/root_reducer";
import styles from "./tile.module.css";

export const Tile = React.memo(({ letter }: { letter: Letter }) => {
  return <div className={styles.tile}>{letter.letter}</div>;
});
