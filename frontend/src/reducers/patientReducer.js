import {
  FETCH_PATIENT_DATA_REQUEST,
  FETCH_PATIENT_DATA_SUCCESS,
  FETCH_PATIENT_DATA_FAILURE
} from '../actions/actionTypes';

const initialState = {
  patientData: null,
  isLoading: false,
  error: null
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PATIENT_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_PATIENT_DATA_SUCCESS:
      return {
        ...state,
        patientData: action.payload,
        isLoading: false,
        error: null
      };
    case FETCH_PATIENT_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default doctorReducer;
