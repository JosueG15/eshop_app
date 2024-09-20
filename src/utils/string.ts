export const truncateText = (text: string, maxLength: number): string =>
  text.length > maxLength ? `${text.substring(0, maxLength - 3)}...` : text;