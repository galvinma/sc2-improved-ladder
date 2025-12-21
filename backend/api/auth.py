import logging

from db.helpers import create
from db.model import User
from db.query.user import query_user_by_email
from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    create_access_token,
    current_user,
    jwt_required,
    unset_jwt_cookies,
)

logger = logging.getLogger(__name__)

auth = Blueprint("auth", __name__)


@auth.route("/register", methods=["POST"])
def register():
    data = request.json

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
    user = query_user_by_email(email)
    if not user or not user.check_password(password):
        return jsonify("Wrong username or password"), 401

    token = create_access_token(identity=email)
    return jsonify(
        email=user.email,
        firstName=user.first_name,
        lastName=user.last_name,
        token=token,
    )


@auth.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@auth.route("/verify_token", methods=["GET"])
@jwt_required()
def verify_token():
    return jsonify(logged_in_as=current_user.email), 200
