import {
  ADD_SKILLS,
  FETCH_EDUCATION,
  FETCH_SKILLS,
  FETCH_STUDENT,
  NEW_SCHOOL,
  UPDATE_SCHOOL,
  DELETE_SCHOOL,
  UPDATE_WORKEXP,
  NEW_WORKEXP,
  DELETE_WORKEXP,
  UPDATE_SKILL_SET
} from "../actions/types";

const initialState = {
  schools: [],
  student: [],
  addSchoolResponse: {},
  updateSchoolResponse: {},
  schoolDeleteResponse: {},
  updateSkillSetResponse: {},
  addSkillsResponse: null,
  skills: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_SKILLS:
      return {
        ...state,
        addSkillsResponse: action.payload
      };
    case FETCH_EDUCATION:
      return {
        ...state,
        schools: action.payload
      };
    case FETCH_STUDENT:
      return {
        ...state,
        student: action.payload
      };
    case FETCH_SKILLS:
      return {
        ...state,
        skills: action.payload
      };
    case NEW_SCHOOL:
      return {
        ...state,
        addSchoolResponse: action.payload
      };
    case UPDATE_SCHOOL:
      return {
        ...state,
        updateSchoolResponse: action.payload
      };
    case DELETE_SCHOOL:
      return {
        ...state,
        schoolDeleteResponse: action.payload
      };
    case NEW_WORKEXP:
      return {
        ...state,
        addWorkExpResponse: action.payload
      };
    case UPDATE_WORKEXP:
      return {
        ...state,
        updateWorkExpResponse: action.payload
      };
    case DELETE_WORKEXP:
      return {
        ...state,
        deleteWorkExpResponse: action.payload
      };
    case UPDATE_SKILL_SET:
      return {
        ...state,
        updateSkillSetResponse: action.payload
      };
    default:
      return state;
  }
}
