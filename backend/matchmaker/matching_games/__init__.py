"""Top-level imports for the library."""

import sys

if not sys.warnoptions:
    import warnings

    warnings.simplefilter("always")

from matchmaker.matching_games.base import BaseGame, BaseMatching, BasePlayer
from matchmaker.matching_games.matchings import MultipleMatching, SingleMatching
from matchmaker.matching_games.players import Player

__version__ = "1.4.3"

__all__ = [
    "BaseGame",
    "BaseMatching",
    "BasePlayer",
    "Matching",
    "MultipleMatching",
    "Player",
    "SingleMatching",
    "__version__",
]
