import fs from 'fs';
import path from 'path';

const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export interface StoredFileInfo {
  storageKey: string;
  filePath: string;
  filename: string;
  size: number;
  mimeType: string;
}

export const storageService = {
  /**
   * Save uploaded file buffer to storage
   */
  async saveFile(buffer: Buffer, originalFilename: string, mimeType = 'application/pdf'): Promise<StoredFileInfo> {
    const sanitizedName = originalFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const timestamp = Date.now();
    const storedFilename = `${timestamp}-${sanitizedName}`;
    const filePath = path.join(UPLOADS_DIR, storedFilename);

    await fs.promises.writeFile(filePath, buffer);

    return {
      storageKey: `r2://lexora-chambers/${storedFilename}`,
      filePath,
      filename: originalFilename,
      size: buffer.length,
      mimeType,
    };
  },

  /**
   * Check if file exists in storage and get readable stream or buffer
   */
  async getFileBuffer(storageKey: string): Promise<Buffer | null> {
    // If storageKey is a simulated R2 key, extract the filename
    const basename = storageKey.replace('r2://lexora-chambers/', '');
    const candidatePath = path.join(UPLOADS_DIR, basename);

    if (fs.existsSync(candidatePath)) {
      return await fs.promises.readFile(candidatePath);
    }
    return null;
  },

  /**
   * Generate Presigned Upload URL specification (Cloudflare R2 / S3 simulation)
   */
  generatePresignedUploadUrl(filename: string, fileSize: number) {
    const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storageKey = `r2://lexora-chambers/${Date.now()}-${sanitized}`;
    const uploadUrl = `/api/documents/upload-direct?key=${encodeURIComponent(storageKey)}`;

    return {
      uploadUrl,
      storageKey,
      expiresIn: 3600,
      headers: {
        'Content-Type': 'application/pdf',
        'x-amz-acl': 'private',
      },
    };
  },
};
