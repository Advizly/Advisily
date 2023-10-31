const _ = require("lodash");
const {
  StandingsIds,
  JUNIOR_CREDITS,
  SENIOR_CREDITS,
  Course_Types,
  generalElectiveCourse,
} = require("./constants");
const { filterPlanCourses } = require("./filters");
const {
  courseTaken,
  _isElective,
  addCourseTypes,
  _isGeneralElective,
  _isMajorConcenteration,
} = require("./utils");
const { array } = require("joi");

module.exports = { generatePlanConOrPreAsCon, generatePlanConOrPreAsPre };


class Course{
  constructor(id, semester, concurrents, preRequisites, conOrPres, standing, finished300Level){
    this.id = id;
    this.concurrents = concurrents;
    this.preRequisites = preRequisites;
    this.conOrPres = conOrPres;
    this.standing = standing;
    this.semester = Number(semester);
  }
}
function generatePlanConOrPreAsPre({ user, planCourses, advisingSession, catalog }) {
  planCourses = addCourseTypes(planCourses, catalog.courses);
  
  const {
    exemptedCredits,
    advisingSessionId,
    // semestersToPlan,
    generalElecCredits,
  } = advisingSession;
  
  for (let i = 0; i < Math.ceil(exemptedCredits / 3.0); i++)
  planCourses.push(generalElectiveCourse); //general elective
for (let i = 0; i < Math.floor(generalElecCredits / 3.0); i++)
    user.courses.push(generalElectiveCourse);


  const semestersToPlan = 10;
  let resultSemesters = [],
    resultCourses = [];

  user.courses.forEach(
    (course) => (course.credits = course.credits !== null ? course.credits : 3)
    );
    user.totalCredits = user.courses
    .map((course) => course.credits)
    .reduce((c1, c2) => c1 + c2, 0);
    upadteUserStanding(user);

    
    
    let majorElectiveCount = 0;
    for(let catCourse of catalog.courses){
    for(let course of user.courses){
      if(catCourse.courseTypeId === 3 && catCourse.courseId === course.courseId){
        majorElectiveCount++;
      }
    }
  }

    
    
    let coursesNotTaken = removeElementsNotInCat(planCourses, user.courses, majorElectiveCount);//getting the courses that the user has not taken (left join plan courses with user courses)
    coursesNotTaken.forEach(course => {
      course.requisites = _.flatten(course.requisites);
  });
  coursesNotTaken.forEach(element => {
    if(element.courseId === 1795){
      element.requisites.splice(element.requisites.findIndex(x=>x.courseId===1796), 1);
    }
  });
  coursesNotTaken.forEach(course=>{
    course.requisites = removeElementsNotIn(course.requisites, user.courses); //removing already taken courses from requisites
  })
  const listOfCoursesNotTaken = [];
  
  for(let course of coursesNotTaken){
    let preReqs = [];
    let concurrents = [];
    let conOrPres=[];
    let standing = "";
    let courseId = course.courseId;
    let semester = course.semesterNumber;
    for(let req of course.requisites){
      if(req.requisiteTypeId===1){
        preReqs.push(req.courseId);
      }
      if(req.requisiteTypeId === 2){
        concurrents.push(req.courseId);
      }
      if(req.requisiteTypeId === 3){
        
          preReqs.push(req.courseId);
      }
      if(req.requisiteTypeId === 4){
        standing = "junior";
      }
      if(req.requisiteTypeId === 5){
        standing = "senior";
      }
      if(req.requisiteTypeId === 7){
        for(let c of coursesNotTaken){
          if(c.courseCode<4000 && c.courseCode>=3000 && !preReqs.includes(c.courseId)){
            preReqs.push(c.courseId);
          }
        }
      }
    }
    let courseObj = new Course(courseId, semester, concurrents, preReqs, conOrPres, standing);
    listOfCoursesNotTaken.push(courseObj);


  }

  
  for(let crs of listOfCoursesNotTaken){
    for(let x of crs.preRequisites){
      for(let cr of listOfCoursesNotTaken){
        if(x === cr.id){
          for(let y of cr.concurrents){
            if(!crs.preRequisites.includes(y)){
              crs.preRequisites.push(y);
            }
          }
        }
      }
    }
  }

  let genElectiveStart = -15;
  let concentElectiveStart = -50;
  for(let course of listOfCoursesNotTaken){
    if(course.id === 2){
      course.id = concentElectiveStart--;
    }
    if(course.id === 3){
      course.id = genElectiveStart--;
    }
  }
  
  let courseMap = new Map();
  let coursesInMap = [];
  for(let course of listOfCoursesNotTaken){
    if(!coursesInMap.includes(course.id)){
      let key = course.concurrents;
      key.push(course.id);
      courseMap.set(key, []);
      coursesInMap = coursesInMap.concat(key);
    }
    courseMap.set(-10, []);
    courseMap.set(-11, []);

  }
  let coursesPushed = []
  for(const course of courseMap.keys()){
    for(const c of listOfCoursesNotTaken){
      if(c.preRequisites.includes(course[0]) || c.preRequisites.includes(course[1]) && !courseMap.get(course).includes(c.id)){
        let val = [...c.concurrents];
        courseMap.get(course).push(val);
      }
      if(c.standing === 'junior'  && !courseMap.get(-10).includes(c.id) && !coursesPushed.includes(c.id)){
          let val = [];
          val.push(c.id);
          coursesPushed.push(c.id)
          if(c.concurrents){
              for(let cons of c.concurrents){
                if(!val.includes(c.id) &&!coursesPushed.includes(cons)){
                  val.push(cons);
                }
            }
          }
          courseMap.get(-10).push(val);
        }
      if(c.standing === 'senior' && !courseMap.get(-11).includes(c.id) && !coursesPushed.includes(c.id)){
        let val = [];
        val.push(c.id);
        coursesPushed.push(c.id)
        if(c.concurrents){
          for(let cons of c.concurrents){
            if(!val.includes(c.id) &&!coursesPushed.includes(cons)){
              coursesPushed.push(cons)

              val.push(cons);
            }
          }
        }
        courseMap.get(-11).push(val);

      }
    }
  }
  let userCredits = user.totalCredits;
  courseMap = removeSeniorOrJunior(userCredits, courseMap);
  let reachability = 0;
  let sem = 1;
  while(courseMap.size>0){
    lpt = topologicalOrderWithLongestPath(courseMap);
    reachability = findReachability(courseMap);
    let coursesToSelecFrom = {}  
    for(let l of Object.keys(lpt)){
      let reach = reachability[l];
      let longestP = lpt[l];
      let arr =  l.split(",");
      arr = arr.map(Number);
      let semsters = getSemesterById(arr[0], listOfCoursesNotTaken);
      let value = calculatePriorityValue(reach, longestP, semsters, 10, 150, 100);
      let credits = getCreditsbyId(coursesNotTaken, arr);
      coursesToSelecFrom[arr] = [value, credits];
    }
    
    let maxtotals = [];
    let courseSelections = [];

    // Initialize maxtotals and courseSelections arrays
    for (let i = 0; i < Object.keys(coursesToSelecFrom).length + 1; i++) {
      let row = new Array(19).fill(0);
      maxtotals.push(row);
      courseSelections.push([]);
    } 

    let f = 1;
    for (let ctf of Object.keys(coursesToSelecFrom)) {
      const currentWeight = coursesToSelecFrom[ctf][1];
      const currentValue = coursesToSelecFrom[ctf][0];

      for (let j = 0; j < 19; j++) {
        if (currentWeight > j) {
          maxtotals[f][j] = maxtotals[f - 1][j];
          courseSelections[f][j] = [courseSelections[f - 1][j]].flat();
        } else {
          const withoutCurrentCourse = maxtotals[f - 1][j];
          const withCurrentCourse = maxtotals[f - 1][j - currentWeight] + currentValue;

          if (withCurrentCourse >= withoutCurrentCourse) {
            maxtotals[f][j] = withCurrentCourse;
            courseSelections[f][j] = [courseSelections[f - 1][j - currentWeight], ctf].flat();
          } else {
            maxtotals[f][j] = withoutCurrentCourse;
            courseSelections[f][j] = [courseSelections[f - 1][j]].flat();
          }
        }
      }
      f++;
    }

    // Find the selected courses for the maximum priority
    let selectedCourses = courseSelections[Object.keys(coursesToSelecFrom).length][18];
    selectedCourses = selectedCourses.slice(1);
    selectedCourses = selectedCourses.map(x=>x.split(","));
    selectedCourses = selectedCourses.flat();
    selectedCourses = selectedCourses.map(Number)
    courseMap = removeFromMap(courseMap, selectedCourses);

    selectedCourses.forEach((element, index) => {
      if(selectedCourses[index]<=-15 && selectedCourses[index]>-50){
        selectedCourses[index] = 3;
        
      }
      if( selectedCourses[index]<=-50){
        selectedCourses[index] = 2;
      }
      
    });

     let totalSelectedWeight = calculateListWeight(selectedCourses, coursesNotTaken);
     userCredits += totalSelectedWeight;
     courseMap = removeSeniorOrJunior(userCredits, courseMap);
    if(selectedCourses.length===0){
      break;
    }
    selectedCourses.forEach(element => {
      resultCourses.push({
        courseId : element,
        semesterNumber: sem,
        advisingSessionId
      })
    });
      
    resultSemesters.push({
      semesterNumber: sem,
        generalElecCredits: 0,
        advisingSessionId,
      })
    sem++;
}


  return { resultCourses, resultSemesters, isLate: false, planType:1 };
}

