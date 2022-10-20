export const getDateFormatted = (date: string | number | undefined) => date && new Date(date).toLocaleDateString('en-EN').replaceAll('/', '.');
