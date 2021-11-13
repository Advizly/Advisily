const Course_Types = {
  Core: 1,
  Concentration: 2,
  MajorElectives: 3,
  Collateral: 4,
  EngineeringCore: 5,
  GeneralElectives: 6,
  MathElectives: 7,
  MathOrMajorElective: 8,
};
const MATH_ELECTIVE_CODE = -11;
const MAJOR_ELECTIVE_CODE = -10;
const GENERAL_ELECTIVE_CODE = -9;

const StandingsIds = {
  FRESHMEN: 1,
  SOPHOMORE: 2,
  JUNIOR: 3,
  SENIOR: 4,
  GRADUATING_SENIOR: 5,
};

const JUNIOR_CREDITS = 60;
const SENIOR_CREDITS = 90;

const RequisiteIds = {
  PREREQUISITE: 1,
  COREQUISITE: 2,
  PREREQUISITE_OR_CONCURRENT: 3,
  JUNIOR_STANDING: 4,
  SENIOR_STANIDNG: 5,
  INSTRUCTOR_CONSENT: 6,
  FINISHED_300_LEVEL: 7,
};

const generalElectiveCourse = {
  courseId: 3,
  courseCode: -9,
  credits: 3,
  requisites: [],
  semesterNumber: 9,
  courseTypeId: Course_Types.GeneralElectives,
};

module.exports = {
  Course_Types,
  MATH_ELECTIVE_CODE,
  MAJOR_ELECTIVE_CODE,
  GENERAL_ELECTIVE_CODE,
  StandingsIds,
  JUNIOR_CREDITS,
  SENIOR_CREDITS,
  RequisiteIds,
  generalElectiveCourse,
};