function generatePlanConOrPreAsCon({ user, planCourses, advisingSession, catalog }) {
  planCourses = addCourseTypes(planCourses, catalog.courses);
  const {
    exemptedCredits,
    advisingSessionId,
    // semestersToPlan,
    generalElecCredits,
  } = advisingSession;
  
  for (let i = 0; i < Math.ceil(exemptedCredits / 3.0); i++)
  planCourses.push(generalElectiveCourse); //general elective
for (let i = 0; i < Math.floor(generalElecCredits / 3.0); i++)
    user.courses.push(generalElectiveCourse);
  let resultSemesters = [],
    resultCourses = [];

  user.courses.forEach(
    (course) => (course.credits = course.credits !== null ? course.credits : 3)
    );
    user.totalCredits = user.courses
    .map((course) => course.credits)
    .reduce((c1, c2) => c1 + c2, 0);
    upadteUserStanding(user);
let majorElectiveCount = 0;
    for(let catCourse of catalog.courses){
    for(let course of user.courses){
      if(catCourse.courseTypeId === 3 && catCourse.courseId === course.courseId){
        majorElectiveCount++;
      }
    }
  }

    
    
    let coursesNotTaken = removeElementsNotInCat(planCourses, user.courses, majorElectiveCount);//getting the courses that the user has not taken (left join plan courses with user courses)
    
    
    coursesNotTaken.forEach(course => {
      course.requisites = _.flatten(course.requisites);
  });

  coursesNotTaken.forEach(element => {
    if(element.courseId === 1795){
      element.requisites.splice(element.requisites.findIndex(x=>x.courseId===1796), 1);
    }
  });
  coursesNotTaken.forEach(course=>{
    
    course.requisites = removeElementsNotIn(course.requisites, user.courses); //removing already taken courses from requisites
  })
  
  let listOfCoursesNotTaken = [];
  for(let course of coursesNotTaken){
    let preReqs = [];
    let concurrents = [];
    let conOrPres=[];
    let standing = "";
    let courseId = course.courseId;
    let semester = course.semesterNumber;
    for(let req of course.requisites){
      if(req.requisiteTypeId===1 && !preReqs.includes(req.courseId)){
        preReqs.push(req.courseId);
      }
      if(req.requisiteTypeId === 2 && !concurrents.includes(req.courseId)){
        concurrents.push(req.courseId);
      }
      if(req.requisiteTypeId === 3 && !conOrPres.includes(req.courseId)){
        
        conOrPres.push(req.courseId);
      }
      if(req.requisiteTypeId === 4){
        standing = "junior";
      }
      if(req.requisiteTypeId === 5){
        standing = "senior";
      }
      if(req.requisiteTypeId === 7){
        for(let c of coursesNotTaken){
          if(c.courseCode<4000 && c.courseCode>=3000 && !preReqs.includes(c.courseId)){
            preReqs.push(c.courseId);
          }
        }
      }
    }
    let courseObj = new Course(courseId, semester, concurrents, preReqs, conOrPres, standing);
    listOfCoursesNotTaken.push(courseObj);
  }

  //adding the concurrents of every course inside con or preq array to the con or preq array

  for(const course of listOfCoursesNotTaken){
    for(const conOrPreq of course.conOrPres){
      for(const c of listOfCoursesNotTaken){
        if(conOrPreq === c.id){
          for(const conc of c.concurrents){
            if(!course.preRequisites.includes(conOrPreq) && !course.concurrents.includes(conOrPreq) && course.id!==conOrPreq && !course.preRequisites.includes(conc)){
              course.concurrents.push(conOrPreq);
            }
          }
        }
      }
      
    }
  }
  for(const course of listOfCoursesNotTaken){
    for(const con of course.concurrents){
      for(const c of listOfCoursesNotTaken){
        if(c.id === con){
          for(const conc of c.concurrents){
            if(course.preRequisites.includes(conc)){
              const index = course.concurrents.indexOf(con);
              if (index > -1) { // only splice array when item is found
                course.concurrents.splice(index, 1); // 2nd parameter means remove one item only
              }            }
          }
        }
      }
    }
  }
  for(const course of listOfCoursesNotTaken){ //loop over every course
    for(const con of course.concurrents){
      for(const c of listOfCoursesNotTaken){
        if(c.id === con){
          for(const conc of c.concurrents){    
            if(!course.concurrents.includes(conc) && course.id!==conc && !course.preRequisites.includes(conc)){
              course.concurrents.push(conc);
            }              
          }
        }
      }
    }
  }

  for(const course of listOfCoursesNotTaken){ //loop over every course
    for(const con of course.concurrents){
      for(const c of listOfCoursesNotTaken){
        if(c.id === con){
          for(const conc of course.concurrents){
          if(!c.concurrents.includes(conc) && c.id!==conc && !c.preRequisites.includes(conc)){
            c.concurrents.push(conc);
          } 
        }
      }
      }
    }
  }
  let genElectiveStart = -15;
  let concentElectiveStart = -50;
  for(let course of listOfCoursesNotTaken){
    if(course.id === 2){
      course.id = concentElectiveStart--;
    }
    if(course.id === 3){
      course.id = genElectiveStart--;
    }
  }
  //adding the conOrPres to the concurrents


  
  let courseMap = new Map();
  let coursesInMap = [];
  for(let course of listOfCoursesNotTaken){
    if(!coursesInMap.includes(course.id) || course.id === 2){
      let key = course.concurrents;
      key.push(course.id);
      courseMap.set(key, []);
      coursesInMap = coursesInMap.concat(key);
    }
    courseMap.set(-10, []);
    courseMap.set(-11, []);

  }
  let coursesPushed = []
  for(const course of courseMap.keys()){
    const cc = Array.from(course);
    for(const c of listOfCoursesNotTaken){
      
      if(cc.some(x=>c.preRequisites.includes(x)) && !courseMap.get(course).includes(c.id)){
        
        let val = [...c.concurrents];
        courseMap.get(course).push(val);
      }
      if(c.standing === 'junior'  && !courseMap.get(-10).includes(c.id) && !coursesPushed.includes(c.id)){
          let val = [];
          val.push(c.id);
          coursesPushed.push(c.id)
          if(c.concurrents){
              for(let cons of c.concurrents){
                if(!val.includes(c.id) &&!coursesPushed.includes(cons)){
                  val.push(cons);
                }
            }
          }
          courseMap.get(-10).push(val);
        }
      if(c.standing === 'senior' && !courseMap.get(-11).includes(c.id) && !coursesPushed.includes(c.id)){
        let val = [];
        val.push(c.id);
        coursesPushed.push(c.id)
        if(c.concurrents){
          for(let cons of c.concurrents){
            if(!val.includes(c.id) &&!coursesPushed.includes(cons)){
              coursesPushed.push(cons)

              val.push(cons);
            }
          }
        }
        courseMap.get(-11).push(val);

      }
    }
  }
  let userCredits = user.totalCredits;
  courseMap = removeSeniorOrJunior(userCredits, courseMap);
  let reachability = 0;
  let sem = 1;
  while(courseMap.size>0){
    lpt = topologicalOrderWithLongestPath(courseMap);
    reachability = findReachability(courseMap);
    let coursesToSelecFrom = {}  
    for(let l of Object.keys(lpt)){
      let zz=0;
      let reach = reachability[l];
      let longestP = lpt[l];
      let arr =  l.split(",");
      arr = arr.map(Number);
      let semsters = getSemesterById(arr[0], listOfCoursesNotTaken);
      let value = calculatePriorityValue(reach, longestP, semsters, 100, 500, 200);
      let credits = getCreditsbyId(coursesNotTaken, arr);
      coursesToSelecFrom[arr] = [value, credits];
    }
    let maxtotals = [];
    let courseSelections = [];
    

    // Initialize maxtotals and courseSelections arrays
    for (let i = 0; i < Object.keys(coursesToSelecFrom).length + 1; i++) {
      let row = new Array(19).fill(0);
      maxtotals.push(row);
      courseSelections.push([]);
    } 

    let f = 1;
    for (let ctf of Object.keys(coursesToSelecFrom)) {
      const currentWeight = coursesToSelecFrom[ctf][1];
      const currentValue = coursesToSelecFrom[ctf][0];

      for (let j = 0; j < 19; j++) {
        if (currentWeight > j) {
          maxtotals[f][j] = maxtotals[f - 1][j];
          courseSelections[f][j] = [courseSelections[f - 1][j]].flat();
        } else {
          const withoutCurrentCourse = maxtotals[f - 1][j];
          const withCurrentCourse = maxtotals[f - 1][j - currentWeight] + currentValue;

          if (withCurrentCourse >= withoutCurrentCourse) {
            maxtotals[f][j] = withCurrentCourse;
            courseSelections[f][j] = [courseSelections[f - 1][j - currentWeight], ctf].flat();
          } else {
            maxtotals[f][j] = withoutCurrentCourse;
            courseSelections[f][j] = [courseSelections[f - 1][j]].flat();
          }
        }
      }
      f++;
    }
    // Find the selected courses for the maximum priority
    let selectedCourses = courseSelections[Object.keys(coursesToSelecFrom).length][18];
    // selectedCourses = selectedCourses.map(item => {
    //   if(item){
    //     parseInt(item.match(/\d+/)[0], 10)
    //   }
    // });


    selectedCourses = selectedCourses.slice(1);
    selectedCourses = selectedCourses.map(x=>x.split(","));
    selectedCourses = selectedCourses.flat();
    selectedCourses = selectedCourses.map(Number);
    courseMap = removeFromMap(courseMap, selectedCourses);

    selectedCourses.forEach((element, index) => {
      if(selectedCourses[index]<=-15 && selectedCourses[index]>-50){
        selectedCourses[index] = 3;
        
      }
      if( selectedCourses[index]<=-50){
        selectedCourses[index] = 2;
      }
      
    });
    
     let totalSelectedWeight = calculateListWeight(selectedCourses, coursesNotTaken);
     userCredits += totalSelectedWeight;
     courseMap = removeSeniorOrJunior(userCredits, courseMap);
    if(selectedCourses.length===0){
      break;
    }
    selectedCourses.forEach(element => {
      resultCourses.push({
        courseId : element,
        semesterNumber: sem,
        advisingSessionId
      })
    });
      
    resultSemesters.push({
      semesterNumber: sem,
        generalElecCredits: 0,
        advisingSessionId,
      })
    sem++;
}

  return { resultCourses, resultSemesters, isLate: false, planType: 0};
}



