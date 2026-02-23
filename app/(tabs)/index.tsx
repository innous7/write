import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { ThemeToggle } from '@/components/theme-toggle';
import { ThemedText } from '@/components/themed-text';
import { designTokens, getPalette } from '@/constants/design-system';
import { CharacterId, getEpisodes, novelCharacters } from '@/constants/sabeon2010';
import { useColorScheme } from '@/hooks/use-color-scheme';

function formatEpisodeDate() {
  return '2026.02.23';
}

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();

  const [selectedCharacter, setSelectedCharacter] = useState<CharacterId>('kang');
  const selectedProfile = useMemo(
    () => novelCharacters.find((character) => character.id === selectedCharacter),
    [selectedCharacter]
  );
  const episodes = useMemo(() => getEpisodes(selectedCharacter), [selectedCharacter]);

  const isDesktop = width >= designTokens.layout.breakpoints.desktop;
  const useTwoColumnMenu = !isDesktop && width >= 420;
  const palette = getPalette(colorScheme);

  return (
    <ScrollView style={[styles.screen, { backgroundColor: palette.bg }]} contentContainerStyle={styles.scrollContent}>
      <View style={styles.pageWrap}>
        <View style={styles.toolsRow}>
          <ThemeToggle />
        </View>

        <View style={[styles.hero, { backgroundColor: palette.hero, borderColor: palette.primarySoft }]}>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: palette.primary }]}>
              <ThemedText style={styles.badgeText}>기업드라마</ThemedText>
            </View>
            <View style={[styles.badge, { backgroundColor: palette.primarySofter }]}>
              <ThemedText style={styles.badgeTextSub}>멀티시점</ThemedText>
            </View>
            <View style={[styles.badge, { backgroundColor: palette.primarySofter }]}>
              <ThemedText style={styles.badgeTextSub}>주 5화</ThemedText>
            </View>
          </View>

          <ThemedText type="title" style={styles.heroTitle}>
            사번 2010
          </ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            2010년 공채 동기 5인의 성장과 권력 드라마
          </ThemedText>
        </View>

        <View style={[styles.mainRow, isDesktop && styles.mainRowDesktop]}>
          <View style={[styles.leftCol, isDesktop && styles.leftColDesktop]}>
            <View style={styles.leftHeader}>
              <ThemedText type="subtitle">캐릭터 메뉴</ThemedText>
              <ThemedText style={styles.leftHint}>Select POV</ThemedText>
            </View>

            {isDesktop ? (
              <View style={styles.characterListDesktop}>
                {novelCharacters.map((character) => {
                  const selected = character.id === selectedCharacter;
                  return (
                    <Pressable
                      key={character.id}
                      onPress={() => setSelectedCharacter(character.id)}
                      style={[
                        styles.characterCard,
                        {
                          backgroundColor: selected ? palette.primary : palette.surface,
                          borderColor: selected ? palette.primary : palette.borderMuted,
                        },
                      ]}>
                      <View style={styles.characterInfo}>
                        <ThemedText style={[styles.characterName, selected && styles.characterNameActive]}>
                          {character.name}
                        </ThemedText>
                        <ThemedText style={[styles.characterTagline, selected && styles.characterTaglineActive]}>
                          {character.tagline}
                        </ThemedText>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            ) : (
              <View style={[styles.menuGridMobile, useTwoColumnMenu && styles.menuGridMobileTwoCol]}>
                {novelCharacters.map((character) => {
                  const selected = character.id === selectedCharacter;
                  return (
                    <Pressable
                      key={character.id}
                      onPress={() => setSelectedCharacter(character.id)}
                      style={[
                        styles.menuButtonMobile,
                        useTwoColumnMenu ? styles.menuButtonMobileHalf : styles.menuButtonMobileFull,
                        {
                          backgroundColor: selected ? palette.primary : palette.surface,
                          borderColor: selected ? palette.primary : palette.borderMuted,
                        },
                      ]}>
                      <ThemedText style={[styles.menuNameMobile, selected && styles.characterNameActive]}>
                        {character.name}
                      </ThemedText>
                      <ThemedText
                        style={[styles.menuTaglineMobile, selected && styles.characterTaglineActive]}>
                        {character.tagline}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </View>
            )}

            {selectedProfile ? (
              <View style={[styles.profileCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
                <ThemedText type="defaultSemiBold">{selectedProfile.name}</ThemedText>
                <ThemedText style={styles.profileRole}>2026: {selectedProfile.role}</ThemedText>
                <ThemedText style={styles.profileDescription}>{selectedProfile.description}</ThemedText>
              </View>
            ) : null}
          </View>

          <View style={styles.rightCol}>
            <View style={styles.episodeHeader}>
              <ThemedText type="subtitle">회차 목록</ThemedText>
              <View style={[styles.totalBadge, { backgroundColor: palette.primarySofter }]}>
                <ThemedText style={styles.totalBadgeText}>총 {episodes.length}화</ThemedText>
              </View>
            </View>

            <View style={styles.episodeList}>
              {episodes.length > 0 ? (
                episodes.map((episode) => (
                  <Pressable
                    key={episode.number}
                    onPress={() => router.push(`/novel/${selectedCharacter}/${episode.number}`)}
                    style={[styles.episodeCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
                    <View style={styles.episodeMetaRow}>
                      <ThemedText style={styles.episodeNo}>EP. {String(episode.number).padStart(2, '0')}</ThemedText>
                      <ThemedText style={styles.episodeDate}>{formatEpisodeDate()}</ThemedText>
                    </View>

                    <ThemedText type="defaultSemiBold" style={styles.episodeTitle}>
                      {episode.title}
                    </ThemedText>
                    <ThemedText style={styles.episodeTeaser}>{episode.teaser}</ThemedText>

                    <View style={styles.episodeActionRow}>
                      <View style={styles.readButton}>
                        <ThemedText style={styles.readButtonText}>읽기</ThemedText>
                      </View>
                    </View>
                  </Pressable>
                ))
              ) : (
                <View style={[styles.emptyCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
                  <ThemedText type="defaultSemiBold">아직 공개된 회차가 없습니다.</ThemedText>
                  <ThemedText style={styles.emptyText}>
                    집필 순서에 따라 순차 공개됩니다. 현재 공개: 강서준 1화
                  </ThemedText>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
  },
  pageWrap: {
    width: '100%',
    maxWidth: designTokens.layout.contentMax,
    alignSelf: 'center',
    gap: 14,
  },
  toolsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  hero: {
    borderRadius: designTokens.radius.xxl,
    paddingHorizontal: 18,
    paddingVertical: 20,
    gap: 10,
    borderWidth: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    borderRadius: designTokens.radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  badgeTextSub: {
    color: '#DCE8FF',
    fontSize: 11,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 38,
    lineHeight: 46,
  },
  heroSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.92,
  },
  mainRow: {
    gap: 14,
  },
  mainRowDesktop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  leftCol: {
    gap: 10,
  },
  leftColDesktop: {
    width: 340,
  },
  leftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  leftHint: {
    fontSize: 11,
    opacity: 0.55,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  characterListDesktop: {
    gap: 8,
  },
  characterCard: {
    borderRadius: designTokens.radius.lg,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  characterInfo: {
    gap: 4,
  },
  characterName: {
    fontWeight: '700',
    fontSize: 16,
  },
  characterTagline: {
    fontSize: 13,
    opacity: 0.8,
    lineHeight: 19,
  },
  characterNameActive: {
    color: '#FFFFFF',
  },
  characterTaglineActive: {
    color: '#DFEBFF',
    opacity: 1,
  },
  menuGridMobile: {
    gap: 10,
    paddingVertical: 3,
  },
  menuGridMobileTwoCol: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuButtonMobile: {
    borderWidth: 1,
    borderRadius: designTokens.radius.md,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 4,
  },
  menuButtonMobileFull: {
    width: '100%',
  },
  menuButtonMobileHalf: {
    width: '48.5%',
  },
  menuNameMobile: {
    fontWeight: '700',
    fontSize: 15,
  },
  menuTaglineMobile: {
    fontSize: 12,
    opacity: 0.84,
    lineHeight: 17,
  },
  profileCard: {
    borderRadius: designTokens.radius.lg,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 5,
  },
  profileRole: {
    fontSize: 12,
    opacity: 0.75,
  },
  profileDescription: {
    lineHeight: 20,
    opacity: 0.9,
  },
  rightCol: {
    flex: 1,
    gap: 10,
  },
  episodeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  totalBadge: {
    borderRadius: designTokens.radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  totalBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.82,
  },
  episodeList: {
    gap: 10,
  },
  emptyCard: {
    borderRadius: designTokens.radius.lg,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 6,
  },
  emptyText: {
    lineHeight: 20,
    opacity: 0.78,
  },
  episodeCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 8,
  },
  episodeMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  episodeNo: {
    color: '#136DEC',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  episodeDate: {
    fontSize: 11,
    opacity: 0.6,
  },
  episodeTitle: {
    fontSize: 18,
    lineHeight: 25,
  },
  episodeTeaser: {
    fontSize: 14,
    lineHeight: 21,
    opacity: 0.84,
  },
  episodeActionRow: {
    alignItems: 'flex-end',
    marginTop: 2,
  },
  readButton: {
    backgroundColor: 'rgba(19,109,236,0.12)',
    borderRadius: designTokens.radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  readButtonText: {
    color: '#136DEC',
    fontSize: 13,
    fontWeight: '700',
  },
});
