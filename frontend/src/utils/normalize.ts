interface IDataItem<T> {
  [key: string]: T; // id
};

interface IEntities<T> {
  [key: string]: IDataItem<T>;
};

interface INormalizeResult<T> {
  entities: IEntities<T>;
  ids: T[];
};


const normalize = <T extends IDataItem<T>>(data: Array<T>, key: string = 'id'): INormalizeResult<T> => {
  const entities: IEntities<T> = {};

  const ids: T[] = data.map((dataItem: T) => {
    const id: any = dataItem[key];

    entities[id] = dataItem;

    return id;
  });

  return { entities, ids };
};

export default normalize;