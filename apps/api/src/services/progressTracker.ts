export type IngestionStep =
  | 'UPLOADING'
  | 'EXTRACTING_TEXT'
  | 'UNDERSTANDING_STRUCTURE'
  | 'PREPARING_SUMMARY'
  | 'COMPLETED'
  | 'FAILED';

export interface IngestionProgress {
  documentId: string;
  step: IngestionStep;
  progressPercent: number;
  message: string;
  error?: string;
  updatedAt: string;
}

type ProgressListener = (progress: IngestionProgress) => void;

class ProgressTracker {
  private progressMap = new Map<string, IngestionProgress>();
  private listenersMap = new Map<string, Set<ProgressListener>>();

  /**
   * Initialize or update progress for a document
   */
  public updateProgress(
    documentId: string,
    step: IngestionStep,
    progressPercent: number,
    message: string,
    error?: string
  ): IngestionProgress {
    const progress: IngestionProgress = {
      documentId,
      step,
      progressPercent: Math.min(100, Math.max(0, progressPercent)),
      message,
      error,
      updatedAt: new Date().toISOString(),
    };

    this.progressMap.set(documentId, progress);

    // Notify active SSE listeners
    const listeners = this.listenersMap.get(documentId);
    if (listeners) {
      listeners.forEach((listener) => {
        try {
          listener(progress);
        } catch (e) {
          console.warn('Error in progress listener:', e);
        }
      });
    }

    return progress;
  }

  /**
   * Get current progress status
   */
  public getProgress(documentId: string): IngestionProgress {
    const existing = this.progressMap.get(documentId);
    if (existing) return existing;

    // Default initial progress
    return {
      documentId,
      step: 'UPLOADING',
      progressPercent: 0,
      message: 'Document received in encrypted chambers sandbox...',
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Subscribe a listener for real-time SSE push
   */
  public subscribe(documentId: string, listener: ProgressListener): () => void {
    if (!this.listenersMap.has(documentId)) {
      this.listenersMap.set(documentId, new Set());
    }
    this.listenersMap.get(documentId)!.add(listener);

    // Immediately push current state if available
    const current = this.progressMap.get(documentId);
    if (current) {
      listener(current);
    }

    // Unsubscribe callback
    return () => {
      const set = this.listenersMap.get(documentId);
      if (set) {
        set.delete(listener);
        if (set.size === 0) {
          this.listenersMap.delete(documentId);
        }
      }
    };
  }
}

export const progressTracker = new ProgressTracker();
