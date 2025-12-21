import logging

from db.query.match import query_match_by_id
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

logger = logging.getLogger(__name__)

match = Blueprint("match", __name__)


@match.route("/match/<match_id>", methods=["GET"])
@jwt_required()
def get_match_request(match_id):
    match = query_match_by_id(match_id)
    return jsonify(match.as_dict()), 200
