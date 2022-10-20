export const getDateFormatted = (date: string): string => new Date(date).toLocaleDateString('en-EN').replaceAll('/', '.');
