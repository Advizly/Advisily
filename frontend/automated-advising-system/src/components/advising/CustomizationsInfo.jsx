import React from "react";
import { FormSelectGroup, SubmitButton } from "../common/form";
import { getPaces } from "../../services/pacesService";

const semestersToPlan = [
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

function CustomizationsInfo({ onBack }) {
  const paces = getPaces();
  return (
    <>
      <FormSelectGroup
        label={"What pace would you like follow?"}
        name="paceId"
        items={paces}
        valueSelector="id"
      />
      <br />
      <FormSelectGroup
        label={"Up to how many semester would you like to be planned?"}
        name="semestersToPlan"
        items={semestersToPlan}
        valueSelector="id"
      />

      <hr />
      <div className="d-flex justify-content-between ">
        <button className="btn my-3" onClick={onBack} type="button">
          Back
        </button>
        <SubmitButton label="Generate Plan" />
      </div>
    </>
  );
}

export default CustomizationsInfo;
