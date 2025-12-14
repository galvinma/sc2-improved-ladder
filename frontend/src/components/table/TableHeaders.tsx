import type { TableHeader } from "./TableInterfaces";

export const LobbyTableHeaders: Record<string, TableHeader> = {
  Rank: {
    text: "Name",
    size: "small",
    showSortIcon: true,
  },
  Match: {
    text: "MMR",
    size: "small",
    showSortIcon: false,
  },
  Protocol: {
    text: "Race",
    size: "small",
    showSortIcon: true,
  },
};
