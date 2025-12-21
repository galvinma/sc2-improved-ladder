import logging
from dataclasses import dataclass

from db.query.user_rating import create_user_rating_lookup, query_user_ratings_by_ids
from enums.match import MatchUp
from matchmaker.utils import calculate_mmr_delta, get_matchup_complement
from static import ELO_NEW_PLAYER

logger = logging.getLogger(__name__)


@dataclass
class Pairing:
    matchup_request_id: int
    partner_request_id: int
    compatible: bool
    best_matchup: MatchUp | None
    mmr_delta: int | None


def get_preferences(match_requests):
    logger.info("Getting preferences for all match requests...")

    user_ratings = query_user_ratings_by_ids(user_ids=[request.user_id for request in match_requests])
    lookup = create_user_rating_lookup(user_ratings)

    preferences = {}
    for match_request in match_requests:
        compatible_partners = []
        for partner_request in match_requests:
            if match_request.id == partner_request.id:
                continue

            evaluation = evaluate_pairing(lookup, match_request, partner_request)
            if evaluation.compatible:
                compatible_partners.append(evaluation)

        preferences[match_request.id] = sorted(compatible_partners, key=lambda partner: partner.mmr_delta)

    return preferences


def evaluate_pairing(lookup, matchup_request, partner_request):
    compatible = False
    best_matchup = None
    mmr_delta = None

    for matchup in matchup_request.matchups:
        complement = get_matchup_complement(matchup)
        if complement in partner_request.matchups:
            compatible = True

            rating_one = (
                lookup[matchup_request.user_id][matchup]
                if matchup in lookup[matchup_request.user_id]
                else ELO_NEW_PLAYER
            )
            rating_two = (
                lookup[partner_request.user_id][complement]
                if complement in lookup[matchup_request.user_id]
                else ELO_NEW_PLAYER
            )

            delta = calculate_mmr_delta(
                rating_one=rating_one,
                rating_two=rating_two,
            )
            if mmr_delta is None or delta < mmr_delta:
                best_matchup = matchup
                mmr_delta = delta

    return Pairing(
        matchup_request_id=matchup_request.id,
        partner_request_id=partner_request.id,
        compatible=compatible,
        best_matchup=best_matchup,
        mmr_delta=mmr_delta,
    )
