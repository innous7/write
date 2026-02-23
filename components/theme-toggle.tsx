import { Pressable, StyleSheet, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { designTokens, getPalette } from '@/constants/design-system';
import { useAppColorScheme } from '@/hooks/app-color-scheme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ThemeToggleProps = {
  compact?: boolean;
  style?: ViewStyle;
};

export function ThemeToggle({ compact = false, style }: ThemeToggleProps) {
  const appColorScheme = useAppColorScheme();
  const colorScheme = useColorScheme();
  const palette = getPalette(colorScheme);

  const handlePress = () => {
    appColorScheme?.toggleColorScheme();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.button,
        compact ? styles.buttonCompact : styles.buttonRegular,
        { backgroundColor: palette.surface, borderColor: palette.border },
        style,
      ]}>
      <ThemedText style={styles.buttonText}>{colorScheme === 'dark' ? '☀️ 라이트' : '🌙 다크'}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: designTokens.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRegular: {
    minHeight: 36,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  buttonCompact: {
    minHeight: 32,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
