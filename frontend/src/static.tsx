// General
export const CONTACT_EMAIL = "TODO";

// Routing
export const API_URL: string =
  import.meta.env.VITE_SC2_IMPROVED_LADDER_API_URL ?? "";

// Browser
export const DOCUMENT_TITLES: Record<string, string> = {
  Landing: "/landing",
  Ladder: "/ladder",
  Lobby: "/lobby",
  FAQ: "/faq",
  Match: "/match",
  "Not Found": "not-found",
};
