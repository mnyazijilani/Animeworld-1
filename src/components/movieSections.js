export const sectionKeywords = {
  sad: ["sad", "tears", "cry", "tragedy", "grief", "emotional"],
  horror: ["horror", "dark", "ghost", "demon", "blood", "terror"],
  latest: ["latest", "new", "recent", "fresh", "2024", "2025", "2026"],
  beginner: ["beginner", "starter", "adventure", "fun", "classic", "popular"],
  scifi: [
    "scifi",
    "sci-fi",
    "science fiction",
    "space",
    "future",
    "robot",
    "mecha",
    "cyberpunk",
  ],
  romantic: [
    "romantic",
    "romance",
    "love",
    "relationship",
    "heart",
    "dating",
    "affection",
  ],
  adventure: [
    "adventure",
    "journey",
    "quest",
    "explore",
    "travel",
    "expedition",
    "action",
  ],
  action: [
    "action",
    "fight",
    "battle",
    "combat",
    "war",
    "fast-paced",
    "explosive",
  ],
  fantasy: [
    "fantasy",
    "magic",
    "myth",
    "dragon",
    "wizard",
    "kingdom",
    "enchanted",
  ],
};

export const movieSectionDefinitions = {
  sad: {
    id: "sad-movies",
    title: "Sad Movies",
    description:
      "Heart-tugging picks for emotional nights and unforgettable endings.",
    fallbackStart: 0,
  },
  horror: {
    id: "horror-movies",
    title: "Horror Movies",
    description:
      "Dark, intense, and eerie titles for when you want something chilling.",
    fallbackStart: 2,
  },
  latest: {
    id: "latest-movies",
    title: "Latest Movies",
    description:
      "Fresh picks and recent standouts pulled to the front of the lineup.",
    fallbackStart: 0,
  },
  beginner: {
    id: "beginner-movies",
    title: "First To Watch As A Beginner",
    description:
      "Easy-entry recommendations if you’re just getting started with anime movies.",
    fallbackStart: 1,
  },
  scifi: {
    id: "scifi-movies",
    title: "Sci-Fi Movies",
    description:
      "Futuristic worlds, high-tech wonder, and cosmic adventures for sci-fi fans.",
    fallbackStart: 0,
  },
  romantic: {
    id: "romantic-movies",
    title: "Romantic Movies",
    description:
      "Sweet, heartfelt stories that bring romance, emotion, and connection.",
    fallbackStart: 0,
  },
  adventure: {
    id: "adventure-movies",
    title: "Adventure Movies",
    description:
      "Action-packed journeys, epic quests, and wild exploration for thrill seekers.",
    fallbackStart: 0,
  },
  action: {
    id: "action-movies",
    title: "Action Movies",
    description:
      "High-energy fights, adrenaline moments, and explosive anime action.",
    fallbackStart: 0,
  },
  fantasy: {
    id: "fantasy-movies",
    title: "Fantasy Movies",
    description:
      "Magical worlds, myths, and legendary heroes from fantasy anime realms.",
    fallbackStart: 0,
  },
};

export const filterProductsBySearch = (products, search) =>
  products.filter(
    (item) =>
      item.product_name.toLowerCase().includes(search.toLowerCase()) ||
      item.product_description.toLowerCase().includes(search.toLowerCase()),
  );

const matchesKeywords = (item, keywords) => {
  const haystack =
    `${item.product_name} ${item.product_description}`.toLowerCase();

  return keywords.some((keyword) => haystack.includes(keyword));
};

export const getMovieSectionItems = (products, categoryKey) => {
  const section = movieSectionDefinitions[categoryKey];

  if (!section) {
    return [];
  }

  if (categoryKey === "latest") {
    return [...products].slice(0, 8);
  }

  const matchedItems = products.filter((item) =>
    matchesKeywords(item, sectionKeywords[categoryKey] || []),
  );

  if (matchedItems.length > 0) {
    return matchedItems.slice(0, 8);
  }

  return products.slice(section.fallbackStart, section.fallbackStart + 8);
};
