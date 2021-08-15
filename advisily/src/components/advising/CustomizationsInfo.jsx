import React, { useState, useEffect } from "react";
import { FormSelectGroup } from "../common/form";
import { getPaces } from "../../services/pacesService";

const semestersPlanned = [
  { id: "1", name: 1 },
  { id: "2", name: 2 },
  { id: "3", name: 3 },
  { id: "4", name: 4 },
  { id: "5", name: 5 },
  { id: "6", name: 6 },
  { id: "7", name: 7 },
  { id: "8", name: 8 },
  { id: "9", name: 9 },
  { id: "10", name: 10 },
];

function CustomizationsInfo() {
  const [paces, setPaces] = useState([]);
  useEffect(() => {
    getPaces().then((res) => setPaces(res));
  }, []);

  return (
    <>
      <FormSelectGroup
        label={"What pace would you like to follow?"}
        name="paceId"
        items={paces}
        valueSelector="pace_id"
        idSelector="pace_id"
        nameSelector="pace_title"
      />
      <br />
      <FormSelectGroup
        label={"Up to how many semester would you like to be planned?"}
        name="semestersPlanned"
        items={semestersPlanned}
        valueSelector="id"
      />

      <hr />
    </>
  );
}

export default CustomizationsInfo;
