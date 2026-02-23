import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ThemeToggle } from '@/components/theme-toggle';
import { ThemedText } from '@/components/themed-text';
import { designTokens, getPalette } from '@/constants/design-system';
import { novelCharacters } from '@/constants/sabeon2010';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ExploreScreen() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const palette = getPalette(colorScheme);
  const isDesktop = width >= designTokens.layout.breakpoints.desktop;
  const isTablet = width >= designTokens.layout.breakpoints.tablet;

  return (
    <ScrollView style={[styles.screen, { backgroundColor: palette.bg }]} contentContainerStyle={styles.contentWrap}>
      <View style={styles.page}>
        <View style={styles.toolsRow}>
          <ThemeToggle />
        </View>

        <View style={styles.breadcrumbs}>
          <ThemedText style={styles.breadcrumbText}>Home</ThemedText>
          <ThemedText style={styles.breadcrumbText}>{'>'}</ThemedText>
          <ThemedText style={styles.breadcrumbText}>Drama</ThemedText>
          <ThemedText style={styles.breadcrumbText}>{'>'}</ThemedText>
          <ThemedText style={styles.breadcrumbStrong}>사번 2010</ThemedText>
        </View>

        <View style={[styles.hero, isDesktop && styles.heroDesktop]}>
          <View style={[styles.coverWrap, { borderColor: palette.border, backgroundColor: palette.surface }]}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
              }}
              style={styles.coverImage}
              contentFit="cover"
            />
          </View>

          <View style={styles.heroDetail}>
            <ThemedText style={styles.title}>사번 2010</ThemedText>
            <View style={styles.metaRow}>
              <ThemedText style={[styles.metaText, { color: palette.textMuted }]}>작가: 이뉴 스튜디오</ThemedText>
              <ThemedText style={[styles.metaText, { color: palette.textMuted }]}>연재중</ThemedText>
              <ThemedText style={[styles.metaText, { color: palette.textMuted }]}>멀티시점</ThemedText>
            </View>

            <View style={styles.tagRow}>
              {['#기업드라마', '#오피스', '#성장', '#권력전', '#2010s'].map((tag) => (
                <View key={tag} style={[styles.tag, { backgroundColor: palette.primarySofter, borderColor: palette.border }]}>
                  <ThemedText style={styles.tagText}>{tag}</ThemedText>
                </View>
              ))}
            </View>

            <ThemedText style={styles.synopsisTeaser}>
              2010년 이뉴컴퍼니 공채 동기 5명. 서로 다른 부서에서 살아남은 이들은 2026년, 같은 권력의
              정점에서 서로를 다시 마주한다.
            </ThemedText>

          </View>
        </View>

        <View style={[styles.mainGrid, isDesktop && styles.mainGridDesktop]}>
          <View style={styles.mainCol}>
            <View style={[styles.panel, { backgroundColor: palette.surface, borderColor: palette.border }]}>
              <ThemedText style={styles.panelTitle}>Synopsis</ThemedText>
              <ThemedText style={styles.paragraph}>
                2010년, 이뉴컴퍼니는 창립 10년차 스타트업으로 재도약을 노린다. 같은 날 입사한 다섯 명의
                신입은 각자 다른 부서에 배치되어 협업과 경쟁을 동시에 배운다. 성과, 안전, 윤리, 관계가 얽힌
                조직의 현실 속에서 이들은 수없이 실패하고, 그 실패의 원인을 고쳐가며 성장한다.
              </ThemedText>
              <ThemedText style={styles.paragraph}>
                동기라는 이름으로 시작된 연대는 회사가 커질수록 균열을 맞고, 2026년에는 그룹의 권력 구조를
                뒤집는 선택 앞에 선다. 이 작품은 성공담이 아니라, 실패를 다루는 방식이 리더를 만든다는 이야기를
                따라간다.
              </ThemedText>
            </View>

            <View style={[styles.panel, { backgroundColor: palette.surface, borderColor: palette.border }]}>
              <ThemedText style={styles.panelTitle}>세계관 포인트</ThemedText>
              <View style={[styles.infoCard, { backgroundColor: palette.surfaceAlt, borderColor: palette.border }]}>
                <ThemedText type="defaultSemiBold">기술 전환기</ThemedText>
                <ThemedText style={styles.infoText}>
                  스마트폰 확산과 전통 업무 방식이 충돌하던 시기. 데이터 문화가 조직 권력의 언어로 바뀐다.
                </ThemedText>
              </View>
              <View style={[styles.infoCard, { backgroundColor: palette.surfaceAlt, borderColor: palette.border }]}>
                <ThemedText type="defaultSemiBold">조직 문화의 긴장</ThemedText>
                <ThemedText style={styles.infoText}>
                  수직적 문화와 성과주의의 충돌 속에서, 주인공들은 생존과 윤리 사이의 경계를 배운다.
                </ThemedText>
              </View>
            </View>

            <View style={[styles.panel, { backgroundColor: palette.surface, borderColor: palette.border }]}>
              <ThemedText style={styles.panelTitle}>주요 인물</ThemedText>
              <View style={[styles.characterGrid, isTablet && styles.characterGridTablet]}>
                {novelCharacters.map((character) => (
                  <View
                    key={character.id}
                    style={[
                      styles.characterCard,
                      isTablet ? styles.characterCardTablet : styles.characterCardMobile,
                      { borderColor: palette.border, backgroundColor: palette.surfaceAlt },
                    ]}>
                    <View style={[styles.characterAvatar, !isTablet && styles.characterAvatarMobile]}>
                      <ThemedText style={[styles.characterInitial, !isTablet && styles.characterInitialMobile]}>
                        {character.name.slice(0, 1)}
                      </ThemedText>
                    </View>
                    <View style={styles.characterInfo}>
                      <ThemedText type="defaultSemiBold">{character.name}</ThemedText>
                      <ThemedText style={styles.characterTagline} numberOfLines={1}>
                        {character.tagline}
                      </ThemedText>
                      <ThemedText style={styles.characterDescription} numberOfLines={2}>
                        {character.description}
                      </ThemedText>
                    </View>
                  </View>
                ))}
              </View>
            </View>

          </View>

          {isDesktop ? (
            <View style={styles.sideCol}>
              <View style={[styles.sidePanel, { backgroundColor: palette.surface, borderColor: palette.border }]}>
                <ThemedText type="defaultSemiBold">작가 응원</ThemedText>
                <ThemedText style={styles.sideText}>작품이 마음에 들면 응원하기로 다음 시즌 제작을 지원하세요.</ThemedText>
                <Pressable style={styles.supportBtn}>
                  <ThemedText style={styles.supportBtnText}>응원하기</ThemedText>
                </Pressable>
              </View>

              <View style={[styles.sidePanel, { backgroundColor: palette.surface, borderColor: palette.border }]}>
                <ThemedText type="defaultSemiBold">비슷한 작품</ThemedText>
                {['프로젝트 매니저', '분기 실적의 밤', '오피스 시그널'].map((title) => (
                  <Pressable key={title} style={styles.similarItem}>
                    <ThemedText style={styles.similarTitle}>{title}</ThemedText>
                    <ThemedText style={styles.similarMeta}>기업/드라마</ThemedText>
                  </Pressable>
                ))}
              </View>
            </View>
          ) : null}
        </View>

        <View style={[styles.footer, { borderColor: palette.border }]}>
          <ThemedText style={styles.footerText}>© 2026 사번 2010. All rights reserved.</ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentWrap: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  page: {
    maxWidth: designTokens.layout.pageMax,
    width: '100%',
    alignSelf: 'center',
    gap: 12,
  },
  toolsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  breadcrumbs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 2,
  },
  breadcrumbText: {
    fontSize: 12,
    opacity: 0.65,
  },
  breadcrumbStrong: {
    fontSize: 12,
    fontWeight: '700',
  },
  hero: {
    gap: 14,
  },
  heroDesktop: {
    flexDirection: 'row',
    gap: 20,
  },
  coverWrap: {
    borderRadius: designTokens.radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 320,
    aspectRatio: 2 / 3,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  heroDetail: {
    flex: 1,
    gap: 10,
  },
  title: {
    fontSize: 38,
    lineHeight: 45,
    fontWeight: '900',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaText: {
    fontSize: 13,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderRadius: designTokens.radius.pill,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.9,
  },
  synopsisTeaser: {
    fontSize: 16,
    lineHeight: 26,
    opacity: 0.9,
    maxWidth: 720,
  },
  mainGrid: {
    gap: 12,
  },
  mainGridDesktop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  mainCol: {
    flex: 1,
    gap: 12,
  },
  panel: {
    borderWidth: 1,
    borderRadius: designTokens.radius.xl,
    padding: 14,
    gap: 10,
  },
  panelTitle: {
    fontSize: 21,
    fontWeight: '800',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 27,
    opacity: 0.9,
  },
  infoCard: {
    borderWidth: 1,
    borderRadius: designTokens.radius.md,
    padding: 12,
    gap: 5,
  },
  infoText: {
    lineHeight: 22,
    opacity: 0.85,
  },
  characterGrid: {
    gap: 8,
  },
  characterGridTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  characterCard: {
    borderWidth: 1,
    borderRadius: designTokens.radius.md,
    padding: 10,
    flexDirection: 'row',
    gap: 10,
  },
  characterCardTablet: {
    flexBasis: '49%',
    minWidth: 280,
  },
  characterCardMobile: {
    paddingVertical: 8,
    paddingHorizontal: 9,
    gap: 8,
  },
  characterAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#136DEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterAvatarMobile: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  characterInitial: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
  },
  characterInitialMobile: {
    fontSize: 14,
  },
  characterInfo: {
    flex: 1,
    gap: 2,
  },
  characterTagline: {
    fontSize: 12,
    opacity: 0.88,
  },
  characterDescription: {
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.72,
  },
  sideCol: {
    width: 320,
    gap: 10,
  },
  sidePanel: {
    borderWidth: 1,
    borderRadius: designTokens.radius.lg,
    padding: 12,
    gap: 8,
  },
  sideText: {
    lineHeight: 21,
    opacity: 0.82,
    fontSize: 13,
  },
  supportBtn: {
    marginTop: 4,
    minHeight: 42,
    borderRadius: designTokens.radius.sm,
    backgroundColor: '#FACC15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportBtnText: {
    color: '#111827',
    fontWeight: '800',
  },
  similarItem: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 8,
    gap: 2,
  },
  similarTitle: {
    fontWeight: '700',
  },
  similarMeta: {
    fontSize: 12,
    opacity: 0.65,
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 4,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    opacity: 0.64,
  },
});
