export const designTokens = {
  radius: {
    sm: 10,
    md: 12,
    lg: 14,
    xl: 16,
    xxl: 18,
    pill: 999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  layout: {
    pageMax: 1280,
    contentMax: 1200,
    breakpoints: {
      tablet: 768,
      desktop: 1024,
      wide: 1280,
      ultra: 1536,
    },
  },
  typography: {
    title: 38,
    section: 21,
    body: 15,
    reading: 18,
  },
};

export type DesignPalette = {
  bg: string;
  surface: string;
  surfaceAlt: string;
  hero: string;
  border: string;
  borderMuted: string;
  textMuted: string;
  textSubtle: string;
  primary: string;
  primarySoft: string;
  primarySofter: string;
  onPrimary: string;
  warning: string;
};

export function getPalette(colorScheme: 'light' | 'dark' | null | undefined): DesignPalette {
  if (colorScheme === 'dark') {
    return {
      bg: '#101822',
      surface: '#1A2430',
      surfaceAlt: '#141E2A',
      hero: '#1A2A42',
      border: '#2A3646',
      borderMuted: '#1F2937',
      textMuted: '#94A3B8',
      textSubtle: '#CBD5E1',
      primary: '#136DEC',
      primarySoft: 'rgba(19,109,236,0.16)',
      primarySofter: '#233246',
      onPrimary: '#FFFFFF',
      warning: '#FACC15',
    };
  }

  return {
    bg: '#F6F7F8',
    surface: '#FFFFFF',
    surfaceAlt: '#F8FAFC',
    hero: '#E7F0FF',
    border: '#E2E8F0',
    borderMuted: '#E5EAF2',
    textMuted: '#64748B',
    textSubtle: '#475569',
    primary: '#136DEC',
    primarySoft: 'rgba(19,109,236,0.10)',
    primarySofter: '#EEF2F7',
    onPrimary: '#FFFFFF',
    warning: '#FACC15',
  };
}