const equalsCheck = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
}
function calculateListWeight(selectedCourses, coursesNotTaken){
  let sum =0;
  for(let course of selectedCourses){
    sum+=getCreditsbyId(coursesNotTaken, [course]);
  }
  return sum;
}
function removeSeniorOrJunior(userCredits, courseMap){
  if(userCredits >=60 && courseMap.has(-10)){
    courseMap.delete(-10);
  }
  if(userCredits >=90 && courseMap.has(-11)){
    courseMap.delete(-11);
  }
  return courseMap;
}
function removeFromMap(courseMap, selectedCourses){
  
  for(let l of selectedCourses){
    let removedTwo = 0;
    let rem = 0;
    for(let [j, val] of courseMap){
      if(j!==-10 && j!==-11){

        for(let n of j){
          if(l === n){
            if(n !== 2 && l!==2){
              j.filter(z=>z!==n);
            }
            if(n === 2 && removedTwo === 0){
              j.filter(z=>z!==n);
              removedTwo++;
            }
          }
        }
      for(let x of val){
        
          for(let y of x){
            if(y===l){
              val.filter(z=>z!==x);
              break;
            }
          }
      }
      
      courseMap.set(j, val);
      for(let x of j){
        if(x===l && x!==2){
          courseMap.delete(j);
          break;
        }
        if(x===2 && l===x && rem === 0){
          courseMap.delete(j);
          rem++;
          break;
        }
      }
    }
      
    }
  }
  return courseMap;
}
function calculatePriorityValue(reachability, longestPath, semesters, Wi, Wj, Wk){
  return (reachability * Wi) + (longestPath * Wj) + (semesters *Wk);
}
function findReachability(graph) {
  let inDegree = calculateInDegrees(graph);
  let graphObj = Object.fromEntries(graph.entries());
  inDegree = Object.fromEntries(inDegree.entries());
  let queue = [];
  let top_sort = [];
  for(let deg of Object.keys(inDegree)){
    if(inDegree[deg] === 0){
      queue.push(deg);
    }
  }
  while(queue.length>0){
    let v = queue[0];
    queue.shift();  
    top_sort.push(v);
    for(let u of Object.keys(graphObj[v])){
      u = u.toString();
      inDegree[u]--;
      if(inDegree[u] === 0){
        queue.push(u);
      }
    }
  }
  top_sort.reverse();

  let reachability = {};
  for(let u of Object.keys(graphObj)){
    reachability[u] = 0;
  }
  for(let u of top_sort){
    for(let v of graphObj[u]){
      reachability[u]+=reachability[v]?reachability[v]:1;
    }
  }
  return reachability;
}

