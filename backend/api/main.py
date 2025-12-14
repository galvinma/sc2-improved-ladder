"""
https://flask-jwt-extended.readthedocs.io/en/stable/basic_usage.html
"""

import logging
import os
from flask import Flask, json, make_response, request
from flask_jwt_extended import JWTManager
from api.auth import auth
from db.model import table_name_to_model
from db.helpers import query
from flask_cors import CORS


logging.basicConfig(format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO)
logger = logging.getLogger(__name__)


app = Flask(__name__)
app.register_blueprint(auth, url_prefix="/api")
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
cors = CORS(app)
jwt = JWTManager(app)


@app.route("/health_check", methods=["GET"])
def health_check():
    try:
        return make_response(
            json.dumps(
                {
                    "message": "Success",
                }
            ),
            200,
        )
    except Exception:
        msg = "Exception thrown during GET."
        logger.exception(msg)
        return make_response(json.dumps({"message": msg}), 500)


@app.route("/get/<table_name>", methods=["GET"])
def get(table_name):
    try:
        params = request.args.to_dict()
        return make_response(
            json.dumps(
                {
                    "message": "Success",
                    "results": [
                        obj.as_dict() for obj in query(params={table_name_to_model(table_name)}, filter_by=params)
                    ],
                }
            ),
            200,
        )
    except Exception:
        msg = "Exception thrown during GET."
        logger.exception(msg)
        return make_response(json.dumps({"message": msg}), 500)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
