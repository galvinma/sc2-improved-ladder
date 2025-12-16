import logging

from db.helpers import create, update
from db.model import MatchRequest
from db.query.match import query_match_request
from enums import MatchRequestStatus
from flask import Blueprint, jsonify, request
from flask_jwt_extended import current_user, jwt_required

logger = logging.getLogger(__name__)

match = Blueprint("match", __name__)


@match.route("/match_request", methods=["POST"])
@jwt_required()
def post_match_request():
    data = request.json
    match_request = MatchRequest(
        user=current_user,
        matchups=data.get("matchups"),
        ranked=data.get("ranked"),
        status=MatchRequestStatus.CREATED.value,
    )
    match_request = create(match_request, as_dict=True)
    return jsonify({"match_request_id": match_request["id"]}), 201


@match.route("/match_request/<match_request_id>", methods=["GET"])
@jwt_required()
def get_match_request(match_request_id):
    match_request = query_match_request(match_request_id)
    return jsonify(match_request.as_dict()), 200


@match.route("/match_request/status/<match_request_id>", methods=["PUT"])
@jwt_required()
def put_match_request(match_request_id):
    data = request.json
    status = MatchRequestStatus(data.get("status"))
    update(model=MatchRequest, where=[MatchRequest.id == match_request_id], values={"status": status})
    return jsonify({"match_request_id": match_request_id}), 200
