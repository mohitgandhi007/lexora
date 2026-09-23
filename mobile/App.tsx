import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from './constants/theme';
import { ScreenTab } from './types';

// Core Application Screens
import { HomeScreen } from './screens/HomeScreen';
import { DocumentsScreen } from './screens/DocumentsScreen';
import { DocumentViewerScreen } from './screens/DocumentViewerScreen';
import { SummaryScreen } from './screens/SummaryScreen';
import { UploadScreen } from './screens/UploadScreen';
import { SearchScreen } from './screens/SearchScreen';
import { SettingsScreen } from './screens/SettingsScreen';

// Authentication Screens
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen';

// Navigation Components
import { BottomNav } from './components/BottomNav';

export default function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authScreen, setAuthScreen] = useState<'login' | 'register' | 'forgot_password'>('login');

  // Primary tab state
  const [currentTab, setCurrentTab] = useState<ScreenTab>('Home');

  // Stack / Modal navigation state
  const [activeModal, setActiveModal] = useState<null | 'upload' | 'viewer' | 'summary'>(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string>('doc-1');
  const [selectedSummaryId, setSelectedSummaryId] = useState<string>('doc-2');

  // Authentication Handlers
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor={Colors.warmIvory} />
        {authScreen === 'login' && (
          <LoginScreen
            onLoginSuccess={() => setIsAuthenticated(true)}
            onNavigateToRegister={() => setAuthScreen('register')}
            onNavigateToForgotPassword={() => setAuthScreen('forgot_password')}
          />
        )}
        {authScreen === 'register' && (
          <RegisterScreen
            onRegisterSuccess={() => setIsAuthenticated(true)}
            onNavigateToLogin={() => setAuthScreen('login')}
          />
        )}
        {authScreen === 'forgot_password' && (
          <ForgotPasswordScreen onNavigateToLogin={() => setAuthScreen('login')} />
        )}
      </View>
    );
  }

  // Deep Modal Views (Document Viewer, Intelligence Summary, Upload)
  if (activeModal === 'viewer') {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor={Colors.warmIvory} />
        <DocumentViewerScreen
          documentId={selectedDocumentId}
          onBack={() => setActiveModal(null)}
          onNavigateToSummary={(id) => {
            setSelectedSummaryId(id);
            setActiveModal('summary');
          }}
        />
      </View>
    );
  }

  if (activeModal === 'summary') {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor={Colors.warmIvory} />
        <SummaryScreen
          summaryId={selectedSummaryId}
          onBack={() => setActiveModal(null)}
          onOpenViewer={(docId) => {
            setSelectedDocumentId(docId);
            setActiveModal('viewer');
          }}
        />
      </View>
    );
  }

  if (activeModal === 'upload') {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor={Colors.warmIvory} />
        <UploadScreen
          onUploadSuccess={(doc) => {
            setSelectedDocumentId(doc.id);
            setActiveModal('viewer');
          }}
          onBack={() => setActiveModal(null)}
        />
      </View>
    );
  }

  // Primary Tabbed Navigation Enclave
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor={Colors.warmIvory} />

      <View style={styles.screenWrapper}>
        {currentTab === 'Home' && (
          <HomeScreen
            onNavigateToUpload={() => setActiveModal('upload')}
            onNavigateToDocuments={() => setCurrentTab('Documents')}
            onNavigateToSummary={(id) => {
              setSelectedSummaryId(id);
              setActiveModal('summary');
            }}
            onNavigateToViewer={(id) => {
              setSelectedDocumentId(id);
              setActiveModal('viewer');
            }}
            onNavigateToSearch={() => setCurrentTab('Search')}
            onNavigateToProfile={() => setCurrentTab('Profile')}
          />
        )}

        {currentTab === 'Documents' && (
          <DocumentsScreen
            onSelectDocument={(id) => {
              setSelectedDocumentId(id);
              setActiveModal('viewer');
            }}
            onReviewBrief={(id) => {
              setSelectedSummaryId(id);
              setActiveModal('summary');
            }}
            onUploadPress={() => setActiveModal('upload')}
          />
        )}

        {currentTab === 'Search' && (
          <SearchScreen
            onSelectDocument={(id) => {
              setSelectedDocumentId(id);
              setActiveModal('viewer');
            }}
          />
        )}

        {currentTab === 'Profile' && (
          <SettingsScreen
            onSignOut={() => {
              setIsAuthenticated(false);
              setAuthScreen('login');
            }}
          />
        )}
      </View>

      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setActiveModal(null);
          setCurrentTab(tab);
        }}
        onUploadPress={() => setActiveModal('upload')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.warmIvory,
  },
  screenWrapper: {
    flex: 1,
  },
});
