from enum import Enum


class RegionId(Enum):
    US = 1
    EU = 2
    KR = 3
    CN = 5


class GameStatus(Enum):
    CREATED = 1
    PENDING = 2
    IN_PROGRESS = 3
    COMPLETE = 4
    CANCELLED = 5


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
