from db.helpers import query
from db.model import MatchRequest
from more_itertools import one


def query_match_request_by_id(match_request_id):
    if match_request_id is None:
        return None

    return one(
        query(
            params={MatchRequest},
            filters=[MatchRequest.id == match_request_id],
        ),
        too_short=None,
    )


def query_match_requests_for_matchmaker(status, ranked=True, orderby=MatchRequest.created_at.asc()):
    return query(
        params={MatchRequest},
        filters=[(MatchRequest.status == status), (MatchRequest.ranked == ranked)],
        order_by=[orderby],
    )
