from enum import Enum


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


class MatchRequestStatus(Enum):
    """
    Maps lifecycle of a match request:

    - CREATED: A player requests a match request
    - PENDING: The matchmaker acknowledges the request and is searching for a Pairing
    - FULFILLED: The matchmaker has returned a Pairing
    - CANCELED: At any point in the process a player or the matchmaker cancels the match request
    """

    CREATED = "CREATED"
    PENDING = "PENDING"
    FULFILLED = "FULFILLED"
    CANCELED = "CANCELED"


class MatchStatus(Enum):
    """
    Maps the lifecycle of a match:

    - CREATED: The matchmaker returns a Pairing
    - ACCEPTED|REJECTED: Players review the Pairing
    - COMPLETED: The match has been played
    - CANCELED: At any point in the process a player or the matchmaker cancels the match
    """

    CREATED = "CREATED"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"
    COMPLETED = "COMPLETED"
    CANCELED = "CANCELED"
