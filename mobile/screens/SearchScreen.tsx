import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Colors } from '../constants/theme';
import { Header } from '../components/Header';
import { MOCK_DOCUMENTS } from '../data/mockData';

export const SearchScreen: React.FC<{
  onSelectDocument: (id: string) => void;
}> = ({ onSelectDocument }) => {
  const [query, setQuery] = useState('patent illegality');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Briefs' | 'Precedents'>('All');

  const results = useMemo(() => {
    return MOCK_DOCUMENTS.filter((doc) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        doc.filename.toLowerCase().includes(q) ||
        doc.title.toLowerCase().includes(q) ||
        doc.courtName.toLowerCase().includes(q) ||
        (doc.snippet && doc.snippet.toLowerCase().includes(q))
      );
    });
  }, [query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Global Search" />

      {/* Top Search Bar */}
      <View style={styles.searchBarSection}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search cases, documents, parties..."
            placeholderTextColor={Colors.mutedBrown}
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filters */}
        <View style={styles.filterRow}>
          {(['All', 'Briefs', 'Precedents'] as const).map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {results.length} CONCORDANCE MATCHES
          </Text>
          <Text style={styles.concordanceScore}>✨ 99.4% Vector Confidence</Text>
        </View>

        {results.map((doc) => (
          <TouchableOpacity
            key={doc.id}
            style={styles.resultCard}
            onPress={() => onSelectDocument(doc.id)}
            activeOpacity={0.75}
          >
            <View style={styles.resultTop}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{doc.type}</Text>
              </View>
              <Text style={styles.courtText}>{doc.courtName}</Text>
              <Text style={styles.dateText}>{doc.date}</Text>
            </View>

            <Text style={styles.documentName}>{doc.filename}</Text>

            {/* Bronze highlighted snippet */}
            <View style={styles.snippetBox}>
              <Text style={styles.snippetText}>
                “...learned arbitrator committed fatal{' '}
                <Text style={styles.highlightText}>Section 34(2A) patent illegality</Text> appearing on the face of the award by rewriting commercial formula Clause 14.2 without bilateral consent...”
              </Text>
            </View>

            <View style={styles.resultFooter}>
              <Text style={styles.openCta}>Open Folio 14 →</Text>
              <Text style={styles.foliosText}>{doc.pages} Folios</Text>
            </View>
          </TouchableOpacity>
        ))}

        {results.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No matching citations</Text>
            <Text style={styles.emptySubtitle}>Try searching for "Arbitration" or "SLP"</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.warmIvory,
  },
  searchBarSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: Colors.warmIvory,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: Colors.ink,
    height: '100%',
  },
  clearText: {
    fontSize: 12,
    color: Colors.mutedBrown,
    paddingHorizontal: 4,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: Colors.surfaceContainer,
  },
  categoryButtonActive: {
    backgroundColor: Colors.burntTerracotta,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.mutedBrown,
    letterSpacing: 0.5,
  },
  categoryTextActive: {
    color: Colors.warmWhite,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultsCount: {
    fontSize: 9,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: Colors.mutedBrown,
    letterSpacing: 0.8,
  },
  concordanceScore: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: Colors.emerald,
  },
  resultCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 12,
  },
  resultTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  tag: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.ink,
  },
  courtText: {
    fontSize: 10,
    color: Colors.mutedBrown,
    flex: 1,
  },
  dateText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: Colors.mutedBrown,
  },
  documentName: {
    fontFamily: 'serif',
    fontSize: 14,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: 8,
  },
  snippetBox: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 6,
    padding: 10,
    borderLeftWidth: 2,
    borderLeftColor: Colors.burntTerracotta,
    marginBottom: 10,
  },
  snippetText: {
    fontSize: 11,
    color: Colors.mutedBrown,
    lineHeight: 16,
    fontStyle: 'italic',
  },
  highlightText: {
    backgroundColor: '#FFDBCA',
    color: Colors.burntTerracotta,
    fontWeight: '700',
    fontStyle: 'normal',
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
    paddingTop: 8,
  },
  openCta: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.burntTerracotta,
  },
  foliosText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: Colors.mutedBrown,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontFamily: 'serif',
    fontSize: 15,
    fontWeight: '700',
    color: Colors.ink,
  },
  emptySubtitle: {
    fontSize: 12,
    color: Colors.mutedBrown,
    marginTop: 4,
  },
});
