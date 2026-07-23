export function sanitizeString(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s&]+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
}