function topologicalOrderWithLongestPath(graph){
  let inDegreeOrg = calculateInDegrees(graph);
  inDegreeOrg = Object.fromEntries(inDegreeOrg.entries());
  inDegree = _.cloneDeep( inDegreeOrg);
  graph = Object.fromEntries(graph.entries());
  let lpt = {};
  for(let k of Object.keys(inDegree)){
      lpt[k] = 0;
  }
  let queue = [];
  let top_sort = [];
  for(let deg of Object.keys(inDegree)){
    if(inDegree[deg] === 0){
      queue.push(deg);
    }
  }
  queue.filter(q=>q!==-10 && q!==-11);
  while(queue.length>0){
    let v = queue[0];
    queue.shift();
    top_sort.push(v);
    for(let u of graph[v]){
      u = u.toString();
      
      inDegree[u]--;
      if(inDegree[u] === 0){
        queue.push(u);
      }
    }
  }
  
  top_sort.reverse();
    for(let v of top_sort){
      for(let u of graph[v]){
        lpt[v]=Math.max(lpt[v], ((lpt[u])?lpt[u]:0)+1);
      }
    }
    for(let l of Object.keys(lpt)){
      if(inDegreeOrg[l] !== 0){
        delete lpt[l];
      }
    }
    return lpt;
}


