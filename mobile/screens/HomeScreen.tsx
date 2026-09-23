import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Colors } from '../constants/theme';
import { Header } from '../components/Header';
import { QuickAction } from '../components/QuickAction';
import { DocumentCard } from '../components/DocumentCard';
import { MOCK_DOCUMENTS } from '../data/mockData';
import { LegalDocument } from '../types';

export const HomeScreen: React.FC<{
  onNavigateToUpload: () => void;
  onNavigateToDocuments: () => void;
  onNavigateToSummary: (id: string) => void;
  onNavigateToViewer: (id: string) => void;
  onNavigateToSearch: () => void;
  onNavigateToProfile: () => void;
}> = ({
  onNavigateToUpload,
  onNavigateToDocuments,
  onNavigateToSummary,
  onNavigateToViewer,
  onNavigateToSearch,
  onNavigateToProfile,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Workspace Overview"
        onSearchPress={onNavigateToSearch}
        onProfilePress={onNavigateToProfile}
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Docket Strip */}
        <View style={styles.docketStrip}>
          <View style={styles.docketLeft}>
            <View style={styles.activeDot} />
            <Text style={styles.docketText}>SUPREME CHAMBERS • MICHAELMAS '26</Text>
          </View>
          <Text style={styles.folioNo}>FOLIO No. 104</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTagline}>APPELLATE WORKSPACE & SYNTHESIS</Text>

          <Text style={styles.heroTitle}>
            Your Legal Knowledge,{'\n'}
            <Text style={styles.heroTitleItalic}>Clearly Understood.</Text>
          </Text>

          <Text style={styles.heroSubtitle}>
            Upload legal documents, extract the information that matters, and turn complex case material into structured insights.
          </Text>

          <View style={styles.heroActions}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onNavigateToUpload}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>＋ Upload Document</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onNavigateToDocuments}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>View Documents →</Text>
            </TouchableOpacity>
          </View>

          {/* Hero Visual: Lady Justice Cropped for Mobile */}
          <View style={styles.heroImageContainer}>
            <Image
              source={require('../assets/lady_justice.png')}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroImageOverlay}>
              <Text style={styles.imageOverlayTag}>FOLIO SERIES • 2026</Text>
              <Text style={styles.imageOverlayCourt}>SUPREME COURT DOCKET</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions Scroll View */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
          <TouchableOpacity onPress={onNavigateToDocuments}>
            <Text style={styles.sectionLink}>Directory →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActionsScroll}
        >
          <QuickAction
            number="01"
            title="Upload Document"
            description="Ingest SLPs, paper books, or charge sheets for automated indexing."
            tag="Direct Ingestion"
            onPress={onNavigateToUpload}
          />
          <QuickAction
            number="02"
            title="View Documents"
            description="Browse indexed repository, evidentiary filings, and archived pleadings."
            tag="Repository Index"
            onPress={onNavigateToDocuments}
          />
          <QuickAction
            number="03"
            title="Recent Summaries"
            description="Access AI-extracted ratio decidendi, statutory anomalies, and brief notes."
            tag="Synthesized Ratios"
            onPress={() => onNavigateToSummary('doc-2')}
          />
        </ScrollView>

        {/* Recent Documents Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>RECENT DOCUMENTS</Text>
          <TouchableOpacity onPress={onNavigateToDocuments}>
            <Text style={styles.sectionLink}>View All ({MOCK_DOCUMENTS.length}) →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.documentList}>
          {MOCK_DOCUMENTS.slice(0, 3).map((doc: LegalDocument) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onPress={() => onNavigateToViewer(doc.id)}
              onReviewBrief={() => onNavigateToSummary(doc.id)}
            />
          ))}
        </View>

        {/* Information Doctrine Callout */}
        <View style={styles.doctrineCard}>
          <Text style={styles.doctrineTag}>ARCHIVAL RIGOR & REASONING</Text>
          <Text style={styles.doctrineHeading}>UNDERSTAND MORE. SEARCH FASTER.</Text>
          <Text style={styles.doctrineBody}>
            Lexora structures unstructured judicial transcripts, paper books, and statutes into a verified, citation-backed intelligence network.
          </Text>
          <View style={styles.doctrinePills}>
            <Text style={styles.doctrinePill}>RATIO DECIDENDI</Text>
            <Text style={styles.doctrinePill}>•</Text>
            <Text style={styles.doctrinePill}>BNS CONCORDANCE</Text>
          </View>
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
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  docketStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surfaceContainerLow,
  },
  docketLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.burntTerracotta,
  },
  docketText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.mutedBrown,
    letterSpacing: 0.8,
  },
  folioNo: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: Colors.mutedBrown,
  },
  heroSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: Colors.warmIvory,
  },
  heroTagline: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.burntTerracotta,
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  heroTitle: {
    fontFamily: 'serif',
    fontSize: 26,
    fontWeight: '700',
    color: Colors.ink,
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  heroTitleItalic: {
    fontStyle: 'italic',
    fontWeight: '400',
    color: Colors.burntTerracotta,
  },
  heroSubtitle: {
    fontSize: 12,
    color: Colors.mutedBrown,
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 16,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: Colors.burntTerracotta,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  primaryButtonText: {
    color: Colors.warmWhite,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
  },
  secondaryButtonText: {
    color: Colors.ink,
    fontSize: 12,
    fontWeight: '600',
  },
  heroImageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    height: 180,
    position: 'relative',
    marginTop: 4,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(17, 16, 15, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageOverlayTag: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: Colors.warmWhite,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  imageOverlayCourt: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: Colors.antiqueGold,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.mutedBrown,
    letterSpacing: 1,
  },
  sectionLink: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.burntTerracotta,
  },
  quickActionsScroll: {
    paddingHorizontal: 16,
  },
  documentList: {
    paddingHorizontal: 16,
  },
  doctrineCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  doctrineTag: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.burntTerracotta,
    letterSpacing: 1,
    marginBottom: 4,
  },
  doctrineHeading: {
    fontFamily: 'serif',
    fontSize: 15,
    fontWeight: '700',
    color: Colors.ink,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  doctrineBody: {
    fontSize: 11,
    color: Colors.mutedBrown,
    lineHeight: 16,
    marginBottom: 10,
  },
  doctrinePills: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  doctrinePill: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: Colors.mutedBrown,
    fontWeight: '600',
  },
});
