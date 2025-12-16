import enum
import logging
from typing import List, Optional

from enums import MatchRequestStatus, MatchUp
from sqlalchemy import (
    ARRAY,
    Column,
    DateTime,
    ForeignKey,
    String,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from werkzeug.security import check_password_hash, generate_password_hash

logger = logging.getLogger("__name__")


# Constraints
PROFILE_MMR_UNIQUE_CONSTRAINT = "character_mmr_unique_constraint"
USER_UNIQUE_CONSTRAINT = "user_unique_constraint"
MATCH_UNIQUE_CONSTRAINT = "match_pkey"
USER_MMR_UNIQUE_CONSTRAINT = "user_mmr_unique_constraint"


class Base(DeclarativeBase):
    pass

    def as_dict(self):
        return {
            field.name: (
                getattr(self, field.name)
                if not isinstance(getattr(self, field.name), enum.Enum)
                else str(getattr(self, field.name).value)
            )
            for field in self.__table__.c
        }


class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    email: Mapped[str] = mapped_column(unique=True, nullable=False)
    password: Mapped[str] = mapped_column()
    first_name: Mapped[str] = mapped_column()
    last_name: Mapped[str] = mapped_column()
    battle_tag: Mapped[Optional[str]] = mapped_column()
    display_name: Mapped[Optional[str]] = mapped_column()
    clan_name: Mapped[Optional[str]] = mapped_column()
    clan_tag: Mapped[Optional[str]] = mapped_column()

    match_requests: Mapped[List["MatchRequest"]] = relationship(back_populates="user")

    UniqueConstraint(email, name=USER_UNIQUE_CONSTRAINT)

    def __init__(self, email):
        self.email = email

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class MatchRequest(Base):
    __tablename__ = "match_request"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    ranked: Mapped[bool] = mapped_column()
    matchups: Mapped[list[MatchUp]] = mapped_column(ARRAY(String))
    status: Mapped[MatchRequestStatus] = mapped_column()

    user_id = mapped_column(ForeignKey("user.id"))
    user: Mapped[User] = relationship(back_populates="match_requests")


# class Match(Base):
#     __tablename__ = "match"
#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
#     created_at = Column(DateTime, default=func.now())
#     updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


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


def table_name_to_model(table_name):
    pass


def table_name_to_constraint(table_name):
    pass
