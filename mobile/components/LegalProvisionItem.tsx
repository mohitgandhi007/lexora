import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';
import { LegalProvision } from '../types';

export const LegalProvisionItem: React.FC<{
  provision: LegalProvision;
  defaultOpen?: boolean;
}> = ({ provision, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{provision.sectionNumber}</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.heading} numberOfLines={2}>
              {provision.heading}
            </Text>
            <Text style={styles.actName}>{provision.actName}</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <Text style={styles.ratioAction}>{isOpen ? 'Hide' : 'Ratio'}</Text>
          <Text style={styles.chevron}>{isOpen ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.content}>
          <View style={styles.quoteBox}>
            <Text style={styles.quoteText}>“{provision.verbatimQuote}”</Text>
          </View>

          {provision.interpretationNote && (
            <View style={styles.analysisBox}>
              <Text style={styles.analysisLabel}>Chambers Analysis:</Text>
              <Text style={styles.analysisText}>{provision.interpretationNote}</Text>
            </View>
          )}

          {provision.docketReference && (
            <Text style={styles.docketRef}>Reference: {provision.docketReference}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
    overflow: 'hidden',
  },
  header: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceContainerLow,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    flex: 1,
  },
  badge: {
    backgroundColor: Colors.surfaceContainerHighest,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginTop: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.burntTerracotta,
  },
  headerText: {
    flex: 1,
  },
  heading: {
    fontFamily: 'serif',
    fontSize: 13,
    fontWeight: '700',
    color: Colors.ink,
  },
  actName: {
    fontSize: 11,
    color: Colors.mutedBrown,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 8,
  },
  ratioAction: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.burntTerracotta,
    letterSpacing: 0.5,
  },
  chevron: {
    fontSize: 10,
    color: Colors.burntTerracotta,
  },
  content: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 4,
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
  },
  quoteBox: {
    borderLeftWidth: 2,
    borderLeftColor: Colors.burntTerracotta,
    paddingLeft: 8,
    paddingVertical: 4,
    marginVertical: 6,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 2,
  },
  quoteText: {
    fontFamily: 'serif',
    fontSize: 12,
    fontStyle: 'italic',
    color: Colors.ink,
    lineHeight: 18,
  },
  analysisBox: {
    backgroundColor: Colors.surfaceContainer,
    padding: 8,
    borderRadius: 6,
    marginTop: 6,
  },
  analysisLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: 2,
  },
  analysisText: {
    fontSize: 11,
    color: Colors.mutedBrown,
    lineHeight: 16,
  },
  docketRef: {
    fontSize: 10,
    color: Colors.mutedBrown,
    marginTop: 6,
    fontFamily: 'monospace',
  },
});
