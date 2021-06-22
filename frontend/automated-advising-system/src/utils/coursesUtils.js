export const formatCourseData = (course) => {
  const { longNumber, shortNumber, title, prefix } = course;
  const courseId = longNumber;
  const formatedTitle =
    prefix + " " + shortNumber + "/" + longNumber + " " + title;
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
