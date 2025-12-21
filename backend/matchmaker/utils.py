from enums.match import MatchUp


def calculate_mmr_delta(rating_one, rating_two):
    return abs(rating_one - rating_two)


def get_matchup_complement(matchup):
    if isinstance(matchup, str):
        return matchup[::-1]

    return MatchUp(matchup.value[::-1])


def get_lookup_by_id(objects):
    return {obj.id: obj for obj in objects}
