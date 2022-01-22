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

export const rootReducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case "letter_status": {
      const { lineIndex, letterIndex, status } = action.payload;
      const tile = state.wordle.wordLines[lineIndex].word[letterIndex];
      tile.status = status;
      return state;
    }
    case "letter_input": {
      console.log("here - INPUT");
      const wordle = state.wordle;

      if (wordle.currentInputLine == 6 || wordle.currentInputLetter === 5) {
        return state;
      }

      const letterIndex = wordle.currentInputLetter + 1;
      const wordIndex = wordle.currentInputLine;
      const currentWordLine = wordle.wordLines[wordIndex];

      // wordle.currentInputLetter += 1;
      // wordle.wordLines[wordle.currentInputLine].word[
      //   wordle.currentInputLetter
      // ].letter = action.payload.letter;
      // console.log(wordle.currentInputLetter, state.wordle);
      // return state;

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
            ...wordle.wordLines.slice(wordIndex + 1),
          ],
        },
      };
    }
    case "letter_delete": {
      const wordle = state.wordle;
      const { currentInputLine, currentInputLetter } = wordle;
      if (currentInputLine == 6 || currentInputLetter === -1) {
        return state;
      }
      wordle.wordLines[currentInputLine].word[currentInputLetter].letter =
        undefined;
      wordle.currentInputLetter -= 1;
      return state;
    }
    case "word_enter": {
      const wordle = state.wordle;
      const { currentInputLine, currentInputLetter } = wordle;
      if (currentInputLine == null || currentInputLetter !== 5) {
        return state;
      }
      wordle.wordLines[currentInputLine].word.forEach((letter) => {
        letter.status = "absent";
      });
      wordle.currentInputLine += 1;
      wordle.currentInputLetter = -1;
      return state;
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
