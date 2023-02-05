const addToEntitiesIfMissing = (
  entities: { [key: string]: any }, 
  newEntities: { [key: string]: any } | any[], 
  key = 'id'
) => {
  const uniqueEntities: { [key: string]: any } = {};

  if (Array.isArray(newEntities)) {
    newEntities.forEach((item) => {
      const isInEntities = entities[item[key]];

      if (!isInEntities) {
        uniqueEntities[item[key]] = item;
      }
    });
  }
  else {
    for (const itemKey in newEntities) {
      const isInEntities = entities[itemKey];
      if (!isInEntities) {
        uniqueEntities[itemKey] = newEntities[itemKey];
      }
    }
  }

  return { ...entities, ...uniqueEntities };
};

export default addToEntitiesIfMissing;