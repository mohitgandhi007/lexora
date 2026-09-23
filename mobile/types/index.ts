export interface LegalDocument {
  id: string;
  filename: string;
  title: string;
  courtName: string;
  benchDesignation?: string;
  type: 'Judgment' | 'Special Leave Petition' | 'Commercial Award' | 'Criminal Appeal' | 'Writ Petition';
  date: string;
  pages: number;
  status: 'Processed' | 'In Queue' | 'Processing' | 'Failed';
  fileSize?: string;
  verified?: boolean;
  concordance?: string;
  snippet?: string;
}

export interface LegalProvision {
  actName: string;
  sectionNumber: string;
  heading: string;
  verbatimQuote: string;
  interpretationNote?: string;
  docketReference?: string;
}

export interface CaseInformation {
  caseNumber: string;
  petitioner: string;
  respondent: string;
  tribunalBelow: string;
  dateOfImpugnedOrder: string;
  stage: string;
}

export interface ImportantDate {
  date: string;
  event: string;
}

export interface Party {
  role: string;
  name: string;
  counsel: string;
}

export interface LegalSummary {
  id: string;
  documentId: string;
  title: string;
  court: string;
  date: string;
  bench: string;
  category: string;
  concordance: string;
  executiveSummary: string;
  keyTakeaways: string[];
  caseInformation: CaseInformation;
  legalProvisions: LegalProvision[];
  keyFacts: string[];
  importantDates: ImportantDate[];
  parties: Party[];
  aiDisclosure: string;
}

export type UploadState = 'IDLE' | 'SELECTED' | 'PROCESSING' | 'SUCCESS' | 'ERROR';

export type ScreenTab = 'Home' | 'Documents' | 'Search' | 'Profile';
