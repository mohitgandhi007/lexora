import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

export const QuickAction: React.FC<{
  number: string;
  title: string;
  description: string;
  tag: string;
  onPress: () => void;
}> = ({ number, title, description, tag, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.header}>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.arrow}>↗</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <Text style={styles.tag}>{tag.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    width: 170,
    marginRight: 10,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  number: {
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: '700',
    color: Colors.burntTerracotta,
  },
  arrow: {
    fontSize: 14,
    color: Colors.mutedBrown,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 13,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    color: Colors.mutedBrown,
    lineHeight: 14,
    marginBottom: 10,
  },
  tag: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.burntTerracotta,
    letterSpacing: 0.8,
  },
});
