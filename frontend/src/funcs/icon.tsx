import { Race } from "../enums/enums";
import ZergSVG from ".././assets/svg/zerg.svg";
import TerranSVG from ".././assets/svg/terran.svg";
import ProtossSVG from ".././assets/svg/protoss.svg";
import RandomSVG from ".././assets/svg/random.svg";

export const getRaceIcon = (race: Race) => {
  if (race === Race.ZERG) {
    return ZergSVG;
  } else if (race === Race.TERRAN) {
    return TerranSVG;
  } else if (race === Race.PROTOSS) {
    return ProtossSVG;
  } else {
    return RandomSVG;
  }
};
