import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../constants/theme';
import { authApi } from '../services/authApi';

export const RegisterScreen: React.FC<{
  onRegisterSuccess: () => void;
  onNavigateToLogin: () => void;
}> = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [barRoll, setBarRoll] = useState('');
  const [chamberName, setChamberName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (!fullName || !email || !barRoll) {
      setErrorMessage('Please provide your advocate name, bar roll, and chambers email.');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    try {
      await authApi.register({ fullName, barRoll, chamberName, email, password });
      onRegisterSuccess();
    } catch (err: any) {
      setErrorMessage('Chambers enrollment failed. Check credentials and retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Insignia */}
        <View style={styles.brandContainer}>
          <Image
            source={require('../assets/lexis_juris_luxury_scales_emblem.png')}
            style={styles.emblem}
            resizeMode="contain"
          />
          <Text style={styles.brandTitle}>LEXORA</Text>
          <Text style={styles.brandSub}>CHAMBERS ENROLLMENT & VERIFICATION</Text>
        </View>

        {/* Enrollment Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Enroll Chambers Seat</Text>
          <Text style={styles.cardSubtitle}>
            Dedicated tenant sandbox with Bar Council credential verification.
          </Text>

          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Full Name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>ADVOCATE FULL NAME</Text>
            <TextInput
              style={styles.textInput}
              value={fullName}
              onChangeText={setFullName}
              placeholder="e.g. Adv. Vikramaditya Sen"
              placeholderTextColor={Colors.mutedBrown}
            />
          </View>

          {/* Bar Roll */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>BAR COUNCIL ENROLLMENT NUMBER</Text>
            <TextInput
              style={styles.textInput}
              value={barRoll}
              onChangeText={setBarRoll}
              placeholder="e.g. D/1042/2014 or MAH/884/2008"
              placeholderTextColor={Colors.mutedBrown}
              autoCapitalize="characters"
            />
          </View>

          {/* Chambers Firm */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>CHAMBERS / PRACTICE NAME</Text>
            <TextInput
              style={styles.textInput}
              value={chamberName}
              onChangeText={setChamberName}
              placeholder="e.g. Chambers of Senior Counsel"
              placeholderTextColor={Colors.mutedBrown}
            />
          </View>

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>CHAMBERS OFFICIAL EMAIL</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="counsel@chambers.in"
              placeholderTextColor={Colors.mutedBrown}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Passcode */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>CREATE WORKSPACE PASSCODE</Text>
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Minimum 10 characters"
              placeholderTextColor={Colors.mutedBrown}
              secureTextEntry
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.primaryButton, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color={Colors.warmIvory} size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>PROVISION CHAMBERS SEAT</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Existing Member Link */}
        <View style={styles.footerLinkRow}>
          <Text style={styles.footerLinkText}>Already have an enrolled seat? </Text>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text style={styles.footerLinkHighlight}>Chambers Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Footnote */}
        <View style={styles.securityBox}>
          <Text style={styles.securityText}>
            Enclave credentials are confirmed against Bar Council rosters before activation.
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  emblem: {
    width: 44,
    height: 44,
    marginBottom: 8,
    borderRadius: 6,
  },
  brandTitle: {
    fontFamily: 'Playfair Display',
    fontSize: 24,
    fontWeight: '700',
    color: Colors.ink,
    letterSpacing: 4,
  },
  brandSub: {
    fontFamily: 'JetBrains Mono',
    fontSize: 9,
    fontWeight: '700',
    color: Colors.burntTerracotta,
    letterSpacing: 1.5,
    marginTop: 4,
  },
  card: {
    backgroundColor: Colors.warmWhite,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 22,
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeading: {
    fontFamily: 'Playfair Display',
    fontSize: 21,
    fontWeight: '700',
    color: Colors.ink,
    textAlign: 'center',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: Colors.mutedBrown,
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 17,
  },
  errorBanner: {
    backgroundColor: Colors.errorLight,
    borderWidth: 1,
    borderColor: 'rgba(186, 26, 26, 0.3)',
    borderRadius: 6,
    padding: 10,
    marginBottom: 14,
  },
  errorText: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: Colors.error,
    textAlign: 'center',
  },
  fieldGroup: {
    marginBottom: 13,
  },
  fieldLabel: {
    fontFamily: 'JetBrains Mono',
    fontSize: 9,
    fontWeight: '700',
    color: Colors.mutedBrown,
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: Colors.warmIvory,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    paddingHorizontal: 13,
    paddingVertical: 10,
    fontSize: 13,
    fontFamily: 'Manrope',
    color: Colors.ink,
  },
  primaryButton: {
    backgroundColor: Colors.ink,
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 11,
    fontWeight: '700',
    color: Colors.warmIvory,
    letterSpacing: 1.2,
  },
  footerLinkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerLinkText: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: Colors.mutedBrown,
  },
  footerLinkHighlight: {
    fontFamily: 'Manrope',
    fontSize: 12,
    fontWeight: '700',
    color: Colors.burntTerracotta,
  },
  securityBox: {
    marginTop: 20,
    alignItems: 'center',
  },
  securityText: {
    fontFamily: 'Manrope',
    fontSize: 10,
    color: Colors.mutedBrown,
    textAlign: 'center',
    lineHeight: 14,
  },
});
