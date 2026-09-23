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

export const ForgotPasswordScreen: React.FC<{
  onNavigateToLogin: () => void;
}> = ({ onNavigateToLogin }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTransmit = async () => {
    if (!email) {
      setErrorMessage('Please enter your enrolled chambers email address.');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    try {
      await authApi.requestPasswordReset(email);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage('Unable to initiate privilege recovery.');
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
          <Text style={styles.brandSub}>PRIVILEGE RECOVERY PROTOCOL</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Recover Chambers Access</Text>
          <Text style={styles.cardSubtitle}>
            Transmit an encrypted certificate reset link to your verified advocate email.
          </Text>

          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {submitted ? (
            <View style={styles.successContainer}>
              <View style={styles.successIconBox}>
                <Text style={styles.successIcon}>✓</Text>
              </View>
              <Text style={styles.successHeading}>Recovery Link Dispatched</Text>
              <Text style={styles.successBody}>
                An encrypted authentication token has been dispatched to {email}. Follow the instructions to re-seal your chambers key.
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={onNavigateToLogin}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryButtonText}>RETURN TO SIGN IN</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
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

              <TouchableOpacity
                style={[styles.primaryButton, loading && styles.buttonDisabled]}
                onPress={handleTransmit}
                disabled={loading}
                activeOpacity={0.85}
              >
                {loading ? (
                  <ActivityIndicator color={Colors.warmIvory} size="small" />
                ) : (
                  <Text style={styles.primaryButtonText}>TRANSMIT RECOVERY TOKEN</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onNavigateToLogin}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Return to Chambers Sign In</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.securityBox}>
          <Text style={styles.securityText}>
            Recovery keys are time-sealed and invalidate after 15 minutes for Bar confidentiality.
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
    marginBottom: 18,
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
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    fontFamily: 'Manrope',
    color: Colors.ink,
  },
  primaryButton: {
    backgroundColor: Colors.burntTerracotta,
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
    fontSize: 11,
    fontWeight: '700',
    color: Colors.warmIvory,
    letterSpacing: 1.2,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  cancelButtonText: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: Colors.mutedBrown,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  successIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
    borderWidth: 1,
    borderColor: Colors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  successIcon: {
    fontSize: 20,
    color: Colors.emerald,
    fontWeight: 'bold',
  },
  successHeading: {
    fontFamily: 'Playfair Display',
    fontSize: 18,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: 6,
  },
  successBody: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: Colors.mutedBrown,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
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
