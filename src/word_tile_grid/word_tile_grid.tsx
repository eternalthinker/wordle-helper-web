import React from "react";
import styles from "./word_tile_grid.module.css";
import { RootContext } from "../context/root_context";
import { Tile } from "../tile/tile";

const WordLine = React.memo(() => {
  return <Tile />;
});

export const WordTileGrid = React.memo(() => {
  const { state } = React.useContext(RootContext);
  const { lines } = state;

  return (
    <>
      {lines.map((line) => (
        <WordLine />
      ))}
    </>
  );
});
