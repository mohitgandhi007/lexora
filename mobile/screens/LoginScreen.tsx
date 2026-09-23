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

export const LoginScreen: React.FC<{
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
}> = ({ onLoginSuccess, onNavigateToRegister, onNavigateToForgotPassword }) => {
  const [email, setEmail] = useState('nariman.senior@chambers.in');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await authApi.login({ email, password });
      onLoginSuccess();
    } catch (err: any) {
      setErrorMessage('Invalid chambers credentials or revoked certificate.');
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
        {/* Brand Insignia Lockup */}
        <View style={styles.brandContainer}>
          <Image
            source={require('../assets/lexis_juris_luxury_scales_emblem.png')}
            style={styles.emblem}
            resizeMode="contain"
          />
          <Text style={styles.brandTitle}>LEXORA</Text>
          <Text style={styles.brandSub}>SUPREME CHAMBERS AUTHENTICATION</Text>
        </View>

        {/* Auth Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Chambers Sign In</Text>
          <Text style={styles.cardSubtitle}>
            Access privileged dockets, ratio synthesis, and sealed briefs.
          </Text>

          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Email / Identifier Field */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>CHAMBERS EMAIL / BAR ROLL NUMBER</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="e.g. nariman@chambers.in or SC/1994/DEL"
              placeholderTextColor={Colors.mutedBrown}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Password Field */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.fieldLabel}>ACCESS KEY / PASSWORD</Text>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.showHideText}>{showPassword ? 'HIDE' : 'SHOW'}</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter cryptographic key"
              placeholderTextColor={Colors.mutedBrown}
              secureTextEntry={!showPassword}
            />
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity
            style={styles.forgotRow}
            onPress={onNavigateToForgotPassword}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotText}>Recover Chambers Privilege?</Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.primaryButton, loading && styles.buttonDisabled]}
            onPress={handleSignIn}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color={Colors.warmIvory} size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>ENTER WORKSPACE</Text>
            )}
          </TouchableOpacity>

          {/* Biometric / FIDO2 Quick Action */}
          <TouchableOpacity
            style={styles.biometricButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.biometricIcon}>❖</Text>
            <Text style={styles.biometricText}>AUTHENTICATE VIA BAR SMARTCARD / FIDO2</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Registration Link */}
        <View style={styles.footerLinkRow}>
          <Text style={styles.footerLinkText}>New Supreme Chambers Practice? </Text>
          <TouchableOpacity onPress={onNavigateToRegister}>
            <Text style={styles.footerLinkHighlight}>Enroll Chambers</Text>
          </TouchableOpacity>
        </View>

        {/* Security Covenant */}
        <View style={styles.securityBox}>
          <Text style={styles.securityText}>
            🔒 256-Bit TLS & Hardware Security Module Verified • Bar Council of India Compliant
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
    marginBottom: 24,
  },
  emblem: {
    width: 48,
    height: 48,
    marginBottom: 10,
    borderRadius: 6,
  },
  brandTitle: {
    fontFamily: 'Playfair Display',
    fontSize: 26,
    fontWeight: '700',
    color: Colors.ink,
    letterSpacing: 4,
  },
  brandSub: {
    fontFamily: 'JetBrains Mono',
    fontSize: 10,
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
    fontSize: 22,
    fontWeight: '700',
    color: Colors.ink,
    textAlign: 'center',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: Colors.mutedBrown,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  errorBanner: {
    backgroundColor: Colors.errorLight,
    borderWidth: 1,
    borderColor: 'rgba(186, 26, 26, 0.3)',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: Colors.error,
    textAlign: 'center',
  },
  fieldGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  fieldLabel: {
    fontFamily: 'JetBrains Mono',
    fontSize: 9,
    fontWeight: '700',
    color: Colors.mutedBrown,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  showHideText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 10,
    fontWeight: '700',
    color: Colors.burntTerracotta,
    letterSpacing: 0.5,
  },
  textInput: {
    backgroundColor: Colors.warmIvory,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    fontFamily: 'Manrope',
    color: Colors.ink,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: Colors.burntTerracotta,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: Colors.ink,
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    fontWeight: '700',
    color: Colors.warmIvory,
    letterSpacing: 1.2,
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    paddingVertical: 12,
    backgroundColor: Colors.warmIvory,
  },
  biometricIcon: {
    fontSize: 12,
    color: Colors.burntTerracotta,
  },
  biometricText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 10,
    fontWeight: '700',
    color: Colors.espresso,
    letterSpacing: 0.5,
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
    marginTop: 24,
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
