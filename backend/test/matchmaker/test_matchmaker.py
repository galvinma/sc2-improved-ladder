from datetime import datetime

from db.model import MatchRequest, UserRating
from enums.match import MatchRequestStatus, MatchUp
from matchmaker.stable_roommates import find_stable_roommates
from matchmaker.utils import get_matchup_complement

# TODO SC2IL-22: Write tests for the matchmaker service


def _match_request(
    id=1,
    created_at=datetime.now(),
    updated_at=datetime.now(),
    iteration=1,
    matchups=[MatchUp.ZVT],
    ranked=True,
    status=MatchRequestStatus.CREATED,
    user_id=1,
):
    return MatchRequest(
        id=id,
        created_at=created_at,
        updated_at=updated_at,
        iteration=iteration,
        matchups=matchups,
        ranked=ranked,
        status=status,
        user_id=user_id,
    )


def _user_rating(
    id=1, created_at=datetime.now(), updated_at=datetime.now(), matchup=MatchUp.ZVT, rating=1000, user_id=1
):
    return UserRating(
        id=id, created_at=created_at, updated_at=updated_at, matchup=matchup, rating=rating, user_id=user_id
    )


MATCH_REQUESTS = [
    _match_request(id=1, matchups=[MatchUp.ZVT], user_id=1),
    _match_request(id=2, matchups=[MatchUp.ZVT], user_id=2),
    _match_request(id=3, matchups=[MatchUp.TVZ], user_id=3),
    _match_request(id=4, matchups=[MatchUp.TVZ], user_id=4),
    _match_request(id=5, matchups=[MatchUp.ZVZ], user_id=5),
    _match_request(id=6, matchups=[MatchUp.ZVT, MatchUp.ZVZ], user_id=6),
    _match_request(id=7, matchups=[MatchUp.ZVT], user_id=7),
]
USER_RATINGS = [
    _user_rating(id=1, matchup=MatchUp.ZVT, rating=1000, user_id=1),
    _user_rating(id=2, matchup=MatchUp.ZVT, rating=1000, user_id=2),
    _user_rating(id=3, matchup=MatchUp.TVZ, rating=1200, user_id=3),
    _user_rating(id=4, matchup=MatchUp.TVZ, rating=1300, user_id=4),
    _user_rating(id=5, matchup=MatchUp.ZVZ, rating=1200, user_id=5),
    _user_rating(id=6, matchup=MatchUp.ZVZ, rating=1300, user_id=6),
    _user_rating(id=7, matchup=MatchUp.ZVT, rating=1710, user_id=6),
    _user_rating(id=8, matchup=MatchUp.ZVT, rating=1510, user_id=7),
]


def test_matchup_complement():
    assert get_matchup_complement(MatchUp.ZVZ) == MatchUp.ZVZ
    assert get_matchup_complement(MatchUp.ZVT) == MatchUp.TVZ


def test_find_stable_roommates(monkeypatch):
    monkeypatch.setattr(
        "matchmaker.preferences.query_user_ratings_by_ids",
        lambda user_ids: USER_RATINGS,
    )

    matching = find_stable_roommates(MATCH_REQUESTS)
    assert matching
