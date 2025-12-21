from random import choice

from enums.maps import LadderMaps


# TODO Account for map vetoes here
def get_random_ladder_map():
    return choice(list(LadderMaps))
