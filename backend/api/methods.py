import logging
import requests
from flask import json
from tenacity import retry, stop_after_attempt, wait_fixed

from static import SC2_IMPROVED_LADDER_API_BASE

# TODO Add auth
# TODO Add retry logic

logger = logging.getLogger(__name__)


class SC2SImprovedLadderAPI:

    @classmethod
    def headers(cls):
        return {"Content-Type": "application/json"}

    @classmethod
    @retry(stop=stop_after_attempt(2), wait=wait_fixed(0.25))
    def get(cls, endpoint, params=None):
        logger.debug(f"Sending GET request to {endpoint=}")
        res = requests.get(
            SC2_IMPROVED_LADDER_API_BASE + endpoint, params=params, headers=SC2SImprovedLadderAPI.headers()
        )
        return res.json()

    @classmethod
    @retry(stop=stop_after_attempt(2), wait=wait_fixed(0.25))
    def post(cls, endpoint, data):
        logger.debug(f"Sending POST request to {endpoint=}")
        res = requests.post(
            url=SC2_IMPROVED_LADDER_API_BASE + endpoint,
            headers=SC2SImprovedLadderAPI.headers(),
            data=json.dumps(data, default=str),
        )
        return res.json()

    @classmethod
    @retry(stop=stop_after_attempt(2), wait=wait_fixed(0.25))
    def put(cls, endpoint, data):
        logger.debug(f"Sending PUT request to {endpoint=}")
        res = requests.put(
            url=SC2_IMPROVED_LADDER_API_BASE + endpoint,
            headers=SC2SImprovedLadderAPI.headers(),
            json=data,
        )
        return res.json()
