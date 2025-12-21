from collections import defaultdict

from db.helpers import query
from db.model import UserRating


def query_user_ratings_by_ids(user_ids):
    return query(
        params={UserRating},
        distinct=[UserRating.user_id, UserRating.matchup],
        column=UserRating.user_id,
        values=user_ids,
        order_by=[
            UserRating.user_id.desc(),
            UserRating.matchup.desc(),
            UserRating.created_at.desc(),
        ],
    )


def create_user_rating_lookup(user_ratings):
    lookup = defaultdict(dict)
    for user_rating in user_ratings:
        lookup[user_rating.user_id] = lookup[user_rating.user_id] | {user_rating.matchup: user_rating.rating}
    return lookup
