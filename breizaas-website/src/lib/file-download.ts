/**
 * Trigger browser file download with specified content and filename
 *
 * @param content - File content as string
 * @param filename - Desired filename for download
 * @param mimeType - MIME type (e.g., 'text/calendar;charset=utf-8')
 * @throws Error if download fails
 *
 * @example
 * downloadFile(icsContent, 'breizaas-event.ics', 'text/calendar;charset=utf-8');
 */
export function downloadFile(
  content: string,
  filename: string,
  mimeType: string
): void {
  try {
    // Create Blob from content
    const blob = new Blob([content], { type: mimeType });

    // Create object URL
    const url = URL.createObjectURL(blob);

    // Create temporary anchor and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    // Clean up object URL (prevent memory leak)
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('File download error:', error);
    throw new Error('Failed to download file');
  }
}

/**
 * Sanitize string for use in filename
 * Removes/replaces special characters unsafe for filenames
 * Preserves Norwegian characters (æ, ø, å)
 *
 * @param input - Raw string to sanitize
 * @returns Sanitized filename-safe string
 *
 * @example
 * sanitizeFilename('Oslo Konserthus') // 'oslo-konserthus'
 * sanitizeFilename('Café Nørd') // 'cafe-nord'
 */
export function sanitizeFilename(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9æøå]+/g, '-')  // Replace non-alphanumeric (keep Norwegian chars)
    .replace(/^-+|-+$/g, '');         // Remove leading/trailing hyphens
}

/**
 * Format ISO 8601 datetime string as YYYY-MM-DD for filename
 *
 * @param datetime - ISO 8601 datetime string (e.g., '2025-02-15T19:00:00')
 * @returns Date formatted as YYYY-MM-DD
 *
 * @example
 * formatDateForFilename('2025-02-15T19:00:00') // '2025-02-15'
 */
export function formatDateForFilename(datetime: string): string {
  const date = new Date(datetime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
