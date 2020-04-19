import axios from "axios";

import {
  ADD_SKILLS,
  FETCH_EDUCATION,
  FETCH_STUDENT,
  UPDATE_EDUCATION,
  NEW_SCHOOL,
  DELETE_SCHOOL,
  UPDATE_WORKEXP,
  NEW_WORKEXP,
  DELETE_WORKEXP,
  UPDATE_SKILL_SET,
  FETCH_SKILLS
} from "./types";

import Env from "../helpers/Env";

export const actions = () => dispatch => {
  console.log("before fetch");
  axios
    .get(Env.host + "/student/educations/1")
    .then(response => {
      console.log(response);
      return response.data.results;
    })
    .then(schools => {
      console.log("schools from reducers", schools);
      // const subData = educations.map(response => response.data);
      dispatch({
        type: FETCH_EDUCATION,
        payload: schools
      });
    });
};

export const fetchStudent = studentID => dispatch => {
  console.log("before student fetch");
  axios
    .get(Env.host + "/student/detail/" + studentID)
    .then(response => {
      console.log(response);
      return response.data.student;
    })
    .then(student => {
      console.log("student from reducers", student);
      dispatch({
        type: FETCH_STUDENT,
        payload: student
      });
    });
};

export const fetchSkills = () => dispatch => {
  console.log("Entered fetchSkills");
  axios
    .get(Env.host + "/student/skills")
    .then(response => {
      console.log(response);
      return response.data.results;
    })
    .then(skills => {
      console.log("fetchSkills results: ", skills);
      dispatch({
        type: FETCH_SKILLS,
        payload: skills
      });
    });
};

export const addSkills = (studentID, skills) => dispatch => {
  console.log("Entered addSkills");
  axios
    .post(Env.host + "/student/add-skills/" + studentID, skills)
    .then(response => {
      console.log(response);
      return response.data.results;
    })
    .then(skills => {
      dispatch(fetchStudent(studentID));
      console.log("addSkills results: ", skills);
      dispatch({
        type: ADD_SKILLS,
        payload: skills
      });
    });
};

export const createSchool = (studentID, schoolData) => dispatch => {
  console.log("entered add shcool action studentID:", studentID);
  axios
    .post(Env.host + "/student/education/studentid/" + studentID, schoolData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(addSchoolResponse => {
      console.log("response: ", addSchoolResponse);
      dispatch({
        type: NEW_SCHOOL,
        payload: addSchoolResponse
      });
      dispatch(fetchStudent(studentID));
    });
};

export const updateSchool = (
  educationID,
  studentID,
  schoolData
) => dispatch => {
  console.log("before update education", schoolData);
  axios
    .put(Env.host + "/student/education/" + educationID, schoolData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(addSchoolResponse => {
      console.log("response: ", addSchoolResponse);
      dispatch({
        type: UPDATE_EDUCATION,
        payload: addSchoolResponse
      });
      dispatch(fetchStudent(studentID));
    });
};

export const deleteSchool = schoolID => dispatch => {
  console.log("reached Delete school in actions with schoolID: ,", schoolID);
  axios
    .delete(Env.host + "/student/education/" + schoolID, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(deleteSchoolResponse => {
      console.log("response from delete school: ", deleteSchoolResponse);
      dispatch({
        type: DELETE_SCHOOL,
        payload: deleteSchoolResponse
      });
      dispatch(fetchStudent());
    });
};

// -------------------------------------------------------------------------------------------

export const createWorkExp = (studentID, workExpData) => dispatch => {
  console.log("entered add shcool action");
  axios
    .post(Env.host + "/student/experience/" + studentID, workExpData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(addWorkExpResponse => {
      console.log("response: ", addWorkExpResponse);
      dispatch({
        type: NEW_WORKEXP,
        payload: addWorkExpResponse
      });
      dispatch(fetchStudent(studentID));
    });
};

export const updateWorkExp = (
  workExpID,
  studentID,
  workExpData
) => dispatch => {
  console.log(
    "TEST Experience Update before update education ACTION",
    workExpID,
    workExpData
  );
  axios
    .put(Env.host + "/student/experience/" + workExpID, workExpData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(updateWorkExpResponse => {
      console.log("response: ", updateWorkExpResponse);
      dispatch({
        type: UPDATE_WORKEXP,
        payload: updateWorkExpResponse
      });
      dispatch(fetchStudent(studentID));
    });
};

export const deleteWorkExp = workExpID => dispatch => {
  console.log("reached Delete school in actions with schoolID: ,", workExpID);
  axios
    .delete(Env.host + "/student/experience/" + workExpID, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(deleteWorkExpResponse => {
      console.log("response from delete school: ", deleteWorkExpResponse);
      dispatch({
        type: DELETE_WORKEXP,
        payload: deleteWorkExpResponse
      });
      dispatch(fetchStudent());
    });
};

export const updateSkillSet = (studentID, skillSet) => dispatch => {
  console.log("TEST SkillSet  ACTION", studentID, skillSet);
  axios
    .put(Env.host + "/student/skill-set/" + studentID, skillSet, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(updateSkillSetResponse => {
      console.log("response: ", updateSkillSetResponse);
      dispatch({
        type: UPDATE_SKILL_SET,
        payload: updateSkillSetResponse
      });
      dispatch(fetchStudent());
    });
};
