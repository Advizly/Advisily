import React from "react";
import { FormSelect } from "./";

function FormSelectGroup({
  name,
  label,
  visible,
  title,
  defaultOption,
  items,
  idSelector = "id",
  valueSelector = "value",
  nameSelector = "name",
  ...props
}) {
  return (
    <>
      {title && <h5>{title}</h5>}
      <FormSelect label={label} name={name} visible={visible} {...props}>
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
