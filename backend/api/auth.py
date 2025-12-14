import logging
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    unset_jwt_cookies,
    jwt_required,
)
from more_itertools import one

from backend.db.helpers import create, query
from backend.db.model import User

logger = logging.getLogger(__name__)

auth = Blueprint("auth", __name__)


@auth.route("/register", methods=["POST"])
def register():
    data = request.json
    logger.info(data)

    # TODO confirm password match
    password = data.get("password")
    confirm_password = data.get("confirmPassword")
    if not password == confirm_password:
        return jsonify("Password mismatch"), 400

    user = User(email=data.get("email"))
    user.set_password(data.get("password"))
    user.first_name = data.get("firstName")
    user.last_name = data.get("lastName")

    # TODO Verify valid email
    # TODO Verify email DNE in DB

    user = create(user)
    return jsonify("Registered user"), 201


@auth.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = one(
        query(
            params={User},
            filters=[User.email == email],
        ),
        too_short=None,
    )

    if not user or not user.check_password(password):
        return jsonify("Wrong username or password"), 401

    token = create_access_token(identity=email)
    return jsonify(email=user.email, firstName=user.first_name, lastName=user.last_name, token=token)


@auth.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return jsonify({"msg": "logout successful"})


@auth.route("/verify_token", methods=["GET"])
@jwt_required()
def verify_token():
    current_user = get_jwt_identity()
    logger.info(f"Verifying token. {current_user=}")

    return jsonify(logged_in_as=current_user), 200
