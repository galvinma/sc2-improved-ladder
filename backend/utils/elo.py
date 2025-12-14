"""
Functions related to calculating ELO

https://en.wikipedia.org/wiki/Elo_rating_system
"""

from static import ELO_CONST, ELO_SENSITIVITY_FACTOR

# TODO Implement provisional rating
# TODO Implement sliding sensitivity factor (K)


def expected_probability(ra, rb, ec=ELO_CONST):
    """
    Ea = 1 / (1 + 10^((Rb - Ra) / Ec)))

    Ea: Expect Probability (a)
    Ra: Rating (a)
    Rb: Rating (b)
    Ec: ELO constant
    """

    return 1 / (1 + 10 ** ((rb - ra) / ec))


def elo_rating(
    ra,
    rb,
    sa,
    k=ELO_SENSITIVITY_FACTOR,
):
    """
    Ra' = Ra + K(Sa - Ea)

    Ra': Updated Rating (a)
    Ra: Rating (a)
    Sa: Score (a) # AKA outcome. 1 for a win, 0 for loss, 0.5 for draw
    K: Sensitivity Constant
    Ea: Expect Probability (a)
    """

    ea = expected_probability(ra, rb)
    eb = expected_probability(rb, ra)
    ra = ra + (k * (sa - ea))
    rb = rb + (k * ((1 - sa) - eb))

    return [ra, rb]
