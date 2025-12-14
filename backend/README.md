# Starcarft II Improved Ladder - Backend

## Connecting to Postgres

1. Set the following variables in your local env

```
export SC2_IMPROVED_LADDER_PG_DB=postgres
export SC2_IMPROVED_LADDER_PG_USER=admin
export SC2_IMPROVED_LADDER_PG_PASSWORD=password
export SC2_IMPROVED_LADDER_PG_PORT=6213
```

2. docker compose up
3. psql -h 0.0.0.0 -p 6213 -U admin postgres

## Seeding a local environment

```
alembic upgrade head && \
docker run \
    --network sc2-improved-ladder-network \
    --expose=6213 \
    sc2-improved-ladder-backend:latest \
    python -m test.seed -u admin -pw password -ho sc2-improved-ladder-db -p 6213 -d postgres -dd
```

## Alembic

```
alembic revision --autogenerate -m "Init schema"
alembic upgrade head
```
