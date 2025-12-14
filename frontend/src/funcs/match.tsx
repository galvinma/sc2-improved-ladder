import { MatchUp, Race } from "../enums/enums";

export const getRaceFromChar = (char: string) => {
  if (char.toLowerCase() === "z") {
    return Race.ZERG;
  } else if (char.toLowerCase() === "t") {
    return Race.TERRAN;
  } else if (char.toLowerCase() === "p") {
    return Race.PROTOSS;
  } else {
    return Race.RANDOM;
  }
};

export const getMatchupsFromRaceString = (race: string) => {
  if (race.toLowerCase() === "zerg") {
    return [MatchUp.ZVT, MatchUp.ZVP, MatchUp.ZVZ, MatchUp.ZVR];
  } else if (race.toLowerCase() === "terran") {
    return [MatchUp.TVT, MatchUp.TVP, MatchUp.TVZ, MatchUp.TVR];
  } else if (race.toLowerCase() === "protoss") {
    return [MatchUp.PVT, MatchUp.PVP, MatchUp.PVZ, MatchUp.PVR];
  } else {
    return [MatchUp.RVT, MatchUp.RVP, MatchUp.RVZ, MatchUp.RVR];
  }
};
