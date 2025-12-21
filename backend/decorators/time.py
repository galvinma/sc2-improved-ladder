import logging
from time import perf_counter

logger = logging.getLogger(__name__)


def log_perf_time(func):
    def perf_counter_wrapper(*args, **kwargs):
        start = perf_counter()
        res = func(*args, **kwargs)
        stop = perf_counter()
        logger.info(f"{func.__name__} took {round(stop - start, 2)} seconds.")
        return res

    return perf_counter_wrapper
