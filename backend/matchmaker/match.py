"""
Funcs related to matchmaking
"""

import logging

from db.helpers import create, update
from db.model import Match, MatchRequest
from db.query.match_request import query_match_requests_for_matchmaker
from db.query.user import query_user_by_ids
from decorators.time import log_perf_time
from enums.match import MatchRequestStatus, MatchStatus
from matchmaker.maps import get_random_ladder_map
from matchmaker.stable_roommates import find_stable_roommates
from matchmaker.utils import get_lookup_by_id
from sqlalchemy import or_

logger = logging.getLogger(__name__)

# TODO Mark match requests as stale (canceled?) if not in communication with client


@log_perf_time
def execute_matchmaker():
    """
    Entrypoint to matchmaking
    """
    pending_match_requests = query_match_requests_for_matchmaker(status=MatchRequestStatus.PENDING)
    created_match_requests = query_match_requests_for_matchmaker(status=MatchRequestStatus.CREATED)
    if created_match_requests:
        update(
            model=MatchRequest,
            where=(MatchRequest.status == MatchRequestStatus.CREATED),
            values={"status": MatchRequestStatus.PENDING},
        )

    match_requests = pending_match_requests + created_match_requests
    if match_requests:
        users_lookup = get_lookup_by_id(query_user_by_ids([req.user_id for req in match_requests]))
        match_request_lookup = get_lookup_by_id(match_requests)
        pairings = find_stable_roommates(match_requests)
        spent = set()
        for player, opponent in pairings.items():
            player_match_request_id = player.name if player else None
            opponent_match_request_id = opponent.name if opponent else None

            if player_match_request_id in spent or opponent_match_request_id in spent:
                continue

            if player is not None and opponent is not None:
                player_request = match_request_lookup[player_match_request_id]
                opponent_request = match_request_lookup[opponent_match_request_id]
                player = users_lookup[player_request.user_id]
                opponent = users_lookup[opponent_request.user_id]
                match = create(
                    Match(
                        ranked=True,
                        status=MatchStatus.CREATED,
                        map=get_random_ladder_map(),
                        match_requests=[player_request, opponent_request],
                        users=[player, opponent],
                    )
                )
                logger.info(
                    f"Matchmaker created a match ({match.id}) between {player.id} and {opponent.id} for "
                    f"{player_match_request_id=} and {opponent_match_request_id=}"
                )
                update(
                    model=MatchRequest,
                    where=or_(
                        (MatchRequest.id == player_match_request_id),
                        (MatchRequest.id == opponent_match_request_id),
                    ),
                    values={"status": MatchRequestStatus.FULFILLED},
                )

            spent.add(player_match_request_id)
            spent.add(opponent_match_request_id)
