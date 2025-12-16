from db.helpers import query
from db.model import MatchRequest
from more_itertools import one


def query_match_request(match_request_id):
    return one(
        query(
            params={MatchRequest},
            filters=[MatchRequest.id == match_request_id],
        ),
        too_short=None,
    )
