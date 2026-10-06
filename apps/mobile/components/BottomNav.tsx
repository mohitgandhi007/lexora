import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';
import { ScreenTab } from '../types';

export const BottomNav: React.FC<{
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  onUploadPress?: () => void;
}> = ({ currentTab, onSelectTab, onUploadPress }) => {
  const tabs: { key: ScreenTab; label: string; icon: string }[] = [
    { key: 'Home', label: 'Home', icon: '🏛' },
    { key: 'Documents', label: 'Documents', icon: '📄' },
    { key: 'Search', label: 'Search', icon: '🔍' },
    { key: 'Profile', label: 'Profile', icon: '⚖️' },
  ];

  return (
    <View style={styles.container}>
      {tabs.slice(0, 2).map((tab) => {
        const isActive = currentTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => onSelectTab(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabIcon, isActive && styles.activeTabIcon]}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{tab.label}</Text>
            {isActive && <View style={styles.activeBar} />}
          </TouchableOpacity>
        );
      })}

      {/* Floating Center Action: + Upload */}
      <TouchableOpacity
        style={styles.centerUploadButton}
        onPress={onUploadPress}
        activeOpacity={0.85}
      >
        <Text style={styles.centerUploadIcon}>＋</Text>
      </TouchableOpacity>

      {tabs.slice(2).map((tab) => {
        const isActive = currentTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => onSelectTab(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabIcon, isActive && styles.activeTabIcon]}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{tab.label}</Text>
            {isActive && <View style={styles.activeBar} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: Colors.warmIvory,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabIcon: {
    fontSize: 18,
    opacity: 0.6,
  },
  activeTabIcon: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.mutedBrown,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  activeTabLabel: {
    color: Colors.burntTerracotta,
    fontWeight: '700',
  },
  activeBar: {
    position: 'absolute',
    bottom: 2,
    width: 16,
    height: 2,
    borderRadius: 1,
    backgroundColor: Colors.burntTerracotta,
  },
  centerUploadButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.burntTerracotta,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    shadowColor: Colors.espresso,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  centerUploadIcon: {
    fontSize: 22,
    color: Colors.warmWhite,
    fontWeight: '700',
    lineHeight: 24,
  },
});
