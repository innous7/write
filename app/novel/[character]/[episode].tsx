import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ThemeToggle } from '@/components/theme-toggle';
import { ThemedText } from '@/components/themed-text';
import { designTokens, getPalette } from '@/constants/design-system';
import { CharacterId, getCharacter, getEpisode, getEpisodes } from '@/constants/sabeon2010';
import { useColorScheme } from '@/hooks/use-color-scheme';

function formatDate() {
  return '2026.02.23';
}

function estimateReadMinutes(text: string) {
  const chars = text.replace(/\s+/g, '').length;
  return Math.max(3, Math.round(chars / 350));
}

function getPublicEpisodeBody(text: string) {
  const markers = ['\n## 공통 대사 고정본', '\n## 다음 화 연결 포인트'];
  let cutIndex = text.length;

  for (const marker of markers) {
    const idx = text.indexOf(marker);
    if (idx !== -1 && idx < cutIndex) {
      cutIndex = idx;
    }
  }

  const publicBody = text.slice(0, cutIndex).replace(/\n---\s*$/, '');
  return publicBody.trimEnd();
}

export default function NovelEpisodeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ character: string; episode: string }>();
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();

  const characterId = params.character as CharacterId;
  const episodeNumber = Number(params.episode);
  const character = getCharacter(characterId);
  const episode = getEpisode(characterId, episodeNumber);
  const allEpisodes = getEpisodes(characterId);

  const isDark = colorScheme === 'dark';
  const palette = getPalette(colorScheme);
  const showLeftRail = width >= designTokens.layout.breakpoints.wide;
  const showRightRail = width >= designTokens.layout.breakpoints.ultra;

  if (!character || !episode) {
    return (
      <View style={styles.center}>
        <ThemedText type="subtitle">회차를 찾을 수 없습니다.</ThemedText>
      </View>
    );
  }

  const prevEpisode = allEpisodes.find((item) => item.number === episode.number - 1);
  const nextEpisode = allEpisodes.find((item) => item.number === episode.number + 1);
  const publicBody = getPublicEpisodeBody(episode.body);

  return (
    <View style={[styles.screen, { backgroundColor: palette.bg }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.topNav, { backgroundColor: palette.surface, borderColor: palette.borderMuted }]}>
        <View style={styles.topNavInner}>
          <Pressable onPress={() => router.push('/')} style={styles.logoWrap}>
            <View style={[styles.logoBox, { backgroundColor: palette.primary }]}>
              <ThemedText style={styles.logoEmoji}>📘</ThemedText>
            </View>
            <ThemedText style={styles.logoText}>사번 2010</ThemedText>
          </Pressable>
          <View style={styles.topActions}>
            <ThemeToggle compact />
            <Pressable style={[styles.iconBtn, { backgroundColor: palette.surfaceAlt }]}>
              <ThemedText style={styles.iconEmoji}>🔎</ThemedText>
            </Pressable>
            <Pressable style={[styles.iconBtn, { backgroundColor: palette.surfaceAlt }]}>
              <ThemedText style={styles.iconEmoji}>🔖</ThemedText>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.mainArea}>
        {showLeftRail ? (
          <View style={[styles.leftRail, { backgroundColor: palette.surface, borderColor: palette.border }]}>
            <Pressable style={styles.railButton}>
              <ThemedText style={styles.railEmoji}>🔤</ThemedText>
            </Pressable>
            <Pressable style={styles.railButton}>
              <ThemedText style={styles.railEmoji}>🌙</ThemedText>
            </Pressable>
            <Pressable style={styles.railButton}>
              <ThemedText style={styles.railEmoji}>🔖</ThemedText>
            </Pressable>
            <View style={[styles.railDivider, { backgroundColor: palette.border }]} />
            <Pressable style={styles.railButton}>
              <ThemedText style={[styles.railEmoji, { color: isDark ? '#FCA5A5' : '#EF4444' }]}>🚩</ThemedText>
            </Pressable>
          </View>
        ) : null}

        <ScrollView contentContainerStyle={styles.readColumnContent} style={styles.readColumn}>
          <View style={styles.breadcrumbs}>
            <ThemedText style={styles.breadcrumbText}>Home</ThemedText>
            <ThemedText style={styles.breadcrumbText}>›</ThemedText>
            <ThemedText style={styles.breadcrumbText}>사번 2010</ThemedText>
            <ThemedText style={styles.breadcrumbText}>›</ThemedText>
            <ThemedText style={styles.breadcrumbStrong}>{character.name}</ThemedText>
          </View>

          <View style={[styles.chapterHeader, { borderColor: palette.border }]}>
            <ThemedText style={styles.chapterTitle}>
              {episode.number}화: {episode.title}
            </ThemedText>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <ThemedText style={styles.metaEmoji}>📅</ThemedText>
                <ThemedText style={styles.metaText}>{formatDate()}</ThemedText>
              </View>
              <View style={styles.metaItem}>
                <ThemedText style={styles.metaEmoji}>⏱️</ThemedText>
                <ThemedText style={styles.metaText}>{estimateReadMinutes(publicBody)}분 읽기</ThemedText>
              </View>
            </View>
          </View>

          <View style={[styles.articleCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
            <ThemedText style={styles.articleText}>{publicBody}</ThemedText>
          </View>
        </ScrollView>

        {showRightRail ? (
          <View style={styles.rightRailWrap}>
            <ThemedText style={styles.tocTitle}>In this volume</ThemedText>
            <View style={styles.tocList}>
              {allEpisodes.map((item) => {
                const active = item.number === episode.number;
                return (
                  <Pressable
                    key={item.number}
                    onPress={() => router.push(`/novel/${characterId}/${item.number}`)}
                    style={[
                      styles.tocItem,
                      {
                        backgroundColor: active
                          ? palette.primarySoft
                          : 'transparent',
                        borderLeftColor: active ? palette.primary : 'transparent',
                      },
                    ]}>
                    <ThemedText style={[styles.tocText, active && { color: palette.primary, fontWeight: '700' }]}>
                      {item.number}화. {item.title}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : null}
      </View>

      <View style={[styles.bottomBar, { backgroundColor: isDark ? 'rgba(17,24,39,0.95)' : 'rgba(255,255,255,0.95)', borderColor: palette.borderMuted }]}>
        <View style={styles.bottomInner}>
          <Pressable
            disabled={!prevEpisode}
            onPress={() => prevEpisode && router.push(`/novel/${characterId}/${prevEpisode.number}`)}
            style={[styles.navBtn, !prevEpisode && styles.disabledBtn]}>
            <ThemedText style={[styles.navEmoji, !prevEpisode && styles.disabledText]}>◀</ThemedText>
            <ThemedText style={[styles.navBtnText, !prevEpisode && styles.disabledText]}>
              이전 화
            </ThemedText>
          </Pressable>

          <Pressable onPress={() => router.push('/')} style={styles.listBtn}>
            <ThemedText style={styles.navEmoji}>☰</ThemedText>
            <ThemedText style={styles.listBtnText}>목록</ThemedText>
          </Pressable>

          <Pressable
            disabled={!nextEpisode}
            onPress={() => nextEpisode && router.push(`/novel/${characterId}/${nextEpisode.number}`)}
            style={[styles.nextBtn, !nextEpisode && styles.disabledNextBtn]}>
            <ThemedText style={[styles.nextBtnText, !nextEpisode && styles.disabledNextText]}>
              다음 화
            </ThemedText>
            <ThemedText style={[styles.nextEmoji, !nextEpisode && styles.disabledNextText]}>▶</ThemedText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  topNav: {
    borderBottomWidth: 1,
  },
  topNavInner: {
    height: 56,
    maxWidth: designTokens.layout.contentMax,
    marginHorizontal: 'auto',
    width: '100%',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBox: {
    width: 28,
    height: 28,
    borderRadius: designTokens.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 17,
    fontWeight: '800',
  },
  logoEmoji: {
    fontSize: 14,
  },
  topActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconEmoji: {
    fontSize: 14,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: designTokens.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainArea: {
    flex: 1,
    maxWidth: designTokens.layout.contentMax,
    width: '100%',
    marginHorizontal: 'auto',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 16,
    gap: 16,
  },
  leftRail: {
    width: 56,
    borderWidth: 1,
    borderRadius: designTokens.radius.md,
    paddingVertical: 8,
    alignItems: 'center',
    gap: 6,
    height: 232,
    position: 'sticky' as any,
    top: 88,
  },
  railButton: {
    width: 38,
    height: 38,
    borderRadius: designTokens.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  railEmoji: {
    fontSize: 16,
  },
  railDivider: {
    width: 30,
    height: 1,
    marginVertical: 2,
  },
  readColumn: {
    flex: 1,
    minWidth: 0,
  },
  readColumnContent: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 120,
  },
  breadcrumbs: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 12,
  },
  breadcrumbText: {
    fontSize: 12,
    opacity: 0.65,
  },
  breadcrumbStrong: {
    fontSize: 12,
    fontWeight: '700',
  },
  chapterHeader: {
    borderBottomWidth: 1,
    paddingBottom: 16,
    marginBottom: 14,
  },
  chapterTitle: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '900',
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    opacity: 0.7,
  },
  metaEmoji: {
    fontSize: 12,
  },
  articleCard: {
    borderWidth: 1,
    borderRadius: designTokens.radius.lg,
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 14,
  },
  articleText: {
    fontSize: 18,
    lineHeight: 34,
  },
  rightRailWrap: {
    width: 260,
    gap: 8,
  },
  tocTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    opacity: 0.55,
    textTransform: 'uppercase',
  },
  tocList: {
    gap: 2,
  },
  tocItem: {
    borderLeftWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: designTokens.radius.sm,
  },
  tocText: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.85,
  },
  bottomBar: {
    borderTopWidth: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomInner: {
    maxWidth: 820,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  navBtn: {
    flex: 1,
    minHeight: 42,
    borderRadius: designTokens.radius.sm,
    backgroundColor: 'rgba(148,163,184,0.13)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 8,
  },
  navBtnText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  navEmoji: {
    fontSize: 12,
  },
  listBtn: {
    minHeight: 42,
    borderRadius: designTokens.radius.sm,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  listBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  nextBtn: {
    flex: 1,
    minHeight: 42,
    borderRadius: designTokens.radius.sm,
    backgroundColor: '#136DEC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 8,
  },
  nextBtnText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  nextEmoji: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  disabledBtn: {
    opacity: 0.55,
  },
  disabledText: {
    color: '#94A3B8',
  },
  disabledNextBtn: {
    backgroundColor: 'rgba(148,163,184,0.25)',
  },
  disabledNextText: {
    color: '#94A3B8',
  },
});
