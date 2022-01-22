import React from "react";
import { rootReducer, initialState, Action } from "../reducer/root_reducer";

export type DispatchType = React.Dispatch<Action>;

export const RootContext = React.createContext({
  state: initialState,
  dispatch: (() => initialState) as DispatchType,
});

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(rootReducer, initialState);
  const store = React.useMemo(() => ({ state, dispatch }), [state]);

  return <RootContext.Provider value={store}>{children}</RootContext.Provider>;
};
