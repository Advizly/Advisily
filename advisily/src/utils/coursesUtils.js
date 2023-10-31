import { CourseTypeIds } from "../config.json";

export const formatCourseData = (course) => {
  const { courseId, courseCode, courseTitle, prefix, planType } = course;
  const titleCode = courseCode < 0 ? "XXX" : courseCode;
  const formatedTitle = prefix + " " + titleCode + " - " + courseTitle;

  return { courseId, planType, formatedTitle };
};

export const sortCourses = (courses) => {
  return courses.sort((c1, c2) => {
    if (c1.prefix < c2.prefix) return -1;
    if (c1.prefix > c2.prefix) return 1;

    if (c1.courseCode < c2.courseCode) return -1;
    if (c1.courseCode > c2.courseCode) return 1;

    return c1.courseTitle < c2.courseTitle ? -1 : 1;
  });
};

export const renderCoursesList = (courses) => {
  return courses.map((course) => {
    let { courseId, formatedTitle } = formatCourseData(course);
    if (courseId === 1 || courseId === 2)
      courseId = `${courseId}` + Math.random() * 100 * Math.random();
    console.log(course + " " +formatedTitle)
    return <li key={courseId +  Math.random()}>{formatedTitle}</li>;
  });
};

export const groupCoursesBySemesterNumber = (courses) => {
  const groupedCourses = [];

  courses.forEach((course) => {
    const { semesterNumber } = course;
    if (!groupedCourses[semesterNumber])
      groupedCourses[semesterNumber] = {
        courses: [course],
        semesterNumber,
        totalCredits: course.credits,
      };
    else {
      groupedCourses[semesterNumber].courses.push(course);
      groupedCourses[semesterNumber].totalCredits += course.credits;
    }
  });
  return groupedCourses;
};

//return nested array of objects
//used to render courses in tabular format
export const groupCourses = (courses, coursesPerRow = 2) => {
  const groupedCourses = [];
  let row = [];
  for (let i = 1; i <= courses.length; i++) {
    row.push(courses[i - 1]);

    if (i % coursesPerRow === 0 || i === courses.length) {
      groupedCourses.push(row);
      row = [];
    }
  }
  return groupedCourses;
};

export const categoriseCatalogCourses = (catalogCourses) => {
  const categorized = [],
    categoriesMap = {};
  catalogCourses.forEach((course) => {
    let { courseTypeId, courseType } = course;

    if (
      courseTypeId === CourseTypeIds.mathElec ||
      courseTypeId === CourseTypeIds.mathOrMajorElec
    ) {
      courseTypeId = CourseTypeIds.electives;
      courseType = "Major Electives";
    }

    if (categoriesMap[courseTypeId] === undefined) {
      categoriesMap[courseTypeId] = categorized.length;
      categorized.push({ courseType, courses: [course] });
    } else {
      const categoryIndex = categoriesMap[courseTypeId];
      categorized[categoryIndex]["courses"].push(course);
    }
  });
  return categorized;
};

export const mapCoursestoPrefixes = (courses) => {
  let prefixMap = {};

  courses.forEach((course) => {
    const { prefix } = course;
    if (prefix === "XXXX") return; //skip pseudo-courses

    if (prefixMap[prefix] !== undefined) prefixMap[prefix].push(course);
    else prefixMap[prefix] = [course];
  });

  return prefixMap;
};
