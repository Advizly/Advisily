const axios = require("axios");
// const minors = [
//   { id: "1", name: "Accounting Minor" },
//   { id: "2", name: "Business Administration Minor" },
//   { id: "3", name: "Computer Science Minor" },
//   { id: "4", name: "Electronics Minor" },
//   { id: "5", name: "Mathematics Minor" },
// ];

const baseUrl = "http://localhost:5000/api/minors";
const getMinors = async () => {
  const { data: minors } = await axios.get(baseUrl);
  return minors;
};
const getMinor = async (minor_id) => {
  const { data: minor } = await axios.get(baseUrl + "/" + minor_id);
  return minor;
};

export { getMinors, getMinor };
