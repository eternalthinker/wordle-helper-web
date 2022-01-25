import { RootState, Action, initWord } from "./root_state";

export const rootReducer = (state: RootState, action: Action): RootState => {
  switch (action.type) {
    case "letter_status": {
      const { lineIndex, letterIndex, status } = action.payload;
      const wordle = state.wordle;
      if (wordle.currentInputLine === 6 || wordle.currentInputLetter === 4) {
        return state;
      }
      const currentWordLine = wordle.wordLines[lineIndex];

      return {
        ...state,
        wordle: {
          ...wordle,
          wordLines: [
            ...wordle.wordLines.slice(0, lineIndex),
            {
              ...currentWordLine,
              word: [
                ...currentWordLine.word.slice(0, letterIndex),
                {
                  ...currentWordLine.word[letterIndex],
                  status,
                },
                ...currentWordLine.word.slice(letterIndex + 1),
              ],
            },
            ...wordle.wordLines.slice(lineIndex + 1),
          ],
        },
      };
    }
    case "letter_input": {
      const wordle = state.wordle;
      if (wordle.currentInputLine === 6 || wordle.currentInputLetter === 4) {
        return state;
      }
      const letterIndex = wordle.currentInputLetter + 1;
      const wordIndex = wordle.currentInputLine;
      const currentWordLine = wordle.wordLines[wordIndex];

      return {
        ...state,
        wordle: {
          ...wordle,
          currentInputLetter: letterIndex,
          wordLines: [
            ...wordle.wordLines.slice(0, wordIndex),
            {
              ...currentWordLine,
              word: [
                ...currentWordLine.word.slice(0, letterIndex),
                {
                  ...currentWordLine.word[letterIndex],
                  letter: action.payload.letter,
                },
                ...currentWordLine.word.slice(letterIndex + 1),
              ],
            },
          ],
        },
      };
    }
    case "letter_delete": {
      const wordle = state.wordle;
      const { currentInputLine, currentInputLetter } = wordle;
      if (currentInputLine === 6 || currentInputLetter === -1) {
        return state;
      }
      const currentWordLine = wordle.wordLines[currentInputLine];

      return {
        ...state,
        wordle: {
          ...wordle,
          currentInputLetter: currentInputLetter - 1,
          wordLines: [
            ...wordle.wordLines.slice(0, currentInputLine),
            {
              ...currentWordLine,
              word: [
                ...currentWordLine.word.slice(0, currentInputLetter),
                {
                  ...currentWordLine.word[currentInputLetter],
                  letter: undefined,
                },
                ...currentWordLine.word.slice(currentInputLetter + 1),
              ],
            },
          ],
        },
      };
    }
    case "word_enter": {
      const wordle = state.wordle;
      const { currentInputLine, currentInputLetter } = wordle;
      if (currentInputLine === 6 || currentInputLetter !== 4) {
        return state;
      }

      return {
        ...state,
        wordle: {
          ...wordle,
          currentInputLine: currentInputLine + 1,
          currentInputLetter: -1,
          wordLines: [
            ...wordle.wordLines.slice(0, currentInputLine),
            {
              status: "completed",
              word: wordle.wordLines[currentInputLine].word.map((letter) => ({
                ...letter,
                status: "absent",
              })),
            },
            ...(currentInputLine === 5 ? [] : [initWord]),
          ],
        },
      };
    }
    default: {
      return state;
    }
  }
};
