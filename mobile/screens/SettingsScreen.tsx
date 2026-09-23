import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Colors } from '../constants/theme';
import { Header } from '../components/Header';

export const SettingsScreen: React.FC<{
  onBack?: () => void;
  onSignOut: () => void;
}> = ({ onBack, onSignOut }) => {
  const [chamberName, setChamberName] = useState(
    'K. Venugopal Senior Chambers — Supreme Court Practice'
  );
  const [jurisdiction, setJurisdiction] = useState('Supreme Court of India (Appellate)');
  const [diglotActive, setDiglotActive] = useState(true);
  const [offlineEncryption, setOfflineEncryption] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [saveNotice, setSaveNotice] = useState(false);

  const handleSave = () => {
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 2000);
  };

  const handlePromptSignOut = () => {
    Alert.alert(
      'Revoke Chambers Session',
      'Are you certain you wish to sign out of the Supreme Chambers enclave? Local encrypted folios will remain sealed.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: onSignOut },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Chambers Protocol" />

      {/* Reader Sub-bar */}
      {onBack && (
        <View style={styles.subBar}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backIcon}>←</Text>
            <Text style={styles.backText}>Return</Text>
          </TouchableOpacity>
          <Text style={styles.subBarTitle}>Workspace & Enclave Parameters</Text>
        </View>
      )}

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={require('../assets/counsel_portrait.png')}
            style={styles.avatar}
          />
          <View style={styles.profileDetails}>
            <View style={styles.standingBadge}>
              <Text style={styles.standingText}>DESIGNATED SENIOR COUNSEL</Text>
            </View>
            <Text style={styles.counselName}>Adv. V. Nariman</Text>
            <Text style={styles.barRoll}>SC/1994/DEL • 32 Years Standing</Text>
            <Text style={styles.chambersAddress}>
              Supreme Court of India, Bhagwan Das Road, New Delhi
            </Text>
          </View>
        </View>

        {/* Section 1: Practice Configuration */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>PRACTICE & DOCKET CONFIGURATION</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>CHAMBERS PRACTICE DESIGNATION</Text>
            <TextInput
              style={styles.textInput}
              value={chamberName}
              onChangeText={setChamberName}
              placeholderTextColor={Colors.mutedBrown}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>PRIMARY APPELLATE JURISDICTION</Text>
            <TextInput
              style={styles.textInput}
              value={jurisdiction}
              onChangeText={setJurisdiction}
              placeholderTextColor={Colors.mutedBrown}
            />
          </View>
        </View>

        {/* Section 2: Neural Intelligence & Privacy */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>INTELLIGENCE ENGINE & ENCLAVE</Text>

          {/* Setting Row 1 */}
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Diglot Bilingual Extraction</Text>
              <Text style={styles.settingDesc}>
                Maintain Devanagari Hindi original quotes alongside authoritative English translations.
              </Text>
            </View>
            <Switch
              value={diglotActive}
              onValueChange={setDiglotActive}
              trackColor={{ false: Colors.softStone, true: Colors.burntTerracotta }}
              thumbColor={Colors.warmIvory}
            />
          </View>

          <View style={styles.divider} />

          {/* Setting Row 2 */}
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Local AES-256 GCM Storage</Text>
              <Text style={styles.settingDesc}>
                Hardware-enclave encryption for cached petitions, briefs, and ratio extracts.
              </Text>
            </View>
            <Switch
              value={offlineEncryption}
              onValueChange={setOfflineEncryption}
              trackColor={{ false: Colors.softStone, true: Colors.burntTerracotta }}
              thumbColor={Colors.warmIvory}
            />
          </View>

          <View style={styles.divider} />

          {/* Setting Row 3 */}
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Tactile Folio Haptics</Text>
              <Text style={styles.settingDesc}>
                Subtle feedback during page flipping and provision expanding.
              </Text>
            </View>
            <Switch
              value={hapticFeedback}
              onValueChange={setHapticFeedback}
              trackColor={{ false: Colors.softStone, true: Colors.burntTerracotta }}
              thumbColor={Colors.warmIvory}
            />
          </View>
        </View>

        {/* Section 3: Storage & Archival Tier */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>CHAMBERS REPOSITORY QUOTA</Text>

          <View style={styles.storageHeaderRow}>
            <Text style={styles.storageTitle}>Vault Capacity Allocated</Text>
            <Text style={styles.storageValue}>84.2 GB / 250 GB (33%)</Text>
          </View>

          <View style={styles.progressBarTrack}>
            <View style={styles.progressBarFill} />
          </View>

          <View style={styles.tierDetails}>
            <Text style={styles.tierItem}>• 284 Active SLPs & Petitions</Text>
            <Text style={styles.tierItem}>• High-Court Certified Paperbooks</Text>
            <Text style={styles.tierItem}>• Unrestricted Judicial Cross-References</Text>
          </View>
        </View>

        {/* Save Confirmation Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveButtonText}>
            {saveNotice ? '✓ PREFERENCES PRESERVED' : 'SAVE CHAMBERS PREFERENCES'}
          </Text>
        </TouchableOpacity>

        {/* Sign Out Card */}
        <View style={styles.dangerZone}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handlePromptSignOut}
            activeOpacity={0.8}
          >
            <Text style={styles.signOutButtonText}>DISCONNECT CHAMBERS SESSION</Text>
          </TouchableOpacity>
          <Text style={styles.signOutSubtext}>
            Revokes device authorization tokens. Encrypted brief dockets remain protected.
          </Text>
        </View>

        {/* Footnote */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerVersion}>LEXORA NATIVE APPELLATE WORKSPACE v2.4.1</Text>
          <Text style={styles.footerLegal}>
            Editorial Legal Luxury • Supreme Court of India Enclave Security
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.surfaceContainerLow,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backIcon: {
    fontSize: 16,
    color: Colors.burntTerracotta,
    fontWeight: 'bold',
  },
  backText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.burntTerracotta,
    fontFamily: 'Manrope',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subBarTitle: {
    fontSize: 11,
    fontFamily: 'JetBrains Mono',
    color: Colors.mutedBrown,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 16,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: Colors.warmWhite,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: Colors.antiqueGold,
  },
  profileDetails: {
    flex: 1,
  },
  standingBadge: {
    backgroundColor: 'rgba(180, 83, 9, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    marginBottom: 4,
  },
  standingText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 9,
    fontWeight: '700',
    color: Colors.burntTerracotta,
    letterSpacing: 0.5,
  },
  counselName: {
    fontFamily: 'Playfair Display',
    fontSize: 20,
    fontWeight: '700',
    color: Colors.ink,
  },
  barRoll: {
    fontFamily: 'JetBrains Mono',
    fontSize: 11,
    color: Colors.mutedBrown,
    marginTop: 2,
  },
  chambersAddress: {
    fontFamily: 'Manrope',
    fontSize: 11,
    color: Colors.mutedBrown,
    marginTop: 4,
    lineHeight: 15,
  },
  sectionCard: {
    backgroundColor: Colors.warmWhite,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
  },
  sectionHeader: {
    fontFamily: 'JetBrains Mono',
    fontSize: 10,
    fontWeight: '700',
    color: Colors.burntTerracotta,
    letterSpacing: 1,
    marginBottom: 14,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontFamily: 'JetBrains Mono',
    fontSize: 9,
    fontWeight: '700',
    color: Colors.mutedBrown,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: Colors.warmIvory,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
    fontFamily: 'Manrope',
    color: Colors.ink,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingTextContainer: {
    flex: 1,
    paddingRight: 12,
  },
  settingTitle: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '600',
    color: Colors.ink,
    marginBottom: 2,
  },
  settingDesc: {
    fontFamily: 'Manrope',
    fontSize: 11,
    color: Colors.mutedBrown,
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderSubtle,
    marginVertical: 6,
  },
  storageHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  storageTitle: {
    fontFamily: 'Manrope',
    fontSize: 13,
    fontWeight: '600',
    color: Colors.ink,
  },
  storageValue: {
    fontFamily: 'JetBrains Mono',
    fontSize: 11,
    fontWeight: '600',
    color: Colors.burntTerracotta,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: Colors.softStone,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    width: '33%',
    height: '100%',
    backgroundColor: Colors.burntTerracotta,
  },
  tierDetails: {
    gap: 4,
  },
  tierItem: {
    fontFamily: 'Manrope',
    fontSize: 11,
    color: Colors.mutedBrown,
  },
  saveButton: {
    backgroundColor: Colors.ink,
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButtonText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 11,
    fontWeight: '700',
    color: Colors.warmIvory,
    letterSpacing: 1,
  },
  dangerZone: {
    marginTop: 8,
    alignItems: 'center',
    gap: 8,
  },
  signOutButton: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(186, 26, 26, 0.4)',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButtonText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 11,
    fontWeight: '700',
    color: Colors.error,
    letterSpacing: 0.8,
  },
  signOutSubtext: {
    fontFamily: 'Manrope',
    fontSize: 11,
    color: Colors.mutedBrown,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 15,
  },
  footerInfo: {
    alignItems: 'center',
    marginTop: 16,
    gap: 4,
  },
  footerVersion: {
    fontFamily: 'JetBrains Mono',
    fontSize: 10,
    color: Colors.mutedBrown,
    letterSpacing: 1,
  },
  footerLegal: {
    fontFamily: 'Manrope',
    fontSize: 10,
    color: Colors.mutedBrown,
    opacity: 0.8,
  },
});
