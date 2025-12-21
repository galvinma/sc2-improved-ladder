import logging

from matchmaker.matching_games.games.stable_roommates import StableRoommates
from matchmaker.matching_games.players.player import Player
from matchmaker.preferences import get_preferences

logger = logging.getLogger(__name__)


def find_stable_roommates(match_requests):
    logger.info("Finding partners for all match requests...")

    solution = {}
    preferences = get_preferences(match_requests)
    players = {match_request.id: Player(name=match_request.id) for match_request in match_requests}

    removed = []
    participants = []
    for match_request_id, pairings in preferences.items():
        prefs = [players[pairing.partner_request_id] for pairing in pairings]
        player = players[match_request_id]
        if not prefs:
            removed.append(player)
            continue

        player.set_prefs(prefs)
        participants.append(player)

    if removed:
        logger.warning(f"The following MatchRequest are removed because they have no eligible partners: {removed=}")

    if participants:
        logger.info(f"Starting assignment for the following participants. {participants=}")
        game = StableRoommates(participants)
        solution = game.solve()

    return solution
