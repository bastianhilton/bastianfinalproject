export const truncateText = (text, maxLength, ellipsis = '...') => {
    if (text.length <= maxLength) {
      return text;
    }
  
    const truncatedText = text.slice(0, maxLength - ellipsis.length);
    return `${truncatedText}${ellipsis}`;
  };
  