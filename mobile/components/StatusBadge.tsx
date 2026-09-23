import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

export const StatusBadge: React.FC<{
  label: string;
  variant?: 'processed' | 'queue' | 'verified';
}> = ({ label, variant = 'processed' }) => {
  const isProcessed = variant === 'processed' || label === 'Processed';
  const isQueue = variant === 'queue' || label === 'In Queue';

  const bg = isProcessed ? '#FFDBCA' : isQueue ? Colors.surfaceContainerHighest : Colors.surfaceContainer;
  const textColor = isProcessed ? Colors.burntTerracotta : isQueue ? Colors.mutedBrown : Colors.ink;

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      {isProcessed && <View style={[styles.dot, { backgroundColor: Colors.burntTerracotta }]} />}
      {isQueue && <View style={[styles.dot, { backgroundColor: '#F59E0B' }]} />}
      <Text style={[styles.text, { color: textColor }]}>{label.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
