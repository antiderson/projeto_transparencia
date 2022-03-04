/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { createContext, useCallback, useContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { colorTheme, contrastTheme } from "../styles/themes";

interface ThemeContextData {
  toggleTheme(): void;
  theme: Theme;
  toggleFont(number: number): void;
  fontSize: number;
}

interface Theme {
  name: string;
  colors: {
    background: string;
    backgroundSecond: string;
    text: string;
    secondBg: string;
    secondBgShade: string;
    secondText: string;
    secondTextShade: string;
    third: string;
    placeholder: string;
    danger: string;
    success: string;
    dangerShade: string;
    successShade: string;
  };
  font: number;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const useTheme = () => useContext(ThemeContext);

export const CustomThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>({ ...colorTheme, font: 1 });
  const [fontSize, setFontSize] = useState<number>(1);

  const toggleFont = useCallback(
    (font: number) => {
      setFontSize(font);
      setTheme({ ...theme, font });
    },
    [theme],
  );

  const toggleTheme = useCallback(() => {
    if (theme.name === "color") {
      setTheme({ ...contrastTheme, font: fontSize });
    } else if (theme.name === "contrast") {
      setTheme({ ...colorTheme, font: fontSize });
    }
  }, [fontSize, theme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme, toggleFont, fontSize }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