function calculateInDegrees(courseMap) {
  let inDegrees = new Map();
  
  for(const key of courseMap.keys()){
    let deg = 0;
    for(const value of courseMap.values()){
      for(let v of value){
        if(equalsCheck(v,key)){
          deg++;
        }
      }
    }
    
    inDegrees.set(key, deg);
    
  }

  return inDegrees;
}


function getSemesterById(courseId, courses){
  for(const course of courses){
    if(course.id === courseId){
      
      return 10-Number(course.semester);
    }
  }
}



function getCreditsbyId(coursesNotTaken, courseId){
  let credits = 0;
  found = false;
  for(let course of coursesNotTaken){
    for(let crs of courseId){
      if(crs === course.courseId){
        found = true;
        if(course.credits){
          credits+=course.credits;
        }
        else{
          credits = 3;
        }
      }
      
    }
  }
  if(!found){
    return 3;
  }
  return credits;
}

function removeInstancesFromArray(coursesArray, courseId, count) {
  let instancesToRemove = coursesArray.filter(course => course.courseId === courseId);

    // Remove the specified number of instances from the original array
    for (let i = 0; i < count && i < instancesToRemove.length; i++) {
        let index = coursesArray.indexOf(instancesToRemove[i]);
        coursesArray.splice(index, 1);
    }

    // Return the modified array
    return coursesArray;
}

