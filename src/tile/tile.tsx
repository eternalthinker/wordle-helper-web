import React, { MouseEventHandler } from "react";
import { Letter, LetterStatus } from "../reducer/root_reducer";
import styles from "./tile.module.css";
import classnames from "classnames";
import { RootContext } from "../context/root_context";

const getNextStatus = (status: LetterStatus): LetterStatus => {
  switch (status) {
    case "input":
      return "input";
    case "absent":
      return "misplaced";
    case "misplaced":
      return "correct";
    case "correct":
      return "absent";
    default:
      throw new Error(`Invalid Letter status: ${status}`);
  }
};

export const Tile = React.memo(
  ({ letter, row, col }: { letter: Letter; row: number; col: number }) => {
    const { dispatch } = React.useContext(RootContext);

    const onStatusChanged = React.useCallback(() => {
      dispatch({
        type: "letter_status",
        payload: {
          lineIndex: row,
          letterIndex: col,
          status: getNextStatus(letter.status),
        },
      });
    }, [letter.status]);

    const onClick: MouseEventHandler<HTMLDivElement> = React.useCallback(
      (e) => {
        e.preventDefault();
        if (letter.status !== "input") {
          onStatusChanged();
        }
      },
      [onStatusChanged]
    );

    return (
      <div
        className={classnames(styles.tile, {
          [styles.input]: letter.status === "input",
          [styles.filled]: letter.letter != null,
          [styles.absent]: letter.status === "absent",
          [styles.misplaced]: letter.status === "misplaced",
          [styles.absent]: letter.status === "absent",
        })}
        onClick={onClick}
      >
        {letter.letter}
      </div>
    );
  }
);
