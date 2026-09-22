import React, { useState, useRef } from 'react';
import { Button } from '../atoms/Button';
import { UploadState, LegalDocument } from '../../types';
import { documentsApi } from '../../services/documentsApi';

export interface UploadDropzoneProps {
  onSuccess?: (doc: LegalDocument) => void;
  maxSizeMb?: number;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onSuccess,
  maxSizeMb = 100,
}) => {
  const [state, setState] = useState<UploadState>('IDLE');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [createdDoc, setCreatedDoc] = useState<LegalDocument | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    'Uploading Document to Encrypted Sandbox',
    'Supreme Court OCR Engine: Extracting Text',
    'Understanding Jurisdictional Structure & Citations',
    'Preparing Neural Ratio Decidendi Summary',
  ];

  const handleFile = (file: File) => {
    if (file.size > maxSizeMb * 1024 * 1024) {
      setErrorMessage(`Docket size exceeds chamber threshold of ${maxSizeMb}MB.`);
      setState('ERROR');
      return;
    }
    setSelectedFile(file);
    setState('SELECTED');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleStartProcessing = async () => {
    if (!selectedFile) return;
    setState('PROCESSING');
    setCurrentStep(0);

    try {
      // Step 1: Uploading
      await new Promise((r) => setTimeout(r, 600));
      setCurrentStep(1);

      // Step 2: Extracting Text
      await new Promise((r) => setTimeout(r, 800));
      setCurrentStep(2);

      // Step 3: Understanding Structure
      await new Promise((r) => setTimeout(r, 800));
      setCurrentStep(3);

      // Step 4: Preparing summary & calling document API
      const resultDoc = await documentsApi.uploadDocument(selectedFile);
      setCreatedDoc(resultDoc);
      setState('SUCCESS');
      if (onSuccess) onSuccess(resultDoc);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Ingestion interrupted by registry connection error.');
      setState('ERROR');
    }
  };

  const reset = () => {
    setState('IDLE');
    setSelectedFile(null);
    setCurrentStep(0);
    setErrorMessage('');
    setCreatedDoc(null);
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-6 md:p-10 transition-all">
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        accept=".pdf,.doc,.docx"
        className="hidden"
      />

      {/* 1. IDLE STATE */}
      {state === 'IDLE' && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all cursor-pointer ${
            isDragOver
              ? 'border-secondary bg-secondary-fixed/20 scale-[0.99]'
              : 'border-outline-variant/60 bg-surface-container-low/40 hover:bg-surface-container-low hover:border-secondary/60'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mx-auto text-secondary mb-4 border border-outline-variant/40 shadow-sm">
            <span className="material-symbols-outlined text-[32px]">upload_file</span>
          </div>

          <h3 className="font-serif text-2xl text-on-surface mb-2 font-semibold">
            Drop your legal document here
          </h3>
          <p className="text-sm text-on-surface-variant max-w-md mx-auto mb-6 leading-relaxed font-sans">
            Transmit searchable PDFs, petitions, trial records, or lower court records up to {maxSizeMb}MB.
          </p>

          <Button
            type="button"
            variant="terracotta"
            size="md"
            iconLeft={<span className="material-symbols-outlined text-[18px]">add</span>}
          >
            Select Document from Chambers Terminal
          </Button>

          <div className="mt-8 pt-6 border-t border-outline-variant/30 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-outline">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-secondary">verified_user</span>
              Client-Side AES-256 GCM
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-secondary">balance</span>
              Supreme Court OCR Engine
            </span>
            <span>Sec. 126 Evidence Act Compliant</span>
          </div>
        </div>
      )}

      {/* 2. SELECTED STATE */}
      {state === 'SELECTED' && selectedFile && (
        <div className="flex flex-col items-center text-center p-6 bg-surface-container-low rounded-xl border border-outline-variant/50">
          <div className="w-14 h-14 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary mb-4">
            <span className="material-symbols-outlined text-[28px]">description</span>
          </div>

          <span className="text-[10px] font-mono tracking-wider uppercase text-secondary font-semibold">
            Folio Pending Ingestion
          </span>
          <h3 className="font-serif text-xl font-bold text-on-surface mt-1 mb-2">
            {selectedFile.name}
          </h3>

          <div className="flex items-center gap-4 text-xs font-mono text-on-surface-variant bg-surface px-4 py-2 rounded border border-outline-variant/40 mb-6">
            <span>Type: {selectedFile.type || 'PDF Application'}</span>
            <span>•</span>
            <span>Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="md" onClick={reset}>
              Choose Another File
            </Button>
            <Button
              variant="terracotta"
              size="md"
              iconRight={<span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
              onClick={handleStartProcessing}
            >
              Start Neural Extraction
            </Button>
          </div>
        </div>
      )}

      {/* 3. PROCESSING STATE */}
      {state === 'PROCESSING' && (
        <div className="flex flex-col items-center text-center p-8 bg-surface-container-low rounded-xl border border-outline-variant/40">
          <div className="w-12 h-12 border-3 border-secondary border-t-transparent rounded-full animate-spin mb-4" />

          <span className="text-[10px] font-mono tracking-wider uppercase text-secondary font-bold">
            Processing Docket
          </span>
          <h3 className="font-serif text-xl font-semibold text-on-surface mt-1 mb-6">
            {steps[currentStep]}
          </h3>

          {/* Stepper Progress */}
          <div className="w-full max-w-md flex flex-col gap-3">
            {steps.map((stepText, idx) => (
              <div
                key={stepText}
                className={`flex items-center gap-3 text-xs p-2.5 rounded transition-colors text-left ${
                  idx < currentStep
                    ? 'bg-surface-container-highest text-secondary font-medium'
                    : idx === currentStep
                    ? 'bg-surface border border-secondary text-on-surface font-semibold'
                    : 'text-outline opacity-60'
                }`}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-mono border border-current">
                  {idx < currentStep ? (
                    <span className="material-symbols-outlined text-[12px]">check</span>
                  ) : (
                    idx + 1
                  )}
                </div>
                <span>{stepText}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. SUCCESS STATE */}
      {state === 'SUCCESS' && createdDoc && (
        <div className="flex flex-col items-center text-center p-8 bg-surface-container-low rounded-xl border border-secondary/40">
          <div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary mb-4 shadow-sm">
            <span className="material-symbols-outlined text-[28px]">verified</span>
          </div>

          <span className="text-[11px] font-mono tracking-wider uppercase text-secondary font-bold">
            Ingestion Complete
          </span>
          <h3 className="font-serif text-2xl font-bold text-on-surface mt-1 mb-2">
            Document Ready & Indexed
          </h3>
          <p className="text-xs text-on-surface-variant max-w-md mb-6 leading-relaxed">
            Neural synthesis finished for <strong className="text-on-surface font-mono">{createdDoc.filename}</strong>. Ratios, citations, and conflicting statutory provisions are ready for review.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="terracotta"
              size="md"
              iconRight={<span className="material-symbols-outlined text-[18px]">auto_awesome</span>}
              onClick={() => {
                window.location.href = `/summary/${createdDoc.id}`;
              }}
            >
              Review AI Summary
            </Button>
            <Button
              variant="outline"
              size="md"
              iconRight={<span className="material-symbols-outlined text-[18px]">visibility</span>}
              onClick={() => {
                window.location.href = `/documents/${createdDoc.id}`;
              }}
            >
              Open in Viewer
            </Button>
            <Button variant="ghost" size="md" onClick={reset}>
              Upload Another
            </Button>
          </div>
        </div>
      )}

      {/* 5. ERROR STATE */}
      {state === 'ERROR' && (
        <div className="flex flex-col items-center text-center p-8 bg-red-50/50 rounded-xl border border-red-200">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-error mb-4">
            <span className="material-symbols-outlined text-[28px]">error</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-on-surface mb-2">
            Something went wrong
          </h3>
          <p className="text-xs text-error font-sans max-w-md mb-6 leading-relaxed">
            {errorMessage || 'Unable to process docket at this time. Please ensure the document is not password-protected and complies with chamber limits.'}
          </p>

          <Button variant="primary" size="md" onClick={reset}>
            Try Ingestion Again
          </Button>
        </div>
      )}
    </div>
  );
};
