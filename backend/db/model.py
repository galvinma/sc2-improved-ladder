import logging
from typing import List, Optional

from sqlalchemy import ARRAY, Column, Enum, ForeignKey, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.dialects import postgresql
from enums import MatchStatus, MatchUp, Race
from werkzeug.security import generate_password_hash, check_password_hash

logger = logging.getLogger("__name__")


# Constraints
PROFILE_MMR_UNIQUE_CONSTRAINT = "character_mmr_unique_constraint"
USER_UNIQUE_CONSTRAINT = "user_unique_constraint"
MATCH_UNIQUE_CONSTRAINT = "match_pkey"
USER_MMR_UNIQUE_CONSTRAINT = "user_mmr_unique_constraint"


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
    display_name: Mapped[Optional[str]] = mapped_column()
    clan_name: Mapped[Optional[str]] = mapped_column()
    clan_tag: Mapped[Optional[str]] = mapped_column()

    # match_requests: Mapped[List["MatchRequest"]] = relationship(back_populates="user")
    # character_mmrs: Mapped[List["UserMMR"]] = relationship(back_populates="user")

    UniqueConstraint(email, name=USER_UNIQUE_CONSTRAINT)

    def __init__(self, email):
        self.email = email

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


# class UserMMR(Base):
#     __tablename__ = "user_mmr"
#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
#     matchup: Mapped[MatchUp] = mapped_column()
#     mmr: Mapped[int] = mapped_column()
#     date: Mapped[int] = mapped_column()

#     user_id = mapped_column(ForeignKey("user.id"))
#     user: Mapped["User"] = relationship(back_populates="user_mmrs")

#     UniqueConstraint(user_id, matchup, mmr, date, name=USER_MMR_UNIQUE_CONSTRAINT)

#     def __repr__(self) -> str:
#         return (
#             f"UserMMR(id={self.id!r}, "
#             + f"user_id={self.user_id!r}, "
#             + f"matchup={self.matchup!r}, "
#             + f"mmr={self.mmr!r}"
#             + f"date={self.date!r}"
#             + ")"
#         )


# class MatchRequest(Base):
#     __tablename__ = "match_request"
#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
#     date: Mapped[int] = mapped_column()
#     ranked: Mapped[bool] = mapped_column()
#     matchups: Mapped[list[MatchUp]] = mapped_column(ARRAY(Enum(MatchUp, native_enum=True)), nullable=False)
#     status: Mapped[Status] = mapped_column()

#     user_id = mapped_column(ForeignKey("user.id"))
#     user: Mapped[User] = relationship(back_populates="match_requests")


# class Match(Base):
#     __tablename__ = "match"
#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)


def table_name_to_model(table_name):
    pass


def table_name_to_constraint(table_name):
    pass
