"""
https://flask-jwt-extended.readthedocs.io/en/stable/basic_usage.html
"""

import logging
import os

from api.auth import auth
from api.match import match
from db.query.user import query_user
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

logging.basicConfig(format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO)
logger = logging.getLogger(__name__)


app = Flask(__name__)

cors = CORS(app)
jwt = JWTManager(app)

# Blueprint
app.register_blueprint(auth, url_prefix="/api")
app.register_blueprint(match, url_prefix="/api")

# Config
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    email = jwt_data["sub"]
    return query_user(email)


# TODO host/port into env
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
