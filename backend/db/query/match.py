from db.helpers import query
from db.model import Match
from more_itertools import one


def query_match_by_id(match_id):
    return one(
        query(
            params={Match},
            filters=[Match.id == match_id],
        ),
        too_short=None,
    )
