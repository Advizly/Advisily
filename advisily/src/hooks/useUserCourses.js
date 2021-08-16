import { useState, useEffect } from "react";
import { getAdvisingSession } from "../services/advisingService";
import { getCurrentUser } from "../services/authService";
import { getStudentCourses } from "../services/userService";

function useUserCourses(props) {
  const [coursesIds, setStudentCourseIds] = useState([]);
  const [generalElectiveCredits, setGeneralElectiveCredits] = useState(0);

  const getGeneralElectiveCredits = async (studentId) => {
    const advisingSession = await getAdvisingSession(studentId);
    if (!advisingSession.length) return;
    const electiveCredits = advisingSession[0].general_elec_credits;
    setGeneralElectiveCredits(electiveCredits);
  };

  const getCoursesIds = async (studentId) => {
    const studentCourses = await getStudentCourses(studentId);
    const coursesIds = studentCourses.map((c) => JSON.stringify(c.course_id));
    setStudentCourseIds(coursesIds);
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      getCoursesIds(user.studentId);
      getGeneralElectiveCredits(user.studentId);
    }
  }, []);

  return { coursesIds, generalElectiveCredits };
}

export default useUserCourses;