function removeElementsNotInCat(a, b, majorElectiveCount) {
  
  console.log(majorElectiveCount)
  let removedElements = [];
  if(a && b){
  for (let i = 0; i < a.length; i++) {
    const planCourse = a[i];
    let flag = true;
    for (let j = 0; j < b.length; j++) {
      const userCourse = b[j];
      if(planCourse.courseId===userCourse.courseId){
        flag=false;
      }
    }
    if(flag){
      removedElements.push(planCourse);
    }
    
  }
}

let x = removeInstancesFromArray(removedElements, 2, majorElectiveCount) 
  return x;
}




function removeElementsNotIn(a, b) {
  
  let removedElements = [];
  if(a && b){
  for (let i = 0; i < a.length; i++) {
    const planCourse = a[i];
    let flag = true;
    for (let j = 0; j < b.length; j++) {
      const userCourse = b[j];
      if(planCourse.courseId===userCourse.courseId){
        flag=false;
      }
    }
    if(flag){
      removedElements.push(planCourse);
    }
    
  }
  
}
  return removedElements;
}


function updateUser(user, resultCourses) {
  user.courses = user.courses.concat(resultCourses);
  resultCourses.forEach((course) => (user.totalCredits += course.credits));
  upadteUserStanding(user);
}
function upadteUserStanding(user) {

  if (user.totalCredits > JUNIOR_CREDITS) user.standingId = StandingsIds.JUNIOR;
  if (user.totalCredits > SENIOR_CREDITS) user.standingId = StandingsIds.SENIOR;
}

