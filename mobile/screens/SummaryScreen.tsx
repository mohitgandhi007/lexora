import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Colors } from '../constants/theme';
import { Header } from '../components/Header';
import { LegalProvisionItem } from '../components/LegalProvisionItem';
import { MOCK_SUMMARIES, MOCK_DOCUMENTS } from '../data/mockData';

export const SummaryScreen: React.FC<{
  summaryId: string;
  onBack: () => void;
  onOpenViewer: (docId: string) => void;
}> = ({ summaryId, onBack, onOpenViewer }) => {
  const summary = MOCK_SUMMARIES[summaryId] || MOCK_SUMMARIES['doc-2'];
  const associatedDoc = MOCK_DOCUMENTS.find((d) => d.id === summary.documentId) || MOCK_DOCUMENTS[1];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Intelligence Brief" />

      {/* Reader Sub-bar */}
      <View style={styles.subBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backLabel}>BACK TO DOCUMENTS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewerCta}
          onPress={() => onOpenViewer(associatedDoc.id)}
        >
          <Text style={styles.viewerCtaText}>View Folios 📄</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Header */}
        <View style={styles.headerSection}>
          <View style={styles.categoryBadgeRow}>
            <Text style={styles.categoryBadge}>{summary.category}</Text>
            <Text style={styles.concordanceBadge}>✨ {summary.concordance}</Text>
          </View>

          <Text style={styles.briefTitle}>{summary.title}</Text>
          <Text style={styles.briefCourt}>{summary.court}</Text>
          <Text style={styles.briefBench}>{summary.bench}</Text>
        </View>

        {/* 01 — EXECUTIVE SUMMARY */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionNumber}>01</Text>
            <Text style={styles.sectionHeading}>EXECUTIVE SUMMARY</Text>
          </View>
          <Text style={styles.bodyText}>{summary.executiveSummary}</Text>

          {/* Key Takeaways */}
          <View style={styles.takeawaysBox}>
            <Text style={styles.takeawaysTitle}>CORE LEGAL RATIOS:</Text>
            {summary.keyTakeaways.map((takeaway, idx) => (
              <View key={idx} style={styles.takeawayItem}>
                <Text style={styles.takeawayNumber}>0{idx + 1}.</Text>
                <Text style={styles.takeawayText}>{takeaway}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 02 — LEGAL PROVISIONS (Expandable Accordions) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionNumber}>02</Text>
            <Text style={styles.sectionHeading}>LEGAL PROVISIONS & RATIOS</Text>
          </View>
          <Text style={styles.sectionSubtext}>
            {summary.legalProvisions.length} statutory sections analyzed against Constitution Bench precedents:
          </Text>

          <View style={styles.provisionsList}>
            {summary.legalProvisions.map((prov, i) => (
              <LegalProvisionItem key={i} provision={prov} defaultOpen={i === 1} />
            ))}
          </View>
        </View>

        {/* 03 — KEY FACTS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionNumber}>03</Text>
            <Text style={styles.sectionHeading}>CHRONOLOGICAL KEY FACTS</Text>
          </View>

          <View style={styles.factsList}>
            {summary.keyFacts.map((fact, idx) => (
              <View key={idx} style={styles.factItem}>
                <Text style={styles.factBullet}>•</Text>
                <Text style={styles.factText}>{fact}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 04 — IMPORTANT DATES */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionNumber}>04</Text>
            <Text style={styles.sectionHeading}>IMPORTANT DATES & TIMELINE</Text>
          </View>

          <View style={styles.datesList}>
            {summary.importantDates.map((item, idx) => (
              <View key={idx} style={styles.dateRow}>
                <Text style={styles.dateLabel}>{item.date}</Text>
                <Text style={styles.dateEvent}>{item.event}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* PARTIES */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionNumber}>05</Text>
            <Text style={styles.sectionHeading}>PARTIES & COUNSEL</Text>
          </View>

          <View style={styles.partiesList}>
            {summary.parties.map((p, idx) => (
              <View key={idx} style={styles.partyRow}>
                <Text style={styles.partyRole}>{p.role}:</Text>
                <View style={styles.partyDetails}>
                  <Text style={styles.partyName}>{p.name}</Text>
                  <Text style={styles.partyCounsel}>Appearing: {p.counsel}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* AI DISCLOSURE */}
        <View style={styles.disclosureCard}>
          <Text style={styles.disclosureIcon}>ℹ️</Text>
          <Text style={styles.disclosureText}>
            <Text style={styles.disclosureBold}>AI Disclosure: </Text>
            {summary.aiDisclosure}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.warmIvory,
  },
  subBar: {
    height: 44,
    backgroundColor: Colors.surfaceContainerLow,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backIcon: {
    fontSize: 14,
    color: Colors.burntTerracotta,
  },
  backLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.burntTerracotta,
    letterSpacing: 0.8,
  },
  viewerCta: {
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  viewerCtaText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.ink,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 16,
  },
  categoryBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  categoryBadge: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: Colors.burntTerracotta,
    letterSpacing: 1,
  },
  concordanceBadge: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: Colors.emerald,
    backgroundColor: Colors.emeraldLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  briefTitle: {
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: '700',
    color: Colors.ink,
    lineHeight: 28,
  },
  briefCourt: {
    fontSize: 12,
    color: Colors.mutedBrown,
    marginTop: 4,
  },
  briefBench: {
    fontSize: 11,
    color: Colors.ink,
    fontWeight: '600',
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
    paddingBottom: 6,
  },
  sectionNumber: {
    fontFamily: 'serif',
    fontSize: 14,
    fontWeight: '700',
    color: Colors.burntTerracotta,
  },
  sectionHeading: {
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: Colors.ink,
    letterSpacing: 0.8,
  },
  sectionSubtext: {
    fontSize: 11,
    color: Colors.mutedBrown,
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 12,
    color: Colors.ink,
    lineHeight: 18,
  },
  takeawaysBox: {
    backgroundColor: Colors.surfaceContainerLow,
    borderLeftWidth: 3,
    borderLeftColor: Colors.burntTerracotta,
    padding: 10,
    borderRadius: 4,
    marginTop: 12,
  },
  takeawaysTitle: {
    fontSize: 9,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: Colors.burntTerracotta,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  takeawayItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 4,
  },
  takeawayNumber: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: Colors.burntTerracotta,
  },
  takeawayText: {
    fontSize: 11,
    color: Colors.ink,
    lineHeight: 16,
    flex: 1,
  },
  provisionsList: {
    marginTop: 4,
  },
  factsList: {
    gap: 8,
  },
  factItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  factBullet: {
    fontSize: 12,
    color: Colors.burntTerracotta,
    lineHeight: 16,
  },
  factText: {
    fontSize: 11,
    color: Colors.ink,
    lineHeight: 16,
    flex: 1,
  },
  datesList: {
    gap: 8,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  dateLabel: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: Colors.burntTerracotta,
    width: 90,
  },
  dateEvent: {
    fontSize: 11,
    color: Colors.ink,
    flex: 1,
  },
  partiesList: {
    gap: 8,
  },
  partyRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  partyRole: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: Colors.mutedBrown,
    width: 80,
  },
  partyDetails: {
    flex: 1,
  },
  partyName: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.ink,
  },
  partyCounsel: {
    fontSize: 10,
    color: Colors.burntTerracotta,
    marginTop: 1,
  },
  disclosureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  disclosureIcon: {
    fontSize: 14,
  },
  disclosureText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: Colors.mutedBrown,
    flex: 1,
  },
  disclosureBold: {
    fontWeight: '700',
    color: Colors.ink,
  },
});
