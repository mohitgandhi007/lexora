import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';
import { LegalDocument } from '../types';
import { StatusBadge } from './StatusBadge';

export const DocumentCard: React.FC<{
  document: LegalDocument;
  onPress: () => void;
  onReviewBrief?: () => void;
}> = ({ document, onPress, onReviewBrief }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📄</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.filename} numberOfLines={1}>
            {document.filename}
          </Text>
          <Text style={styles.metadata}>
            {document.courtName} • {document.pages} Folios
          </Text>
        </View>

        <StatusBadge label={document.status} />
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{document.type}</Text>
          </View>
          <Text style={styles.dateText}>{document.date}</Text>
        </View>

        {onReviewBrief && (
          <TouchableOpacity
            style={styles.reviewButton}
            onPress={onReviewBrief}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.reviewButtonText}>Brief →</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
    shadowColor: Colors.espresso,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: Colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
  },
  titleContainer: {
    flex: 1,
  },
  filename: {
    fontFamily: 'serif',
    fontSize: 14,
    fontWeight: '700',
    color: Colors.ink,
  },
  metadata: {
    fontSize: 11,
    color: Colors.mutedBrown,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tag: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 10,
    color: Colors.ink,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  dateText: {
    fontSize: 11,
    color: Colors.mutedBrown,
  },
  reviewButton: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  reviewButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.burntTerracotta,
  },
});
