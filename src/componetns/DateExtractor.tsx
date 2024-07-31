const DateExtractor = (text: string): string[] => {
  const datePatterns = [
    /\b(\d{2}\/\d{2}\/\d{4})\b/g, // DD/MM/YYYY
    /\b(\d{2}-\d{2}-\d{4})\b/g, // DD-MM-YYYY
    /\b(\d{2}\/\d{2}\/\d{2})\b/g, // MM/DD/YY
    /\b(\d{4}-\d{2}-\d{2})\b/g, // YYYY-MM-DD
    /\b(\d{1,2} \w{3,} \d{4})\b/g, // DD MMM YYYY
    /\b(\w{3,} \d{1,2}, \d{4})\b/g, // MMM DD, YYYY
    /\b(\w{3,} \d{1,2}, \d{2})\b/g, // MMM DD, YY
    /\b(\w{3,} \d{1,2})\b/g, // MMM DD
    /\b(\d{1,2} \w{3,})\b/g, // DD MMM
    /\b(\d{2}:\d{2}:\d{4})\b/g, // DD:MM:YYYY
  ];

  let dates: string[] = [];

  datePatterns.forEach((pattern) => {
    const matches = text.match(pattern);
    if (matches) {
      dates = dates.concat(matches);
    }
  });

  return dates;
};
export default DateExtractor;
