"""
Seed test data
"""

import argparse
import logging

from db.helpers import construct_uri, get_engine, session_scope
from db.model import Profile

logging.basicConfig(format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO)
logger = logging.getLogger("__name__")


def seed_database(args):
    logger.info(args)
    logger.info(f"Seeding {args.database=}...")
    uri = construct_uri(
        user=args.user,
        password=args.password,
        host=args.host,
        port=args.port,
        database=args.database,
    )
    logger.info(uri)
    engine = get_engine(uri=uri)
    with session_scope(engine=engine) as session:
        instance = Profile(**{"profile_id": 123, "realm_id": 1, "region_id": 1})
        session.add(instance)
        session.commit()
        return instance


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-d", "--database")
    parser.add_argument("-u", "--user")
    parser.add_argument("-pw", "--password")
    parser.add_argument("-ho", "--host")
    parser.add_argument("-p", "--port")
    parser.add_argument("-dd", "--drop-database", action="store_true")
    args = parser.parse_args()
    seed_database(args)
