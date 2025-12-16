from db.helpers import query
from db.model import User
from more_itertools import one


def query_user(email):
    return one(
        query(
            params={User},
            filters=[User.email == email],
        ),
        too_short=None,
    )
