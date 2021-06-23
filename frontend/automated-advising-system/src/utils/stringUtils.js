const stringToBool = (str) => {
  if (typeof str === "boolean") return str;
  if (typeof str !== "string") return null;
  if (str.toLowerCase().trim() === "true") return true;
  if (str.toLowerCase().trim() === "false") return false;
  return null;
};

export { stringToBool };
