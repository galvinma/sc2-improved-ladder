import enum
import logging
from typing import List, Optional

from enums.maps import LadderMaps
from enums.match import MatchRequestStatus, MatchStatus, MatchUp
from sqlalchemy import (
    ARRAY,
    Column,
    DateTime,
    ForeignKey,
    String,
    Table,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from werkzeug.security import check_password_hash, generate_password_hash

logger = logging.getLogger("__name__")


# Constraints
USER_MMR_UNIQUE_CONSTRAINT = "user_mmr_unique_constraint"
USER_UNIQUE_CONSTRAINT = "user_unique_constraint"


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


# Associations
match_association_table = Table(
    "match_association_table",
    Base.metadata,
    Column("match_id", ForeignKey("match.id")),
    Column("user_id", ForeignKey("user.id")),
)


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

    user_ratings: Mapped[List["UserRating"]] = relationship(back_populates="user")
    match_requests: Mapped[List["MatchRequest"]] = relationship(back_populates="user")
    matches: Mapped[List["Match"]] = relationship(secondary=match_association_table, back_populates="users")

    UniqueConstraint(email, name=USER_UNIQUE_CONSTRAINT)

    def __init__(self, email):
        self.email = email

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self) -> str:
        return (
            f"User(id={self.id!r}, "
            + f"created_at={self.created_at!r}, "
            + f"updated_at={self.updated_at!r}, "
            + f"email={self.email!r}"
            + ")"
        )


class MatchRequest(Base):
    __tablename__ = "match_request"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    iteration: Mapped[int] = mapped_column()
    matchups: Mapped[list[MatchUp]] = mapped_column(ARRAY(String))
    ranked: Mapped[bool] = mapped_column()
    status: Mapped[MatchRequestStatus] = mapped_column()

    user_id = mapped_column(ForeignKey("user.id"))
    user: Mapped[User] = relationship(back_populates="match_requests")

    match_id = mapped_column(ForeignKey("match.id"))
    match: Mapped["Match"] = relationship(back_populates="match_requests")

    def __repr__(self) -> str:
        return (
            f"MatchRequest(id={self.id!r}, "
            + f"created_at={self.created_at!r}, "
            + f"updated_at={self.updated_at!r}, "
            + f"iteration={self.iteration!r}, "
            + f"matchups={self.matchups!r}, "
            + f"ranked={self.ranked!r}, "
            + f"status={self.status!r}, "
            + f"user_id={self.user_id!r}"
            + ")"
        )


class Match(Base):
    __tablename__ = "match"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    ranked: Mapped[bool] = mapped_column()
    status: Mapped[MatchStatus] = mapped_column()
    map: Mapped[LadderMaps] = mapped_column()

    users: Mapped[List[User]] = relationship(secondary=match_association_table, back_populates="matches")
    match_requests: Mapped[List["MatchRequest"]] = relationship(back_populates="match")

    def __repr__(self) -> str:
        return (
            f"Match(id={self.id!r}, "
            + f"created_at={self.created_at!r}, "
            + f"updated_at={self.updated_at!r}, "
            + f"ranked={self.ranked!r}, "
            + f"status={self.status!r}, "
            + f"map={self.map!r}, "
            + f"users={self.users!r}, "
            + f"match_requests={self.match_requests!r}"
            + ")"
        )


class UserRating(Base):
    __tablename__ = "user_rating"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    matchup: Mapped[MatchUp] = mapped_column()
    rating: Mapped[int] = mapped_column()

    user_id = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates="user_ratings")

    UniqueConstraint(user_id, matchup, rating, created_at, name=USER_MMR_UNIQUE_CONSTRAINT)

    def __repr__(self) -> str:
        return (
            f"UserRating(id={self.id!r}, "
            + f"created_at={self.created_at!r}, "
            + f"updated_at={self.updated_at!r}, "
            + f"matchup={self.matchup!r}, "
            + f"rating={self.rating!r}, "
            + f"user_id={self.user_id!r}"
            + ")"
        )
