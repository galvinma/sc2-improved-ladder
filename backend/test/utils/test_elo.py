import pytest
from utils.elo import expected_probability, elo_rating


def test_expected_probability():
    assert expected_probability(ra=1000, rb=1000) == 0.5
    assert round(expected_probability(ra=1000, rb=1100), 2) == 0.36
    assert round(expected_probability(ra=1100, rb=1000), 2) == 0.64
    assert round(expected_probability(ra=1000, rb=1200), 2) == 0.24
    assert round(expected_probability(ra=1200, rb=1000), 2) == 0.76


ELO_DATA = [
    [1000, 1000, 1, [1005, 995]],
    [1000, 1000, 0, [995, 1005]],
    [1000, 1000, 0.5, [1000, 1000]],
    [1100, 1000, 1, [1104, 996]],
    [1000, 1100, 1, [1006, 1094]],
    [1100, 1000, 0, [1094, 1006]],
    [1000, 1100, 0, [996, 1104]],
    [1200, 1000, 1, [1202, 998]],
    [1000, 1200, 1, [1008, 1192]],
]


@pytest.mark.parametrize("ra,rb,sa,rating", ELO_DATA)
def test_elo_rating(ra, rb, sa, rating):
    ra, rb = elo_rating(ra=ra, rb=rb, sa=sa)
    assert [round(ra), round(rb)] == rating
