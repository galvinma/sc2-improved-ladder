from enum import Enum


class MatchRequestStatus(Enum):
    """
    Maps lifecycle of a match request:

    - CREATED: A player requests a match request
    - PENDING: The matchmaker acknowledges the request and is searching for a pairing
    - FULFILLED: The matchmaker has returned a pairing
    - CANCELED: At any point in the process a player or the matchmaker cancels the request
    """

    CREATED = "CREATED"
    PENDING = "PENDING"
    FULFILLED = "FULFILLED"
    CANCELED = "CANCELED"


class MatchStatus(Enum):
    """
    Maps the lifecycle of a match:

    - CREATED: The matchmaker returns a pairing
    - ACCEPTED|REJECTED: Players review the pairing
    - COMPLETED: The match has been played
    - CANCELED: At any point in the process a player or the matchmaker cancels the match
    """

    CREATED = "CREATED"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"
    COMPLETED = "COMPLETED"
    CANCELED = "CANCELED"


class Race(Enum):
    ZERG = "ZERG"
    TERRAN = "TERRAN"
    PROTOSS = "PROTOSS"
    RANDOM = "RANDOM"


class MatchUp(Enum):
    ZVT = "ZVT"
    ZVP = "ZVP"
    ZVZ = "ZVZ"
    ZVR = "ZVR"

    TVT = "TVT"
    TVP = "TVP"
    TVZ = "TVZ"
    TVR = "TVR"

    PVT = "PVT"
    PVP = "PVP"
    PVZ = "PVZ"
    PVR = "PVR"

    RVT = "RVT"
    RVP = "RVP"
    RVZ = "RVZ"
    RVR = "RVR"


class RegionId(Enum):
    US = 1
    EU = 2
    KR = 3
    CN = 5
