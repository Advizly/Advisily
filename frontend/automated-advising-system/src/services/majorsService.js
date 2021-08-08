const axios = require("axios");

const baseUrl = "http://localhost:5000/api/majors";
const getMajors = async () => {
  const { data: majors } = await axios.get(baseUrl);
  return majors;
};

export { getMajors };
