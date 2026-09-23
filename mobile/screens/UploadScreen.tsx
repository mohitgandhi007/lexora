import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../constants/theme';
import { Header } from '../components/Header';
import { documentsApi } from '../services/documentsApi';
import { UploadState, LegalDocument } from '../types';

export const UploadScreen: React.FC<{
  onUploadSuccess: (doc: LegalDocument) => void;
  onBack: () => void;
}> = ({ onUploadSuccess, onBack }) => {
  const [state, setState] = useState<UploadState>('IDLE');
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: number } | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const steps = [
    'Uploading Document to Encrypted Sandbox',
    'Supreme Court OCR Engine: Extracting Text',
    'Understanding Jurisdictional Structure & Citations',
    'Preparing Neural Ratio Decidendi Summary',
  ];

  const handleSimulatePick = (fileName: string, sizeMb: number) => {
    setSelectedFile({
      name: fileName,
      size: sizeMb * 1024 * 1024,
    });
    setState('SELECTED');
  };

  const handleStartProcessing = async () => {
    if (!selectedFile) return;
    setState('PROCESSING');
    setStepIndex(0);

    try {
      await new Promise((r) => setTimeout(r, 600));
      setStepIndex(1);
      await new Promise((r) => setTimeout(r, 800));
      setStepIndex(2);
      await new Promise((r) => setTimeout(r, 800));
      setStepIndex(3);

      const result = await documentsApi.uploadDocument({
        name: selectedFile.name,
        size: selectedFile.size,
      });

      setState('SUCCESS');
      onUploadSuccess(result);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Ingestion interrupted by chambers connection timeout.');
      setState('ERROR');
    }
  };

  const handleReset = () => {
    setState('IDLE');
    setSelectedFile(null);
    setStepIndex(0);
    setErrorMessage('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Document Ingest" />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Navigation Breadcrumb */}
        <TouchableOpacity style={styles.backRow} onPress={onBack}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>BACK TO DOCUMENTS</Text>
        </TouchableOpacity>

        <View style={styles.titleSection}>
          <Text style={styles.protocolTag}>FOLIO INGESTION PROTOCOL • SEC. LX-901</Text>
          <Text style={styles.pageTitle}>Upload Legal Document</Text>
          <Text style={styles.pageSubtitle}>
            Transmit petitions, trial records, or lower court records. Synthesizes ratio decidendi and citation validity in real-time.
          </Text>
        </View>

        {/* 1. IDLE STATE: Dropzone / Picker */}
        {state === 'IDLE' && (
          <View style={styles.dropzone}>
            <View style={styles.dropzoneIconCircle}>
              <Text style={styles.dropzoneIcon}>📥</Text>
            </View>

            <Text style={styles.dropzoneTitle}>Choose a legal document</Text>
            <Text style={styles.dropzoneSubtitle}>
              Supported formats: PDF, DOCX, JPG, PNG up to 100MB
            </Text>

            {/* Quick Sample File Selection for Testing */}
            <View style={styles.sampleFilesContainer}>
              <Text style={styles.sampleFilesHeader}>SELECT FROM REPOSITORY:</Text>
              <TouchableOpacity
                style={styles.sampleFileButton}
                onPress={() => handleSimulatePick('SLP_Civil_Draft_Union_Minerals.pdf', 18.4)}
              >
                <Text style={styles.sampleFileText}>📄 SLP_Civil_Draft_Union_Minerals.pdf (18.4 MB)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sampleFileButton}
                onPress={() => handleSimulatePick('Arbitral_Award_NHAI_Consortium.pdf', 14.2)}
              >
                <Text style={styles.sampleFileText}>📄 Arbitral_Award_NHAI_Consortium.pdf (14.2 MB)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sampleFileButton}
                onPress={() => handleSimulatePick('Criminal_Appeal_Bail_482.pdf', 4.5)}
              >
                <Text style={styles.sampleFileText}>📄 Criminal_Appeal_Bail_482.pdf (4.5 MB)</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.securityStrip}>
              <Text style={styles.securityText}>🔒 Client-Side AES-256 GCM • Sec. 126 Evidence Act</Text>
            </View>
          </View>
        )}

        {/* 2. SELECTED STATE */}
        {state === 'SELECTED' && selectedFile && (
          <View style={styles.selectedCard}>
            <View style={styles.selectedIcon}>
              <Text style={styles.fileIcon}>📄</Text>
            </View>

            <Text style={styles.selectedTag}>FOLIO READY FOR INGESTION</Text>
            <Text style={styles.selectedName}>{selectedFile.name}</Text>
            <Text style={styles.selectedMeta}>
              File Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Supreme Court Format
            </Text>

            <View style={styles.selectedActions}>
              <TouchableOpacity style={styles.removeButton} onPress={handleReset}>
                <Text style={styles.removeButtonText}>Remove File</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.processButton}
                onPress={handleStartProcessing}
                activeOpacity={0.8}
              >
                <Text style={styles.processButtonText}>Start Neural Extraction →</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* 3. PROCESSING STATE */}
        {state === 'PROCESSING' && (
          <View style={styles.processingCard}>
            <ActivityIndicator size="large" color={Colors.burntTerracotta} style={styles.spinner} />
            <Text style={styles.processingTitle}>SYNTHESIZING FOLIO</Text>
            <Text style={styles.processingStepText}>{steps[stepIndex]}</Text>

            <View style={styles.stepsList}>
              {steps.map((st, i) => (
                <View key={i} style={styles.stepRow}>
                  <View style={[styles.stepCircle, i <= stepIndex && styles.stepCircleActive]}>
                    <Text style={[styles.stepNumber, i <= stepIndex && styles.stepNumberActive]}>
                      {i < stepIndex ? '✓' : i + 1}
                    </Text>
                  </View>
                  <Text style={[styles.stepLabel, i === stepIndex && styles.stepLabelActive]}>
                    {st}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* 4. SUCCESS STATE */}
        {state === 'SUCCESS' && (
          <View style={styles.successCard}>
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.successTitle}>Document Ready</Text>
            <Text style={styles.successSubtitle}>
              Neural processing finished. Legal provisions, facts, and timeline are available in your Intelligence Brief.
            </Text>

            <TouchableOpacity style={styles.successCta} onPress={onBack}>
              <Text style={styles.successCtaText}>View in Documents →</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadAnother} onPress={handleReset}>
              <Text style={styles.uploadAnotherText}>Upload Another Document</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 5. ERROR STATE */}
        {state === 'ERROR' && (
          <View style={styles.errorCard}>
            <Text style={styles.errorIcon}>✕</Text>
            <Text style={styles.errorTitle}>Something went wrong</Text>
            <Text style={styles.errorSubtitle}>{errorMessage}</Text>

            <TouchableOpacity style={styles.errorRetry} onPress={handleReset}>
              <Text style={styles.errorRetryText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.warmIvory,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  backArrow: {
    fontSize: 14,
    color: Colors.burntTerracotta,
  },
  backText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.burntTerracotta,
    letterSpacing: 0.8,
  },
  titleSection: {
    marginBottom: 20,
  },
  protocolTag: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: Colors.burntTerracotta,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  pageTitle: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: '700',
    color: Colors.ink,
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    fontSize: 12,
    color: Colors.mutedBrown,
    lineHeight: 18,
    marginTop: 6,
  },
  dropzone: {
    backgroundColor: Colors.surfaceContainerLow,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  dropzoneIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  dropzoneIcon: {
    fontSize: 22,
  },
  dropzoneTitle: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: '700',
    color: Colors.ink,
    marginBottom: 4,
  },
  dropzoneSubtitle: {
    fontSize: 11,
    color: Colors.mutedBrown,
    textAlign: 'center',
    marginBottom: 16,
  },
  sampleFilesContainer: {
    width: '100%',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  sampleFilesHeader: {
    fontSize: 9,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: Colors.mutedBrown,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  sampleFileButton: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  sampleFileText: {
    fontSize: 11,
    color: Colors.burntTerracotta,
    fontWeight: '600',
  },
  securityStrip: {
    marginTop: 6,
  },
  securityText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: Colors.mutedBrown,
  },
  selectedCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 20,
    alignItems: 'center',
  },
  selectedIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  fileIcon: {
    fontSize: 24,
  },
  selectedTag: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: Colors.burntTerracotta,
    fontWeight: '700',
    letterSpacing: 1,
  },
  selectedName: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: '700',
    color: Colors.ink,
    marginTop: 4,
    textAlign: 'center',
  },
  selectedMeta: {
    fontSize: 11,
    color: Colors.mutedBrown,
    marginTop: 4,
    marginBottom: 16,
  },
  selectedActions: {
    flexDirection: 'row',
    gap: 10,
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  removeButtonText: {
    fontSize: 11,
    color: Colors.ink,
    fontWeight: '600',
  },
  processButton: {
    backgroundColor: Colors.burntTerracotta,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  processButtonText: {
    fontSize: 11,
    color: Colors.warmWhite,
    fontWeight: '700',
  },
  processingCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 24,
    alignItems: 'center',
  },
  spinner: {
    marginBottom: 12,
  },
  processingTitle: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: Colors.burntTerracotta,
    letterSpacing: 1,
  },
  processingStepText: {
    fontFamily: 'serif',
    fontSize: 15,
    fontWeight: '700',
    color: Colors.ink,
    marginTop: 6,
    marginBottom: 16,
    textAlign: 'center',
  },
  stepsList: {
    width: '100%',
    gap: 8,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    borderColor: Colors.burntTerracotta,
    backgroundColor: Colors.burntTerracotta,
  },
  stepNumber: {
    fontSize: 9,
    color: Colors.mutedBrown,
    fontWeight: '700',
  },
  stepNumberActive: {
    color: Colors.warmWhite,
  },
  stepLabel: {
    fontSize: 11,
    color: Colors.mutedBrown,
    flex: 1,
  },
  stepLabelActive: {
    color: Colors.ink,
    fontWeight: '700',
  },
  successCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.emerald,
    padding: 24,
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 32,
    color: Colors.emerald,
    marginBottom: 8,
  },
  successTitle: {
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: '700',
    color: Colors.ink,
  },
  successSubtitle: {
    fontSize: 12,
    color: Colors.mutedBrown,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 16,
    lineHeight: 18,
  },
  successCta: {
    backgroundColor: Colors.burntTerracotta,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  successCtaText: {
    color: Colors.warmWhite,
    fontSize: 12,
    fontWeight: '700',
  },
  uploadAnother: {
    paddingVertical: 6,
  },
  uploadAnotherText: {
    fontSize: 11,
    color: Colors.burntTerracotta,
    fontWeight: '600',
  },
  errorCard: {
    backgroundColor: Colors.errorLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.error,
    padding: 24,
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: 28,
    color: Colors.error,
    marginBottom: 8,
  },
  errorTitle: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: '700',
    color: Colors.error,
  },
  errorSubtitle: {
    fontSize: 12,
    color: Colors.ink,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  errorRetry: {
    backgroundColor: Colors.error,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  errorRetryText: {
    color: Colors.warmWhite,
    fontSize: 11,
    fontWeight: '700',
  },
});
