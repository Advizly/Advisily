const { min } = require("lodash");
const { query, getConnection } = require("./helpers/mysql");

const data = [
  {
    courseId: 360,
    courseTitle: "General Chemistry I",
    prefix: "CHEM",
    semesterNumber: 1,
  },
  {
    cnt: 2,
    courseId: 362,
    courseTitle: "General Chemistry Laboratory",
    prefix: "CHEM",
    semesterNumber: 1,
  },
  {
    cnt: 2,
    courseId: 221,
    courseTitle: "Freshman Seminar",
    prefix: "CORE",
    semesterNumber: 1,
  },
  {
    cnt: 2,
    courseId: 482,
    courseTitle: "Operating Systems",
    prefix: "CSCE",
    semesterNumber: 6,
  },
  {
    cnt: 2,
    courseId: 469,
    courseTitle: "Fundamentals of Database Systems",
    prefix: "CSCE",
    semesterNumber: 4,
  },
  {
    cnt: 2,
    courseId: 466,
    courseTitle: "Digital Design I",
    prefix: "CSCE",
    semesterNumber: 4,
  },
  {
    cnt: 2,
    courseId: 467,
    courseTitle: "Digital Design I Lab",
    prefix: "CSCE",
    semesterNumber: 4,
  },
  {
    cnt: 2,
    courseId: 460,
    courseTitle: "Fundamentals of Computing I",
    prefix: "CSCE",
    semesterNumber: 1,
  },
  {
    cnt: 2,
    courseId: 468,
    courseTitle: "Computer Organization and Assembly Language Programming",
    prefix: "CSCE",
    semesterNumber: 5,
  },
  {
    cnt: 2,
    courseId: 478,
    courseTitle: "Digital Design II",
    prefix: "CSCE",
    semesterNumber: 5,
  },
  {
    cnt: 2,
    courseId: 488,
    courseTitle: "Software Engineering",
    prefix: "CSCE",
    semesterNumber: 5,
  },
  {
    cnt: 2,
    courseId: 727,
    courseTitle: "Senior Project II",
    prefix: "CSCE",
    semesterNumber: 10,
  },
  {
    cnt: 2,
    courseId: 487,
    courseTitle: "Digital Signal Processing",
    prefix: "CSCE",
    semesterNumber: 6,
  },
  {
    cnt: 2,
    courseId: 475,
    courseTitle: "Computer Architecture",
    prefix: "CSCE",
    semesterNumber: 6,
  },
  {
    cnt: 2,
    courseId: 476,
    courseTitle: "Computer Architecture Lab",
    prefix: "CSCE",
    semesterNumber: 6,
  },
  {
    cnt: 2,
    courseId: 477,
    courseTitle: "Fundamental Microelectronics",
    prefix: "CSCE",
    semesterNumber: 4,
  },
  {
    cnt: 2,
    courseId: 483,
    courseTitle: "Operating Systems Lab",
    prefix: "CSCE",
    semesterNumber: 6,
  },
  {
    cnt: 2,
    courseId: 495,
    courseTitle: "Fundamentals of Distributed Systems",
    prefix: "CSCE",
    semesterNumber: 7,
  },
  {
    cnt: 2,
    courseId: 480,
    courseTitle: "Computer Networks",
    prefix: "CSCE",
    semesterNumber: 7,
  },
  {
    cnt: 2,
    courseId: 481,
    courseTitle: "Computer Networks Lab",
    prefix: "CSCE",
    semesterNumber: 7,
  },
  {
    cnt: 2,
    courseId: 491,
    courseTitle: "Embedded Systems",
    prefix: "CSCE",
    semesterNumber: 8,
  },
  {
    cnt: 2,
    courseId: 492,
    courseTitle: "Embedded Systems Lab",
    prefix: "CSCE",
    semesterNumber: 8,
  },
  {
    cnt: 2,
    courseId: 726,
    courseTitle: "Senior Project I",
    prefix: "CSCE",
    semesterNumber: 9,
  },
  {
    cnt: 2,
    courseId: 725,
    courseTitle: "Industrial Training",
    prefix: "CSCE",
    semesterNumber: 9,
  },
  {
    cnt: 2,
    courseId: 461,
    courseTitle: "Fundamentals of Computing II",
    prefix: "CSCE",
    semesterNumber: 2,
  },
  {
    cnt: 2,
    courseId: 462,
    courseTitle: "Fundamentals of Computing II Lab",
    prefix: "CSCE",
    semesterNumber: 2,
  },
  {
    cnt: 2,
    courseId: 465,
    courseTitle: "Analysis and Design of Algorithms Lab",
    prefix: "CSCE",
    semesterNumber: 3,
  },
  {
    cnt: 2,
    courseId: 464,
    courseTitle: "Analysis and Design of Algorithms",
    prefix: "CSCE",
    semesterNumber: 3,
  },
  {
    cnt: 2,
    courseId: 899,
    courseTitle: "Introduction to Engineering",
    prefix: "ENGR",
    semesterNumber: 1,
  },
  {
    cnt: 2,
    courseId: 905,
    courseTitle: "Engineering Analysis and Computation I",
    prefix: "ENGR",
    semesterNumber: 8,
  },
  {
    cnt: 2,
    courseId: 902,
    courseTitle: "Engineering Mechanics II (Dynamics)",
    prefix: "ENGR",
    semesterNumber: 7,
  },
  {
    cnt: 2,
    courseId: 900,
    courseTitle: "Descriptive Geometry and Engineering Drawing",
    prefix: "ENGR",
    semesterNumber: 4,
  },
  {
    cnt: 2,
    courseId: 907,
    courseTitle: "Engineering Economy",
    prefix: "ENGR",
    semesterNumber: 9,
  },
  {
    cnt: 2,
    courseId: 901,
    courseTitle: "Engineering Mechanics I (Statics)",
    prefix: "ENGR",
    semesterNumber: 5,
  },
  {
    cnt: 2,
    courseId: 908,
    courseTitle: "Fundamentals of Thermofluids",
    prefix: "ENGR",
    semesterNumber: 9,
  },
  {
    cnt: 2,
    courseId: 1329,
    courseTitle: "Libraries and Learning Technologies",
    prefix: "LALT",
    semesterNumber: 2,
  },
  {
    cnt: 2,
    courseId: 1441,
    courseTitle: "Linear Algebra",
    prefix: "MACT",
    semesterNumber: 4,
  },
  {
    cnt: 2,
    courseId: 1451,
    courseTitle: "Probability and Statistics",
    prefix: "MACT",
    semesterNumber: 6,
  },
  {
    cnt: 2,
    courseId: 1435,
    courseTitle: "Calculus II",
    prefix: "MACT",
    semesterNumber: 2,
  },
  {
    cnt: 2,
    courseId: 1442,
    courseTitle: "Differential Equations",
    prefix: "MACT",
    semesterNumber: 5,
  },
  {
    cnt: 2,
    courseId: 1440,
    courseTitle: "Discrete Mathematics",
    prefix: "MACT",
    semesterNumber: 3,
  },
  {
    cnt: 2,
    courseId: 1438,
    courseTitle: "Calculus III",
    prefix: "MACT",
    semesterNumber: 3,
  },
  {
    cnt: 2,
    courseId: 1369,
    courseTitle: "Management Fundamentals",
    prefix: "MGMT",
    semesterNumber: 8,
  },
  {
    cnt: 2,
    courseId: 1758,
    courseTitle: "Philosophical Thinking",
    prefix: "PHIL",
    semesterNumber: 3,
  },
  {
    cnt: 2,
    courseId: 1791,
    courseTitle: "General Physics Laboratory II",
    prefix: "PHYS",
    semesterNumber: 2,
  },
  {
    cnt: 2,
    courseId: 1790,
    courseTitle: "Electricity and Magnetism",
    prefix: "PHYS",
    semesterNumber: 2,
  },
  {
    cnt: 2,
    courseId: 1795,
    courseTitle: "Introduction to Electronics",
    prefix: "PHYS",
    semesterNumber: 3,
  },
  {
    cnt: 2,
    courseId: 1797,
    courseTitle: "Electronics lab for Computer Scientists & Computer Engineers",
    prefix: "PHYS",
    semesterNumber: 3,
  },
  {
    cnt: 2,
    courseId: 1789,
    courseTitle: "General Physics Laboratory I",
    prefix: "PHYS",
    semesterNumber: 1,
  },
  {
    cnt: 2,
    courseId: 1788,
    courseTitle: "Classical Mechanics, Sound and Heat",
    prefix: "PHYS",
    semesterNumber: 1,
  },
  {
    cnt: 2,
    courseId: 2094,
    courseTitle: "Research Writing",
    prefix: "RHET",
    semesterNumber: 2,
  },
  {
    cnt: 2,
    courseId: 2093,
    courseTitle: "Freshman Writing",
    prefix: "RHET",
    semesterNumber: 1,
  },
  {
    cnt: 2,
    courseId: 439,
    courseTitle: "Scientific Thinking",
    prefix: "SCI",
  },
  {
    cnt: 2,
    courseId: 6,
    courseTitle: "Core Capstone II",
    prefix: "XXXX",
    semesterNumber: 10,
  },
  {
    cnt: 2,
    courseId: 4,
    courseTitle: "Arab World Studies II",
    prefix: "XXXX",
    semesterNumber: 8,
  },
  {
    cnt: 2,
    courseId: 5,
    courseTitle: "Arab World Studies I",
    prefix: "XXXX",
    semesterNumber: 5,
  },
  {
    cnt: 2,
    courseId: 8,
    courseTitle: "Humanities and Social Sciences",
    prefix: "XXXX",
    semesterNumber: 6,
  },
  {
    cnt: 2,
    courseId: 9,
    courseTitle: "Global Studies",
    prefix: "XXXX",
    semesterNumber: 5,
  },
  {
    cnt: 2,
    courseId: 10,
    courseTitle: "Pathways II: Cultural Explorations",
    prefix: "XXXX",
    semesterNumber: 4,
  },
];
async function main() {
  const con = getConnection();
  let sql =
    "\
  select count(*) as cnt, pc.courseId,c.courseTitle, c.prefix from planCourses as pc\
 INNER join courses as c on c.courseId=pc.courseId\
 where pc.catalogId = 35 \
 group by pc.courseId, c.courseTitle, c.prefix\
 HAVING count(*)>=2 AND cnt<5 \
 order by c.prefix;\
  ";

  let sql2= "select * from planCourses as pc inner join courses as c on c.courseId = pc.courseId where catalogId=35";
  let inserQuery =
    "\
  INSERT INTO `planCourses` (`catalogId`, `courseId`, `semesterNumber`) VALUES (35, ?, ?);\
  ";
  // result.forEach(async (row) => {
  //   const [result2,err2] = await query(deleteQuery, [row.courseId, 35,1], false, con);
  //   console.log(result2);
  // });

  //  [result,err] = await query(sql, [35,2], false, con);
  // data.forEach(async (row) => {
  //   const [result2, err2] = await query(
  //     inserQuery,
  //     [35, row.courseId, row.semesterNumber],
  //     false,
  //     con
  //   );
  //   console.log(result2);
  // });

  let [result, err] = await query(sql2, [35, 1], false, con);

  console.log(result);
  con.end();
}

main();
