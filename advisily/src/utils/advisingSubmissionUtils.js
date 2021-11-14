import { userService, advisingService } from "../services";

//if no old major or old major is different from currently chosen major
// add new major.
//delete old major only if two majors(old and new) are different

export const updateUserMajor = (
  userId,
  newMajorId,
  catalogId,
  oldCatalogId,
  oldMajorId = null
) => {
  console.log("HERE", userId, newMajorId, oldMajorId);
  if (!oldMajorId && newMajorId)
    userService.addStudentMajor(userId, newMajorId, catalogId);
  else if (
    oldMajorId &&
    (newMajorId !== oldMajorId || oldCatalogId !== catalogId)
  ) {
    userService.deleteStudentMajor(userId, oldMajorId);
    userService.addStudentMajor(userId, newMajorId, catalogId);
  }
};

export const updateUserMinors = (
  userId,
  selectedMinorIds,
  oldMinorIds = []
) => {
  const newMinorIds = selectedMinorIds.filter(
    (id) => oldMinorIds.indexOf(id) === -1
  );
  const deleteMinorIds = oldMinorIds.filter(
    (id) => selectedMinorIds.indexOf(id) === -1
  );
  newMinorIds.forEach((id) => userService.addStudentMinor(userId, id));
  deleteMinorIds.forEach((id) => userService.deleteStudentMinor(userId, id));
};

export const updateStudentCourses = (
  userId,
  selectedIds,
  initialCoursesIds = [],
  extraMajorElectives = 0
) => {
  const majorElectiveId = 2;
  for (let i = 0; i < extraMajorElectives; i++)
    selectedIds.push(majorElectiveId);

  const newIds = selectedIds.filter(
    (id) => initialCoursesIds.indexOf(id) === -1
  );
  const deletedIds = initialCoursesIds.filter(
    (id) => selectedIds.indexOf(id) === -1
  );
  newIds.forEach((id) => userService.addStudentCourse(userId, id));
  deletedIds.forEach((id) => userService.deleteStudentCourse(userId, id));
};

export const updateAdvisingInfo = async (userId, values) => {
  const advisingSession = await advisingService.getAdvisingSession(userId);

  if (!advisingSession.length)
    advisingService.addAdvisingSession({ ...values, userId });
  else {
    const { advisingSessionId } = advisingSession[0];
    const updateAdvisingData = { advisingSessionId, ...values, userId };
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
