const axios = require("axios");

// const catalogs = [
//   { id: "1", name: "Fall 2019" },
//   { id: "2", name: "Spring 2019" },
//   { id: "3", name: "Fall 2020" },
//   { id: "4", name: "Spring 2020" },
//   { id: "5", name: "Fall 2021" },
//   { id: "6", name: "Spring 2021" },
// ];
const baseUrl = "http://localhost:5000/api";

const getCatalogs = async () => {
  const { data: catalogs } = await axios.get(baseUrl + "/catalogs");
  console.log("catalogs", catalogs);
  return catalogs;
};

const getCatalogCourses = async (catId) => {
  const { data: catCourses } = await axios.get(
    baseUrl + "/cat_courses/" + catId
  );
  console.log("catalog courses:", catCourses);
  return catCourses;
};

const getCoreCourses = async (catId) => {
  const { data: courses } = await axios.get(
    baseUrl + "/cat_courses/" + catId + "/1"
  );
  return courses;
};

const getConcCourses = async (catId) => {
  const { data: courses } = await axios.get(
    baseUrl + "/cat_courses/" + catId + "/2"
  );
  return courses;
};

const getElectiveCourses = async (catId) => {
  const { data: courses } = await axios.get(
    baseUrl + "/cat_courses/" + catId + "/3"
  );
  return courses;
};

const getCollateralCourses = async (catId) => {
  const { data: catCourses } = await axios.get(
    baseUrl + "/cat_courses/" + catId + "/4"
  );
  return catCourses;
};

export {
  getCatalogs,
  getCatalogCourses,
  getCoreCourses,
  getConcCourses,
  getElectiveCourses,
  getCollateralCourses,
};
