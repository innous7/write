import { useColorScheme as useRNColorScheme } from 'react-native';

import { useAppColorScheme } from '@/hooks/app-color-scheme';

export function useColorScheme() {
  const appColorScheme = useAppColorScheme();
  const systemColorScheme = useRNColorScheme();

  return appColorScheme?.colorScheme ?? systemColorScheme;
}
