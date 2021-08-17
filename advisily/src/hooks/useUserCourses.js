import { useState, useEffect } from "react";
import { getAdvisingSession } from "../services/advisingService";
import { getCurrentUser } from "../services/authService";
import { getStudentCourses } from "../services/userService";

function useUserCourses(props) {
  const [coursesIds, setStudentCourseIds] = useState([]);
  const [generalElecCredits, setGeneralElecCredits] = useState(0);

  const getGeneralElecCredits = async (studentId) => {
    const advisingSession = await getAdvisingSession(studentId);
    if (!advisingSession.length) return;

    setGeneralElecCredits(advisingSession[0].generalElecCredits);
  };

  const getCoursesIds = async (studentId) => {
    const studentCourses = await getStudentCourses(studentId);
    const coursesIds = studentCourses.map((c) => JSON.stringify(c.courseId));
    setStudentCourseIds(coursesIds);
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      getCoursesIds(user.studentId);
      getGeneralElecCredits(user.studentId);
    }
  }, []);

  return { coursesIds, generalElecCredits };
}

export default useUserCourses;
