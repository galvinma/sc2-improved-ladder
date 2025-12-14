import { Avatar, Button, Chip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import formStyles from "./Form.module.scss";
import ladderFormStyles from "./LadderForm.module.scss";
import appStyles from "../.././styles/App.module.scss";
import * as React from "react";
import { useState, type JSX } from "react";
import { MatchUp, Race } from "../../enums/enums";
import MatchupGrid from "../match/MatchupGrid";
import { getRaceIcon } from "../../funcs/icon";
import { getMatchupsFromRaceString } from "../../funcs/match";
import matchupStyles from ".././match/Matchup.module.scss";
import { useNavigate } from "react-router";

export default function LadderForm(): JSX.Element {
  const [matchups, setMatchups] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/versus/123");
  };

  const handleMatchupClick = (matchup: string) => {
    if (matchups.includes(matchup)) {
      setMatchups(matchups.filter((target) => target !== matchup));
    } else {
      setMatchups([...matchups, matchup]);
    }
  };

  const getRaceChip = (race: Race) => {
    const raceString = race.toLowerCase();
    return (
      <Chip
        avatar={<Avatar alt={race} src={getRaceIcon(race)} />}
        label={
          <Typography variant="body1">
            {raceString.charAt(0).toUpperCase() + raceString.slice(1)}
          </Typography>
        }
        variant="outlined"
        className={ladderFormStyles.raceChip}
      />
    );
  };

  const getQuickSelectPlayerRow = () => {
    return (
      <Box>
        <Box className={appStyles.flexRow}>
          <Box>{getRaceChip(Race.ZERG)}</Box>
          <Box>{getRaceChip(Race.TERRAN)}</Box>
          <Box>{getRaceChip(Race.PROTOSS)}</Box>
          <Box>{getRaceChip(Race.RANDOM)}</Box>
        </Box>
      </Box>
    );
  };

  function getMatchupCell(
    matchup: MatchUp,
    active: boolean,
    activeTextClass: string,
    activeContainerClass: string
  ): JSX.Element {
    return (
      <Box
        onClick={() => handleMatchupClick(matchup.toString())}
        className={[
          active ? activeContainerClass : matchupStyles.matchupCellContainer,
        ].join(" ")}
      >
        <Typography
          variant="body1"
          className={[active ? activeTextClass : matchupStyles.verseText].join(
            " "
          )}
        >
          {matchup.toString()}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={ladderFormStyles.ladderFormWrapper}>
      <Box className={appStyles.paragraphSpacing}>
        <Box className={ladderFormStyles.quickSelectContainer}>
          <Box className={appStyles.paragraphSpacing}>
            {getQuickSelectPlayerRow()}
          </Box>
        </Box>
      </Box>

      <Box className={matchupStyles.matchupGridWrapper}>
        <Box className={matchupStyles.matchupContainer}>
          <Box className={matchupStyles.matchupRow}>
            {getMatchupCell(
              MatchUp.ZVZ,
              matchups.includes(MatchUp.ZVZ),
              matchupStyles.verseTextZerg,
              matchupStyles.matchupCellContainerZerg
            )}
            {getMatchupCell(
              MatchUp.ZVT,
              matchups.includes(MatchUp.ZVT),
              matchupStyles.verseTextZerg,
              matchupStyles.matchupCellContainerZerg
            )}
            {getMatchupCell(
              MatchUp.ZVP,
              matchups.includes(MatchUp.ZVP),
              matchupStyles.verseTextZerg,
              matchupStyles.matchupCellContainerZerg
            )}
            {getMatchupCell(
              MatchUp.ZVR,
              matchups.includes(MatchUp.ZVR),
              matchupStyles.verseTextZerg,
              matchupStyles.matchupCellContainerZerg
            )}
          </Box>
          <Box className={matchupStyles.matchupRow}>
            {getMatchupCell(
              MatchUp.TVZ,
              matchups.includes(MatchUp.TVZ),
              matchupStyles.verseTextTerran,
              matchupStyles.matchupCellContainerTerran
            )}
            {getMatchupCell(
              MatchUp.TVT,
              matchups.includes(MatchUp.TVT),
              matchupStyles.verseTextTerran,
              matchupStyles.matchupCellContainerTerran
            )}
            {getMatchupCell(
              MatchUp.TVP,
              matchups.includes(MatchUp.TVP),
              matchupStyles.verseTextTerran,
              matchupStyles.matchupCellContainerTerran
            )}
            {getMatchupCell(
              MatchUp.TVR,
              matchups.includes(MatchUp.TVR),
              matchupStyles.verseTextTerran,
              matchupStyles.matchupCellContainerTerran
            )}
          </Box>
          <Box className={matchupStyles.matchupRow}>
            {getMatchupCell(
              MatchUp.PVZ,
              matchups.includes(MatchUp.PVZ),
              matchupStyles.verseTextProtoss,
              matchupStyles.matchupCellContainerProtoss
            )}
            {getMatchupCell(
              MatchUp.PVT,
              matchups.includes(MatchUp.PVT),
              matchupStyles.verseTextProtoss,
              matchupStyles.matchupCellContainerProtoss
            )}
            {getMatchupCell(
              MatchUp.PVP,
              matchups.includes(MatchUp.PVP),
              matchupStyles.verseTextProtoss,
              matchupStyles.matchupCellContainerProtoss
            )}
            {getMatchupCell(
              MatchUp.PVR,
              matchups.includes(MatchUp.PVR),
              matchupStyles.verseTextProtoss,
              matchupStyles.matchupCellContainerProtoss
            )}
          </Box>
          <Box className={matchupStyles.matchupRow}>
            {getMatchupCell(
              MatchUp.RVZ,
              matchups.includes(MatchUp.RVZ),
              matchupStyles.verseTextRandom,
              matchupStyles.matchupCellContainerRandom
            )}
            {getMatchupCell(
              MatchUp.RVT,
              matchups.includes(MatchUp.RVT),
              matchupStyles.verseTextRandom,
              matchupStyles.matchupCellContainerRandom
            )}
            {getMatchupCell(
              MatchUp.RVP,
              matchups.includes(MatchUp.RVP),
              matchupStyles.verseTextRandom,
              matchupStyles.matchupCellContainerRandom
            )}
            {getMatchupCell(
              MatchUp.RVR,
              matchups.includes(MatchUp.RVR),
              matchupStyles.verseTextRandom,
              matchupStyles.matchupCellContainerRandom
            )}
          </Box>
        </Box>
      </Box>

      <Box className={formStyles.actionButtonContainer}>
        <Button
          variant="contained"
          disableElevation
          className={formStyles.actionButton}
          onClick={() => handleSearch()}
        >
          <Typography variant="body1" className={appStyles.invertPrimaryFont}>
            Search for Match
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
