export const formatCourseData = (course) => {
  const { course_code, title, prefix, department_id } = course;
  if (course_code < 0) return {};
  const courseId = course_code + "" + department_id;
  const title_code = course_code < 0 ? "XXX" : course_code;
  const formatedTitle = prefix + " " + title_code + " - " + title;
  return { courseId, formatedTitle };
};

//return nested array of objects
export const groupCourses = (courses, coursesPerRow = 2) => {
  const groupedCourses = [];
  let row = [];
  for (let i = 1; i <= courses.length; i++) {
    row.push(courses[i - 1]);

    if (i % coursesPerRow === 0 || i === courses.length) {
      groupedCourses.push(row);
      row = [];
      //update
    }
  }
  return groupedCourses;
};
