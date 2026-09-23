import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

export const Header: React.FC<{
  title?: string;
  onSearchPress?: () => void;
  onProfilePress?: () => void;
}> = ({ title = 'CHAMBERS', onSearchPress, onProfilePress }) => {
  return (
    <View style={styles.container}>
      {/* Brand Lockup */}
      <View style={styles.brandContainer}>
        <Image
          source={require('../assets/lexis_juris_luxury_scales_emblem.png')}
          style={styles.emblem}
          resizeMode="contain"
        />
        <View style={styles.brandTextContainer}>
          <Text style={styles.brandWordmark}>LEXORA</Text>
          <Text style={styles.brandSub}>{title.toUpperCase()}</Text>
        </View>
      </View>

      {/* Right Utilities */}
      <View style={styles.utilities}>
        <TouchableOpacity style={styles.iconButton} onPress={onSearchPress}>
          <Text style={styles.iconText}>🔍</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>🔔</Text>
          <View style={styles.notificationDot} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onProfilePress} style={styles.avatarButton}>
          <Image
            source={require('../assets/counsel_portrait.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: Colors.warmIvory,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emblem: {
    width: 28,
    height: 28,
    borderRadius: 4,
  },
  brandTextContainer: {
    flexDirection: 'column',
  },
  brandWordmark: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: '700',
    color: Colors.ink,
    letterSpacing: 2,
  },
  brandSub: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.bronze,
  },
  utilities: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 14,
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.burntTerracotta,
  },
  avatarButton: {
    padding: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});
