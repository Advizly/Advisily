import React from "react";
import { FormSelect } from "./";

function FormSelectGroup({
  defaultOption,
  items,
  idSelector = "id",
  nameSelector = "name",
  valueSelector = "value",
  ...props
}) {
  return (
    <>
      <FormSelect {...props}>
        {defaultOption && (
          <option value="" disabled>
            {defaultOption}
          </option>
        )}
        {items.map((item) => (
          <option key={item[idSelector]} value={item[valueSelector]}>
            {item[nameSelector]}
          </option>
        ))}
      </FormSelect>
    </>
  );
}

export default FormSelectGroup;
