import { useEffect, useState } from "react";

import { getMajors } from "../services/majorsService";
import { getMinors } from "../services/minorsService";
import { getCatalogs } from "../services/catalogsService";
import {
  formatCatalogs,
  formatMajors,
  formatMinors,
} from "../utils/formattingUtils";
const useMajors = () => {
  const [majors, setMajors] = useState([]);
  const [minors, setMinors] = useState([]);
  const [catalogs, setCatalogs] = useState([]);

  useEffect(() => {
    getMajors().then((majors) => {
      setMajors(formatMajors(majors));
    });
    getCatalogs().then((catalogs) => {
      setCatalogs(formatCatalogs(catalogs));
    });
    getMinors().then((minors) => setMinors(formatMinors(minors)));
  }, []);

  return { majors, minors, catalogs };
};

export default useMajors;
