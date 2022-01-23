export type LetterStatus = "correct" | "misplaced" | "absent" | "input";

export type Letter = {
  letter?: string;
  status: LetterStatus;
};

export type Word = Letter[];

export type WordLineStatus = "completed" | "input";

export type WordLine = {
  word: Word;
  status: WordLineStatus;
};

export type RootState = {
  wordle: {
    wordLines: WordLine[];
    currentInputLine: number;
    currentInputLetter: number;
  };
  constraints: {
    excludedLetters: [];
    includedLetters: [];
    incorrectPositions: [];
    letterCounts: [];
  };
  suggestedWords: {
    allWords: string[];
    displayedWords: string[];
  };
};

export type Action =
  | {
      type: "letter_status";
      payload: {
        lineIndex: number;
        letterIndex: number;
        status: LetterStatus;
      };
    }
  | {
      type: "letter_input";
      payload: {
        letter: string;
      };
    }
  | {
      type: "letter_delete";
    }
  | {
      type: "word_enter";
    };

export const rootReducer = (state: RootState, action: Action): RootState => {
  switch (action.type) {
    case "letter_status": {
      const { lineIndex, letterIndex, status } = action.payload;
      const tile = state.wordle.wordLines[lineIndex].word[letterIndex];
      tile.status = status;
      return state;
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

const initWord: WordLine = {
  word: new Array(5).fill({ letter: undefined, status: "input" }),
  status: "input",
};

export const initialState: RootState = {
  wordle: {
    wordLines: [initWord],
    currentInputLine: 0,
    currentInputLetter: -1,
  },
  constraints: {
    excludedLetters: [],
    includedLetters: [],
    incorrectPositions: [],
    letterCounts: [],
  },
  suggestedWords: {
    allWords: [],
    displayedWords: [],
  },
};
