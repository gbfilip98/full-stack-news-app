import { categoryKeywordMap } from "@/data/constants";

export const defineCategory = (titleText: string): string => {
  let mostFrequentKeyword: string | null = null;
  let maxCount = -1;

  for (const [category, keywords] of Object.entries(categoryKeywordMap)) {
    let count = 0;

    for (const keyword of keywords) {
      // Create a regex to match all occurrences of the keyword (case-insensitive, whole word)
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      const matches = titleText.match(regex);
      if (matches) {
        count += matches.length;
      }
    }

    if (count > maxCount) {
      mostFrequentKeyword = category;
      maxCount = count;
    }
  }

  switch (mostFrequentKeyword) {
    case "tech":
      return "TECHNOLOGY";
    case "sport":
      return "SPORTS";
    case "health":
      return "HEALTH";
    case "science":
      return "SCIENCE";
    case "business":
      return "BUSINESS";
    case "advert":
      return "PROGRAMMATIC/NATIVE AD";
    case "breaking news":
      return "BREAKING";
    case "viral":
        return "VIRAL";
    case "fun":
        return "FUN";
    case "news":
        return "NEWS"
    default:
      return "GENERAL";
  }
};
