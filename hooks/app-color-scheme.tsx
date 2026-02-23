import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

type AppColorScheme = 'light' | 'dark';

type AppColorSchemeContextValue = {
  colorScheme: AppColorScheme;
  toggleColorScheme: () => void;
};

const AppColorSchemeContext = createContext<AppColorSchemeContextValue | null>(null);

export function AppColorSchemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useRNColorScheme() === 'dark' ? 'dark' : 'light';
  const [overrideColorScheme, setOverrideColorScheme] = useState<AppColorScheme | null>(null);

  const colorScheme = overrideColorScheme ?? systemColorScheme;

  const toggleColorScheme = useCallback(() => {
    setOverrideColorScheme((prev) => {
      const current = prev ?? systemColorScheme;
      return current === 'dark' ? 'light' : 'dark';
    });
  }, [systemColorScheme]);

  const value = useMemo(
    () => ({
      colorScheme,
      toggleColorScheme,
    }),
    [colorScheme, toggleColorScheme]
  );

  return <AppColorSchemeContext.Provider value={value}>{children}</AppColorSchemeContext.Provider>;
}

export function useAppColorScheme() {
  return useContext(AppColorSchemeContext);
}
