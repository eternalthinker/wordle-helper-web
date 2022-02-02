import React from "react";
import { DispatchType, RootContext } from "../context/root_context";
import { KeyboardKey } from "./key/keyboard_key";
import styles from "./virtual_keyboard.module.css";

const keyboardLayout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
];

const renderKey = (
  keyString: string,
  index: number,
  dispatch: DispatchType
) => {
  let onClick: () => void = () => null;
  if (/^[a-z]$/i.test(keyString)) {
    // Enter letter into next available tile
    onClick = () =>
      dispatch({
        type: "letter_input",
        payload: { letter: keyString },
      });
  } else if (keyString === "enter") {
    // Commit current line
    onClick = () =>
      dispatch({
        type: "word_enter",
      });
  } else if (keyString === "backspace") {
    // Clear last input tile
    onClick = () =>
      dispatch({
        type: "letter_delete",
      });
  }
  return (
    <KeyboardKey key={index} displayString={keyString} onClick={onClick} />
  );
};

export const VirtualKeyboard = () => {
  const { dispatch } = React.useContext(RootContext);

  return (
    <div className={styles.virtualKeyboard}>
      {keyboardLayout.map((row, rowIdx) => (
        <div className={styles.keyboardRow} key={rowIdx}>
          {row.map((keyString, i) => renderKey(keyString, i, dispatch))}
        </div>
      ))}
    </div>
  );
};
