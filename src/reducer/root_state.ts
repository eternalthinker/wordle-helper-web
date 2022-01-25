import { wordList } from "../utils/wordlist";
import { getSuggestedWords } from "./get_suggested_words";

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

export type Constraints = {
  excludedLetters: Set<string>;
  includedLetters: Set<string>;
  incorrectPositions: Set<string>[];
  correctPositions: (string | undefined)[];
};

export type RootState = {
  wordle: {
    wordLines: WordLine[];
    currentInputLine: number;
    currentInputLetter: number;
  };
  constraints: Constraints;
  suggestedWords: {
    allWords: string[];
    displayedWords: string[];
  };
};

export const MAX_SUGGESTED_WORDS = 25;

export const initWord: WordLine = {
  word: new Array(5).fill({ letter: undefined, status: "input" }),
  status: "input",
};

export const createInitConstraints = () => ({
  excludedLetters: new Set<string>(),
  includedLetters: new Set<string>(),
  incorrectPositions: Array(5)
    .fill(null)
    .map((_) => new Set<string>()),
  correctPositions: Array(5).fill(undefined),
});

const initConstraints = createInitConstraints();

export const initialState: RootState = {
  wordle: {
    wordLines: [initWord],
    currentInputLine: 0,
    currentInputLetter: -1,
  },
  constraints: initConstraints,
  suggestedWords: getSuggestedWords(wordList, initConstraints, 0),
};

export type Action =
  | {
      type: "letter_status_change";
      payload: {
        lineIndex: number;
        letterIndex: number;
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
