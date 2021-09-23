import { userService, advisingService } from "../services";

//if no old major or old major is different from currently chosen major
// add new major.
//delete old major only if two majors(old and new) are different

export const updateUserMajor = (
  studentId,
  newMajorId,
  catalogId,
  oldMajorId = null
) => {
  if (!oldMajorId && newMajorId)
    userService.addStudentMajor(studentId, newMajorId, catalogId);
  else if (oldMajorId && newMajorId !== oldMajorId) {
    userService.addStudentMajor(studentId, newMajorId, catalogId);
    userService.deleteStudentMajor(studentId, oldMajorId);
  }
};

export const updateUserMinors = (
  studentId,
  selectedMinorIds,
  oldMinorIds = []
) => {
  const newMinorIds = selectedMinorIds.filter(
    (id) => oldMinorIds.indexOf(id) === -1
  );
  const deleteMinorIds = oldMinorIds.filter(
    (id) => selectedMinorIds.indexOf(id) === -1
  );
  newMinorIds.forEach((id) => userService.addStudentMinor(studentId, id));
  deleteMinorIds.forEach((id) => userService.deleteStudentMinor(studentId, id));
};

export const updateStudentCourses = (
  studentId,
  selectedIds,
  initialCoursesIds = []
) => {
  const newIds = selectedIds.filter(
    (id) => initialCoursesIds.indexOf(id) === -1
  );
  const deletedIds = initialCoursesIds.filter(
    (id) => selectedIds.indexOf(id) === -1
  );
  newIds.forEach((id) => userService.addStudentCourse(studentId, id));
  deletedIds.forEach((id) => userService.deleteStudentCourse(studentId, id));
};

export const updateAdvisingInfo = async (studentId, values) => {
  const advisingSession = await advisingService.getAdvisingSession(studentId);

  if (!advisingSession.length)
    advisingService.addAdvisingSession({ ...values, studentId });
  else {
    const { advisingSessionId } = advisingSession[0];
    const updateAdvisingData = { advisingSessionId, ...values, studentId };
    advisingService.updateAdvisingSessions(updateAdvisingData);
  }
};


const userMajorUtils = {
  updateUserMajor,
  updateUserMinors,
  updateStudentCourses,
  updateAdvisingInfo,
};
export default userMajorUtils;
