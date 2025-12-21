import { pageWrapper } from "../../styles/InlineStyles";
import { Avatar, Button, Chip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import versusStyles from "./Versus.module.scss";
import appStyles from "../.././styles/App.module.scss";
import buttonStyles from "../.././components/button/Button.module.scss";
import * as React from "react";
import { useEffect, useRef, useState, type JSX } from "react";
import { CircularProgress } from "@mui/material";
import { MatchUp, Race } from "../../enums/enums";
import { getRaceIcon } from "../../funcs/icon";
import { getRaceFromChar } from "../../funcs/match";
import { useNavigate } from "react-router";
import { getData, putData, postData } from "../../funcs/api";
import { handleCommas } from "../../funcs/string-utils";
import variables from "../.././styles/Variables.module.scss";
import { VERSUS_SEARCH_INTERVAL } from "../../static";
import { matchRequestStatus } from "../../enums/match";

export default function Versus(): JSX.Element {
  const matchupIntervalId = useRef<number | undefined>(undefined);
  const matchupRequestId = useRef<number | null>(null);
  const [matchups, setMatchups] = useState<string[]>([]);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      cancelSearch();
    };
  }, []);

  const initiateSearch = () => {
    postData({
      endpoint: `match_request`,
      data: {
        matchups,
        ranked: true,
      },
    })
      .then((res) => {
        console.log(res);
        matchupRequestId.current = res.data.match_request_id;

        handlePolling();
      })
      .catch((err) => {
        console.debug(err);
        // TODO Snackbar to show API error
      });
  };

  const cancelSearch = () => {
    if (matchupRequestId.current !== null) {
      putData({
        endpoint: `match_request/status/${matchupRequestId.current}`,
        data: {
          status: "CANCELED",
        },
      })
        .then(() => {
          setSearching(false);
          matchupRequestId.current = null;
          clearInterval(matchupIntervalId.current);
        })
        .catch(() => {});
    }
  };

  const handlePolling = () => {
    setSearching(true);

    if (matchupRequestId.current !== null) {
      matchupIntervalId.current = setInterval(() => {
        console.log("Getting match updates...");
        console.log(matchupRequestId.current);
        getData({
          endpoint: `match_request/${matchupRequestId.current}`,
        })
          .then((res) => {
            console.log(res);
            // TODO Handle a new match
            if (res.data.status === matchRequestStatus.FULFILLED) {
              navigate(`/match/${res.data.match_id}`);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, VERSUS_SEARCH_INTERVAL);
    }
  };

  const handleMatchupClick = (matchup: string) => {
    if (matchups.includes(matchup)) {
      setMatchups(matchups.filter((target) => target !== matchup));
    } else {
      setMatchups([...matchups, matchup]);
    }
  };

  const handleQuickSelectClick = (race: Race) => {
    if (race === Race.ZERG) {
      setMatchups([MatchUp.ZVZ, MatchUp.ZVT, MatchUp.ZVP, MatchUp.ZVR]);
    } else if (race === Race.TERRAN) {
      setMatchups([MatchUp.TVZ, MatchUp.TVT, MatchUp.TVP, MatchUp.TVR]);
    } else if (race === Race.PROTOSS) {
      setMatchups([MatchUp.PVZ, MatchUp.PVT, MatchUp.PVP, MatchUp.PVR]);
    } else {
      setMatchups([MatchUp.RVZ, MatchUp.RVT, MatchUp.RVP, MatchUp.RVR]);
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
        className={versusStyles.raceChip}
      />
    );
  };

  const getQuickSelectPlayerRow = () => {
    return (
      <Box>
        <Box className={appStyles.flexRow}>
          <Box onClick={() => handleQuickSelectClick(Race.ZERG)}>
            {getRaceChip(Race.ZERG)}
          </Box>
          <Box onClick={() => handleQuickSelectClick(Race.TERRAN)}>
            {getRaceChip(Race.TERRAN)}
          </Box>
          <Box onClick={() => handleQuickSelectClick(Race.PROTOSS)}>
            {getRaceChip(Race.PROTOSS)}
          </Box>
          <Box onClick={() => handleQuickSelectClick(Race.RANDOM)}>
            {getRaceChip(Race.RANDOM)}
          </Box>
        </Box>
      </Box>
    );
  };

  const getMatchupHelperText = () => {
    const sortedMatchups: Record<string, string[]> = {};
    const helpers: JSX.Element[] = [];

    matchups.forEach((matchup) => {
      const playerChar = matchup[0];
      const opponentChar = matchup[2];
      (sortedMatchups[playerChar] ||= []).push(opponentChar);
    });

    for (const playerChar in sortedMatchups) {
      const playerRace = getRaceFromChar(playerChar);
      const opponentRaces = sortedMatchups[playerChar].map((opponentChar) => {
        return getRaceFromChar(opponentChar);
      });

      const helperText = `Play as ${playerRace} against ${handleCommas(opponentRaces)}.`;
      helpers.push(
        <Typography key={helperText} variant="body1">
          {helperText}
        </Typography>
      );
    }

    return <div>{helpers}</div>;
  };

  const getMatchupCell = (
    matchup: MatchUp,
    active: boolean,
    activeTextClass: string,
    activeContainerClass: string
  ): JSX.Element => {
    return (
      <Box
        onClick={() => handleMatchupClick(matchup.toString())}
        className={[
          active ? activeContainerClass : versusStyles.matchupCellContainer,
        ].join(" ")}
      >
        <Typography
          variant="body1"
          className={[active ? activeTextClass : versusStyles.verseText].join(
            " "
          )}
        >
          {matchup.toString()}
        </Typography>
      </Box>
    );
  };

  const getSearchButton = () => {
    return searching ? (
      <Button
        variant="contained"
        disableElevation
        className={buttonStyles.actionButton}
        onClick={() => cancelSearch()}
      >
        <Box className={appStyles.flexJustifySpaceAround}>
          <CircularProgress sx={{ color: variables.primaryWhite }} />

          <Box className={[versusStyles.searchTextContainer].join(" ")}>
            <Typography
              variant="h4"
              className={[appStyles.invertPrimaryFont].join(" ")}
            >
              Searching
            </Typography>
            <Typography
              variant="body2"
              className={[appStyles.invertPrimaryFont].join(" ")}
            >
              Click to cancel
            </Typography>
          </Box>
        </Box>
      </Button>
    ) : (
      <Button
        variant="contained"
        disableElevation
        className={buttonStyles.actionButton}
        onClick={() => initiateSearch()}
      >
        <Typography
          variant="h4"
          className={[appStyles.invertPrimaryFont].join(" ")}
        >
          Search for Match
        </Typography>
      </Button>
    );
  };

  return (
    <Box
      className={[appStyles.whiteBackground, appStyles.flexCol].join(" ")}
      style={{ ...pageWrapper }}
    >
      <Box className={appStyles.paragraphSpacing}>
        <Typography variant="h2" className={appStyles.pageTitle}>
          Versus
        </Typography>
      </Box>

      <Box className={appStyles.paragraphSpacing}>
        <Box className={versusStyles.ladderFormWrapper}>
          <Box className={appStyles.paragraphSpacing}>
            <Box className={versusStyles.quickSelectContainer}>
              <Box className={appStyles.paragraphSpacing}>
                {getQuickSelectPlayerRow()}
              </Box>
            </Box>
          </Box>

          <Box className={versusStyles.matchupGridWrapper}>
            <Box className={versusStyles.matchupContainer}>
              <Box className={versusStyles.matchupRow}>
                {getMatchupCell(
                  MatchUp.ZVZ,
                  matchups.includes(MatchUp.ZVZ),
                  versusStyles.verseTextZerg,
                  versusStyles.matchupCellContainerZerg
                )}
                {getMatchupCell(
                  MatchUp.ZVT,
                  matchups.includes(MatchUp.ZVT),
                  versusStyles.verseTextZerg,
                  versusStyles.matchupCellContainerZerg
                )}
                {getMatchupCell(
                  MatchUp.ZVP,
                  matchups.includes(MatchUp.ZVP),
                  versusStyles.verseTextZerg,
                  versusStyles.matchupCellContainerZerg
                )}
                {getMatchupCell(
                  MatchUp.ZVR,
                  matchups.includes(MatchUp.ZVR),
                  versusStyles.verseTextZerg,
                  versusStyles.matchupCellContainerZerg
                )}
              </Box>
              <Box className={versusStyles.matchupRow}>
                {getMatchupCell(
                  MatchUp.TVZ,
                  matchups.includes(MatchUp.TVZ),
                  versusStyles.verseTextTerran,
                  versusStyles.matchupCellContainerTerran
                )}
                {getMatchupCell(
                  MatchUp.TVT,
                  matchups.includes(MatchUp.TVT),
                  versusStyles.verseTextTerran,
                  versusStyles.matchupCellContainerTerran
                )}
                {getMatchupCell(
                  MatchUp.TVP,
                  matchups.includes(MatchUp.TVP),
                  versusStyles.verseTextTerran,
                  versusStyles.matchupCellContainerTerran
                )}
                {getMatchupCell(
                  MatchUp.TVR,
                  matchups.includes(MatchUp.TVR),
                  versusStyles.verseTextTerran,
                  versusStyles.matchupCellContainerTerran
                )}
              </Box>
              <Box className={versusStyles.matchupRow}>
                {getMatchupCell(
                  MatchUp.PVZ,
                  matchups.includes(MatchUp.PVZ),
                  versusStyles.verseTextProtoss,
                  versusStyles.matchupCellContainerProtoss
                )}
                {getMatchupCell(
                  MatchUp.PVT,
                  matchups.includes(MatchUp.PVT),
                  versusStyles.verseTextProtoss,
                  versusStyles.matchupCellContainerProtoss
                )}
                {getMatchupCell(
                  MatchUp.PVP,
                  matchups.includes(MatchUp.PVP),
                  versusStyles.verseTextProtoss,
                  versusStyles.matchupCellContainerProtoss
                )}
                {getMatchupCell(
                  MatchUp.PVR,
                  matchups.includes(MatchUp.PVR),
                  versusStyles.verseTextProtoss,
                  versusStyles.matchupCellContainerProtoss
                )}
              </Box>
              <Box className={versusStyles.matchupRow}>
                {getMatchupCell(
                  MatchUp.RVZ,
                  matchups.includes(MatchUp.RVZ),
                  versusStyles.verseTextRandom,
                  versusStyles.matchupCellContainerRandom
                )}
                {getMatchupCell(
                  MatchUp.RVT,
                  matchups.includes(MatchUp.RVT),
                  versusStyles.verseTextRandom,
                  versusStyles.matchupCellContainerRandom
                )}
                {getMatchupCell(
                  MatchUp.RVP,
                  matchups.includes(MatchUp.RVP),
                  versusStyles.verseTextRandom,
                  versusStyles.matchupCellContainerRandom
                )}
                {getMatchupCell(
                  MatchUp.RVR,
                  matchups.includes(MatchUp.RVR),
                  versusStyles.verseTextRandom,
                  versusStyles.matchupCellContainerRandom
                )}
              </Box>
            </Box>
          </Box>

          <Box
            className={[
              appStyles.paragraphSpacing,
              versusStyles.matchupHelperTextContainer,
            ].join(" ")}
          >
            {getMatchupHelperText()}
          </Box>

          <Box className={buttonStyles.actionButtonContainer}>
            {getSearchButton()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
