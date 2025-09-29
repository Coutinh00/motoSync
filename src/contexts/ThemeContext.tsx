import React, { createContext, useContext } from 'react';
import theme from '../theme/theme';

/**
 * Theme context: provê objeto `theme` para componentes via `useTheme()`.
 * Mantemos simples para este exercício, mas aqui poderíamos adicionar modo escuro
 * e funções para trocar o tema dinamicamente.
 */
const ThemeContext = createContext(theme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;


