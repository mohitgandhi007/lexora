import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Colors } from '../constants/theme';
import { Header } from '../components/Header';
import { MOCK_DOCUMENTS } from '../data/mockData';

export const DocumentViewerScreen: React.FC<{
  documentId: string;
  onBack: () => void;
  onNavigateToSummary: (id: string) => void;
}> = ({ documentId, onBack, onNavigateToSummary }) => {
  const doc = MOCK_DOCUMENTS.find((d) => d.id === documentId) || MOCK_DOCUMENTS[1];
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchInDoc, setSearchInDoc] = useState('');
  const totalPages = doc.pages || 142;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Folio Reader" />

      {/* Reader Sub-bar */}
      <View style={styles.subBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backLabel}>REPOSITORY</Text>
        </TouchableOpacity>

        {/* Pager */}
        <View style={styles.pager}>
          <TouchableOpacity
            onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            style={styles.pagerArrow}
          >
            <Text style={styles.pagerArrowText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.pagerText}>
            <Text style={styles.pagerCurrent}>{String(currentPage).padStart(2, '0')}</Text> / {totalPages}
          </Text>
          <TouchableOpacity
            onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            style={styles.pagerArrow}
          >
            <Text style={styles.pagerArrowText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Zoom Controls */}
        <View style={styles.zoomControl}>
          <TouchableOpacity onPress={() => setZoomLevel((z) => Math.max(80, z - 10))}>
            <Text style={styles.zoomBtn}>−</Text>
          </TouchableOpacity>
          <Text style={styles.zoomText}>{zoomLevel}%</Text>
          <TouchableOpacity onPress={() => setZoomLevel((z) => Math.min(140, z + 10))}>
            <Text style={styles.zoomBtn}>＋</Text>
          </TouchableOpacity>
        </View>

        {/* Jump to AI Brief */}
        <TouchableOpacity
          style={styles.aiBriefButton}
          onPress={() => onNavigateToSummary(doc.id)}
        >
          <Text style={styles.aiBriefText}>Brief ✨</Text>
        </TouchableOpacity>
      </View>

      {/* In-Document Quick Search */}
      <View style={styles.docSearchStrip}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.docSearchInput}
          placeholder="Search within folio (e.g. patent illegality)..."
          placeholderTextColor={Colors.mutedBrown}
          value={searchInDoc}
          onChangeText={setSearchInDoc}
        />
        {searchInDoc.length > 0 && (
          <TouchableOpacity onPress={() => setSearchInDoc('')}>
            <Text style={styles.clearSearch}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Metadata Banner */}
      <View style={styles.metaBanner}>
        <Text style={styles.metaText} numberOfLines={1}>
          <Text style={styles.metaBold}>Forum:</Text> {doc.courtName} • {doc.date}
        </Text>
      </View>

      {/* Vertical Document Folio Reader */}
      <ScrollView
        style={styles.folioScroll}
        contentContainerStyle={styles.folioContainer}
        showsVerticalScrollIndicator={true}
      >
        <View
          style={[
            styles.folioSheet,
            { transform: [{ scale: zoomLevel / 100 }] },
          ]}
        >
          {/* Folio Formal Court Header */}
          <View style={styles.courtHeader}>
            <Text style={styles.courtSupreme}>IN THE SUPREME COURT OF INDIA</Text>
            <Text style={styles.courtJurisdiction}>EXTRAORDINARY APPELLATE JURISDICTION</Text>
            <Text style={styles.caseNumber}>{doc.title.toUpperCase()}</Text>
            <Text style={styles.statutoryCitation}>(Under Article 136 of the Constitution of India)</Text>
          </View>

          {/* Parties Strip */}
          <View style={styles.partiesBox}>
            <Text style={styles.partyText}><Text style={styles.bold}>Petitioner:</Text> Union of India</Text>
            <Text style={styles.vsText}>VERSUS</Text>
            <Text style={styles.partyText}><Text style={styles.bold}>Respondent:</Text> K.S. Minerals Ltd.</Text>
          </View>

          {/* Legal Text Paragraphs with Citation Highlights */}
          <View style={styles.paragraphs}>
            <Text style={styles.paragraphText}>
              <Text style={styles.paraNo}>[1] </Text>
              The present Special Leave Petition raises substantial questions of law of general public importance concerning the extent of judicial scrutiny exercisable under{' '}
              <Text style={styles.citationHighlight}>Section 34 & 37</Text> of the Arbitration and Conciliation Act, 1996, in relation to sovereign mineral concessions located within the Exclusive Economic Zone under{' '}
              <Text style={styles.citationHighlight}>Article 297</Text> of the Constitution.
            </Text>

            <Text style={styles.paragraphText}>
              <Text style={styles.paraNo}>[2] </Text>
              It is respectfully submitted that the learned Sole Arbitrator committed fatal{' '}
              <Text style={styles.citationHighlight}>Section 34(2A) patent illegality</Text> appearing on the face of the arbitral award by unilaterally rewriting commercial formula Clause 14.2 without bilateral consent.
            </Text>

            <Text style={styles.paragraphText}>
              <Text style={styles.paraNo}>[3] </Text>
              The Division Bench of the High Court fell into grave error in affirming the award upon the superficial premise that contractual interpretation is solely within the arbitrator's province, failing to notice that statutory royalty regulations are non-derogable public policy covenants.
            </Text>
          </View>

          <View style={styles.folioFooter}>
            <Text style={styles.folioFooterLeft}>Folio Page {currentPage} of {totalPages}</Text>
            <Text style={styles.folioFooterRight}>Adv. V. Nariman, Senior Counsel</Text>
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
  subBar: {
    height: 48,
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
  pager: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pagerArrow: {
    paddingHorizontal: 4,
  },
  pagerArrowText: {
    fontSize: 16,
    color: Colors.mutedBrown,
    fontWeight: '700',
  },
  pagerText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: Colors.ink,
    marginHorizontal: 4,
  },
  pagerCurrent: {
    color: Colors.burntTerracotta,
    fontWeight: '700',
  },
  zoomControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  zoomBtn: {
    fontSize: 12,
    color: Colors.ink,
    fontWeight: '700',
    paddingHorizontal: 2,
  },
  zoomText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: Colors.ink,
  },
  aiBriefButton: {
    backgroundColor: Colors.burntTerracotta,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  aiBriefText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.warmWhite,
  },
  docSearchStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 12,
    height: 36,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  docSearchInput: {
    flex: 1,
    fontSize: 11,
    color: Colors.ink,
    height: '100%',
  },
  clearSearch: {
    fontSize: 12,
    color: Colors.mutedBrown,
  },
  metaBanner: {
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  metaText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: Colors.mutedBrown,
  },
  metaBold: {
    fontWeight: '700',
    color: Colors.ink,
  },
  folioScroll: {
    flex: 1,
    backgroundColor: Colors.softStone,
  },
  folioContainer: {
    padding: 12,
    paddingBottom: 40,
    alignItems: 'center',
  },
  folioSheet: {
    width: '100%',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
    shadowColor: Colors.espresso,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  courtHeader: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 14,
    marginBottom: 14,
  },
  courtSupreme: {
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '700',
    letterSpacing: 1,
    color: Colors.burntTerracotta,
  },
  courtJurisdiction: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: Colors.mutedBrown,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  caseNumber: {
    fontFamily: 'serif',
    fontSize: 13,
    fontWeight: '700',
    color: Colors.ink,
    marginTop: 6,
    textAlign: 'center',
  },
  statutoryCitation: {
    fontSize: 10,
    color: Colors.mutedBrown,
    fontStyle: 'italic',
    marginTop: 2,
  },
  partiesBox: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 6,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 14,
  },
  partyText: {
    fontSize: 11,
    color: Colors.ink,
  },
  bold: {
    fontWeight: '700',
  },
  vsText: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: Colors.mutedBrown,
    marginVertical: 2,
  },
  paragraphs: {
    gap: 12,
  },
  paragraphText: {
    fontFamily: 'serif',
    fontSize: 13,
    lineHeight: 20,
    color: Colors.ink,
  },
  paraNo: {
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: Colors.burntTerracotta,
  },
  citationHighlight: {
    backgroundColor: '#FFDBCA',
    color: Colors.burntTerracotta,
    fontWeight: '700',
  },
  folioFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 24,
    paddingTop: 10,
  },
  folioFooterLeft: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: Colors.mutedBrown,
  },
  folioFooterRight: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: Colors.burntTerracotta,
    fontWeight: '600',
  },
});
