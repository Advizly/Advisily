import { useEffect, useState } from "react";

import { getMajors } from "../services/majorsService";
import { getMinors } from "../services/minorsService";
import { getCatalogs } from "../services/catalogsService";
import { formatCatalogs } from "../utils/catalogUtils";
const useMajorInfo = () => {
  const [majors, setMajors] = useState([]);
  const [minors, setMinors] = useState([]);
  const [catalogs, setCatalogs] = useState([]);

  useEffect(() => {
    getMajors().then((majors) => {
      setMajors(majors);
    });
    getCatalogs().then((catalogs) => {
      setCatalogs(formatCatalogs(catalogs));
    });
    getMinors().then((minors) => setMinors(minors));
  }, []);

  return { majors, minors, catalogs };
};

export default useMajorInfo;
