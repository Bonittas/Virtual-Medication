// reducers/patientReducer.js
const initialState = {
  patients: [],
  loading: false,
  error: null
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VIEW_PATIENTS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'VIEW_PATIENTS_SUCCESS':
      return {
        ...state,
        loading: false,
        patients: action.payload
      };
    case 'VIEW_PATIENTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'VERIFY_PATIENT_SUCCESS':
      return {
        ...state,
        patients: state.patients.map(patient =>
          patient.id === action.payload ? { ...patient, verified: true } : patient
        )
      };
    case 'VERIFY_PATIENT_FAILURE':
      return {
        ...state,
        error: action.payload
      };
    case 'UNVERIFY_PATIENT_SUCCESS':
      return {
        ...state,
        patients: state.patients.map(patient =>
          patient.id === action.payload ? { ...patient, verified: false } : patient
        )
      };
    case 'UNVERIFY_PATIENT_FAILURE':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default patientReducer;