function getResultCourses(user, courses, advisingSession) {
  const sortedCourses = sortByPriority(courses);

  const { overloadingCredits } = advisingSession;
  if (!courses.length) return [];

  courses = mapCoRequisitesToIds(courses, user.courses);
  const coursesIdsMap = {};
  courses.forEach((course) => (coursesIdsMap[course.courseId] = course));

  const MAX_CREDITS = overloadingCredits ? overloadingCredits : 18;
  let reachedMaxCredits = false;
  const obj = {
    user,
    coursesIdsMap,
    resultCourses: [],
    resultCoursesIds: [],
    totalCredits: 0,
    MAX_CREDITS,
  };

  for (let i = 0; i < sortedCourses.length && !reachedMaxCredits; i++) {
    const course = sortedCourses[i];
    obj.course = course;

    if (!obj.resultCoursesIds.includes(course.courseId) || _isElective(course))
      tryAddingCourse(obj);

    reachedMaxCredits = obj.totalCredits === MAX_CREDITS;
  }

  return obj.resultCourses;
}

function tryAddingCourse(obj) {
  const {
    course,
    coursesIdsMap,
    user,
    resultCourses,
    resultCoursesIds,
    totalCredits,
    MAX_CREDITS,
  } = obj;

  if (course.credits + totalCredits > MAX_CREDITS) return false;

  resultCoursesIds.push(course.courseId);
  obj.totalCredits += course.credits;
  resultCourses.push(course);

  const { requisites } = course;
  if (!requisites.length) return true;
  const requisitesAdded = requisites.some((reqSet) => {
    if (!reqSet.length) return true;

    return reqSet.every((requisiteId) => {
      if (resultCoursesIds.includes(requisiteId)) return true;
      //else
      const nextCourse = coursesIdsMap[requisiteId];
      if (nextCourse === undefined) return false;

      if (courseTaken(nextCourse.courseId, user.courses)) return true;

      const nextObj = { ...obj, course: nextCourse };
      if (tryAddingCourse(nextObj)) {
        obj.totalCredits = nextObj.totalCredits;
        return true;
      }
      return false;
    });
  });

  if (requisitesAdded) return true;

  obj.totalCredits -= course.credits;
  resultCourses.pop();
  resultCoursesIds.pop();
  return false;
}

function mapCoRequisitesToIds(courses, userCourses) {
  for (let i = 0; i < courses.length; i++)
    courses[i].requisites = getCoRequisitesIds(courses[i], userCourses);

  return courses;
}

function getCoRequisitesIds(course, userCourses) {
  const reqSets = [];
  course.requisites.forEach((reqSet) => {
    if (!reqSet.length) return;

    const set = reqSet
      .filter((requisite) => {
        const { requisiteTypeId, courseId } = requisite;

        if (courseTaken(courseId, userCourses)) return false; //skip taken requisites
        if (
          requisiteTypeId !== undefined &&
          requisiteTypeId !== 2 &&
          requisiteTypeId !== 3
        )
          return false; //skip non-conncurent requisites

        return true;
      })
      .map((requisite) => requisite.courseId);

    reqSets.push(set);
  });
  return reqSets;
}

