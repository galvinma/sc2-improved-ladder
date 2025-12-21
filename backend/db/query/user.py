from db.helpers import query
from db.model import User
from more_itertools import one


def query_user_by_id(user_id):
    return one(
        query(
            params={User},
            filters=[User.id == user_id],
        ),
        too_short=None,
    )


def query_user_by_email(email):
    return one(
        query(
            params={User},
            filters=[User.email == email],
        ),
        too_short=None,
    )


def query_user_by_ids(user_ids):
    return query(params={User}, column=User.id, values=user_ids)
