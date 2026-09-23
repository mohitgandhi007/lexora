import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { Colors } from '../constants/theme';
import { Header } from '../components/Header';
import { DocumentCard } from '../components/DocumentCard';
import { MOCK_DOCUMENTS } from '../data/mockData';
import { LegalDocument } from '../types';

export const DocumentsScreen: React.FC<{
  onSelectDocument: (id: string) => void;
  onReviewBrief: (id: string) => void;
  onUploadPress: () => void;
}> = ({ onSelectDocument, onReviewBrief, onUploadPress }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Processed' | 'In Queue'>('All');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const filteredDocs = useMemo(() => {
    return MOCK_DOCUMENTS.filter((doc) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        doc.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.courtName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        activeFilter === 'All' || doc.status === activeFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, activeFilter]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Chambers Documents" />

      <View style={styles.topBar}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search briefs, citations (Art. 136, § 482)..."
            placeholderTextColor={Colors.mutedBrown}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Chips */}
        <View style={styles.filterChipsRow}>
          <TouchableOpacity
            style={[styles.filterChip, activeFilter === 'All' && styles.filterChipActive]}
            onPress={() => setActiveFilter('All')}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilter === 'All' && styles.filterChipTextActive,
              ]}
            >
              ALL ({MOCK_DOCUMENTS.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeFilter === 'Processed' && styles.filterChipActive]}
            onPress={() => setActiveFilter('Processed')}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilter === 'Processed' && styles.filterChipTextActive,
              ]}
            >
              PROCESSED (4)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeFilter === 'In Queue' && styles.filterChipActive]}
            onPress={() => setActiveFilter('In Queue')}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilter === 'In Queue' && styles.filterChipTextActive,
              ]}
            >
              QUEUED (1)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadCta} onPress={onUploadPress}>
            <Text style={styles.uploadCtaText}>＋ Upload</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.burntTerracotta} />
        }
      >
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>
            {filteredDocs.length} DOCKETS IN CUSTODY
          </Text>
          <Text style={styles.listHeaderRight}>MICHAELMAS TERM</Text>
        </View>

        {filteredDocs.map((doc: LegalDocument) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onPress={() => onSelectDocument(doc.id)}
            onReviewBrief={() => onReviewBrief(doc.id)}
          />
        ))}

        {filteredDocs.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No matching folios found</Text>
            <Text style={styles.emptySubtitle}>Try changing your filter query</Text>
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
  topBar: {
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
  filterChipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: Colors.surfaceContainer,
  },
  filterChipActive: {
    backgroundColor: Colors.burntTerracotta,
  },
  filterChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.mutedBrown,
    letterSpacing: 0.5,
  },
  filterChipTextActive: {
    color: Colors.warmWhite,
  },
  uploadCta: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: Colors.ink,
  },
  uploadCtaText: {
    color: Colors.warmWhite,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  listHeaderText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: Colors.mutedBrown,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  listHeaderRight: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: Colors.burntTerracotta,
    fontWeight: '700',
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