function isInChain(course) {
  const chain = [
    { prefix: "PHYS", courseCode: 2211 }, //PHYS III
    { prefix: "PHYS", courseCode: 2212 }, //PHYS III lab
    { prefix: "CSCE", courseCode: 2301 }, //digital I
    { prefix: "CSCE", courseCode: 2302 }, //digital I lab
    { prefix: "CSCE", courseCode: 2303 }, //Computer Org. & Assembey Lang.
    { prefix: "CSCE", courseCode: 3301 }, //Computer architecture
    { prefix: "CSCE", courseCode: 3302 }, //Computer architecture lab
    { prefix: "CSCE", courseCode: 3401 }, //OS
    { prefix: "CSCE", courseCode: 4301 }, //OS lab
    { prefix: "CSCE", courseCode: 4301 }, //Embeded
    { prefix: "CSCE", courseCode: 4302 }, //Embeded lab
    { prefix: "CSCE", courseCode: 4411 }, //distributed
  ];
  const res = chain.some(
    (chainCourse) =>
      course.prefix === chainCourse.prefix &&
      course.courseCode == chainCourse.courseCode
  );
  return res;
}

function sortByPriority(courses) {
  let foundMajorCourse = false;
  // return courses;
  return courses.sort((c1, c2) => {
    if (!foundMajorCourse)
      if (_isMajorConcenteration(c1) && !_isMajorConcenteration(c2)) {
        foundMajorCourse = true;
        return -1;
      } else if (!_isMajorConcenteration(c1) && _isMajorConcenteration(c2)) {
        foundMajorCourse = true;
        return 1;
      }
    if (isInChain(c1) && !isInChain(c2)) {
      foundMajorCourse = true;
      return -1;
    }
    if (!isInChain(c1) && isInChain(c2)) {
      foundMajorCourse = true;
      return 1;
    }
    if (priortirizeDiscrete(c1, c2)) return priortirizeDiscrete(c1, c2);

    if (_isGeneralElective(c1) && !_isGeneralElective(c2)) return 1;
    if (!_isGeneralElective(c1) && _isGeneralElective(c2)) return -1;
    if (_isMajorConcenteration(c1) && _isElective(c2)) return -1;
    if (_isMajorConcenteration(c2) && _isElective(c1)) return 1;
    if (c1.semesterNumber != c2.semesterNumber)
      return c1.semesterNumber - c2.semesterNumber;
    return c1.courseCode - c2.courseCode;
  });
}

function priortirizeDiscrete(c1, c2) {
  // priortirize DiscreteOver Calculus
  const DISCRETE_CODE = 2131;
  const CALCULUS_CODE = 2123;
  if (
    !c1 ||
    !c2 ||
    !c1.prefix ||
    !c2.prefix ||
    c1.prefix !== "MACT" ||
    c2.prefix !== "MACT"
  )
    return false;

  if (c1.courseCode == DISCRETE_CODE && c2.courseCode == CALCULUS_CODE)
    return -1;
  if (c1.courseCode == CALCULUS_CODE && c2.courseCode == DISCRETE_CODE)
    return 1;
  return 0;
}

function decreasePriority(courses, courseTypeId) {
  return courses.sort((c1, c2) => {
    if (c1.courseTypeId === courseTypeId && c2.courseTypeId !== courseTypeId)
      return 1;
    return c1.courseTypeId !== courseTypeId && c2.courseTypeId === courseTypeId
      ? -1
      : 0;
  });
}

/*****
 * Algorithm:
 * get plan courses.
 * get courses finished by the user.
 * get the difference between both.
 * take the reamining courses in the plan and return the first X courses where SUM(X.crdits) <= 18.
 */

/*
 *
 **BASE****
 * 1- add plans/plans courses table: has each plan and catalogId and the needed courses.
 * 2- retrieve courses from plans table to create base for comparison. (remember to sort by semester number)
 * 3- get the courses finished by the user so far.
 * 4- do validation (skip for now): did he fulfill the prerequisites?
 * 5- remove the courses finished from the plan courses.
 * 6- get the first X courses from plans courses till their total credit is 18 or the maximum below 18.
 *  ***To be added******
 * 7-  do calculations to see if the student is on track (how?) IMPORTANT!!
 * divided courses to according to their type and check if he is late in a certain course category.
 * give values to courses in the plan; the ones with higher value are more important. (how??)
 * 10- plan X semesters ahead: repeat the base process X time. stopping condition is finishing the courses or reaching X semester.
 */
