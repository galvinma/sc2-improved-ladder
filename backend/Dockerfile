FROM python:3.13.1-bookworm

# TODO Move this to a secret / env variable
EXPOSE 5000

RUN mkdir -p /app
WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

COPY static.py /app/static.py
COPY alembic.ini /app/alembic.ini

COPY alembic /app/alembic
COPY api /app/api
COPY db /app/db
COPY decorators /app/decorators
COPY enums /app/enums
COPY matchmaker /app/matchmaker
COPY test /app/test
COPY utils /app/utils
