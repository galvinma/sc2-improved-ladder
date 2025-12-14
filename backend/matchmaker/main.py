"""
Entrypoint to schedule SC2 Improved Ladder matchmaking

python -m backend.machmaker.main -s

"""

import argparse
import logging
import time

import schedule
from dotenv import load_dotenv

from enums import RegionId
from utils.concurrency import run_threaded

load_dotenv()

logging.basicConfig(format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO)
logger = logging.getLogger(__name__)


# def job():
#     logger.info("I'm working...")
#     print("I'm working...")


def handle_schedule():
    logger.info("Scheduling jobs...")

    # schedule.every(3).seconds.do(job)

    while True:
        schedule.run_pending()
        time.sleep(1)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-s", "--schedule", action="store_true")
    args = parser.parse_args()

    if args.schedule:
        handle_schedule()
    else:
        logger.error("Missing required argument.")
