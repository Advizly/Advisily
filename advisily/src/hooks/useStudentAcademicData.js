import { useState, useEffect } from "react";
import { getAdvisingSession } from "../services/advisingService";
import { getCurrentUser } from "../services/authService";
import {
  getStudentMajors,
  getStudentMinors,
  getStudentCourses,
} from "../services/userService";

const useStudentAcademicData = () => {
  const [firstMajor, setFirstMajor] = useState({
    major_id: "",
    catalog_id: "",
  });
  const [secondMajor, setSecondMajor] = useState({
    major_id: "",
    catalog_id: "",
    isDoubleMajoring: "false",
  });
  const [minors, setMinors] = useState({ minorIds: [], isMinoring: "false" });
  const [coursesIds, setStudentCourseIds] = useState([]);
  const [generalElectiveCredits, setGeneralElectiveCredits] = useState(0);

  const getGeneralElectiveCredits = async (studentId) => {
    const advisingSession = await getAdvisingSession(studentId);
    if (!advisingSession.length) return;
    const electiveCredits = advisingSession[0].general_elec_credits;
    setGeneralElectiveCredits(electiveCredits);
  };

  const getStudentMajorsInfo = async (studentId) => {
    const majors = await getStudentMajors(studentId);
    if (majors && majors.length) setFirstMajor({ ...majors[0] });
    if (majors && majors.length > 1)
      setSecondMajor({ ...majors[1], isDoubleMajoring: "true" });
  };
  const getStudentMinorsIds = async (studentId) => {
    const minors = await getStudentMinors(studentId);
    const minorIds = minors.map((m) => m.minor_id);
    const isMinoring = minorIds.length ? "true" : "false";
    setMinors({ minorIds, isMinoring });
  };

  const getCoursesIds = async (studentId) => {
    const studentCourses = await getStudentCourses(studentId);
    const coursesIds = studentCourses.map((c) => JSON.stringify(c.course_id));
    setStudentCourseIds(coursesIds);
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      getStudentMajorsInfo(user.studentId);
      getStudentMinorsIds(user.studentId);
      getCoursesIds(user.studentId);
      getGeneralElectiveCredits(user.studentId);
    }
  }, []);

  return {
    firstMajor,
    secondMajor,
    minors,
    coursesIds,
    generalElectiveCredits,
  };
};

export default useStudentAcademicData;
