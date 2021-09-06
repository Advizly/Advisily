import { useEffect, useState } from "react";

import { getMajors } from "../services/majorsService";
import { getMinors } from "../services/minorsService";
import { formatMajors, formatMinors } from "../utils/formattingUtils";
const useMajors = () => {
  const [majors, setMajors] = useState([]);
  const [minors, setMinors] = useState([]);

  useEffect(() => {
    getMajors().then((majors) => {
      setMajors(formatMajors(majors));
    });

    getMinors().then((minors) => setMinors(formatMinors(minors)));
  }, []);

  return { majors, minors };
};

export default useMajors;
