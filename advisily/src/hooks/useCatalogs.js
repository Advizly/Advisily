import { useEffect, useState } from "react";

import { getCatalogs } from "../services/catalogsService";
import { formatCatalogs } from "../utils/formattingUtils";

function useCatalogs(majorId) {
  const [catalogs, setCatalogs] = useState([]);
  useEffect(() => {
    getCatalogs(majorId).then((catalogs) => {
      setCatalogs(formatCatalogs(catalogs));
    });
  }, [majorId]);
  return { catalogs };
}

export default useCatalogs;
