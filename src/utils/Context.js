import { createContext } from "react";

export const Context = createContext({
  toggleTheme: () => {},
  isThemeDark: false,
  toggleSignIn: () => {},
  isSignedIn: false,
  setUserFunc: () => {},
  user: {},
});
