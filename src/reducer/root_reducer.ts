type LetterStatus = "correct" | "misplaced" | "absent";

export type Letter = {
  letter?: string;
  status: LetterStatus;
};

export type Word = [Letter, Letter, Letter, Letter, Letter];

export type RootState = {
  words: [Word, Word, Word, Word, Word, Word];
  constraints: {
    excludedLetters: [];
    includedLetters: [];
    incorrectPositions: [];
    letterCounts: [];
  };
  suggestedWords: {
    allWords: [];
    displayedWords: [];
  };
};

export type Action = {
  type: "letter_status";
  payload: {
    lineIndex: number;
    letterIndex: number;
    status: string;
  };
};

export const rootReducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case "letter_status": {
      return state;
    }
    default: {
      return state;
    }
  }
};

const initLetter: Letter = { letter: "", status: "absent" };
const initWord: Word = [
  initLetter,
  initLetter,
  initLetter,
  initLetter,
  initLetter,
];

export const initialState: RootState = {
  words: [initWord, initWord, initWord, initWord, initWord, initWord],
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
