// General
export const APPLICATION_TIMEOUT = 1000 * 60;
export const CONTACT_EMAIL = "TODO";

// Routing
export const API_URL: string =
  import.meta.env.VITE_SC2_IMPROVED_LADDER_API_URL ?? "";

// Browser
export const DOCUMENT_TITLES: Record<string, string> = {
  Lobby: "/lobby",
  Versus: "/versus",
  Stats: "/stats",
  FAQ: "/faq",
  History: "/history",
  Setting: "/settings",
  Match: "/match",
  Login: "/login",
  Register: "/register",
};
