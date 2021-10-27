import { useState, useEffect } from "react";
import { getAdvisingSession } from "../services/advisingService";
import { getCurrentUser } from "../services/authService";
import { getStudentCourses } from "../services/userService";

function useUserCourses(props) {
  const [coursesIds, setStudentCourseIds] = useState([]);
  const [generalElecCredits, setGeneralElecCredits] = useState(0);

  const getGeneralElecCredits = async (userId) => {
    const advisingSession = await getAdvisingSession(userId);
    if (!advisingSession.length) return;

    setGeneralElecCredits(advisingSession[0].generalElecCredits);
  };

  const getCoursesIds = async (userId) => {
    const studentCourses = await getStudentCourses(userId);
    const coursesIds = studentCourses.map((c) => JSON.stringify(c.courseId));
    setStudentCourseIds(coursesIds);
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      getCoursesIds(user.userId);
      getGeneralElecCredits(user.userId);
    }
  }, []);

  return { coursesIds, generalElecCredits };
}

export default useUserCourses;
