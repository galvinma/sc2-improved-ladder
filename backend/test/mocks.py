import datetime
from copy import deepcopy
from pathlib import Path


from static import (
    MOCK_PROFILES_PATH,
)


MOCK_PROFILES = {
    name: Profile(**patient) for name, profile in json_load(Path(__file__).parent / MOCK_PROFILES_PATH).items()
}


def load_patient(key="happy_path"):
    patient = deepcopy(MOCK_PATIENTS[key])
    if key == "happy_path":
        patient.mrn = MOCK_MRN
    return patient
