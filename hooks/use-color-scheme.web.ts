import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { useAppColorScheme } from '@/hooks/app-color-scheme';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const appColorScheme = useAppColorScheme();
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  if (appColorScheme) {
    return appColorScheme.colorScheme;
  }

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}
