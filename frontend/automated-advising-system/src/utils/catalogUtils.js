export const formatCatalogs = (catalogs) => {
  return catalogs.map((c) => {
    return { id: c.catalog_id, name: c.season + " " + c.year };
  });
};
