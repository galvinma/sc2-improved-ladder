import logging
from typing import List, Optional

from sqlalchemy import Column, ForeignKey, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.dialects import postgresql
from enums import GameStatus, MatchUp
from werkzeug.security import generate_password_hash, check_password_hash

logger = logging.getLogger("__name__")


# Constraints
PROFILE_MMR_UNIQUE_CONSTRAINT = "character_mmr_unique_constraint"
USER_UNIQUE_CONSTRAINT = "user_unique_constraint"
MATCH_UNIQUE_CONSTRAINT = "match_pkey"


class Base(DeclarativeBase):
    pass

    def as_dict(self):
        return {field.name: getattr(self, field.name) for field in self.__table__.c}


class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(unique=True, nullable=False)
    password: Mapped[str] = mapped_column()
    first_name: Mapped[str] = mapped_column()
    last_name: Mapped[str] = mapped_column()
    battle_tag: Mapped[Optional[str]] = mapped_column()

    UniqueConstraint(email, name=USER_UNIQUE_CONSTRAINT)

    def __init__(self, email):
        self.email = email

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


def table_name_to_model(table_name):
    pass


def table_name_to_constraint(table_name):
    pass
