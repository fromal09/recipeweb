/** config.js — app-wide constants */

export const FONTS =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Caveat:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap";

export const NUDGES = [
  "Make it spicier",
  "Simplify the technique",
  "Swap the protein",
  "Make it vegetarian",
  "Make it quicker",
  "Make it richer",
  "Add more vegetables",
  "Make it heartier",
  "Bolder flavors",
  "Lighter finish",
];

export const TUTORIAL = [
  { text: "Welcome, dear. I'm Nana — and this has always been my kitchen. Come in, come in.", focus: null },
  { text: "Open the fridge when you're ready to cook. Tell me what you have, and together we'll find something wonderful.", focus: "fridge" },
  { text: "Those recipe books on the shelf hold everything you've saved. The more you cook, the richer the collection grows.", focus: "books" },
  { text: "That map on the wall will take you anywhere in the world. Every cuisine has a story worth tasting.", focus: "map" },
  { text: "The spice rack is where the real magic lives. Don't be a stranger to it.", focus: "spices" },
  { text: "And the window — keep an eye on it. It'll tell you what the season is offering.", focus: "window" },
  { text: "Now then. The kitchen is yours, dear. What shall we make today?", focus: null },
];

// Wormhole animation colours
export const WCOLS = [
  "#9B3B22", "#B8822A", "#4A6741", "#5C3A1E",
  "#C4583A", "#D4A84A", "#6B8F5E", "#8B5E3C", "#E0CDA8",
];

// Wormhole floating food emojis
export const EMOJIS = [
  "🧄","🧅","🫑","🥕","🍋","🌶","🍄","🥦",
  "🌿","🧂","🫙","🥚","🧈","🍅","🌽","🫚","🍊","🥬",
];
