import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeContextProvider = ThemeContext.Provider;

export const useTheme = () => {
  return useContext(ThemeContext);
};
