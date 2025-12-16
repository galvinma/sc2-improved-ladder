import logging
import os
from contextlib import contextmanager

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy import update as sqlalchemy_update
from sqlalchemy.orm import Session
from utils.concurrency import thread_pool_max_workers

load_dotenv()

logger = logging.getLogger(__name__)


def get_engine(uri=None):
    if uri is None:
        uri = os.environ.get("SC2_IMPROVED_LADDER_PG_URI")

    if uri:
        workers = thread_pool_max_workers()
        return create_engine(
            uri,
            pool_size=workers,
            max_overflow=int(workers * 0.1),
            pool_timeout=30,
        )


ENGINE = get_engine()


@contextmanager
def session_scope(engine=None):
    if not engine:
        engine = ENGINE

    session = Session(bind=engine)
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


def query(
    params,
    joins=None,
    filters=None,
    filter_by=None,
    distinct=None,
    options=None,
    group_by=None,
    order_by=None,
    limit=None,
    count=None,
):
    with session_scope(engine=ENGINE) as session:
        stmt = session.query(*params)

        if joins:
            for tbl, condition in joins:
                stmt = stmt.join(tbl, condition)

        if filters:
            for filter in filters:
                stmt = stmt.filter(filter)

        if filter_by:
            stmt = stmt.filter_by(**filter_by)

        if distinct:
            stmt = stmt.distinct(*distinct)

        if options:
            stmt.options(options)

        if group_by is not None:
            stmt.group_by(*group_by)

        if order_by is not None:
            stmt = stmt.order_by(*order_by)

        if limit is not None:
            stmt = stmt.limit(limit)

        if count is not None:
            return stmt.count()

        res = stmt.all()
        session.expunge_all()
        return res


def create(instance, engine=None, as_dict=False):
    if engine is None:
        engine = ENGINE

    with session_scope(engine=ENGINE) as session:
        session.add(instance)
        session.commit()
        return instance.as_dict() if as_dict else instance


def update(model, where, values):
    with session_scope(engine=ENGINE) as session:
        stmt = sqlalchemy_update(model)
        if where:
            for condition in where:
                logger.info(condition)
                stmt = stmt.filter(condition)

        stmt = stmt.values(values)
        session.execute(stmt)


def orm_classes_as_dict(iterable):
    return [target.as_dict() for target in iterable]


def construct_uri(user, password, host, port, database):
    return f"postgresql://{user}:{password}@{host}:{port}/{database}"
