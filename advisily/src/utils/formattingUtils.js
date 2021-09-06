export const formatCatalogs = (catalogs) => {
  return catalogs.map((c) => {
    return { id: c.catalogId, name: c.year };
  });
};

export const formatMajors = (majors) =>
  majors.map((m) => {
    return { id: m.majorId, name: m.majorTitle };
  });

export const formatMinors = (minors) =>
  minors.map((m) => {
    return { id: m.minorId, name: m.minorTitle };
  });
