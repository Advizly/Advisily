import { useState, useEffect } from "react";
import { getStudentMajors, getStudentMinors } from "../services/userService";
import useAuth from "./useAuth";

const useUserMajorInfo = () => {
  const [firstMajor, setFirstMajor] = useState({
    majorId: "",
    catalogId: "",
  });
  const [secondMajor, setSecondMajor] = useState({
    secondMajorId: "",
    secondCatalogId: "",
    isDoubleMajoring: "false",
  });
  const [minors, setMinors] = useState({ minorIds: [], isMinoring: "false" });

  const getStudentMajorsInfo = async (studentId) => {
    const majors = await getStudentMajors(studentId);
    if (majors && majors.length)
      setFirstMajor({
        majorId: majors[0].majorId,
        catalogId: majors[0].catalogId,
      });
    if (majors && majors.length > 1)
      setSecondMajor({
        secondMajorId: majors[1].majorId,
        secondCatalogId: majors[1].catalogId,
        isDoubleMajoring: "true",
      });
  };
  const getStudentMinorsIds = async (studentId) => {
    const minors = await getStudentMinors(studentId);
    const minorIds = minors.map((m) => m.minorId);
    const isMinoring = minorIds.length ? "true" : "false";
    setMinors({ minorIds, isMinoring });
  };

  const user = useAuth();
  useEffect(() => {
    if (user) {
      getStudentMajorsInfo(user.studentId);
      getStudentMinorsIds(user.studentId);
    }
  }, [user]);

  return {
    ...firstMajor,
    ...secondMajor,
    ...minors,
  };
};

export default useUserMajorInfo;
